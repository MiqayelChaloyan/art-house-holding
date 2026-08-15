'use client';

import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';

import styles from '../styles.module.sass';

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/monitoring/auth/logout', { method: 'POST' });
    router.push('/monitoring/auth');
    router.refresh();
  }

  return (
    <button
      type="button"
      className={[styles.logoutBtn, compact ? styles.logoutBtnCompact : '']
        .filter(Boolean)
        .join(' ')}
      onClick={handleLogout}
      aria-label="Log out"
      title="Log out"
    >
      <FiLogOut size={18} aria-hidden="true" />
      {!compact ? <span>Log out</span> : null}
    </button>
  );
}
