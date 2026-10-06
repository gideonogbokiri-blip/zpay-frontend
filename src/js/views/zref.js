import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';

export function renderZrefView() {
  return `
    <div class="app-wrapper">
      <header class="screen-header">
        <a href="#/app/services" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="screen-title">Zref Revenue</span>
        <div style="width:36px;"></div>
      </header>

      <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px;">
        <!-- Revenue Summary -->
        <div class="balance-card" style="background: linear-gradient(135deg, #0d0003 0%, #1a0007 100%); border:1px solid rgba(234,0,41,0.3);">
          <div class="balance-label" style="display:flex; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>
            Community Revenue Paid (2026)
          </div>
          <div class="balance-amount" style="margin: 10px 0;">₦45,000.00</div>
          <div style="display:flex; gap:16px;">
            <div>
              <div style="font-size:11px; color:rgba(255,255,255,0.55);">Year Status</div>
              <div style="font-size:13px; font-weight:700; color:var(--zpay-green); margin-top:3px;">✓ Good Standing</div>
            </div>
            <div>
              <div style="font-size:11px; color:rgba(255,255,255,0.55);">Pending Dues</div>
              <div id="zref-pending-total" style="font-size:13px; font-weight:700; color:var(--color-warning); margin-top:3px;">₦7,500</div>
            </div>
          </div>
        </div>

        <!-- Pending Dues -->
        <div>
          <div class="section-title-row">
            <h4 class="section-heading">Pending Dues</h4>
            <span class="zpay-badge zpay-badge-warning" id="pending-dues-badge">2 Pending</span>
          </div>
          <div class="transactions-list" id="zref-pending-list">
            <div class="transaction-tile" id="due-item-1">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(234,0,41,0.1); color:var(--zpay-green);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>
                </div>
                <div class="tx-info">
                  <h5>Annual General Due</h5>
                  <span>Due: Dec 31, 2026</span>
                </div>
              </div>
              <div class="tx-right" style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                <div class="tx-amount" style="color:var(--text-primary);">₦5,000</div>
                <button class="zpay-btn zpay-btn-primary zpay-btn-sm btn-pay-due" data-id="due-item-1" data-title="Annual General Due" data-amt="5000" style="font-size:12px; padding:6px 14px;">Pay Now</button>
              </div>
            </div>

            <div class="transaction-tile" id="due-item-2">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(245,158,11,0.1); color:var(--color-warning);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
                <div class="tx-info">
                  <h5>Facility Maintenance Fee</h5>
                  <span>Due: Nov 15, 2026</span>
                </div>
              </div>
              <div class="tx-right" style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                <div class="tx-amount" style="color:var(--text-primary);">₦2,500</div>
                <button class="zpay-btn zpay-btn-primary zpay-btn-sm btn-pay-due" data-id="due-item-2" data-title="Facility Maintenance Fee" data-amt="2500" style="font-size:12px; padding:6px 14px;">Pay Now</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment History -->
        <div>
          <div class="section-title-row">
            <h4 class="section-heading">Payment History</h4>
            <a class="section-link">See All →</a>
          </div>
          <div class="transactions-list" id="zref-history-list">
            <div class="transaction-tile">
              <div class="tx-left">
                <div class="tx-icon-box tx-icon-in">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="tx-info">
                  <h5>Development Levy</h5>
                  <span>Jan 10, 2026</span>
                </div>
              </div>
              <div class="tx-right">
                <div class="tx-amount" style="color:var(--zpay-green);">₦10,000</div>
                <span class="zpay-badge zpay-badge-success" style="margin-top:4px;">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initZrefListeners() {
  document.querySelectorAll('.btn-pay-due').forEach(btn => {
    btn.addEventListener('click', () => {
      const amt = parseFloat(btn.dataset.amt);
      const title = btn.dataset.title;
      const id = btn.dataset.id;

      try {
        store.deductFunds(amt, {
          title: `Revenue: ${title}`,
          category: 'Revenue',
          recipient: 'Community Revenue Fund',
          account: 'Zref Treasury',
          fee: 0
        });

        showToast(`✓ Paid ₦${amt.toLocaleString()} for ${title}!`);

        const tile = document.getElementById(id);
        if (tile) {
          tile.remove();
        }

        const remaining = document.querySelectorAll('.btn-pay-due').length;
        const badge = document.getElementById('pending-dues-badge');
        if (badge) {
          badge.textContent = `${remaining} Pending`;
          if (remaining === 0) {
            badge.className = 'zpay-badge zpay-badge-success';
            badge.textContent = 'All Settled ✓';
            const pendingTotal = document.getElementById('zref-pending-total');
            if (pendingTotal) pendingTotal.textContent = '₦0';
          }
        }

        const histList = document.getElementById('zref-history-list');
        if (histList) {
          const item = document.createElement('div');
          item.className = 'transaction-tile';
          item.innerHTML = `
            <div class="tx-left">
              <div class="tx-icon-box tx-icon-in">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div class="tx-info">
                <h5>${title}</h5>
                <span>Just now</span>
              </div>
            </div>
            <div class="tx-right">
              <div class="tx-amount" style="color:var(--zpay-green);">₦${amt.toLocaleString()}</div>
              <span class="zpay-badge zpay-badge-success" style="margin-top:4px;">Paid</span>
            </div>
          `;
          histList.prepend(item);
        }
      } catch (e) {
        showToast(e.message, 'error');
      }
    });
  });
}
