'use client';

import { useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';

import styles from '../styles.module.sass';

export type MonitoringToastVariant = 'success' | 'error';

interface MonitoringToastProps {
  open: boolean;
  message: string;
  variant: MonitoringToastVariant;
  onClose: () => void;
  duration?: number;
}

export function MonitoringToast({
  open,
  message,
  variant,
  onClose,
  duration = 5000,
}: MonitoringToastProps) {
  useEffect(() => {
    if (!open || duration <= 0) return undefined;

    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className={styles.toastViewport} role="region" aria-live="polite">
      <div className={`${styles.toast} ${styles[`toast${variant === 'success' ? 'Success' : 'Error'}`]}`}>
        <span className={styles.toastIcon} aria-hidden>
          {variant === 'success' ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
        </span>
        <p className={styles.toastMessage}>{message}</p>
        <button type="button" className={styles.toastClose} onClick={onClose} aria-label="Dismiss">
          <FiX size={16} />
        </button>
      </div>
    </div>
  );
}
