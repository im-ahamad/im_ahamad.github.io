import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";

interface LoaderContextType {
  show: (duration?: number) => void;
  hide: () => void;
  visible: boolean;
}

const LoaderContext = createContext<LoaderContextType>({
  show: () => {},
  hide: () => {},
  visible: false,
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback((duration = 800) => {
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, duration);
  }, []);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  return (
    <LoaderContext.Provider value={{ show, hide, visible }}>
      {children}
    </LoaderContext.Provider>
  );
};
