import { store } from '../state/store.js';

export function renderServicesView() {
  const coop = store.getActiveCooperative();

  return `
    <div class="app-wrapper" style="padding-bottom:95px;">

      <!-- Header -->
      <header style="display:flex; align-items:center; justify-content:space-between; padding:20px 20px 14px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:36px; height:36px; border-radius:10px; background:var(--zpay-green); display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:900; color:#fff; box-shadow: 0 0 14px rgba(234,0,41,0.4);">Z</div>
          <div>
            <h2 style="font-size:20px; font-weight:900; color:var(--text-primary); margin:0; letter-spacing:0.5px;">Services</h2>
            <div style="font-size:11px; color:var(--text-muted);">All payment, savings & credit utilities</div>
          </div>
        </div>
        <a href="#/app/transactions" class="header-icon-btn" title="Activity History">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"/></svg>
        </a>
      </header>

      <div style="padding:0 20px; display:flex; flex-direction:column; gap:22px;">

        <!-- 1. PAYMENTS & TRANSFERS -->
        <div>
          <div style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:12px; display:flex; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
            Payments &amp; Transfers
          </div>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px;">
            <a href="#/app/send" class="service-card" style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px 8px; text-decoration:none;">
              <div class="service-icon-box" style="background:rgba(234,0,41,0.12); color:var(--zpay-green); width:42px; height:42px; margin:0 auto 8px auto;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
              <span class="service-name" style="font-size:12px; font-weight:700;">Send</span>
            </a>

            <a href="#/app/receive" class="service-card" style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px 8px; text-decoration:none;">
              <div class="service-icon-box" style="background:rgba(56,189,248,0.12); color:var(--color-blue); width:42px; height:42px; margin:0 auto 8px auto;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              </div>
              <span class="service-name" style="font-size:12px; font-weight:700;">Receive</span>
            </a>

            <a href="#/app/qr-pay" class="service-card" style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px 8px; text-decoration:none;">
              <div class="service-icon-box" style="background:rgba(245,158,11,0.12); color:var(--color-warning); width:42px; height:42px; margin:0 auto 8px auto; font-size:20px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              </div>
              <span class="service-name" style="font-size:12px; font-weight:700;">QR Pay</span>
            </a>
          </div>
        </div>

        <!-- 2. UTILITIES & DAILY BILLS (OPAY STYLE WITH DEDICATED ELECTRICITY) -->
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Utilities &amp; Daily Bills
            </div>
            <span style="font-size:10.5px; color:var(--zpay-green); font-weight:700;">Instant Tokens</span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px;">
            <!-- Dedicated Standalone Electricity -->
            <a href="#/app/electricity" class="service-card" style="background:linear-gradient(135deg, rgba(234,0,41,0.08), var(--bg-card)); border:1.5px solid rgba(234,0,41,0.35); border-radius:16px; padding:14px 8px; text-decoration:none; position:relative;">
              <span class="zpay-badge zpay-badge-warning" style="position:absolute; top:6px; right:6px; font-size:8px; padding:1px 4px;">DisCos</span>
              <div class="service-icon-box" style="background:rgba(234,0,41,0.15); color:var(--zpay-green); width:42px; height:42px; margin:0 auto 8px auto;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <span class="service-name" style="font-size:12px; font-weight:800; color:var(--text-primary);">Electricity</span>
            </a>

            <!-- Airtime -->
            <a href="#/app/airtime" class="service-card" style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px 8px; text-decoration:none;">
              <div class="service-icon-box airtime" style="width:42px; height:42px; margin:0 auto 8px auto;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              </div>
              <span class="service-name" style="font-size:12px; font-weight:700;">Airtime</span>
            </a>

            <!-- Data Plans -->
            <a href="#/app/data" class="service-card" style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px 8px; text-decoration:none;">
              <div class="service-icon-box data" style="width:42px; height:42px; margin:0 auto 8px auto;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>
              </div>
              <span class="service-name" style="font-size:12px; font-weight:700;">Mobile Data</span>
            </a>

            <!-- Cable TV -->
            <a href="#/app/bills" class="service-card" style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px 8px; text-decoration:none;">
              <div class="service-icon-box" style="background:rgba(168,85,247,0.12); color:var(--color-purple); width:42px; height:42px; margin:0 auto 8px auto;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <span class="service-name" style="font-size:12px; font-weight:700;">Cable TV</span>
            </a>

            <!-- Internet -->
            <a href="#/app/bills" class="service-card" style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px 8px; text-decoration:none;">
              <div class="service-icon-box" style="background:rgba(56,189,248,0.12); color:var(--color-blue); width:42px; height:42px; margin:0 auto 8px auto;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <span class="service-name" style="font-size:12px; font-weight:700;">Internet</span>
            </a>

            <!-- Exam PINs -->
            <a href="#/app/bills" class="service-card" style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px 8px; text-decoration:none;">
              <div class="service-icon-box" style="background:rgba(16,185,129,0.12); color:#10B981; width:42px; height:42px; margin:0 auto 8px auto;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <span class="service-name" style="font-size:12px; font-weight:700;">Exams (WAEC)</span>
            </a>
          </div>
        </div>

        <!-- 3. FINANCE, LOANS & SAVINGS -->
        <div>
          <div style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:12px; display:flex; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Finance, Credit &amp; Savings
          </div>
          <div style="display:flex; flex-direction:column; gap:10px;">

            <!-- ZPay Instant Cash Loan (Distinct from Cooperative) -->
            <a href="#/app/loans" style="text-decoration:none; background:var(--bg-card); border:1px solid rgba(56,189,248,0.3); border-radius:16px; padding:14px 16px; display:flex; align-items:center; justify-content:space-between; transition:all 0.2s;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:42px; height:42px; border-radius:12px; background:rgba(56,189,248,0.12); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--color-blue);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <h4 style="font-size:14px; font-weight:800; color:var(--text-primary); margin:0;">ZPay Instant Loan</h4>
                    <span class="zpay-badge zpay-badge-info" style="font-size:9px; padding:1px 6px;">No Collateral</span>
                  </div>
                  <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Pre-approved up to ₦100,000 &bull; 15–30 days emergency credit</p>
                </div>
              </div>
              <span style="font-size:13px; font-weight:700; color:var(--color-blue);">Borrow &rarr;</span>
            </a>

            <!-- Cooperative Hub & Society Loans -->
            <a href="#/app/cooperative" style="text-decoration:none; background:linear-gradient(135deg,#1b0007,#0d0004); border:1.5px solid rgba(234,0,41,0.35); border-radius:16px; padding:14px 16px; display:flex; align-items:center; justify-content:space-between; transition:all 0.2s;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:42px; height:42px; border-radius:12px; background:rgba(234,0,41,0.15); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--zpay-green);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><rect x="9" y="12" width="6" height="9"/><path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4"/></svg>
                </div>
                <div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <h4 style="font-size:14px; font-weight:800; color:#fff; margin:0;">Cooperative Society Hub</h4>
                    <span class="zpay-badge zpay-badge-warning" style="font-size:9px; padding:1px 6px;">Equity: ${store.formatMoney(store.cooperativeBalance)}</span>
                  </div>
                  <p style="font-size:11px; color:rgba(255,255,255,0.6); margin-top:2px;">${coop.shortName} &bull; Up to 3x Member Loans &bull; Dec Share-Out</p>
                </div>
              </div>
              <span style="font-size:13px; font-weight:700; color:var(--zpay-green);">Hub &rarr;</span>
            </a>

            <!-- Target Osusu (Savings Only) -->
            <a href="#/app/osusu" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px 16px; display:flex; align-items:center; justify-content:space-between; transition:all 0.2s;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:42px; height:42px; border-radius:12px; background:rgba(0,210,106,0.12); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--zpay-green);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <h4 style="font-size:14px; font-weight:800; color:var(--text-primary); margin:0;">Target Osusu &amp; Thrift</h4>
                    <span class="zpay-badge zpay-badge-success" style="font-size:9px; padding:1px 6px;">12% Yield</span>
                  </div>
                  <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Lock personal savings goals &bull; Rotational group Ajo/Esusu</p>
                </div>
              </div>
              <span style="font-size:13px; font-weight:700; color:var(--zpay-green);">Save &rarr;</span>
            </a>
          </div>
        </div>

        <!-- 4. COMMERCE & SHOPPING (CDCARE STYLE) -->
        <div>
          <div style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:12px; display:flex; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            Shopping &amp; Installments
          </div>

          <a href="#/app/paysmallsmall" style="text-decoration:none; background:linear-gradient(135deg, #101c33 0%, #080f1d 100%); border:1.5px solid rgba(56,189,248,0.35); border-radius:18px; padding:16px; display:flex; flex-direction:column; gap:10px; transition:all 0.2s;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:44px; height:44px; border-radius:12px; background:rgba(56,189,248,0.15); display:flex; align-items:center; justify-content:center; color:var(--color-blue);">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                </div>
                <div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <h4 style="font-size:15px; font-weight:800; color:#fff; margin:0;">Pay Small Small Marketplace</h4>
                    <span class="zpay-badge zpay-badge-info" style="font-size:9px; padding:2px 6px;">CDcare Style</span>
                  </div>
                  <p style="font-size:11px; color:rgba(255,255,255,0.65); margin-top:2px;">
                    Buy brand new phones, laptops &amp; appliances. Delivery at <strong>50% paid</strong>!
                  </p>
                </div>
              </div>
              <span style="color:rgba(255,255,255,0.4); font-size:18px;">›</span>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:rgba(255,255,255,0.7); background:rgba(56,189,248,0.08); padding:8px 12px; border-radius:10px;">
              <span>Zero Interest</span> &bull;
              <span>Weekly/Monthly</span> &bull;
              <strong style="color:var(--color-blue);">Shop Gadgets &amp; Inverters &rarr;</strong>
            </div>
          </a>
        </div>

        <!-- 5. ECOSYSTEM & SECURITY -->
        <div>
          <div style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:12px; display:flex; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            Ecosystem &amp; Security
          </div>
          <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:10px;">

            <a href="#/app/zref" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px; display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="width:38px; height:38px; border-radius:10px; background:rgba(234,0,41,0.12); display:flex; align-items:center; justify-content:center; color:var(--zpay-green);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                </div>
                <span class="zpay-badge zpay-badge-warning" style="font-size:8px;">Dues</span>
              </div>
              <div>
                <h4 style="font-size:13px; font-weight:700; color:var(--text-primary); margin:0;">Zref Revenue</h4>
                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Community dues &amp; levies</p>
              </div>
            </a>

            <a href="#/app/zso" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px; display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="width:38px; height:38px; border-radius:10px; background:rgba(56,189,248,0.1); display:flex; align-items:center; justify-content:center; color:var(--color-blue);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <span class="zpay-badge zpay-badge-info" style="font-size:8px;">Escrow</span>
              </div>
              <div>
                <h4 style="font-size:13px; font-weight:700; color:var(--text-primary); margin:0;">Zso Escrow</h4>
                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Buyer &amp; seller protection</p>
              </div>
            </a>

            <a href="#/app/atm" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px; display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="width:38px; height:38px; border-radius:10px; background:rgba(168,85,247,0.12); display:flex; align-items:center; justify-content:center; color:#a855f7;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                </div>
                <span class="zpay-badge zpay-badge-success" style="font-size:8px;">Active</span>
              </div>
              <div>
                <h4 style="font-size:13px; font-weight:700; color:var(--text-primary); margin:0;">Cards &amp; ATM</h4>
                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Manage virtual card</p>
              </div>
            </a>

            <a href="#/app/community" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:14px; display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="width:38px; height:38px; border-radius:10px; background:rgba(16,185,129,0.12); display:flex; align-items:center; justify-content:center; color:#10b981;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <span class="zpay-badge zpay-badge-info" style="font-size:8px;">Forum</span>
              </div>
              <div>
                <h4 style="font-size:13px; font-weight:700; color:var(--text-primary); margin:0;">Community</h4>
                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Discussions &amp; voting</p>
              </div>
            </a>

          </div>
        </div>

      </div>

      <!-- Bottom Nav -->
      <nav class="app-bottom-nav">
        <a href="#/app" class="nav-tab-item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Home</span>
        </a>
        <a href="#/app/services" class="nav-tab-item active">
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

export function initServicesListeners() {
  // Any interactive listeners if needed
}
