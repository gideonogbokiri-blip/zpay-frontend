import { store } from '../state/store.js';
import { openReceiptModal } from '../components/receiptModal.js';
import { showToast } from '../components/notifications.js';

export function renderDashboardView() {
  const isHidden = store.user.isBalanceHidden;
  const balanceDisplay = isHidden ? '₦ ••••••' : store.formatMoney(store.balance);
  const recentTxs = store.transactions.slice(0, 5);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return `
    <div class="app-wrapper" style="padding-bottom: 80px;">

      <!-- Top Header -->
      <header class="app-top-header">
        <div class="user-profile-header">
          <a href="#/app/profile" class="user-avatar">
            ${store.user.name.charAt(0)}
            <div class="online-indicator"></div>
          </a>
          <div class="user-greeting">
            <span>${greeting}</span>
            <h4>${store.user.name}</h4>
          </div>
        </div>
        <div class="header-action-icons">
          <button class="header-icon-btn" id="header-notif-btn" title="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <div class="notification-badge"></div>
          </button>
        </div>
      </header>

      <!-- Balance Card -->
      <div class="balance-card">
        <div class="balance-header">
          <div class="balance-label">
            <span>Wallet Balance</span>
            <span class="balance-toggle-eye" id="toggle-balance-btn">
              ${isHidden
                ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
                : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
              }
            </span>
          </div>
          <span class="balance-tag-pill" id="copy-tag-pill" style="cursor:pointer;" title="Copy tag">${store.user.tag}</span>
        </div>
        <div class="balance-amount" id="dashboard-balance-amount">${balanceDisplay}</div>

        <!-- Primary Actions: Send & Receive -->
        <div class="balance-actions-row">
          <a href="#/app/send" class="zpay-btn zpay-btn-primary balance-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            Send
          </a>
          <a href="#/app/receive" class="zpay-btn balance-btn" style="background:rgba(255,255,255,0.12); color:#fff; border:1px solid rgba(255,255,255,0.2);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Receive
          </a>
          <a href="#/app/add-money" class="zpay-btn balance-btn" style="background:rgba(255,255,255,0.08); color:#fff; border:1px solid rgba(255,255,255,0.15);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Fund
          </a>
        </div>
      </div>

      <!-- Quick Actions Grid (OPay style) -->
      <div class="app-section">
        <div style="display:grid; grid-template-columns: repeat(4,1fr); gap:10px;">
          <a href="#/app/send" class="service-card">
            <div class="service-icon-box" style="background:rgba(234,0,41,0.12); color:var(--zpay-green);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
            <span class="service-name">Send</span>
          </a>
          <a href="#/app/receive" class="service-card">
            <div class="service-icon-box" style="background:rgba(56,189,248,0.12); color:var(--color-blue);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </div>
            <span class="service-name">Receive</span>
          </a>
          <a href="#/app/airtime" class="service-card">
            <div class="service-icon-box airtime"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div>
            <span class="service-name">Airtime</span>
          </a>
          <a href="#/app/data" class="service-card">
            <div class="service-icon-box data"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg></div>
            <span class="service-name">Data</span>
          </a>
          <a href="#/app/electricity" class="service-card">
            <div class="service-icon-box bills"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none"/></svg></div>
            <span class="service-name">Electricity</span>
          </a>
          <a href="#/app/qr-pay" class="service-card">
            <div class="service-icon-box" style="background:rgba(245,158,11,0.12); color:var(--color-warning);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
            <span class="service-name">QR Pay</span>
          </a>
          <a href="#/app/paysmallsmall" class="service-card">
            <div class="service-icon-box" style="background:rgba(56,189,248,0.15); color:var(--color-blue);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg></div>
            <span class="service-name">Small Small</span>
          </a>
          <a href="#/app/services" class="service-card">
            <div class="service-icon-box more"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></svg></div>
            <span class="service-name">More</span>
          </a>
        </div>
      </div>

      <!-- Cooperative Hub Banner -->
      <div class="app-section">
        <div style="
          background: linear-gradient(135deg, #1b0007 0%, #0d0004 60%, #1a0007 100%);
          border: 1px solid rgba(234,0,41,0.35);
          border-radius: var(--radius-lg);
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          box-shadow: 0 8px 24px rgba(234,0,41,0.15);
        ">
          <div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:10px; text-transform:uppercase; letter-spacing:1px; background:rgba(234,0,41,0.2); color:var(--zpay-green); padding:2px 8px; border-radius:4px; font-weight:700;">Cooperative Hub</span>
              <span style="font-size:11px; color:rgba(255,255,255,0.6);">Equity: ${store.formatMoney(store.cooperativeBalance)}</span>
            </div>
            <div style="font-size:15px; font-weight:800; color:#fff; margin-top:5px;">${store.getActiveCooperative().shortName}</div>
            <div style="font-size:11.5px; color:rgba(255,255,255,0.55); margin-top:2px;">Fund wallet &bull; Up to 3x loans &bull; Dec pack money</div>
          </div>
          <a href="#/app/cooperative" style="background:var(--zpay-green); color:#fff; border-radius:var(--radius-sm); padding:9px 14px; font-size:12px; font-weight:700; white-space:nowrap; text-decoration:none; flex-shrink:0;">
            Enter &rarr;
          </a>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="app-section" style="flex:1;">
        <div class="section-title-row">
          <h4 class="section-heading">Recent Transactions</h4>
          <a href="#/app/transactions" class="section-link">See All →</a>
        </div>

        <div class="transactions-list" id="dashboard-tx-list">
          ${recentTxs.length === 0
            ? `<div style="text-align:center; padding:40px 20px; color:var(--text-muted);">
                <div style="margin-bottom:10px; color:var(--text-muted);"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg></div>
                <div style="font-size:14px; font-weight:600;">No transactions yet</div>
                <div style="font-size:12px; margin-top:4px;">Start by funding your wallet</div>
               </div>`
            : recentTxs.map(tx => {
                const isIn = tx.type === 'in';
                return `
                  <div class="transaction-tile" data-tx-id="${tx.id}">
                    <div class="tx-left">
                      <div class="tx-icon-box ${isIn ? 'tx-icon-in' : 'tx-icon-out'}">
                        ${isIn
                          ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`
                          : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`
                        }
                      </div>
                      <div class="tx-info">
                        <h5>${tx.title}</h5>
                        <span>${tx.date}</span>
                      </div>
                    </div>
                    <div class="tx-right">
                      <div class="tx-amount ${isIn ? 'positive' : 'negative'}">
                        ${isIn ? '+' : '-'}${store.formatMoney(tx.amount)}
                      </div>
                      <span class="tx-status" style="color:${tx.status === 'Successful' ? 'var(--zpay-green)' : 'var(--text-muted)'};">${tx.status}</span>
                    </div>
                  </div>`;
              }).join('')
          }
        </div>
      </div>

      <!-- Bottom Nav -->
      <nav class="app-bottom-nav">
        <a href="#/app" class="nav-tab-item active">
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
        <a href="#/app/profile" class="nav-tab-item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Profile</span>
        </a>
      </nav>
    </div>
  `;
}

export function initDashboardListeners() {
  document.getElementById('toggle-balance-btn')?.addEventListener('click', () => {
    store.toggleBalanceVisibility();
    const isHidden = store.user.isBalanceHidden;
    const balEl = document.getElementById('dashboard-balance-amount');
    const eyeBtn = document.getElementById('toggle-balance-btn');
    if (balEl) {
      balEl.textContent = isHidden ? '₦ ••••••' : store.formatMoney(store.balance);
    }
    if (eyeBtn) {
      eyeBtn.innerHTML = isHidden
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    }
  });

  document.getElementById('copy-tag-pill')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(store.user.tag);
    showToast(`Copied ${store.user.tag}!`);
  });

  document.querySelectorAll('.transaction-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const tx = store.transactions.find(t => t.id === tile.dataset.txId);
      if (tx) openReceiptModal(tx);
    });
  });

  document.getElementById('header-notif-btn')?.addEventListener('click', () => {
    const notifs = store.notifications.map(n => `• ${n.title}: ${n.message}`).join('\n\n');
    alert(`Notifications:\n\n${notifs}`);
  });
}
