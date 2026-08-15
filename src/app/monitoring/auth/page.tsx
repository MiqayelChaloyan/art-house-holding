'use client';

import { FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff, FiLock, FiUser } from 'react-icons/fi';

import { MonitoringIcon } from '../components/MonitoringIcon';
import { MonitoringToast, type MonitoringToastVariant } from '../components/MonitoringToast';

import styles from '../styles.module.sass';

export default function MonitoringAuthPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; message: string; variant: MonitoringToastVariant }>({
    open: false,
    message: '',
    variant: 'error',
  });

  const showToast = useCallback((message: string, variant: MonitoringToastVariant) => {
    setToast({ open: true, message, variant });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!username.trim()) {
      showToast('Please enter your username.', 'error');
      return;
    }

    if (!password) {
      showToast('Please enter your password.', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/monitoring/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-monitoring-csrf': 'monitoring-login',
        },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error ?? 'Login failed', 'error');
        return;
      }

      showToast('Signed in successfully. Redirecting…', 'success');
      window.setTimeout(() => {
        router.push('/monitoring');
        router.refresh();
      }, 700);
    } catch {
      showToast('Unable to connect. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <MonitoringToast
        open={toast.open}
        message={toast.message}
        variant={toast.variant}
        onClose={closeToast}
        duration={toast.variant === 'success' ? 2000 : 5000}
      />

      <div className={styles.loginPage}>
        <div className={styles.loginGlow} aria-hidden />
        <div className={styles.loginShell}>
          <aside className={styles.loginAside}>
            <MonitoringIcon size={56} />
            <div className={styles.loginAsideContent}>
              <h2>ART HOUSE Analytics</h2>
              <p>
                Secure internal dashboard for traffic, conversions, and user behavior across
                arthouse.am.
              </p>
            </div>
            <ul className={styles.loginFeatures}>
              <li>Real-time visitor insights</li>
              <li>Form & CTA tracking</li>
              <li>Device & activity breakdown</li>
            </ul>
          </aside>

          <div className={styles.loginCard}>
            <div className={styles.loginBrand}>
              <MonitoringIcon size={44} />
              <div>
                <h1>Welcome back</h1>
                <p>Sign in to monitoring</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.loginForm} noValidate>
              <label className={styles.fieldLabel}>
                <span>Username</span>
                <div className={styles.inputWrap}>
                  <FiUser className={styles.inputIcon} aria-hidden />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    placeholder="Your username"
                    className={styles.input}
                  />
                </div>
              </label>

              <label className={styles.fieldLabel}>
                <span>Password</span>
                <div className={styles.inputWrap}>
                  <FiLock className={styles.inputIcon} aria-hidden />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="Your password"
                    className={styles.input}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </label>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? (
                  <>
                    <span className={styles.spinner} aria-hidden />
                    Signing in…
                  </>
                ) : (
                  'Sign in to dashboard'
                )}
              </button>
            </form>

            <p className={styles.loginFooter}>Credentials are managed in Sanity Studio only.</p>
          </div>
        </div>
      </div>
    </>
  );
}
