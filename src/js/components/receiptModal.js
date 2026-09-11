import { store } from '../state/store.js';
import { showToast } from './notifications.js';

export function openReceiptModal(tx) {
  const backdrop = document.createElement('div');
  backdrop.className = 'zpay-modal-backdrop';
  backdrop.id = 'receipt-modal-backdrop';

  const isPositive = tx.type === 'in';
  const displayAmount = (isPositive ? '+' : '-') + store.formatMoney(tx.amount);

  backdrop.innerHTML = `
    <div class="zpay-modal-content" style="max-width: 440px; background: var(--bg-surface); padding: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="logo-icon" style="width: 28px; height: 28px; font-size: 14px;">Z</div>
          <span style="font-weight: 800; font-size: 16px;">ZPay Receipt</span>
        </div>
        <button id="close-receipt-x" style="font-size: 24px; color: var(--text-muted); cursor: pointer;">&times;</button>
      </div>

      <div id="printable-receipt" style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 24px 20px; border: 1px solid var(--border-medium); text-align: center; position: relative;">
        <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--zpay-green-light); color: var(--zpay-green); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto; font-size: 24px;">
          ✓
        </div>
        
        <p style="font-size: 13px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Transaction Successful</p>
        <h2 style="font-size: 28px; font-weight: 800; color: ${isPositive ? 'var(--zpay-green)' : 'var(--text-primary)'}; margin: 6px 0 16px 0;">
          ${displayAmount}
        </h2>

        <div style="border-top: 1px dashed var(--border-medium); padding-top: 16px; display: flex; flex-direction: column; gap: 12px; text-align: left; font-size: 13px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Recipient</span>
            <span style="font-weight: 600; color: var(--text-primary);">${tx.recipient || 'N/A'}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Sender</span>
            <span style="font-weight: 600; color: var(--text-primary);">${tx.sender || store.user.name}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Account / Service</span>
            <span style="font-weight: 600; color: var(--text-primary);">${tx.account || tx.category}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Date & Time</span>
            <span style="font-weight: 600; color: var(--text-primary);">${tx.date}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Transaction Fee</span>
            <span style="font-weight: 600; color: var(--zpay-green);">₦0.00 (Free)</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Reference</span>
            <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary);">${tx.reference || tx.id}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Status</span>
            <span class="zpay-badge zpay-badge-success">${tx.status || 'Successful'}</span>
          </div>
        </div>

        <div style="margin-top: 20px; padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
          <span>ZPay Digital Ledger</span>
          <span>Verified NDPR Compliant</span>
        </div>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 20px;">
        <button class="zpay-btn zpay-btn-secondary" id="receipt-download-btn" style="flex: 1; padding: 12px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Print / Save
        </button>
        <button class="zpay-btn zpay-btn-outline" id="receipt-share-btn" style="flex: 1; padding: 12px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Share
        </button>
      </div>

      <div style="margin-top: 12px; text-align: center;">
        <button class="zpay-btn zpay-btn-ghost zpay-btn-sm" id="receipt-report-btn" style="color: var(--color-danger); font-size: 12px;">
          🚩 Report an issue with this transaction
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  function closeModal() {
    backdrop.remove();
  }

  backdrop.querySelector('#close-receipt-x').addEventListener('click', closeModal);
  
  backdrop.querySelector('#receipt-download-btn').addEventListener('click', () => {
    window.print();
  });

  backdrop.querySelector('#receipt-share-btn').addEventListener('click', () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`ZPay Transaction Receipt: ${tx.title} - ${store.formatMoney(tx.amount)} Ref: ${tx.reference}`);
      showToast("Receipt summary copied to clipboard! 📋");
    }
  });

  backdrop.querySelector('#receipt-report-btn').addEventListener('click', () => {
    closeModal();
    window.location.hash = '#support';
    showToast("Opening Support to report transaction reference " + (tx.reference || tx.id));
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
}
