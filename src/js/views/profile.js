import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';

export function renderProfileView() {
  return `
    <div class="app-wrapper" style="max-width: 480px; margin: 0 auto; min-height: 100vh;">
      <header class="screen-header">
        <a href="#/app" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </a>
        <h3 class="screen-title">Profile & Settings</h3>
        <div style="width: 36px;"></div>
      </header>

      <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 20px;">
        <!-- User Identity Header Card -->
        <div class="zpay-card" style="display: flex; align-items: center; gap: 16px; padding: 20px;">
          <div class="user-avatar" style="width: 60px; height: 60px; font-size: 24px;">
            ${store.user.name.charAt(0)}
            <div class="online-indicator" style="width: 14px; height: 14px;"></div>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3 style="font-size: 18px; font-weight: 800; color: var(--text-primary);">${store.user.name}</h3>
              <span class="zpay-badge zpay-badge-success" style="font-size: 10px;">${store.user.tier}</span>
            </div>
            <p style="font-size: 13px; color: var(--zpay-green); font-family: var(--font-mono);">${store.user.tag}</p>
            <p style="font-size: 12px; color: var(--text-muted);">${store.user.email} &bull; ${store.user.phone}</p>
          </div>
        </div>

        <!-- Account Section -->
        <div>
          <p style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase;">Account</p>
          <div class="zpay-card" style="padding: 0; overflow: hidden;">
            <div class="profile-row" id="row-personal-info" style="padding: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="color: var(--zpay-green); display:flex; align-items:center;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <span style="font-size: 14px; font-weight: 600;">Personal Information</span>
              </div>
              <span style="color: var(--text-muted); font-size: 18px;">&rsaquo;</span>
            </div>

            <div class="profile-row" id="row-change-pin" style="padding: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="color: var(--color-blue); display:flex; align-items:center;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <span style="font-size: 14px; font-weight: 600;">Change Transaction PIN</span>
              </div>
              <span style="color: var(--text-muted); font-size: 18px;">&rsaquo;</span>
            </div>

            <div class="profile-row" style="padding: 16px; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="color: #a855f7; display:flex; align-items:center;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 0-6.88 17.23M12 22a10 10 0 0 0 6.88-17.23M2 12h4M18 12h4"/></svg>
                </span>
                <span style="font-size: 14px; font-weight: 600;">Biometric Login & PIN Bypass</span>
              </div>
              <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                <input type="checkbox" id="toggle-biometrics" ${store.user.biometricsEnabled ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;">
                <span style="position: absolute; inset: 0; background: ${store.user.biometricsEnabled ? 'var(--zpay-green)' : 'var(--bg-card)'}; border-radius: 24px; transition: 0.2s;">
                  <span style="position: absolute; content: ''; height: 18px; width: 18px; left: ${store.user.biometricsEnabled ? '22px' : '3px'}; bottom: 3px; background: white; border-radius: 50%; transition: 0.2s;"></span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Preferences Section -->
        <div>
          <p style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase;">Preferences</p>
          <div class="zpay-card" style="padding: 0; overflow: hidden;">
            <div class="profile-row" id="row-theme-toggle" style="padding: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="color: #f59e0b; display:flex; align-items:center;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                </span>
                <div>
                  <span style="font-size: 14px; font-weight: 600;">Appearance Mode</span>
                  <p style="font-size: 11px; color: var(--text-muted);">Current: ${store.user.theme === 'dark' ? 'Obsidian Charcoal (Dark)' : 'Clean Minimal (Light)'}</p>
                </div>
              </div>
              <button class="zpay-btn zpay-btn-secondary zpay-btn-sm" id="btn-toggle-theme">
                Toggle
              </button>
            </div>

            <div class="profile-row" id="row-device-sessions" style="padding: 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="color: #0284c7; display:flex; align-items:center;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                </span>
                <div>
                  <span style="font-size: 14px; font-weight: 600;">Device Security & Sessions</span>
                  <p style="font-size: 11px; color: var(--zpay-green);">1 Active Session (Current Device)</p>
                </div>
              </div>
              <span style="color: var(--text-muted); font-size: 18px;">&rsaquo;</span>
            </div>
          </div>
        </div>

        <!-- Support Section -->
        <div>
          <p style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase;">Support & Legal</p>
          <div class="zpay-card" style="padding: 0; overflow: hidden;">
            <a href="#/support" class="profile-row" style="padding: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); text-decoration:none; color:inherit;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="color: var(--text-secondary); display:flex; align-items:center;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </span>
                <span style="font-size: 14px; font-weight: 600;">Help Center & FAQs</span>
              </div>
              <span style="color: var(--text-muted); font-size: 18px;">&rsaquo;</span>
            </a>
            <a href="#/security" class="profile-row" style="padding: 16px; display: flex; justify-content: space-between; align-items: center; text-decoration:none; color:inherit;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="color: var(--zpay-green); display:flex; align-items:center;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </span>
                <span style="font-size: 14px; font-weight: 600;">Security Standards</span>
              </div>
              <span style="color: var(--text-muted); font-size: 18px;">&rsaquo;</span>
            </a>
          </div>
        </div>

        <!-- Logout Action -->
        <div style="margin-top: 10px; margin-bottom: 40px;">
          <button class="zpay-btn zpay-btn-secondary zpay-btn-block" id="btn-logout-app" style="color: var(--color-danger); border-color: rgba(239, 68, 68, 0.3);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Log Out
          </button>
        </div>
      </div>

      <!-- Bottom Nav -->
      <nav class="app-bottom-nav">
        <a href="#/app" class="nav-tab-item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Home</span>
        </a>
        <a href="#/app/services" class="nav-tab-item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
          <span>Services</span>
        </a>
        <a href="#/app/transactions" class="nav-tab-item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          <span>Activity</span>
        </a>
        <a href="#/app/profile" class="nav-tab-item active">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Profile</span>
        </a>
      </nav>
    </div>
  `;
}

export function initProfileListeners() {
  const btnTheme = document.getElementById('btn-toggle-theme');
  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      const newTheme = store.toggleTheme();
      showToast(`Switched to ${newTheme.toUpperCase()} theme mode.`);
      window.location.reload();
    });
  }

  const toggleBio = document.getElementById('toggle-biometrics');
  if (toggleBio) {
    toggleBio.addEventListener('change', (e) => {
      store.user.biometricsEnabled = e.target.checked;
      store.notify();
      showToast(e.target.checked ? "Biometric authentication activated." : "Biometrics disabled.");
    });
  }

  const rowPin = document.getElementById('row-change-pin');
  if (rowPin) {
    rowPin.addEventListener('click', () => {
      const current = prompt("Enter current PIN (Default: 1234):");
      if (store.verifyPin(current)) {
        const next = prompt("Enter new 4-digit PIN:");
        if (next && next.length === 4 && !isNaN(next)) {
          store.updatePin(next);
          showToast("PIN updated successfully!");
        } else {
          showToast("Invalid PIN. Must be 4 numeric digits.", "error");
        }
      } else {
        showToast("Incorrect current PIN.", "error");
      }
    });
  }

  const rowDevice = document.getElementById('row-device-sessions');
  if (rowDevice) {
    rowDevice.addEventListener('click', () => {
      alert("Active Sessions:\n\n• Current Device (Chrome / Windows Web Client) - Active Now\n• ZPay Flutter Android Client (Pixel 7) - Logged in 2 days ago\n\nAll connections encrypted with TLS 1.3.");
    });
  }

  const btnLogout = document.getElementById('btn-logout-app');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm("Are you sure you want to log out of ZPay?")) {
        showToast("Logged out safely. See you soon!");
        window.location.hash = '#/';
      }
    });
  }
}
