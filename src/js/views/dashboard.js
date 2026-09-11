import { store } from '../state/store.js';
import { openReceiptModal } from '../components/receiptModal.js';
import { showToast } from '../components/notifications.js';

export function renderDashboardView() {
  const isHidden = store.user.isBalanceHidden;
  const balanceDisplay = isHidden ? '₦••••••' : store.formatMoney(store.balance);
  const recentTxs = store.transactions.slice(0, 5);

  return `
    <div class="app-wrapper">
      <!-- App Top Header -->
      <header class="app-top-header">
        <div class="user-profile-header">
          <a href="#/app/profile" class="user-avatar">
            ${store.user.name.charAt(0)}
            <div class="online-indicator"></div>
          </a>
          <div class="user-greeting">
            <span>Good morning 👋</span>
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

      <!-- Main Balance Card -->
      <div class="balance-card">
        <div class="balance-header">
          <div class="balance-label">
            <span>Available Balance</span>
            <span class="balance-toggle-eye" id="toggle-balance-btn" title="Toggle Balance">
              ${isHidden ? `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ` : `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              `}
            </span>
          </div>
          <span class="balance-tag-pill" id="copy-tag-pill" style="cursor: pointer;" title="Copy tag">
            ${store.user.tag}
          </span>
        </div>

        <div class="balance-amount" id="dashboard-balance-amount">
          ${balanceDisplay}
        </div>

        <div class="balance-actions-row">
          <a href="#/app/add-money" class="zpay-btn zpay-btn-primary balance-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Fund Wallet
          </a>
          <a href="#/app/qr-pay" class="zpay-btn zpay-btn-secondary balance-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            QR Pay
          </a>
        </div>
      </div>

      <!-- Primary Action Cards (Fund Wallet, QR Pay) -->
      <div class="primary-actions-grid" style="grid-template-columns: repeat(2, 1fr);">
        <a href="#/app/add-money" class="action-pill-card">
          <div class="action-pill-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="M16 19h6m-3-3v6"/></svg>
          </div>
          <span class="action-pill-label">Fund Wallet</span>
        </a>

        <a href="#/app/qr-pay" class="action-pill-card">
          <div class="action-pill-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </div>
          <span class="action-pill-label">QR Pay</span>
        </a>
      </div>

      <!-- Quick Services -->
      <div class="app-section">
        <div class="section-title-row">
          <h4 class="section-heading">Quick Services</h4>
          <a href="#/app/bills" class="section-link">View All &rarr;</a>
        </div>

        <div class="services-grid">
          <a href="#/app/airtime" class="service-card">
            <div class="service-icon-box airtime">📱</div>
            <span class="service-name">Airtime</span>
          </a>
          <a href="#/app/data" class="service-card">
            <div class="service-icon-box data">📶</div>
            <span class="service-name">Data</span>
          </a>
          <a href="#/app/bills" class="service-card">
            <div class="service-icon-box bills">⚡</div>
            <span class="service-name">Bills</span>
          </a>
          <a href="#/app/bills" class="service-card">
            <div class="service-icon-box more">⋯</div>
            <span class="service-name">More</span>
          </a>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="app-section" style="flex: 1;">
        <div class="section-title-row">
          <h4 class="section-heading">Recent Transactions</h4>
          <a href="#/app/transactions" class="section-link">See All &rarr;</a>
        </div>

        <div class="transactions-list" id="dashboard-tx-list">
          ${recentTxs.map(tx => {
            const isPositive = tx.type === 'in';
            const iconSvg = isPositive 
              ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
              : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;
            
            return `
              <div class="transaction-tile" data-tx-id="${tx.id}">
                <div class="tx-left">
                  <div class="tx-icon-box ${isPositive ? 'tx-icon-in' : 'tx-icon-out'}">
                    ${iconSvg}
                  </div>
                  <div class="tx-info">
                    <h5>${tx.title}</h5>
                    <span>${tx.date}</span>
                  </div>
                </div>
                <div class="tx-right">
                  <div class="tx-amount ${isPositive ? 'positive' : 'negative'}">
                    ${isPositive ? '+' : '-'}${store.formatMoney(tx.amount)}
                  </div>
                  <span class="tx-status" style="color: ${isPositive ? 'var(--zpay-green)' : 'var(--text-muted)'};">
                    ${tx.status}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Bottom Nav (Section 11: Home | Payments | Activity | Profile) -->
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
  const eyeBtn = document.getElementById('toggle-balance-btn');
  if (eyeBtn) {
    eyeBtn.addEventListener('click', () => {
      store.toggleBalanceVisibility();
      window.location.reload();
    });
  }

  const copyTag = document.getElementById('copy-tag-pill');
  if (copyTag) {
    copyTag.addEventListener('click', () => {
      navigator.clipboard?.writeText(store.user.tag);
      showToast(`Copied ${store.user.tag} to clipboard! 📋`);
    });
  }

  // Click transaction to view receipt
  const tiles = document.querySelectorAll('.transaction-tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const txId = tile.dataset.txId;
      const tx = store.transactions.find(t => t.id === txId);
      if (tx) openReceiptModal(tx);
    });
  });

  const notifBtn = document.getElementById('header-notif-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      const notifs = store.notifications.map(n => `• ${n.title}: ${n.message}`).join('\n\n');
      alert(`🔔 ZPay Notifications:\n\n${notifs}`);
    });
  }
}
