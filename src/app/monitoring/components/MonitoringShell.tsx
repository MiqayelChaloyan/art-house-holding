'use client';

import { useEffect, useState, type ReactNode } from 'react';
import {
  FiActivity,
  FiBarChart2,
  FiFileText,
  FiGrid,
  FiMenu,
  FiMousePointer,
  FiUsers,
  FiX,
} from 'react-icons/fi';

import { LogoutButton } from './LogoutButton';
import { MonitoringIcon } from './MonitoringIcon';
import { ThemeToggle } from './ThemeToggle';

import styles from '../styles.module.sass';

export type MonitoringSection =
  | 'overview'
  | 'visitors'
  | 'pages'
  | 'buttons'
  | 'forms'
  | 'events';

const NAV_ITEMS: {
  id: MonitoringSection;
  label: string;
  subtitle: string;
  icon: ReactNode;
}[] = [
  { id: 'overview', label: 'Overview', subtitle: 'Key metrics, charts, and activity', icon: <FiGrid size={18} /> },
  { id: 'visitors', label: 'Visitors', subtitle: 'Sessions, routes, and timelines', icon: <FiUsers size={18} /> },
  { id: 'pages', label: 'Pages', subtitle: 'Most viewed paths and trends', icon: <FiBarChart2 size={18} /> },
  { id: 'buttons', label: 'Buttons', subtitle: 'Tracked CTA and navigation clicks', icon: <FiMousePointer size={18} /> },
  { id: 'forms', label: 'Form Submissions', subtitle: 'Contact and registration events', icon: <FiFileText size={18} /> },
  { id: 'events', label: 'Events Log', subtitle: 'Full stream of tracked activity', icon: <FiActivity size={18} /> },
];

const SIDEBAR_COLLAPSED_KEY = 'art_house_monitoring_sidebar_collapsed';
const SIDEBAR_MOBILE_QUERY = '(max-width: 900px)';

function readCollapsedPreference(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1';
  } catch {
    return false;
  }
}

type Props = {
  activeSection: MonitoringSection;
  onSectionChange: (section: MonitoringSection) => void;
  days: number;
  onDaysChange: (days: number) => void;
  rangeOptions: number[];
  children: ReactNode;
};

export function MonitoringShell({
  activeSection,
  onSectionChange,
  days,
  onDaysChange,
  rangeOptions,
  children,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const effectiveCollapsed = collapsed && !isMobile;
  const activeItem = NAV_ITEMS.find((item) => item.id === activeSection) ?? NAV_ITEMS[0];

  useEffect(() => {
    setCollapsed(readCollapsedPreference());
  }, []);

  useEffect(() => {
    const media = window.matchMedia(SIDEBAR_MOBILE_QUERY);
    const syncMobile = () => {
      setIsMobile(media.matches);
      if (!media.matches) {
        setMobileOpen(false);
      }
    };
    syncMobile();
    media.addEventListener('change', syncMobile);
    return () => media.removeEventListener('change', syncMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? '1' : '0');
    } catch {
      // ignore
    }
  }, [collapsed, isMobile]);

  useEffect(() => {
    if (!isMobile || !mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobile, mobileOpen]);

  function toggleSidebar() {
    if (isMobile) {
      setMobileOpen((current) => !current);
      return;
    }
    setCollapsed((current) => !current);
  }

  function handleSectionChange(section: MonitoringSection) {
    onSectionChange(section);
    if (isMobile) {
      setMobileOpen(false);
    }
  }

  return (
    <div
      className={[styles.shell, effectiveCollapsed ? styles.shellCollapsed : '']
        .filter(Boolean)
        .join(' ')}
    >
      {isMobile ? (
        <header className={styles.mobileTopbar}>
          <button
            type="button"
            className={styles.mobileTopbarMenu}
            onClick={toggleSidebar}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX size={20} aria-hidden="true" /> : <FiMenu size={20} aria-hidden="true" />}
          </button>
          <div className={styles.mobileTopbarBrand}>
            <MonitoringIcon size={24} />
            <span className={styles.mobileTopbarTitle}>{activeItem.label}</span>
          </div>
          <ThemeToggle compact />
        </header>
      ) : null}

      {isMobile && mobileOpen ? (
        <button
          type="button"
          className={styles.sidebarBackdrop}
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        />
      ) : null}

      <aside
        className={[
          styles.sidebar,
          effectiveCollapsed ? styles.sidebarCollapsed : '',
          isMobile ? styles.sidebarMobile : '',
          isMobile && mobileOpen ? styles.sidebarMobileOpen : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label="Main navigation"
        aria-hidden={isMobile && !mobileOpen}
      >
        <header className={styles.sidebarHeader}>
          {!isMobile ? (
            <button
              type="button"
              className={styles.sidebarMenuBtn}
              onClick={toggleSidebar}
              aria-label={effectiveCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!effectiveCollapsed}
            >
              <FiMenu size={18} aria-hidden="true" />
            </button>
          ) : null}
          <div className={styles.sidebarBrand} title="ART HOUSE Analytics">
            <MonitoringIcon size={effectiveCollapsed && !isMobile ? 30 : 36} />
            <div className={styles.sidebarBrandCopy}>
              <strong>ART HOUSE</strong>
              <span>Analytics</span>
            </div>
          </div>
          {isMobile ? (
            <button
              type="button"
              className={styles.sidebarCloseBtn}
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            >
              <FiX size={18} aria-hidden="true" />
            </button>
          ) : null}
        </header>

        <nav className={styles.sidebarNav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeSection === item.id ? styles.navItemActive : styles.navItem}
              onClick={() => handleSectionChange(item.id)}
              title={item.label}
            >
              <span className={styles.navItemIcon}>{item.icon}</span>
              <span className={styles.navItemLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          {!isMobile ? <ThemeToggle compact={effectiveCollapsed} /> : null}
          <LogoutButton compact={effectiveCollapsed && !isMobile} />
        </div>
      </aside>

      <div className={styles.shellMain}>
        <header className={styles.topBar}>
          <div className={styles.topBarAccent} aria-hidden="true" />

          <div className={styles.topBarInner}>
            <div className={styles.topBarMain}>
              <div className={styles.topBarHeading}>
                <div className={styles.topBarIcon}>{activeItem.icon}</div>
                <div className={styles.topBarTitles}>
                  <span className={styles.topBarEyebrow}>ART HOUSE · arthouse.am</span>
                  <h1>{activeItem.label}</h1>
                  <p>{activeItem.subtitle}</p>
                </div>
              </div>

              <div className={styles.rangePills} role="group" aria-label="Date range">
                {rangeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={days === option ? styles.rangePillActive : styles.rangePill}
                    onClick={() => onDaysChange(option)}
                    aria-pressed={days === option}
                  >
                    Last {option} days
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.topBarMeta}>
              <span className={styles.topBarBadge}>Internal analytics</span>
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
