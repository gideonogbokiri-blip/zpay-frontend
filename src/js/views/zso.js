import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';

export function renderZsoView() {
  return `
    <div class="app-wrapper">
      <header class="screen-header">
        <a href="#/app/services" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="screen-title">Zso Escrow</span>
        <div style="width:36px;"></div>
      </header>

      <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px;">
        <!-- Escrow Balance Card -->
        <div class="balance-card" style="background: linear-gradient(135deg, #001233 0%, #000d26 100%); border: 1px solid rgba(56,189,248,0.25);">
          <div class="balance-label" style="color: rgba(56,189,248,0.8);">🔒 Total Escrow Balance</div>
          <div class="balance-amount" style="margin: 10px 0; color: #fff;">₦120,500.00</div>
          <div style="display:flex; gap:16px;">
            <div>
              <div style="font-size:11px; color:rgba(255,255,255,0.5);">Locked Funds</div>
              <div style="font-size:13px; font-weight:700; color:var(--color-blue); margin-top:3px;">₦85,000</div>
            </div>
            <div>
              <div style="font-size:11px; color:rgba(255,255,255,0.5);">Releasing Soon</div>
              <div style="font-size:13px; font-weight:700; color:var(--zpay-green); margin-top:3px;">₦35,500</div>
            </div>
          </div>
        </div>

        <!-- How Zso Works Banner -->
        <div style="
          background: rgba(56,189,248,0.06);
          border: 1px solid rgba(56,189,248,0.15);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        ">
          <span style="font-size:22px;">ℹ️</span>
          <p style="margin:0; font-size:13px; color:var(--text-secondary); line-height:1.5;">Zso holds your funds safely until the other party fulfills their obligation — safe for buying, selling, and freelance work.</p>
        </div>

        <!-- Active Escrows -->
        <div>
          <div class="section-title-row">
            <h4 class="section-heading">Active Escrows</h4>
            <span class="zpay-badge zpay-badge-blue">2 Active</span>
          </div>
          <div class="transactions-list" id="escrow-list">
            <div class="transaction-tile">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(56,189,248,0.1); color:var(--color-blue); font-size:18px;">🔒</div>
                <div class="tx-info">
                  <h5>Marketplace Purchase</h5>
                  <span>Seller: Emeka Tech Hub</span>
                </div>
              </div>
              <div class="tx-right">
                <div class="tx-amount" style="color:var(--color-blue);">₦85,000</div>
                <span class="zpay-badge zpay-badge-warning" style="margin-top:4px;">Awaiting Delivery</span>
              </div>
            </div>

            <div class="transaction-tile" id="escrow-gig-tile">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(0,210,106,0.1); color:var(--zpay-green); font-size:18px;">💼</div>
                <div class="tx-info">
                  <h5>Freelance Design Gig</h5>
                  <span>Client: Z-Studios Ltd</span>
                </div>
              </div>
              <div class="tx-right" style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                <div class="tx-amount" style="color:var(--zpay-green);">₦35,500</div>
                <button id="release-funds-btn" class="zpay-btn zpay-btn-primary zpay-btn-sm" style="font-size:11px; padding:4px 10px;">Release to Seller</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div style="display:flex; gap:12px;">
          <button id="btn-create-escrow" class="zpay-btn zpay-btn-primary" style="flex:1;">+ Create Escrow</button>
        </div>
      </div>

      <!-- Create Escrow Modal -->
      <div id="escrow-modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:999; align-items:flex-end; justify-content:center;">
        <div style="background:var(--bg-card); width:100%; max-width:480px; border-radius:24px 24px 0 0; padding:24px; border-top:1px solid rgba(56,189,248,0.3); display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="font-size:18px; font-weight:700; color:var(--text-primary);">Create Escrow Deal</h3>
            <button id="close-escrow-modal" style="background:none; border:none; color:var(--text-muted); font-size:20px; cursor:pointer;">✕</button>
          </div>
          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Deal Title</label>
            <input id="escrow-deal-title" type="text" placeholder="e.g. Laptop Purchase or Web Project" class="zpay-input" style="width:100%;">
          </div>
          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Other Party (Phone or @tag)</label>
            <input id="escrow-deal-party" type="text" placeholder="e.g. 08012345678 or @seller" class="zpay-input" style="width:100%;">
          </div>
          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Escrow Amount (₦)</label>
            <input id="escrow-deal-amt" type="number" placeholder="Enter amount to lock in escrow" class="zpay-input" style="width:100%;">
          </div>
          <button id="submit-create-escrow" class="zpay-btn zpay-btn-primary zpay-btn-block">Lock Funds in Escrow</button>
        </div>
      </div>
    </div>
  `;
}

export function initZsoListeners() {
  const modal = document.getElementById('escrow-modal');
  const openBtn = document.getElementById('btn-create-escrow');
  const closeBtn = document.getElementById('close-escrow-modal');
  const submitBtn = document.getElementById('submit-create-escrow');
  const releaseBtn = document.getElementById('release-funds-btn');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  }

  if (submitBtn && modal) {
    submitBtn.addEventListener('click', () => {
      const title = document.getElementById('escrow-deal-title')?.value || 'Deal';
      const party = document.getElementById('escrow-deal-party')?.value || 'Recipient';
      const amt = parseFloat(document.getElementById('escrow-deal-amt')?.value || 0);

      if (isNaN(amt) || amt <= 0) {
        showToast('Please enter a valid deal amount.', 'error');
        return;
      }

      try {
        store.deductFunds(amt, {
          title: `Escrow Lock: ${title}`,
          category: 'Escrow',
          recipient: `Zso Escrow (${party})`,
          account: 'Escrow Vault',
          fee: 0
        });

        modal.style.display = 'none';
        showToast(`✓ ₦${amt.toLocaleString()} locked safely in Zso Escrow deal!`);

        const list = document.getElementById('escrow-list');
        if (list) {
          const item = document.createElement('div');
          item.className = 'transaction-tile';
          item.innerHTML = `
            <div class="tx-left">
              <div class="tx-icon-box" style="background:rgba(56,189,248,0.1); color:var(--color-blue); font-size:18px;">🔒</div>
              <div class="tx-info">
                <h5>${title}</h5>
                <span>Party: ${party}</span>
              </div>
            </div>
            <div class="tx-right">
              <div class="tx-amount" style="color:var(--color-blue);">₦${amt.toLocaleString()}</div>
              <span class="zpay-badge zpay-badge-warning" style="margin-top:4px;">Locked</span>
            </div>
          `;
          list.prepend(item);
        }
      } catch (e) {
        showToast(e.message, 'error');
      }
    });
  }

  if (releaseBtn) {
    releaseBtn.addEventListener('click', () => {
      showToast('✓ ₦35,500 released from escrow to Z-Studios Ltd!');
      const tile = document.getElementById('escrow-gig-tile');
      if (tile) {
        tile.querySelector('.tx-right').innerHTML = `
          <div class="tx-amount" style="color:var(--zpay-green);">₦35,500</div>
          <span class="zpay-badge zpay-badge-success" style="margin-top:4px;">Released ✓</span>
        `;
      }
    });
  }
}
