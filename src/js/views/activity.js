import { store } from '../state/store.js';
import { openReceiptModal } from '../components/receiptModal.js';

export function renderActivityView() {
  return `
    <div class="app-wrapper" style="max-width: 480px; margin: 0 auto; min-height: 100vh;">
      <header class="screen-header">
        <a href="#/app" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </a>
        <h3 class="screen-title">Transactions</h3>
        <div style="width: 36px;"></div>
      </header>

      <div style="padding: 16px 20px; flex: 1; display: flex; flex-direction: column;">
        <!-- Search Bar -->
        <div class="zpay-input-wrapper" style="margin-bottom: 16px;">
          <input type="text" class="zpay-input" id="tx-search-input" placeholder="Search by recipient, title, or reference..." />
          <span class="zpay-input-icon">🔍</span>
        </div>

        <!-- Filters: All | Money In | Money Out | Pending -->
        <div class="zpay-tabs" style="margin-bottom: 20px;" id="activity-filter-tabs">
          <button class="zpay-tab-btn active" data-filter="all">All</button>
          <button class="zpay-tab-btn" data-filter="in">Money In (+)</button>
          <button class="zpay-tab-btn" data-filter="out">Money Out (-)</button>
          <button class="zpay-tab-btn" data-filter="pending">Pending</button>
        </div>

        <!-- Transactions Dynamic List -->
        <div class="transactions-list" id="activity-transactions-container" style="flex: 1;">
          <!-- Rendered dynamically -->
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
        <a href="#/app/transactions" class="nav-tab-item active">
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

export function initActivityListeners() {
  let currentFilter = 'all';
  let searchQuery = '';

  const container = document.getElementById('activity-transactions-container');
  const tabs = document.querySelectorAll('#activity-filter-tabs .zpay-tab-btn');
  const searchInput = document.getElementById('tx-search-input');

  function renderList() {
    let list = [...store.transactions];

    if (currentFilter === 'in') list = list.filter(t => t.type === 'in');
    if (currentFilter === 'out') list = list.filter(t => t.type === 'out');
    if (currentFilter === 'pending') list = list.filter(t => t.status === 'Pending');

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(t => 
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.recipient && t.recipient.toLowerCase().includes(q)) ||
        (t.reference && t.reference.toLowerCase().includes(q))
      );
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 40px; margin-bottom: 12px;">📂</div>
          <p style="font-size: 15px; font-weight: 600;">No transactions found</p>
          <p style="font-size: 13px;">Transactions matching your filters will appear here.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(tx => {
      const isPositive = tx.type === 'in';
      const iconSvg = isPositive 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;

      return `
        <div class="transaction-tile activity-tile" data-tx-id="${tx.id}">
          <div class="tx-left">
            <div class="tx-icon-box ${isPositive ? 'tx-icon-in' : 'tx-icon-out'}">
              ${iconSvg}
            </div>
            <div class="tx-info">
              <h5>${tx.title}</h5>
              <span>${tx.date} &bull; ${tx.account || tx.category}</span>
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
    }).join('');

    container.querySelectorAll('.activity-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const tx = store.transactions.find(t => t.id === tile.dataset.txId);
        if (tx) openReceiptModal(tx);
      });
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderList();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderList();
    });
  }

  renderList();
}
