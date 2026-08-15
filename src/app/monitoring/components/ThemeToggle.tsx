'use client';

import { FiMoon, FiSun } from 'react-icons/fi';

import { useMonitoringTheme } from './MonitoringThemeProvider';

import styles from '../styles.module.sass';

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useMonitoringTheme();

  return (
    <button
      type="button"
      className={[styles.themeToggle, compact ? styles.themeToggleCompact : '']
        .filter(Boolean)
        .join(' ')}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
      {!compact ? <span>{theme === 'dark' ? 'Light' : 'Dark'}</span> : null}
    </button>
  );
}
