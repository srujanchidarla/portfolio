"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type BootContextValue = {
  /** True once the splash loader has finished (or was skipped) */
  bootReady: boolean;
  markBootReady: () => void;
};

const BootContext = createContext<BootContextValue | null>(null);

export function BootProvider({ children }: { children: React.ReactNode }) {
  const [bootReady, setBootReady] = useState(false);

  const markBootReady = useCallback(() => {
    setBootReady(true);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBootReady(true);
    }
  }, []);

  const value = useMemo(
    () => ({ bootReady, markBootReady }),
    [bootReady, markBootReady]
  );

  return <BootContext.Provider value={value}>{children}</BootContext.Provider>;
}

export function useBoot() {
  const ctx = useContext(BootContext);
  if (!ctx) {
    return { bootReady: true, markBootReady: () => {} };
  }
  return ctx;
}
