import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';

export function renderCooperativeAdminView() {
  const activeCoop = store.getActiveCooperative();
  const exec = store.executiveUser;
  const treasury = store.societyTreasury;
  const pendingRequests = store.pendingLoanRequests;
  const members = store.societyMembers;

  const pendingCount = pendingRequests.filter(r => r.status === 'Pending Approval').length;

  return `
    <div class="app-wrapper" style="padding-bottom: 90px;">
      
      <!-- Top Executive Screen Header -->
      <header class="screen-header" style="background:var(--bg-app); position:sticky; top:0; z-index:20; border-bottom:1px solid var(--border-subtle);">
        <a href="#/app/services" class="back-btn" title="Back to Services">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <div style="text-align:center;">
          <div style="display:flex; align-items:center; justify-content:center; gap:6px;">
            <span class="screen-title" style="font-size:15px; font-weight:800;">Cooperative Admin Portal</span>
            <span class="zpay-badge zpay-badge-danger" style="font-size:9px; padding:2px 6px;">EXECUTIVE</span>
          </div>
          <div style="font-size:11px; color:var(--text-muted);">${activeCoop.shortName}</div>
        </div>
        <a href="#/app/cooperative" class="zpay-btn zpay-btn-secondary zpay-btn-sm" style="font-size:11px; padding:6px 10px; text-decoration:none; border-color:rgba(234,0,41,0.4); display:inline-flex; align-items:center; gap:5px;" title="Switch to Member View">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Member View
        </a>
      </header>

      <div style="padding: 16px 20px; display: flex; flex-direction: column; gap: 20px;">

        <!-- Executive Officer Card -->
        <div style="background: linear-gradient(135deg, rgba(234,0,41,0.12), rgba(0,0,0,0.4)); border: 1px solid rgba(234,0,41,0.3); border-radius:18px; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="width:48px; height:48px; border-radius:14px; background:var(--zpay-green); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:18px; box-shadow:0 4px 12px rgba(234,0,41,0.3);">
                ${exec.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div style="font-size:15px; font-weight:800; color:var(--text-primary);">${exec.name}</div>
                <div style="font-size:12px; color:var(--zpay-green); font-weight:700;">${exec.title}</div>
                <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Reg No: ${exec.regNo} &bull; ${exec.signatoryLevel}</div>
              </div>
            </div>
            <span class="zpay-badge zpay-badge-success" style="font-size:10px; display:inline-flex; align-items:center; gap:5px;"><span style="width:6px; height:6px; border-radius:50%; background:currentColor; display:inline-block;"></span> Live Audit</span>
          </div>
        </div>

        <!-- Society Treasury Liquidity Overview -->
        <div class="balance-card" style="background: linear-gradient(135deg, #1b0007 0%, #0d0004 60%, #150005 100%); border:1px solid rgba(234,0,41,0.35); box-shadow: 0 12px 36px rgba(234,0,41,0.2);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div class="balance-label" style="display:flex; align-items:center; gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/><line x1="8" y1="14" x2="8" y2="17"/><line x1="12" y1="14" x2="12" y2="17"/><line x1="16" y1="14" x2="16" y2="17"/></svg>
              Society Master Treasury Vault
            </div>
            <span class="zpay-badge zpay-badge-info" style="font-size:10px;">FY 2026 Liquidity</span>
          </div>
          <div class="balance-amount" style="margin: 10px 0 6px 0; color:#fff; font-size:32px;">
            ${store.formatMoney(treasury.vaultBalance)}
          </div>
          <div style="font-size:12px; color:rgba(255,255,255,0.7); margin-bottom:16px; display:flex; justify-content:space-between;">
            <span>Members Registered: <strong style="color:#fff;">${treasury.totalMembers} active</strong></span>
            <span>Loan Recovery: <strong style="color:var(--zpay-green);">${treasury.repaymentRate}%</strong></span>
          </div>

          <!-- Treasury 3-Way Metric Grid -->
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; background:rgba(255,255,255,0.06); border-radius:12px; padding:10px;">
            <div>
              <div style="font-size:10px; color:rgba(255,255,255,0.6);">Member Savings</div>
              <div style="font-size:12px; font-weight:800; color:#fff; margin-top:2px;">₦${(treasury.memberEquityPool / 1000000).toFixed(1)}M</div>
            </div>
            <div style="border-left:1px solid rgba(255,255,255,0.1); padding-left:8px;">
              <div style="font-size:10px; color:rgba(255,255,255,0.6);">Loan Book</div>
              <div style="font-size:12px; font-weight:800; color:#38bdf8; margin-top:2px;">₦${(treasury.activeLoans / 1000000).toFixed(1)}M</div>
            </div>
            <div style="border-left:1px solid rgba(255,255,255,0.1); padding-left:8px;">
              <div style="font-size:10px; color:rgba(255,255,255,0.6);">Dividend Pool</div>
              <div style="font-size:12px; font-weight:800; color:#eab308; margin-top:2px;">₦${(treasury.dividendReserve / 1000000).toFixed(2)}M</div>
            </div>
          </div>
        </div>

        <!-- Executive Navigation Tabs -->
        <div class="zpay-tabs" style="margin-bottom:0; display:flex; gap:6px; overflow-x:auto;">
          <button class="zpay-tab-btn active" id="admin-tab-loans" style="padding:8px 12px; font-size:12px; white-space:nowrap; display:inline-flex; align-items:center; gap:5px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Pending Loans ${pendingCount > 0 ? `<span style="background:var(--zpay-green); color:#fff; border-radius:99px; padding:1px 6px; font-size:10px; margin-left:4px;">${pendingCount}</span>` : ''}
          </button>
          <button class="zpay-tab-btn" id="admin-tab-roster" style="padding:8px 12px; font-size:12px; white-space:nowrap; display:inline-flex; align-items:center; gap:5px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Member Roster
          </button>
          <button class="zpay-tab-btn" id="admin-tab-dividend" style="padding:8px 12px; font-size:12px; white-space:nowrap; display:inline-flex; align-items:center; gap:5px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
            Dividend Payout
          </button>
          <button class="zpay-tab-btn" id="admin-tab-policy" style="padding:8px 12px; font-size:12px; white-space:nowrap; display:inline-flex; align-items:center; gap:5px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            Bylaws
          </button>
        </div>

        <!-- SECTION 1: PENDING LOAN APPROVALS -->
        <div id="section-admin-loans" style="display:flex; flex-direction:column; gap:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 style="font-size:15px; font-weight:800; margin:0; color:var(--text-primary);">Credit Committee Loan Review</h3>
              <p style="font-size:12px; color:var(--text-muted); margin:2px 0 0 0;">Review member borrowing requests against savings equity</p>
            </div>
            <span class="zpay-badge zpay-badge-info" style="font-size:11px;">Dual Sign-off</span>
          </div>

          ${pendingRequests.length === 0 ? `
            <div style="background:var(--bg-card); border-radius:14px; padding:30px 20px; text-align:center; border:1px solid var(--border-subtle);">
              <div style="width:48px; height:48px; border-radius:50%; background:rgba(234,0,41,0.1); color:var(--zpay-green); display:flex; align-items:center; justify-content:center; margin:0 auto 10px auto;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style="font-weight:700; color:var(--text-primary); font-size:14px;">No Pending Loan Applications</div>
              <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">All cooperative member loan applications have been audited and disbursed.</div>
            </div>
          ` : `
            <div style="display:flex; flex-direction:column; gap:12px;">
              ${pendingRequests.map(req => {
                const isPending = req.status === 'Pending Approval';
                const isApproved = req.status === 'Approved & Disbursed';
                const isDeclined = req.status === 'Declined';
                const equityRatio = ((req.amount / (req.memberEquity || 1))).toFixed(1);

                return `
                  <div class="zpay-card" style="border:1px solid ${isPending ? 'rgba(234,0,41,0.3)' : 'var(--border-subtle)'}; background:var(--bg-card); padding:16px;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                      <div>
                        <div style="font-size:14px; font-weight:800; color:var(--text-primary);">${req.applicantName}</div>
                        <div style="font-size:11px; color:var(--text-muted);">Member ID: ${req.applicantId} &bull; ${req.requestDate}</div>
                      </div>
                      <span class="zpay-badge ${isPending ? 'zpay-badge-warning' : (isApproved ? 'zpay-badge-success' : 'zpay-badge-danger')}" style="font-size:10px;">
                        ${req.status}
                      </span>
                    </div>

                    <!-- Financial breakdown -->
                    <div style="background:var(--bg-input); border-radius:12px; padding:12px; display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px; font-size:12px;">
                      <div>
                        <div style="color:var(--text-muted); font-size:11px;">Requested Loan:</div>
                        <div style="font-size:16px; font-weight:800; color:var(--zpay-green); margin-top:2px;">${store.formatMoney(req.amount)}</div>
                        <div style="font-size:10px; color:var(--text-muted);">${req.tenureMonths} months @ ${req.interestRate}% p.a.</div>
                      </div>
                      <div>
                        <div style="color:var(--text-muted); font-size:11px;">Member Savings Equity:</div>
                        <div style="font-size:14px; font-weight:700; color:var(--text-primary); margin-top:2px;">${store.formatMoney(req.memberEquity)}</div>
                        <div style="font-size:10px; color:${parseFloat(equityRatio) <= 3.0 ? 'var(--zpay-green)' : '#ef4444'};">
                          Leverage: ${equityRatio}x (Max 3.0x)
                        </div>
                      </div>
                    </div>

                    <!-- Purpose and Guarantor -->
                    <div style="font-size:12px; color:var(--text-secondary); margin-bottom:14px; display:flex; flex-direction:column; gap:4px;">
                      <div><strong>Purpose:</strong> ${req.purpose}</div>
                      <div><strong>Guarantor:</strong> <span style="color:var(--text-primary);">${req.guarantor}</span></div>
                      <div><strong>Risk Assessment:</strong> <span style="color:var(--zpay-green); font-weight:700;">${req.riskScore}</span></div>
                      ${req.approvedBy ? `<div style="color:var(--zpay-green); font-size:11px;">✓ Authorized by ${req.approvedBy} (${req.approvedAt || 'Audited'})</div>` : ''}
                      ${req.declineReason ? `<div style="color:#ef4444; font-size:11px;">✕ Reason: ${req.declineReason}</div>` : ''}
                    </div>

                    ${isPending ? `
                      <!-- Committee Actions -->
                      <div style="display:grid; grid-template-columns:1.5fr 1fr; gap:8px;">
                        <button class="zpay-btn zpay-btn-primary btn-approve-loan" data-loan-id="${req.id}" style="padding:9px; font-size:12px; font-weight:700; justify-content:center;">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                          Approve & Disburse
                        </button>
                        <button class="zpay-btn zpay-btn-secondary btn-decline-loan" data-loan-id="${req.id}" style="padding:9px; font-size:12px; justify-content:center; color:#ef4444; border-color:rgba(239,68,68,0.3); display:inline-flex; align-items:center; gap:5px;">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Decline
                        </button>
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <!-- SECTION 2: MEMBER DIRECTORY & ROSTER -->
        <div id="section-admin-roster" style="display:none; flex-direction:column; gap:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 style="font-size:15px; font-weight:800; margin:0; color:var(--text-primary);">Society Member Directory</h3>
              <p style="font-size:12px; color:var(--text-muted); margin:2px 0 0 0;">Active contributors and individual equity balances</p>
            </div>
            <span class="zpay-badge zpay-badge-success" style="font-size:11px;">${members.length} Enrolled</span>
          </div>

          <!-- Search Input -->
          <div class="zpay-input-wrapper">
            <input type="text" id="input-roster-search" class="zpay-input" placeholder="Search by name, member ID or tier..." style="font-size:13px;" />
          </div>

          <div id="roster-list-container" style="display:flex; flex-direction:column; gap:10px;">
            ${members.map(m => `
              <div class="zpay-card member-roster-card" data-member-name="${m.name.toLowerCase()}" data-member-id="${m.id.toLowerCase()}" style="padding:14px; background:var(--bg-card); border:1px solid var(--border-subtle);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                  <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:38px; height:38px; border-radius:12px; background:rgba(234,0,41,0.15); color:var(--zpay-green); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:14px;">
                      ${m.name.charAt(0)}
                    </div>
                    <div>
                      <div style="font-size:14px; font-weight:800; color:var(--text-primary);">${m.name}</div>
                      <div style="font-size:11px; color:var(--text-muted);">${m.id} &bull; ${m.joinedDate}</div>
                    </div>
                  </div>
                  <span class="zpay-badge ${m.standing === 'Good Standing' ? 'zpay-badge-success' : 'zpay-badge-warning'}" style="font-size:10px;">
                    ${m.standing}
                  </span>
                </div>

                <div style="margin-top:12px; padding-top:10px; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; font-size:12px;">
                  <div>
                    <div style="color:var(--text-muted); font-size:10px;">Equity Balance</div>
                    <div style="font-weight:800; color:var(--text-primary); font-size:13px; margin-top:1px;">${store.formatMoney(m.totalEquitySaved)}</div>
                  </div>
                  <div>
                    <div style="color:var(--text-muted); font-size:10px;">Monthly Save</div>
                    <div style="font-weight:700; color:var(--zpay-green); font-size:13px; margin-top:1px;">₦${m.monthlyContribution.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style="color:var(--text-muted); font-size:10px;">Active Loan</div>
                    <div style="font-weight:700; color:${m.activeLoanAmount > 0 ? '#38bdf8' : 'var(--text-muted)'}; font-size:13px; margin-top:1px;">
                      ${m.activeLoanAmount > 0 ? store.formatMoney(m.activeLoanAmount) : 'None'}
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTION 3: YEAR-END BULK DIVIDEND PAYOUT -->
        <div id="section-admin-dividend" style="display:none; flex-direction:column; gap:16px;">
          <div class="zpay-card" style="border:1px solid rgba(234,179,8,0.3); background:var(--bg-card); padding:18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:40px; height:40px; border-radius:12px; background:rgba(234,179,8,0.15); color:#eab308; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="18" x2="12" y2="20"/><line x1="12" y1="4" x2="12" y2="6"/></svg>
                </div>
                <div>
                  <h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin:0;">Year-End Dividend Share-out</h3>
                  <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Annual Liquidation & Profit Capital Distribution</p>
                </div>
              </div>
              <span class="zpay-badge zpay-badge-warning" style="font-size:10px;">12.5% Rate</span>
            </div>

            <div style="background:var(--bg-input); border-radius:14px; padding:14px; margin-bottom:16px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12px;">
                <span style="color:var(--text-secondary);">Current Dividend Reserve Pool:</span>
                <strong style="color:#eab308; font-size:14px;">${store.formatMoney(treasury.dividendReserve)}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12px;">
                <span style="color:var(--text-secondary);">Eligible Beneficiaries:</span>
                <strong style="color:var(--text-primary);">${treasury.totalMembers} Active Contributors</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:12px;">
                <span style="color:var(--text-secondary);">Scheduled Distribution Date:</span>
                <strong style="color:var(--zpay-green);">${activeCoop.yearEndPayoutDate || 'Dec 15, 2026'}</strong>
              </div>
            </div>

            <div style="font-size:12px; color:var(--text-secondary); line-height:1.5; margin-bottom:16px;">
              By executing the bulk dividend disbursement, all member wallets will be credited with their respective 12.5% equity yield from the society reserve pool.
            </div>

            <button id="btn-execute-bulk-dividend" class="zpay-btn zpay-btn-primary zpay-btn-block" style="padding:12px; font-size:13px; font-weight:800; justify-content:center;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Disburse 2026 Bulk Dividend Pool Now
            </button>
          </div>
        </div>

        <!-- SECTION 4: BYLAWS & POLICY SETTINGS -->
        <div id="section-admin-policy" style="display:none; flex-direction:column; gap:14px;">
          <div class="zpay-card" style="padding:18px; background:var(--bg-card); border:1px solid var(--border-subtle);">
            <h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin:0 0 4px 0;">Cooperative Bylaws & Credit Policies</h3>
            <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">Adjust governing parameters for member loans, savings thresholds, and dividends.</p>

            <form id="form-society-policy">
              <div class="zpay-form-group">
                <label class="zpay-label">Minimum Monthly Contribution (₦)</label>
                <input type="number" id="policy-min-save" class="zpay-input" value="${activeCoop.minMonthlyContribution}" required />
                <span style="font-size:10px; color:var(--text-muted);">Current: ₦${activeCoop.minMonthlyContribution.toLocaleString()}/month</span>
              </div>

              <div class="zpay-form-group">
                <label class="zpay-label">Borrowing Multiplier Ratio (Equity x Ratio)</label>
                <input type="number" step="0.5" id="policy-loan-ratio" class="zpay-input" value="${activeCoop.loanEligibilityRatio}" required />
                <span style="font-size:10px; color:var(--text-muted);">E.g. 3.0 means a member can borrow up to 300% of saved equity.</span>
              </div>

              <div class="zpay-form-group">
                <label class="zpay-label">Annual Loan Interest Rate (% p.a.)</label>
                <input type="number" step="0.1" id="policy-interest-rate" class="zpay-input" value="${activeCoop.loanInterestRate}" required />
                <span style="font-size:10px; color:var(--text-muted);">Flat annual interest rate charged on approved member credit lines.</span>
              </div>

              <div class="zpay-form-group">
                <label class="zpay-label">Projected Annual Dividend Yield (%)</label>
                <input type="number" step="0.5" id="policy-dividend-rate" class="zpay-input" value="${activeCoop.dividendRate}" required />
                <span style="font-size:10px; color:var(--text-muted);">Target return shared during year-end money packing.</span>
              </div>

              <button type="submit" class="zpay-btn zpay-btn-primary zpay-btn-block" style="margin-top:14px; padding:12px; font-size:13px; font-weight:800; justify-content:center;">
                Save Updated Bylaw Policies
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function initCooperativeAdminListeners() {
  // 1. Tab Switching
  const tabLoans = document.getElementById('admin-tab-loans');
  const tabRoster = document.getElementById('admin-tab-roster');
  const tabDividend = document.getElementById('admin-tab-dividend');
  const tabPolicy = document.getElementById('admin-tab-policy');

  const secLoans = document.getElementById('section-admin-loans');
  const secRoster = document.getElementById('section-admin-roster');
  const secDividend = document.getElementById('section-admin-dividend');
  const secPolicy = document.getElementById('section-admin-policy');

  function switchTab(activeTab, activeSec) {
    [tabLoans, tabRoster, tabDividend, tabPolicy].forEach(t => t?.classList.remove('active'));
    [secLoans, secRoster, secDividend, secPolicy].forEach(s => { if (s) s.style.display = 'none'; });

    activeTab?.classList.add('active');
    if (activeSec) activeSec.style.display = 'flex';
  }

  tabLoans?.addEventListener('click', () => switchTab(tabLoans, secLoans));
  tabRoster?.addEventListener('click', () => switchTab(tabRoster, secRoster));
  tabDividend?.addEventListener('click', () => switchTab(tabDividend, secDividend));
  tabPolicy?.addEventListener('click', () => switchTab(tabPolicy, secPolicy));

  // 2. Loan Approval Handlers
  document.querySelectorAll('.btn-approve-loan').forEach(btn => {
    btn.addEventListener('click', () => {
      const loanId = btn.dataset.loanId;
      try {
        const approved = store.approveMemberLoan(loanId);
        showToast(`✓ Loan ${approved.id} for ${approved.applicantName} approved and ₦${approved.amount.toLocaleString()} disbursed!`, 'success');
        window.location.hash = '#/app/cooperative-admin';
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  });

  // 3. Loan Decline Handlers
  document.querySelectorAll('.btn-decline-loan').forEach(btn => {
    btn.addEventListener('click', () => {
      const loanId = btn.dataset.loanId;
      const reason = prompt("Enter committee reason for declining this application:", "Debt-to-equity leverage limits exceeded.");
      if (reason) {
        try {
          store.declineMemberLoan(loanId, reason);
          showToast(`Application ${loanId} marked as Declined.`, 'info');
          window.location.hash = '#/app/cooperative-admin';
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  });

  // 4. Member Roster Search
  const rosterSearchInput = document.getElementById('input-roster-search');
  if (rosterSearchInput) {
    rosterSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.member-roster-card').forEach(card => {
        const name = card.dataset.memberName || '';
        const id = card.dataset.memberId || '';
        if (name.includes(q) || id.includes(q)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 5. Bulk Dividend Payout Execution
  const btnBulkDiv = document.getElementById('btn-execute-bulk-dividend');
  if (btnBulkDiv) {
    btnBulkDiv.addEventListener('click', () => {
      if (confirm("Are you sure you want to execute the bulk annual dividend disbursement from the society treasury pool?")) {
        try {
          const res = store.executeBulkDividendPayout(12.5);
          showToast(`Executed ₦${res.totalDisbursed.toLocaleString()} bulk dividend across ${res.membersCount} members!`, 'success');
          window.location.hash = '#/app/cooperative-admin';
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  }

  // 6. Bylaw & Policy Update Form
  const policyForm = document.getElementById('form-society-policy');
  if (policyForm) {
    policyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const minSave = document.getElementById('policy-min-save')?.value;
      const ratio = document.getElementById('policy-loan-ratio')?.value;
      const interest = document.getElementById('policy-interest-rate')?.value;
      const dividend = document.getElementById('policy-dividend-rate')?.value;

      try {
        store.updateSocietyPolicy({
          minMonthlyContribution: minSave,
          loanEligibilityRatio: ratio,
          loanInterestRate: interest,
          dividendRate: dividend
        });
        showToast("✓ Society bylaws and credit policies updated successfully!", 'success');
        window.location.hash = '#/app/cooperative-admin';
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }
}
