import { Platform } from 'react-native';

declare global {
  interface Window {
    beforeinstallprompt?: Event & { prompt?: () => Promise<void> };
  }
}

function injectManifest(): void {
  if (typeof document === 'undefined') {
    return;
  }
  if (document.querySelector('link[rel="manifest"]')) {
    return;
  }
  const link = document.createElement('link');
  link.rel = 'manifest';
  link.href = '/manifest.json';
  document.head.appendChild(link);
}

function registerServiceWorker(): void {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* service worker is optional */
    });
  });
}

export function setupPwa(): void {
  if (Platform.OS !== 'web') {
    return;
  }
  injectManifest();
  registerServiceWorker();
}
