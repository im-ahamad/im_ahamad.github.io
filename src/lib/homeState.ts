export interface HomeState {
  section: string;
  scrollY: number;
}

const KEY = "home-state";

export function saveHomeState(section: string, scrollY?: number): void {
  try {
    const state: HomeState = {
      section,
      scrollY: scrollY ?? window.scrollY,
    };
    sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* quota errors */
  }
}

export function getHomeState(): HomeState | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY);
    return JSON.parse(raw) as HomeState;
  } catch {
    return null;
  }
}

export function clearHomeState(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
