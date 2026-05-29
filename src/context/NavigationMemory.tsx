import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

const STORAGE_KEY = "nav-memory";
const MAX_STATES = 50;
const TTL_MS = 30 * 60 * 1000;

export interface IframeState {
  scrollPosition: number;
  theme: string;
  lang: string;
  visibleSection: string;
}

export interface PageState {
  scrollPosition: number;
  hash: string;
  timestamp: number;
  sectionState?: Record<string, any>;
  iframeState?: IframeState | null;
}

interface NavigationMemoryContextType {
  pageStates: ReadonlyMap<string, PageState>;
  savePageState: (path: string, state: Partial<PageState>) => void;
  getPageState: (path: string) => PageState | undefined;
  lastVisitedPath: string;
  saveSectionState: (path: string, key: string, value: any) => void;
  getSectionState: (path: string, key: string) => any;
  saveIframeState: (path: string, state: IframeState) => void;
  getIframeState: (path: string) => IframeState | null;
  clearExpiredStates: () => void;
  signalReady: () => void;
  isRestoring: boolean;
  previousPath: string;
  sourceSection: string;
  setSourceSection: (section: string) => void;
}

const NavigationMemoryContext = createContext<NavigationMemoryContextType>({
  pageStates: new Map(),
  savePageState: () => {},
  getPageState: () => undefined,
  lastVisitedPath: "/",
  saveSectionState: () => {},
  getSectionState: () => undefined,
  saveIframeState: () => {},
  getIframeState: () => null,
  clearExpiredStates: () => {},
  signalReady: () => {},
  isRestoring: false,
  previousPath: "/",
  sourceSection: "",
  setSourceSection: () => {},
});

export const useNavigationMemory = () => useContext(NavigationMemoryContext);

function serializeMap(map: Map<string, PageState>): Record<string, PageState> {
  const obj: Record<string, PageState> = {};
  map.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

function deserializeMap(obj: Record<string, PageState>): Map<string, PageState> {
  const map = new Map<string, PageState>();
  Object.entries(obj).forEach(([key, value]) => {
    map.set(key, value);
  });
  return map;
}

function loadFromStorage(): Map<string, PageState> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const obj = JSON.parse(raw) as Record<string, PageState>;
      const map = deserializeMap(obj);
      const cutoff = Date.now() - TTL_MS;
      for (const [key, state] of map) {
        if (state.timestamp < cutoff) {
          map.delete(key);
        }
      }
      return map;
    }
  } catch {
    /* ignore parse errors */
  }
  return new Map();
}

function saveToStorage(map: Map<string, PageState>) {
  try {
    const limited = new Map<string, PageState>();
    const sorted = [...map.entries()].sort((a, b) => b[1].timestamp - a[1].timestamp);
    for (const [key, value] of sorted.slice(0, MAX_STATES)) {
      limited.set(key, value);
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(serializeMap(limited)));
  } catch {
    /* ignore quota errors */
  }
}

export const NavigationMemoryProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const pageStates = useRef<Map<string, PageState>>(loadFromStorage());
  const prevPathRef = useRef(location.pathname + location.hash);
  const [lastVisitedPath, setLastVisitedPath] = useState("/");
  const [previousPath, setPreviousPath] = useState("/");
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isRestoring, setIsRestoring] = useState(false);
  const [sourceSection, setSourceSection] = useState("");
  const pendingScrollRef = useRef<number | null>(null);
  const readyFiredRef = useRef(false);

  const persist = useCallback(() => {
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => {
      saveToStorage(pageStates.current);
    }, 300);
  }, []);

  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
  }, []);

  const savePageState = useCallback(
    (path: string, state: Partial<PageState>) => {
      const existing = pageStates.current.get(path) || {
        scrollPosition: 0,
        hash: "",
        timestamp: 0,
        sectionState: {},
      };
      pageStates.current.set(path, {
        ...existing,
        ...state,
        sectionState: { ...(existing.sectionState || {}), ...(state.sectionState || {}) },
        timestamp: Date.now(),
      });
      persist();
    },
    [persist],
  );

  const getPageState = useCallback((path: string) => {
    return pageStates.current.get(path);
  }, []);

  const saveSectionState = useCallback(
    (path: string, key: string, value: any) => {
      const existing = pageStates.current.get(path) || {
        scrollPosition: 0,
        hash: "",
        timestamp: 0,
        sectionState: {},
      };
      pageStates.current.set(path, {
        ...existing,
        sectionState: { ...(existing.sectionState || {}), [key]: value },
        timestamp: Date.now(),
      });
      persist();
    },
    [persist],
  );

  const getSectionState = useCallback((path: string, key: string) => {
    const state = pageStates.current.get(path);
    return state?.sectionState?.[key];
  }, []);

  const saveIframeState = useCallback(
    (path: string, state: IframeState) => {
      const existing = pageStates.current.get(path) || {
        scrollPosition: 0,
        hash: "",
        timestamp: 0,
      };
      pageStates.current.set(path, {
        ...existing,
        iframeState: state,
        timestamp: Date.now(),
      });
      persist();
    },
    [persist],
  );

  const getIframeState = useCallback((path: string): IframeState | null => {
    const state = pageStates.current.get(path);
    return state?.iframeState ?? null;
  }, []);

  const clearExpiredStates = useCallback(() => {
    const cutoff = Date.now() - TTL_MS;
    let changed = false;
    for (const [key, state] of pageStates.current) {
      if (state.timestamp < cutoff) {
        pageStates.current.delete(key);
        changed = true;
      }
    }
    if (changed) persist();
  }, [persist]);

  const signalReady = useCallback(() => {
    if (readyFiredRef.current) return;
    readyFiredRef.current = true;

    const target = pendingScrollRef.current;
    if (target !== null && target > 0) {
      const tryScroll = () => {
        if (pendingScrollRef.current === null) return;
        window.scrollTo(0, target);
        if (Math.abs(window.scrollY - target) < 5) {
          setIsRestoring(false);
          pendingScrollRef.current = null;
          return;
        }
        requestAnimationFrame(tryScroll);
      };

      requestAnimationFrame(tryScroll);

      setTimeout(() => {
        if (pendingScrollRef.current !== null) {
          setIsRestoring(false);
          pendingScrollRef.current = null;
        }
      }, 3000);
    } else {
      setIsRestoring(false);
    }
  }, []);

  useEffect(() => {
    const currentKey = location.pathname + location.hash;

    if (prevPathRef.current !== currentKey) {
      const oldPath = prevPathRef.current;
      const prevState = pageStates.current.get(oldPath);
      if (prevState) {
        savePageState(oldPath, {
          scrollPosition: window.scrollY,
          hash: window.location.hash,
        });
      }
      setLastVisitedPath(oldPath);
      setPreviousPath(oldPath);
      prevPathRef.current = currentKey;
    }

    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "instant", block: "start" });
      }
    }
  }, [location.pathname, location.hash, savePageState]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          savePageState(window.location.pathname + window.location.hash, {
            scrollPosition: window.scrollY,
            hash: window.location.hash,
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [savePageState]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      savePageState(window.location.pathname + window.location.hash, {
        scrollPosition: window.scrollY,
        hash: window.location.hash,
      });
      saveToStorage(pageStates.current);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [savePageState]);

  useEffect(() => {
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, []);

  return (
    <NavigationMemoryContext.Provider
      value={{
        pageStates: pageStates.current,
        savePageState,
        getPageState,
        lastVisitedPath,
        saveSectionState,
        getSectionState,
        saveIframeState,
        getIframeState,
        clearExpiredStates,
        signalReady,
        isRestoring,
        previousPath,
        sourceSection,
        setSourceSection,
      }}
    >
      {children}
    </NavigationMemoryContext.Provider>
  );
};
