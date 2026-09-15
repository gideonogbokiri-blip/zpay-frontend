import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';

export function renderLoansView() {
  return `
    <div class="app-wrapper">
      <header class="screen-header">
        <a href="#/app/services" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="screen-title">Cooperative Loans</span>
        <div style="width:36px;"></div>
      </header>

      <!-- Loan Limit Card -->
      <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px; flex: 1;">
        <div class="balance-card" style="background: linear-gradient(135deg, #1a0007 0%, #0d0003 100%); border: 1px solid rgba(234,0,41,0.3);">
          <div class="balance-label">💸 Available Loan Limit</div>
          <div class="balance-amount" style="margin-top:8px; margin-bottom:10px;">₦500,000</div>
          <div style="display:flex; gap:20px; margin-top: 4px;">
            <div>
              <div style="font-size:11px; color:var(--text-muted);">Interest Rate</div>
              <div style="font-size:14px; font-weight:700; color:var(--zpay-green);">5% Flat</div>
            </div>
            <div>
              <div style="font-size:11px; color:var(--text-muted);">Max Tenure</div>
              <div style="font-size:14px; font-weight:700; color:var(--text-primary);">12 Months</div>
            </div>
            <div>
              <div style="font-size:11px; color:var(--text-muted);">Status</div>
              <div style="font-size:14px; font-weight:700; color:var(--zpay-green);">Eligible ✓</div>
            </div>
          </div>
        </div>

        <!-- Active Loans -->
        <div>
          <div class="section-title-row">
            <h4 class="section-heading">Active Loans</h4>
            <span class="zpay-badge zpay-badge-warning" id="active-loan-count">1 Active</span>
          </div>
          <div class="transactions-list" id="loans-list">
            <div class="transaction-tile">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(234,0,41,0.1); color:var(--zpay-green);">💸</div>
                <div class="tx-info">
                  <h5>Business Expansion</h5>
                  <span>Next payment: Oct 15, 2026</span>
                </div>
              </div>
              <div class="tx-right">
                <div class="tx-amount" style="color:var(--text-primary);">₦150,000</div>
                <span class="zpay-badge zpay-badge-warning" style="margin-top:4px;">Ongoing</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Repayment Progress -->
        <div class="zpay-card">
          <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span style="font-weight:600;">Repayment Progress</span>
            <span style="color:var(--zpay-green); font-weight:700;">40%</span>
          </div>
          <div style="background:var(--bg-input); border-radius:99px; height:8px; overflow:hidden;">
            <div style="width:40%; height:100%; background:var(--zpay-green); border-radius:99px;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:12px; color:var(--text-muted);">
            <span>₦60,000 paid</span>
            <span>₦90,000 remaining</span>
          </div>
        </div>

        <button id="open-loan-modal-btn" class="zpay-btn zpay-btn-primary zpay-btn-block" style="margin-top:auto;">Apply for a New Loan</button>
      </div>

      <!-- Loan Application Modal -->
      <div id="loan-modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:999; align-items:flex-end; justify-content:center;">
        <div style="background:var(--bg-card); width:100%; max-width:480px; border-radius:24px 24px 0 0; padding:24px; border-top:1px solid rgba(234,0,41,0.3); display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="font-size:18px; font-weight:700; color:var(--text-primary);">Apply for Loan</h3>
            <button id="close-loan-modal" style="background:none; border:none; color:var(--text-muted); font-size:20px; cursor:pointer;">✕</button>
          </div>
          
          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Loan Amount (₦)</label>
            <input id="loan-amt-input" type="number" placeholder="Enter amount (max ₦500,000)" value="100000" class="zpay-input" style="width:100%;">
          </div>

          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Tenure</label>
            <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px;">
              <button class="loan-tenure-btn zpay-btn zpay-btn-secondary active" data-months="3" style="font-size:12px; padding:8px;">3 Months</button>
              <button class="loan-tenure-btn zpay-btn zpay-btn-secondary" data-months="6" style="font-size:12px; padding:8px;">6 Months</button>
              <button class="loan-tenure-btn zpay-btn zpay-btn-secondary" data-months="12" style="font-size:12px; padding:8px;">12 Months</button>
            </div>
          </div>

          <div style="background:var(--bg-input); border-radius:12px; padding:14px; font-size:12px; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; justify-content:space-between;">
              <span>Interest (5% flat):</span>
              <span id="loan-interest-calc" style="color:var(--text-primary); font-weight:700;">₦5,000</span>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>Total Repayment:</span>
              <span id="loan-total-calc" style="color:var(--zpay-green); font-weight:700;">₦105,000</span>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>Monthly Deduction:</span>
              <span id="loan-monthly-calc" style="color:var(--text-primary); font-weight:700;">₦35,000 / mo</span>
            </div>
          </div>

          <button id="submit-loan-btn" class="zpay-btn zpay-btn-primary zpay-btn-block">Disburse to Wallet Instantly</button>
        </div>
      </div>
    </div>
  `;
}

export function initLoansListeners() {
  const openBtn = document.getElementById('open-loan-modal-btn');
  const closeBtn = document.getElementById('close-loan-modal');
  const modal = document.getElementById('loan-modal');
  const amtInput = document.getElementById('loan-amt-input');
  const tenureBtns = document.querySelectorAll('.loan-tenure-btn');
  const interestEl = document.getElementById('loan-interest-calc');
  const totalEl = document.getElementById('loan-total-calc');
  const monthlyEl = document.getElementById('loan-monthly-calc');
  const submitBtn = document.getElementById('submit-loan-btn');

  let selectedTenure = 3;

  function updateCalcs() {
    const amt = parseFloat(amtInput?.value || 0);
    const interest = amt * 0.05;
    const total = amt + interest;
    const monthly = selectedTenure > 0 ? (total / selectedTenure) : total;

    if (interestEl) interestEl.textContent = `₦${Math.round(interest).toLocaleString()}`;
    if (totalEl) totalEl.textContent = `₦${Math.round(total).toLocaleString()}`;
    if (monthlyEl) monthlyEl.textContent = `₦${Math.round(monthly).toLocaleString()} / mo`;
  }

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
      updateCalcs();
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  tenureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tenureBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTenure = parseInt(btn.dataset.months) || 3;
      updateCalcs();
    });
  });

  if (amtInput) {
    amtInput.addEventListener('input', updateCalcs);
  }

  if (submitBtn && modal) {
    submitBtn.addEventListener('click', () => {
      const amt = parseFloat(amtInput?.value || 0);
      if (isNaN(amt) || amt < 5000 || amt > 500000) {
        showToast('Please enter an amount between ₦5,000 and ₦500,000', 'error');
        return;
      }

      store.addFunds(amt, 'Cooperative Loan');
      modal.style.display = 'none';
      showToast(`✓ ₦${amt.toLocaleString()} Cooperative Loan disbursed to your wallet!`);
      
      const list = document.getElementById('loans-list');
      if (list) {
        const item = document.createElement('div');
        item.className = 'transaction-tile';
        item.innerHTML = `
          <div class="tx-left">
            <div class="tx-icon-box" style="background:rgba(234,0,41,0.1); color:var(--zpay-green);">💸</div>
            <div class="tx-info">
              <h5>Quick Member Loan</h5>
              <span>Disbursed just now</span>
            </div>
          </div>
          <div class="tx-right">
            <div class="tx-amount" style="color:var(--text-primary);">₦${amt.toLocaleString()}</div>
            <span class="zpay-badge zpay-badge-warning" style="margin-top:4px;">Active</span>
          </div>
        `;
        list.prepend(item);
      }
    });
  }
}
