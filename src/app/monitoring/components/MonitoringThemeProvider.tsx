'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import styles from '../styles.module.sass';

export type MonitoringTheme = 'dark' | 'light';

const STORAGE_KEY = 'arthouse_monitoring_theme';

type ThemeContextValue = {
  theme: MonitoringTheme;
  setTheme: (theme: MonitoringTheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function MonitoringThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<MonitoringTheme>('dark');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      setThemeState(saved);
    }
    setReady(true);
  }, []);

  const setTheme = useCallback((next: MonitoringTheme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [setTheme, theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={styles.monitoringPage}
        data-theme={theme}
        data-theme-ready={ready ? 'true' : 'false'}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useMonitoringTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useMonitoringTheme must be used within MonitoringThemeProvider');
  }
  return context;
}
