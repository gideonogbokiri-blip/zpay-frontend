import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';

export function renderLoansView() {
  const zpayLoans = store.zpayInstantLoans || [];

  return `
    <div class="app-wrapper" style="padding-bottom: 90px;">
      <header class="screen-header">
        <a href="#/app/services" class="back-btn" title="Back to Services">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <div style="text-align:center;">
          <span class="screen-title" style="font-size:16px;">ZPay Instant Loan</span>
          <div style="font-size:11px; color:var(--text-muted);">Collateral-Free Digital Credit</div>
        </div>
        <div style="width:36px;"></div>
      </header>

      <div style="padding: 16px 20px; display: flex; flex-direction: column; gap: 18px; flex: 1;">

        <!-- Digital Credit Limit Card -->
        <div class="balance-card" style="background: linear-gradient(135deg, #0e1726 0%, #070c14 100%); border: 1px solid rgba(56, 189, 248, 0.35); box-shadow: 0 10px 30px rgba(56, 189, 248, 0.1);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div class="balance-label" style="color:var(--color-blue); display:flex; align-items:center; gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Instant Nano-Credit Limit</div>
            <span class="zpay-badge zpay-badge-success" style="font-size:10px;">Pre-Approved ✓</span>
          </div>
          <div class="balance-amount" style="margin:10px 0 6px 0; color:#fff; font-size:32px;">₦100,000</div>
          <div style="display:flex; justify-content:space-between; font-size:12px; color:rgba(255,255,255,0.7); margin-top: 8px;">
            <span>Tenure: <strong style="color:#fff;">15 – 30 Days</strong></span>
            <span>Interest: <strong style="color:var(--zpay-green);">From 5%</strong></span>
            <span>Collateral: <strong style="color:#fff;">None Required</strong></span>
          </div>
        </div>

        <!-- Cooperative Loan Callout / Separation Banner -->
        <a href="#/app/cooperative" style="text-decoration:none; background:linear-gradient(135deg, rgba(234,0,41,0.08), rgba(234,0,41,0.02)); border:1px solid rgba(234,0,41,0.3); border-radius:16px; padding:14px; display:flex; justify-content:space-between; align-items:center; transition:all 0.2s;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:40px; height:40px; border-radius:12px; background:rgba(234,0,41,0.15); display:flex; align-items:center; justify-content:center; color:var(--zpay-green); flex-shrink:0;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/><line x1="8" y1="14" x2="8" y2="17"/><line x1="12" y1="14" x2="12" y2="17"/><line x1="16" y1="14" x2="16" y2="17"/></svg>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:6px;">
                <h4 style="font-size:13px; font-weight:800; color:var(--text-primary); margin:0;">Need larger capital (Up to 3x savings)?</h4>
              </div>
              <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">
                Get low-interest 5% flat annual loans under your Cooperative Society.
              </p>
            </div>
          </div>
          <span style="font-size:12px; font-weight:800; color:var(--zpay-green); white-space:nowrap;">Coop Hub &rarr;</span>
        </a>

        <!-- Active ZPay Loans -->
        <div>
          <div class="section-title-row">
            <h4 class="section-heading">Active Digital Overdrafts</h4>
            <span class="zpay-badge zpay-badge-info" id="active-loan-count">${zpayLoans.length} Active</span>
          </div>
          <div class="transactions-list" id="zpay-loans-list">
            ${zpayLoans.length === 0
              ? `<div style="text-align:center; padding:24px; color:var(--text-muted); font-size:13px;">No active loans. Your credit rating is in excellent standing!</div>`
              : zpayLoans.map(ln => `
                  <div class="transaction-tile">
                    <div class="tx-left">
                      <div class="tx-icon-box" style="background:rgba(56,189,248,0.12); color:var(--color-blue);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
                      <div class="tx-info">
                        <h5>ZPay Emergency Cash Loan</h5>
                        <span>Due: ${ln.dueDate} &bull; ${ln.tenureDays} Days</span>
                      </div>
                    </div>
                    <div class="tx-right">
                      <div class="tx-amount" style="color:var(--text-primary);">${store.formatMoney(ln.amount)}</div>
                      <span class="zpay-badge zpay-badge-warning" style="margin-top:4px;">Repay ${store.formatMoney(ln.totalRepayment)}</span>
                    </div>
                  </div>
                `).join('')
            }
          </div>
        </div>

        <!-- How it works card -->
        <div class="zpay-card" style="border:1px solid var(--border-subtle); font-size:12px; color:var(--text-secondary); line-height:1.5;">
          <div style="font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:6px;">How ZPay Digital Loan Works</div>
          <div>1. Instant disbursement directly into your ZPay Main Wallet in seconds.</div>
          <div>2. No paperwork, guarantors, or collateral required.</div>
          <div>3. Repay on or before the due date to unlock higher credit limits up to ₦500,000.</div>
        </div>

        <button id="open-zpay-loan-modal" class="zpay-btn zpay-btn-primary zpay-btn-block" style="margin-top:auto; font-weight:800; padding:15px; gap:8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Get Instant Cash Loan Now
        </button>
      </div>

      <!-- ZPay Loan Application Modal -->
      <div id="zpay-loan-modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:999; align-items:flex-end; justify-content:center;">
        <div style="background:var(--bg-card); width:100%; max-width:480px; border-radius:24px 24px 0 0; padding:24px; border-top:1px solid rgba(56,189,248,0.35); display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 style="font-size:18px; font-weight:800; color:var(--text-primary);">Apply for ZPay Cash Loan</h3>
              <p style="font-size:11px; color:var(--text-muted);">Instant disbursement to your main wallet</p>
            </div>
            <button id="close-zpay-loan-modal" style="background:none; border:none; color:var(--text-muted); cursor:pointer; padding:4px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
          
          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Loan Amount (₦) — Max ₦100,000</label>
            <input id="zpay-loan-amt-input" type="number" placeholder="Enter amount" value="50000" class="zpay-input" style="width:100%; font-size:16px; font-weight:700; color:var(--color-blue);">
          </div>

          <!-- Quick Amount Chips -->
          <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px;">
            <button class="zpay-loan-chip zpay-btn zpay-btn-secondary" data-amt="10000" style="font-size:11px; padding:6px 4px;">₦10,000</button>
            <button class="zpay-loan-chip zpay-btn zpay-btn-secondary" data-amt="25000" style="font-size:11px; padding:6px 4px;">₦25,000</button>
            <button class="zpay-loan-chip zpay-btn zpay-btn-secondary active" data-amt="50000" style="font-size:11px; padding:6px 4px; border-color:var(--color-blue); color:var(--color-blue);">₦50,000</button>
            <button class="zpay-loan-chip zpay-btn zpay-btn-secondary" data-amt="100000" style="font-size:11px; padding:6px 4px;">₦100,000</button>
          </div>

          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Repayment Duration</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <button class="zpay-tenure-btn zpay-btn zpay-btn-secondary" data-days="15" style="font-size:12px; padding:10px; justify-content:center;">
                15 Days (5% Fee)
              </button>
              <button class="zpay-tenure-btn zpay-btn zpay-btn-secondary active" data-days="30" style="font-size:12px; padding:10px; justify-content:center; border-color:var(--color-blue); color:var(--color-blue);">
                30 Days (10% Fee)
              </button>
            </div>
          </div>

          <div style="background:var(--bg-input); border-radius:12px; padding:14px; font-size:12px; display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Disbursed to Main Wallet:</span>
              <strong id="zpay-disburse-calc" style="color:var(--text-primary);">₦50,000</strong>
            </div>
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Processing Fee:</span>
              <span id="zpay-fee-calc" style="color:var(--color-warning); font-weight:700;">₦5,000</span>
            </div>
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Total Repayment Due:</span>
              <strong id="zpay-repay-calc" style="color:var(--color-blue); font-size:14px;">₦55,000</strong>
            </div>
          </div>

          <button id="submit-zpay-loan-btn" class="zpay-btn zpay-btn-primary zpay-btn-block" style="font-weight:800; padding:14px;">
            Disburse Cash to Wallet Instantly &rarr;
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initLoansListeners() {
  const openBtn = document.getElementById('open-zpay-loan-modal');
  const closeBtn = document.getElementById('close-zpay-loan-modal');
  const modal = document.getElementById('zpay-loan-modal');
  const amtInput = document.getElementById('zpay-loan-amt-input');
  const disburseEl = document.getElementById('zpay-disburse-calc');
  const feeEl = document.getElementById('zpay-fee-calc');
  const repayEl = document.getElementById('zpay-repay-calc');
  const submitBtn = document.getElementById('submit-zpay-loan-btn');
  const tenureBtns = document.querySelectorAll('.zpay-tenure-btn');
  const chips = document.querySelectorAll('.zpay-loan-chip');

  let selectedDays = 30;

  function updateCalcs() {
    const amt = parseFloat(amtInput?.value || 0);
    const rate = selectedDays <= 15 ? 0.05 : 0.10;
    const fee = Math.round(amt * rate);
    const total = amt + fee;

    if (disburseEl) disburseEl.textContent = store.formatMoney(amt);
    if (feeEl) feeEl.textContent = store.formatMoney(fee);
    if (repayEl) repayEl.textContent = store.formatMoney(total);
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

  chips.forEach(c => {
    c.addEventListener('click', () => {
      chips.forEach(x => {
        x.classList.remove('active');
        x.style.borderColor = 'var(--border-medium)';
        x.style.color = 'var(--text-secondary)';
      });
      c.classList.add('active');
      c.style.borderColor = 'var(--color-blue)';
      c.style.color = 'var(--color-blue)';
      if (amtInput) amtInput.value = c.dataset.amt;
      updateCalcs();
    });
  });

  tenureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tenureBtns.forEach(b => {
        b.classList.remove('active');
        b.style.borderColor = 'var(--border-medium)';
        b.style.color = 'var(--text-secondary)';
      });
      btn.classList.add('active');
      btn.style.borderColor = 'var(--color-blue)';
      btn.style.color = 'var(--color-blue)';
      selectedDays = parseInt(btn.dataset.days) || 30;
      updateCalcs();
    });
  });

  if (amtInput) {
    amtInput.addEventListener('input', updateCalcs);
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const amt = parseFloat(amtInput?.value || 0);
      try {
        const newLoan = store.applyZpayInstantLoan(amt, selectedDays);
        if (modal) modal.style.display = 'none';
        showToast(`${store.formatMoney(amt)} ZPay Instant Cash Loan credited to your wallet!`, 'success');
        window.location.hash = '#/app/loans';
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }
}
