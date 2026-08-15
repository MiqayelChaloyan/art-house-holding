import type { DeviceType } from './types';

export function parseDevice(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
    return 'mobile';
  }
  if (ua) {
    return 'desktop';
  }
  return 'unknown';
}

export function parseBrowser(userAgent: string): string {
  const ua = userAgent;
  if (/edg\//i.test(ua)) return 'Edge';
  if (/chrome/i.test(ua) && !/chromium/i.test(ua)) return 'Chrome';
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari';
  if (/firefox/i.test(ua)) return 'Firefox';
  if (/opera|opr\//i.test(ua)) return 'Opera';
  return 'Other';
}

export function getClientContext() {
  if (typeof window === 'undefined') {
    return {
      userAgent: '',
      device: 'unknown' as DeviceType,
      browser: 'unknown',
      referrer: '',
    };
  }

  const userAgent = navigator.userAgent;
  return {
    userAgent,
    device: parseDevice(userAgent),
    browser: parseBrowser(userAgent),
    referrer: document.referrer || '',
  };
}
