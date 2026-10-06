import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';

export function renderCooperativeView() {
  const activeCoop = store.getActiveCooperative();
  const coopBal = store.cooperativeBalance;
  const mainBal = store.balance;
  
  // Calculations for active cooperative
  const targetSavings = activeCoop.savingsTarget || (activeCoop.minMonthlyContribution * 12);
  const percentSaved = Math.min(100, Math.round((coopBal / targetSavings) * 100));
  const maxLoanPower = Math.round(coopBal * (activeCoop.loanEligibilityRatio || 3.0));
  const tenureMet = (activeCoop.memberMonthsActive || 1) >= (activeCoop.minTenureMonthsForLoan || 3);
  const isLoanEligible = coopBal >= activeCoop.minMonthlyContribution && tenureMet;

  // Year-End Share-out calculations
  const dividendRate = activeCoop.dividendRate || 12.0;
  const projectedDividend = Math.round(coopBal * (dividendRate / 100));
  const totalYearEndPack = coopBal + projectedDividend;

  // Member's pending loan applications awaiting executive approval
  const myPendingLoans = (store.pendingLoanRequests || []).filter(r => 
    (r.applicantId === 'ZP-MB-9201' || (r.applicantName && r.applicantName.includes('Gideon'))) && 
    r.status === 'Pending Approval'
  );

  return `
    <div class="app-wrapper" style="padding-bottom: 90px;">
      
      <!-- Top Screen Header -->
      <header class="screen-header" style="background:var(--bg-app); position:sticky; top:0; z-index:20;">
        <a href="#/app/services" class="back-btn" title="Back to Services">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <div style="text-align:center;">
          <span class="screen-title" style="font-size:16px;">Cooperative Hub</span>
          <div style="font-size:11px; color:var(--text-muted);">Self-Help & Credit Societies</div>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <a href="#/app/cooperative-admin" class="zpay-btn zpay-btn-secondary zpay-btn-sm" style="font-size:11px; padding:6px 10px; text-decoration:none; border-color:rgba(234,0,41,0.4); white-space:nowrap; display:inline-flex; align-items:center; gap:5px;" title="Open Executive Admin Dashboard">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Admin Portal
          </a>
          <button id="btn-open-coop-switcher" class="header-icon-btn" title="Switch Cooperative" style="background:rgba(234,0,41,0.12); color:var(--zpay-green); border:1px solid rgba(234,0,41,0.3);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M4 20L21 3m0 13v5h-5m-1 0a9 9 0 1 1 0-18"/></svg>
          </button>
        </div>
      </header>

      <div style="padding: 16px 20px; display: flex; flex-direction: column; gap: 20px;">

        <!-- Member Profile Header -->
        <div style="background:var(--bg-card); border-radius:14px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center; border:1px solid var(--border-subtle);">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:10px; background:var(--zpay-green-light); color:var(--zpay-green); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:15px;">
              ${store.user.name.charAt(0)}
            </div>
            <div>
              <div style="font-size:13px; font-weight:800; color:var(--text-primary);">${store.user.name} (Member)</div>
              <div style="font-size:11px; color:var(--text-muted);">Member ID: ZP-MB-9201 &bull; Active Contributor</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <span class="zpay-badge zpay-badge-success" style="font-size:10px;">Member Portal</span>
          </div>
        </div>

        <!-- Active Cooperative Selector Banner -->
        <div style="background:var(--bg-card); border:1px solid var(--border-medium); border-radius:18px; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="width:44px; height:44px; border-radius:14px; background:linear-gradient(135deg, rgba(234,0,41,0.2), rgba(0,0,0,0.4)); border:1px solid rgba(234,0,41,0.3); display:flex; align-items:center; justify-content:center; color:var(--zpay-green); flex-shrink:0;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/><line x1="8" y1="14" x2="8" y2="17"/><line x1="12" y1="14" x2="12" y2="17"/><line x1="16" y1="14" x2="16" y2="17"/></svg>
              </div>
              <div>
                <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                  <h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin:0;">${activeCoop.shortName}</h3>
                  <span class="zpay-badge zpay-badge-success" style="font-size:10px; padding:2px 8px;">${activeCoop.badge || 'Verified'}</span>
                </div>
                <div style="font-size:11px; color:var(--text-muted); margin-top:3px;">RC: ${activeCoop.regNo} &bull; ${activeCoop.category}</div>
              </div>
            </div>
            <button id="btn-switch-coop" class="zpay-btn zpay-btn-secondary zpay-btn-sm" style="font-size:11px; padding:6px 10px; white-space:nowrap;">
              Browse / Join ▾
            </button>
          </div>

          <!-- Quick Policy Summary Strip -->
          <div style="margin-top:14px; padding-top:12px; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary);">
            <span>Min Save: <strong style="color:var(--text-primary);">₦${activeCoop.minMonthlyContribution.toLocaleString()}/mo</strong></span>
            <span>Loan Ratio: <strong style="color:var(--zpay-green);">${activeCoop.loanEligibilityRatio}x</strong></span>
            <span>Interest: <strong style="color:var(--color-blue);">${activeCoop.loanInterestRate}% p.a.</strong></span>
            <span id="btn-view-policy" style="color:var(--zpay-green); font-weight:700; cursor:pointer;">Policy Details ›</span>
          </div>
        </div>

        <!-- Dedicated Cooperative Wallet Card -->
        <div class="balance-card" style="background: linear-gradient(135deg, #1b0007 0%, #0d0004 60%, #150005 100%); border:1px solid rgba(234,0,41,0.35); box-shadow: 0 12px 36px rgba(234,0,41,0.15);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div class="balance-label" style="display:flex; align-items:center; gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>
              Cooperative Member Equity Balance
            </div>
            <span class="zpay-badge zpay-badge-info" style="font-size:10px;">Dedicated Fund</span>
          </div>
          <div class="balance-amount" style="margin: 10px 0 6px 0; color:#fff; font-size:32px;">
            ${store.formatMoney(coopBal)}
          </div>
          <div style="font-size:12px; color:rgba(255,255,255,0.65); display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <span>Main ZPay Wallet Available: <strong style="color:#fff;">${store.formatMoney(mainBal)}</strong></span>
            <span style="color:var(--zpay-green); font-weight:600;">Active Member</span>
          </div>

          <!-- Fund from Main Account Action Button -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <button id="btn-open-fund-modal" class="zpay-btn zpay-btn-primary" style="padding:10px 14px; font-size:13px; font-weight:700; justify-content:center;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Fund from Main Acct
            </button>
            <button id="btn-quick-auto-save" class="zpay-btn zpay-btn-secondary" style="padding:10px 14px; font-size:13px; justify-content:center; background:rgba(255,255,255,0.08); color:#fff; border:1px solid rgba(255,255,255,0.15);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Standing Order
            </button>
          </div>
        </div>

        <!-- Loan Qualification Meter ("Pay to certain % until qualified to apply for a loan") -->
        <div class="zpay-card" style="border:1px solid rgba(56,189,248,0.25);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div>
              <h4 style="font-size:14px; font-weight:800; color:var(--text-primary); margin:0;">Loan Qualification Meter</h4>
              <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Contribute up to required threshold to unlock loan limits</p>
            </div>
            <span class="zpay-badge ${isLoanEligible ? 'zpay-badge-success' : 'zpay-badge-warning'}">
              ${isLoanEligible ? 'Qualified ✓' : `${percentSaved}% of Target`}
            </span>
          </div>

          <!-- Progress Bar -->
          <div style="background:var(--bg-input); border-radius:99px; height:8px; overflow:hidden; margin:10px 0 8px 0;">
            <div style="width: ${Math.max(5, percentSaved)}%; height:100%; background:linear-gradient(90deg, var(--zpay-green), #38bdf8); border-radius:99px; transition: width 0.4s ease;"></div>
          </div>

          <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-secondary); margin-bottom:14px;">
            <span>Contributed: <strong style="color:var(--text-primary);">${store.formatMoney(coopBal)}</strong></span>
            <span>Target: <strong style="color:var(--text-primary);">${store.formatMoney(targetSavings)}</strong></span>
          </div>

          <!-- Borrowing Power Details -->
          <div style="background:var(--bg-input); border-radius:12px; padding:12px; display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:12px; margin-bottom:12px;">
            <div>
              <div style="color:var(--text-muted); font-size:11px;">Max Borrowing Limit:</div>
              <div style="color:var(--zpay-green); font-size:15px; font-weight:800;">${store.formatMoney(maxLoanPower)}</div>
              <div style="font-size:10px; color:var(--text-muted);">(${activeCoop.loanEligibilityRatio}x your savings)</div>
            </div>
            <div>
              <div style="color:var(--text-muted); font-size:11px;">Active Tenure:</div>
              <div style="color:var(--text-primary); font-size:14px; font-weight:700;">${activeCoop.memberMonthsActive || 1} of ${activeCoop.minTenureMonthsForLoan} Mos</div>
              <div style="font-size:10px; color:${tenureMet ? 'var(--zpay-green)' : 'var(--color-warning)'};">
                ${tenureMet ? 'Tenure Requirement Met ✓' : 'Saving in progress'}
              </div>
            </div>
          </div>

          <button id="btn-open-loan-modal" class="zpay-btn zpay-btn-primary zpay-btn-block" ${!isLoanEligible && coopBal <= 0 ? 'disabled' : ''} style="font-weight:700; display:inline-flex; align-items:center; justify-content:center; gap:6px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Apply for Cooperative Loan
          </button>
        </div>

        <!-- Year-End Share-out ("Pack your money at the end of the year") -->
        <div class="zpay-card" style="border:1px solid rgba(245,158,11,0.3); background: linear-gradient(135deg, rgba(245,158,11,0.04), var(--bg-card));">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:36px; height:36px; border-radius:10px; background:rgba(245,158,11,0.15); color:var(--color-warning); display:flex; align-items:center; justify-content:center;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:800; color:var(--text-primary); margin:0;">Year-End Capital & Dividend Share-Out</h4>
                <div style="font-size:11px; color:var(--text-muted);">"Pack your money" + ${dividendRate}% annual cooperative dividend</div>
              </div>
            </div>
            <span class="zpay-badge zpay-badge-warning" style="font-size:10px;">${activeCoop.yearEndPayoutMonth} Payout</span>
          </div>

          <div style="background:var(--bg-input); border-radius:12px; padding:12px; margin:10px 0; display:flex; flex-direction:column; gap:6px; font-size:12px;">
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Accumulated Equity Savings:</span>
              <span style="color:var(--text-primary); font-weight:600;">${store.formatMoney(coopBal)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Accrued Dividend Share (+${dividendRate}%):</span>
              <span style="color:var(--zpay-green); font-weight:700;">+${store.formatMoney(projectedDividend)}</span>
            </div>
            <div style="height:1px; background:var(--border-subtle); margin:4px 0;"></div>
            <div style="display:flex; justify-content:space-between; font-size:13px;">
              <strong style="color:var(--text-primary);">Total Year-End Take Home:</strong>
              <strong style="color:var(--color-warning); font-size:15px;">${store.formatMoney(totalYearEndPack)}</strong>
            </div>
          </div>

          <div style="font-size:11px; color:var(--text-muted); margin-bottom:12px; line-height:1.5; display:flex; align-items:center; gap:6px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Scheduled Disbursement Date: <strong style="color:var(--text-primary);">${activeCoop.yearEndPayoutDate}</strong>. Automatically credits your Main ZPay Wallet or can be claimed early / rolled over.
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <button id="btn-claim-payout" class="zpay-btn zpay-btn-secondary" style="font-size:12px; font-weight:700; justify-content:center; border:1px solid rgba(245,158,11,0.4); color:var(--color-warning); display:inline-flex; align-items:center; gap:5px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><circle cx="18" cy="12" r="1"/></svg>
              Pack / Claim Money Now
            </button>
            <button id="btn-rollover-payout" class="zpay-btn zpay-btn-secondary" style="font-size:12px; justify-content:center; display:inline-flex; align-items:center; gap:5px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
              Rollover to 2027
            </button>
          </div>
        </div>

        <!-- Active Cooperative Loans & Repayment -->
        <div>
          <div class="section-title-row">
            <h4 class="section-heading">Active Loans in this Cooperative</h4>
            <span class="zpay-badge zpay-badge-info">${store.cooperativeLoans.length} Active</span>
          </div>

          ${myPendingLoans.length > 0 ? `
            <!-- Pending Committee Review Banner -->
            <div style="background:rgba(234,179,8,0.08); border:1px dashed rgba(234,179,8,0.4); border-radius:14px; padding:12px 14px; margin-bottom:12px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size:12px; font-weight:800; color:#eab308; display:flex; align-items:center; gap:6px;">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
                  Loan Awaiting Committee Review (${myPendingLoans.length})
                </div>
                <a href="#/app/cooperative-admin" class="zpay-badge zpay-badge-warning" style="text-decoration:none; font-size:10px;">Review as Admin &rarr;</a>
              </div>
              ${myPendingLoans.map(p => `
                <div style="font-size:11px; color:var(--text-secondary); margin-top:8px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <strong style="color:var(--text-primary); font-size:12px;">${p.purpose}</strong>
                    <div style="font-size:10px; color:var(--text-muted);">${p.tenureMonths} months @ ${p.interestRate}% &bull; Repayment: ${store.formatMoney(p.monthlyRepayment)}/mo</div>
                  </div>
                  <strong style="color:var(--zpay-green); font-size:14px;">${store.formatMoney(p.amount)}</strong>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="transactions-list" id="coop-loans-list">
            ${store.cooperativeLoans.length === 0
              ? `<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:13px;">No active loans. You have good cooperative credit!</div>`
              : store.cooperativeLoans.map(loan => `
                  <div class="transaction-tile">
                    <div class="tx-left">
                      <div class="tx-icon-box" style="background:rgba(234,0,41,0.1); color:var(--zpay-green);">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      </div>
                      <div class="tx-info">
                        <h5>${loan.purpose}</h5>
                        <span>Deduction: ${store.formatMoney(loan.monthlyDeduction)}/mo &bull; Next: ${loan.nextDate}</span>
                      </div>
                    </div>
                    <div class="tx-right">
                      <div class="tx-amount">${store.formatMoney(loan.amount)}</div>
                      <span class="zpay-badge zpay-badge-warning" style="margin-top:4px;">${loan.status}</span>
                    </div>
                  </div>
                `).join('')
            }
          </div>
        </div>

      </div>

      <!-- ================= MODALS ================= -->

      <!-- 1. FUND COOPERATIVE WALLET MODAL -->
      <div id="modal-fund-coop" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:999; align-items:flex-end; justify-content:center;">
        <div style="background:var(--bg-card); width:100%; max-width:480px; border-radius:24px 24px 0 0; padding:24px; border-top:1px solid rgba(234,0,41,0.3); display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 style="font-size:18px; font-weight:800; color:var(--text-primary);">Fund Cooperative Wallet</h3>
              <p style="font-size:12px; color:var(--text-muted);">Transfer money from your Main ZPay Wallet</p>
            </div>
            <button id="close-fund-modal" style="background:none; border:none; color:var(--text-muted); font-size:20px; cursor:pointer;">✕</button>
          </div>

          <div style="background:var(--bg-input); border-radius:12px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; color:var(--text-secondary);">Available Main Balance:</span>
            <strong style="font-size:14px; color:var(--zpay-green);">${store.formatMoney(mainBal)}</strong>
          </div>

          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Transfer Amount (₦)</label>
            <input id="input-fund-coop-amount" type="number" placeholder="Enter amount (e.g. 25000)" value="25000" class="zpay-input" style="width:100%;">
          </div>

          <!-- Quick chips -->
          <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px;">
            <button class="chip-fund-amt zpay-btn zpay-btn-secondary" data-amt="10000" style="font-size:11px; padding:6px 4px;">₦10,000</button>
            <button class="chip-fund-amt zpay-btn zpay-btn-secondary" data-amt="25000" style="font-size:11px; padding:6px 4px;">₦25,000</button>
            <button class="chip-fund-amt zpay-btn zpay-btn-secondary" data-amt="50000" style="font-size:11px; padding:6px 4px;">₦50,000</button>
            <button class="chip-fund-amt zpay-btn zpay-btn-secondary" data-amt="100000" style="font-size:11px; padding:6px 4px;">₦100,000</button>
          </div>

          <button id="btn-submit-fund-coop" class="zpay-btn zpay-btn-primary zpay-btn-block" style="margin-top:8px;">
            Confirm Transfer &rarr;
          </button>
        </div>
      </div>

      <!-- 2. COOPERATIVE SWITCHER & DIRECTORY MODAL -->
      <div id="modal-coop-switcher" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:999; align-items:flex-end; justify-content:center;">
        <div style="background:var(--bg-card); width:100%; max-width:480px; max-height:85vh; border-radius:24px 24px 0 0; padding:24px; border-top:1px solid rgba(234,0,41,0.3); display:flex; flex-direction:column; gap:14px; overflow-y:auto;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 style="font-size:18px; font-weight:800; color:var(--text-primary);">Select Cooperative Society</h3>
              <p style="font-size:12px; color:var(--text-muted);">Each cooperative has its own policies, loans, and payout dates</p>
            </div>
            <button id="close-switcher-modal" style="background:none; border:none; color:var(--text-muted); font-size:20px; cursor:pointer;">✕</button>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px; margin-top:6px;">
            ${store.cooperatives.map(c => {
              const isSelected = c.id === store.activeCooperativeId;
              return `
                <div class="coop-select-item" data-coop-id="${c.id}" style="background:var(--bg-input); border:1.5px solid ${isSelected ? 'var(--zpay-green)' : 'var(--border-subtle)'}; border-radius:14px; padding:14px; cursor:pointer; transition:all 0.2s;">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <div style="display:flex; align-items:center; gap:10px;">
                      <div style="width:36px; height:36px; border-radius:10px; background:rgba(234,0,41,0.1); color:var(--zpay-green); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>
                      </div>
                      <div>
                        <h4 style="font-size:14px; font-weight:800; color:var(--text-primary); margin:0;">${c.shortName}</h4>
                        <span style="font-size:11px; color:var(--text-muted);">RC: ${c.regNo} &bull; ${c.category}</span>
                      </div>
                    </div>
                    ${isSelected ? `<span class="zpay-badge zpay-badge-success">Active</span>` : `<span class="zpay-badge zpay-badge-info">Switch</span>`}
                  </div>
                  <div style="margin-top:10px; display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary); border-top:1px solid var(--border-subtle); padding-top:8px;">
                    <span>Min: ₦${c.minMonthlyContribution.toLocaleString()}/mo</span>
                    <span>Loan: ${c.loanEligibilityRatio}x</span>
                    <span>Payout: ${c.yearEndPayoutMonth}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <button id="btn-open-institutional-coop-modal" class="zpay-btn zpay-btn-secondary zpay-btn-block" style="margin-top:10px; justify-content:center; border-style:dashed; font-size:12px; display:inline-flex; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>
            Onboard a Cooperative Society (Requires Documents)
          </button>
        </div>
      </div>

      <!-- 2B. INSTITUTIONAL COOPERATIVE ONBOARDING MODAL -->
      <div id="modal-institutional-coop" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.88); z-index:999; align-items:flex-end; justify-content:center;">
        <div style="background:var(--bg-card); width:100%; max-width:480px; max-height:85vh; border-radius:24px 24px 0 0; padding:24px; border-top:1px solid rgba(234,0,41,0.3); display:flex; flex-direction:column; gap:14px; overflow-y:auto;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">Institutional Cooperative Onboarding</h3>
              <p style="font-size:11px; color:var(--text-muted);">Statutory verification for societies & unions</p>
            </div>
            <button id="close-inst-modal" style="background:none; border:none; color:var(--text-muted); font-size:20px; cursor:pointer;">✕</button>
          </div>

          <!-- Regulatory Alert -->
          <div style="background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.3); border-radius:12px; padding:12px; font-size:11.5px; color:var(--text-secondary); line-height:1.4;">
            <strong style="display:inline-flex; align-items:center; gap:5px; color:#eab308;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Statutory Regulatory Notice:</strong> Under the Nigerian Co-operative Societies Act, individual users cannot self-create cooperative societies. Formal documentation and government gazette verification are required before an administrative treasury portal is provisioned.
          </div>

          <div>
            <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Society Registered Legal Name</label>
            <input type="text" id="inst-coop-name" class="zpay-input" placeholder="e.g. Lagos Health Workers Multi-Purpose Cooperative Society Ltd" value="Lagos Health Workers Multi-Purpose Cooperative Society Ltd" style="width:100%;">
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">State / CAC Reg Number</label>
              <input type="text" id="inst-coop-rc" class="zpay-input" placeholder="LSCS/2026/88910" value="LSCS/2026/88910" style="width:100%;">
            </div>
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Society Category</label>
              <select id="inst-coop-cat" class="zpay-input" style="width:100%;">
                <option value="Multi-Purpose">Multi-Purpose</option>
                <option value="Thrift & Credit">Thrift & Credit</option>
                <option value="Staff Welfare">Staff Welfare</option>
                <option value="Agricultural">Agricultural</option>
              </select>
            </div>
          </div>

          <!-- Mandatory Documents Upload Box -->
          <div style="background:var(--bg-input); border-radius:12px; padding:14px; display:flex; flex-direction:column; gap:8px;">
            <div style="font-size:12px; font-weight:700; color:var(--text-primary);">Mandatory Statutory Documents</div>
            
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--text-secondary);">
              <span>1. Certificate of Registration (Gazette)</span>
              <span class="zpay-badge zpay-badge-success" style="font-size:9px;">✓ Attached</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--text-secondary);">
              <span>2. Society Constitution & Bylaws (CTC)</span>
              <span class="zpay-badge zpay-badge-success" style="font-size:9px;">✓ Attached</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--text-secondary);">
              <span>3. Board of Trustees Resolution</span>
              <span class="zpay-badge zpay-badge-success" style="font-size:9px;">✓ Attached</span>
            </div>
          </div>

          <button id="btn-submit-inst-app" class="zpay-btn zpay-btn-primary zpay-btn-block" style="font-weight:700; padding:12px;">
            Submit for Regulatory Review &rarr;
          </button>
        </div>
      </div>

      <!-- 3. COOPERATIVE POLICY DETAILS MODAL -->
      <div id="modal-coop-policy" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:999; align-items:flex-end; justify-content:center;">
        <div style="background:var(--bg-card); width:100%; max-width:480px; max-height:80vh; border-radius:24px 24px 0 0; padding:24px; border-top:1px solid rgba(234,0,41,0.3); display:flex; flex-direction:column; gap:16px; overflow-y:auto;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="font-size:18px; font-weight:800; color:var(--text-primary);">${activeCoop.name}</h3>
            <button id="close-policy-modal" style="background:none; border:none; color:var(--text-muted); font-size:20px; cursor:pointer;">✕</button>
          </div>

          <p style="font-size:13px; color:var(--text-secondary); line-height:1.5;">${activeCoop.description}</p>

          <div>
            <h4 style="font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:8px;">Constitution & Rules</h4>
            <ul style="padding-left:20px; font-size:12px; color:var(--text-secondary); display:flex; flex-direction:column; gap:8px; line-height:1.4;">
              ${(activeCoop.policies || []).map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>

          <button id="close-policy-btn-bottom" class="zpay-btn zpay-btn-primary zpay-btn-block">Understood</button>
        </div>
      </div>

      <!-- 4. APPLY LOAN MODAL -->
      <div id="modal-apply-loan" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:999; align-items:flex-end; justify-content:center;">
        <div style="background:var(--bg-card); width:100%; max-width:480px; border-radius:24px 24px 0 0; padding:24px; border-top:1px solid rgba(234,0,41,0.3); display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="font-size:18px; font-weight:800; color:var(--text-primary);">Apply for Cooperative Loan</h3>
            <button id="close-loan-modal" style="background:none; border:none; color:var(--text-muted); font-size:20px; cursor:pointer;">✕</button>
          </div>

          <div style="background:var(--bg-input); border-radius:12px; padding:12px; font-size:12px; color:var(--text-secondary); display:flex; justify-content:space-between;">
            <span>Max Borrowing Power:</span>
            <strong style="color:var(--zpay-green); font-size:13px;">${store.formatMoney(maxLoanPower)}</strong>
          </div>

          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Loan Amount (₦)</label>
            <input id="input-loan-amount" type="number" placeholder="Enter amount" value="${Math.min(200000, maxLoanPower || 100000)}" class="zpay-input" style="width:100%;">
          </div>

          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Repayment Tenure</label>
            <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px;">
              <button class="coop-tenure-btn zpay-btn zpay-btn-secondary" data-months="3" style="font-size:12px; padding:8px;">3 Months</button>
              <button class="coop-tenure-btn zpay-btn zpay-btn-secondary active" data-months="6" style="font-size:12px; padding:8px;">6 Months</button>
              <button class="coop-tenure-btn zpay-btn zpay-btn-secondary" data-months="12" style="font-size:12px; padding:8px;">12 Months</button>
            </div>
          </div>

          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Loan Purpose</label>
            <input id="input-loan-purpose" type="text" placeholder="e.g. Business Restock, School Fees, Rent" value="Business Inventory" class="zpay-input" style="width:100%;">
          </div>

          <!-- Calculation summary -->
          <div style="background:var(--bg-input); border-radius:12px; padding:12px; font-size:12px; display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Flat Interest (${activeCoop.loanInterestRate}%):</span>
              <span id="calc-loan-interest" style="color:var(--text-primary); font-weight:600;">₦10,000</span>
            </div>
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Monthly Deduction:</span>
              <span id="calc-loan-monthly" style="color:var(--zpay-green); font-weight:700;">₦35,000 / mo</span>
            </div>
          </div>

          <button id="btn-submit-coop-loan" class="zpay-btn zpay-btn-primary zpay-btn-block">
            Disburse Loan to Main Wallet &rarr;
          </button>
        </div>
      </div>

    </div>
  `;
}

export function initCooperativeListeners() {
  const activeCoop = store.getActiveCooperative();

  // 1. Funding Modal
  const fundModal = document.getElementById('modal-fund-coop');
  const openFundBtn = document.getElementById('btn-open-fund-modal');
  const closeFundBtn = document.getElementById('close-fund-modal');
  const submitFundBtn = document.getElementById('btn-submit-fund-coop');
  const fundInput = document.getElementById('input-fund-coop-amount');

  if (openFundBtn && fundModal) {
    openFundBtn.addEventListener('click', () => {
      fundModal.style.display = 'flex';
    });
  }
  if (closeFundBtn && fundModal) {
    closeFundBtn.addEventListener('click', () => {
      fundModal.style.display = 'none';
    });
  }

  // Quick Chips
  document.querySelectorAll('.chip-fund-amt').forEach(chip => {
    chip.addEventListener('click', () => {
      if (fundInput) fundInput.value = chip.dataset.amt;
    });
  });

  if (submitFundBtn) {
    submitFundBtn.addEventListener('click', () => {
      const amt = parseFloat(fundInput?.value || 0);
      try {
        store.fundCooperativeWallet(amt);
        if (fundModal) fundModal.style.display = 'none';
        showToast(`✓ Transferred ${store.formatMoney(amt)} from Main Account into Cooperative!`, 'success');
        // Re-render
        window.location.hash = '#/app/cooperative';
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }

  // 2. Cooperative Switcher
  const switcherModal = document.getElementById('modal-coop-switcher');
  const openSwitcherBtn = document.getElementById('btn-open-coop-switcher');
  const switchBtnText = document.getElementById('btn-switch-coop');
  const closeSwitcherBtn = document.getElementById('close-switcher-modal');

  const openSwitcher = () => { if (switcherModal) switcherModal.style.display = 'flex'; };
  if (openSwitcherBtn) openSwitcherBtn.addEventListener('click', openSwitcher);
  if (switchBtnText) switchBtnText.addEventListener('click', openSwitcher);
  if (closeSwitcherBtn && switcherModal) {
    closeSwitcherBtn.addEventListener('click', () => {
      switcherModal.style.display = 'none';
    });
  }

  document.querySelectorAll('.coop-select-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.coopId;
      store.setActiveCooperative(id);
      if (switcherModal) switcherModal.style.display = 'none';
      const newCoop = store.getActiveCooperative();
      showToast(`Switched active cooperative to ${newCoop.shortName}`);
      window.location.hash = '#/app/cooperative';
    });
  });

  // 2B. Institutional Onboarding Modal
  const instModal = document.getElementById('modal-institutional-coop');
  const openInstBtn = document.getElementById('btn-open-institutional-coop-modal');
  const closeInstBtn = document.getElementById('close-inst-modal');
  const submitInstBtn = document.getElementById('btn-submit-inst-app');

  if (openInstBtn && instModal) {
    openInstBtn.addEventListener('click', () => {
      if (switcherModal) switcherModal.style.display = 'none';
      instModal.style.display = 'flex';
    });
  }
  if (closeInstBtn && instModal) {
    closeInstBtn.addEventListener('click', () => {
      instModal.style.display = 'none';
    });
  }
  if (submitInstBtn && instModal) {
    submitInstBtn.addEventListener('click', () => {
      const coopName = document.getElementById('inst-coop-name')?.value.trim() || 'Lagos Health Cooperative';
      instModal.style.display = 'none';
      showToast(`✓ Documents submitted for "${coopName}". Status: Pending State Regulatory Review.`, 'info');
    });
  }

  // 3. Policy Modal
  const policyModal = document.getElementById('modal-coop-policy');
  const openPolicyBtn = document.getElementById('btn-view-policy');
  const closePolicyBtn = document.getElementById('close-policy-modal');
  const closePolicyBottom = document.getElementById('close-policy-btn-bottom');

  if (openPolicyBtn && policyModal) {
    openPolicyBtn.addEventListener('click', () => {
      policyModal.style.display = 'flex';
    });
  }
  if (closePolicyBtn && policyModal) {
    closePolicyBtn.addEventListener('click', () => { policyModal.style.display = 'none'; });
  }
  if (closePolicyBottom && policyModal) {
    closePolicyBottom.addEventListener('click', () => { policyModal.style.display = 'none'; });
  }

  // 4. Loan Application Modal
  const loanModal = document.getElementById('modal-apply-loan');
  const openLoanBtn = document.getElementById('btn-open-loan-modal');
  const closeLoanBtn = document.getElementById('close-loan-modal');
  const submitLoanBtn = document.getElementById('btn-submit-coop-loan');
  const loanAmtInput = document.getElementById('input-loan-amount');
  const loanPurposeInput = document.getElementById('input-loan-purpose');
  const tenureBtns = document.querySelectorAll('.coop-tenure-btn');
  const interestCalcEl = document.getElementById('calc-loan-interest');
  const monthlyCalcEl = document.getElementById('calc-loan-monthly');

  let selectedTenure = 6;

  function updateLoanCalcs() {
    const amt = parseFloat(loanAmtInput?.value || 0);
    const rate = activeCoop.loanInterestRate || 5.0;
    const interest = amt * (rate / 100);
    const total = amt + interest;
    const monthly = selectedTenure > 0 ? (total / selectedTenure) : total;

    if (interestCalcEl) interestCalcEl.textContent = store.formatMoney(interest);
    if (monthlyCalcEl) monthlyCalcEl.textContent = `${store.formatMoney(monthly)} / mo`;
  }

  if (openLoanBtn && loanModal) {
    openLoanBtn.addEventListener('click', () => {
      loanModal.style.display = 'flex';
      updateLoanCalcs();
    });
  }
  if (closeLoanBtn && loanModal) {
    closeLoanBtn.addEventListener('click', () => { loanModal.style.display = 'none'; });
  }

  tenureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tenureBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTenure = parseInt(btn.dataset.months) || 6;
      updateLoanCalcs();
    });
  });

  if (loanAmtInput) {
    loanAmtInput.addEventListener('input', updateLoanCalcs);
  }

  if (submitLoanBtn) {
    submitLoanBtn.addEventListener('click', () => {
      const amt = parseFloat(loanAmtInput?.value || 0);
      const purpose = loanPurposeInput?.value || "Cooperative Loan";
      try {
        const req = store.submitMemberLoanRequest(amt, selectedTenure, purpose);
        if (loanModal) loanModal.style.display = 'none';
        showToast(`✓ Application ${req.id} (₦${amt.toLocaleString()}) submitted to Credit Committee! Switch to Admin Portal to review & approve.`, 'success');
        window.location.hash = '#/app/cooperative';
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }

  // 5. Year-End Share-out Claim / Pack
  const claimBtn = document.getElementById('btn-claim-payout');
  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      try {
        const total = store.claimYearEndPayout();
        showToast(`Pack Your Money Success! ${store.formatMoney(total)} credited to your Main Wallet!`, 'success');
        window.location.hash = '#/app/cooperative';
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }

  const rolloverBtn = document.getElementById('btn-rollover-payout');
  if (rolloverBtn) {
    rolloverBtn.addEventListener('click', () => {
      showToast("✓ Capital & dividends marked for 2027 compound rollover!", 'info');
    });
  }

  const autoSaveBtn = document.getElementById('btn-quick-auto-save');
  if (autoSaveBtn) {
    autoSaveBtn.addEventListener('click', () => {
      showToast(`Monthly standing order active: ₦${activeCoop.minMonthlyContribution.toLocaleString()} deducted on 28th.`);
    });
  }
}
