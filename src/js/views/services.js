import { store } from '../state/store.js';
import { getCompanyLogo } from '../components/companyLogos.js';

export function renderServicesView() {
  return `
    <div class="app-wrapper" style="padding-bottom:90px;">

      <!-- Header -->
      <header style="display:flex; align-items:center; justify-content:space-between; padding:20px 20px 10px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:34px; height:34px; border-radius:9px; background:var(--zpay-green); display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:900; color:#fff; box-shadow: 0 0 14px rgba(234,0,41,0.4);">Z</div>
          <span style="font-size:19px; font-weight:800; letter-spacing:1.5px; color:var(--text-primary);">SERVICES</span>
        </div>
        <button class="header-icon-btn" id="header-notif-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <div class="notification-badge"></div>
        </button>
      </header>

      <div style="padding:0 20px; display:flex; flex-direction:column; gap:24px;">

        <!-- ===== COOPERATIVE SERVICES ===== -->
        <div>
          <p style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:14px;">🏦 Cooperative Services</p>

          <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px;">

            <a href="#/app/loans" class="service-menu-card" style="text-decoration:none; background:linear-gradient(135deg,#1a0007,#0d0003); border:1px solid rgba(234,0,41,0.3); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:10px; transition:all 0.2s;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="width:42px; height:42px; border-radius:12px; background:rgba(234,0,41,0.15); display:flex; align-items:center; justify-content:center; font-size:20px;">💸</div>
                <span style="color:rgba(255,255,255,0.3); font-size:16px;">›</span>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:#fff; margin-bottom:2px;">Cooperative Loans</h4>
                <p style="font-size:11px; color:rgba(255,255,255,0.5);">Borrow at 5% flat interest</p>
              </div>
            </a>

            <a href="#/app/osusu" class="service-menu-card" style="text-decoration:none; background:linear-gradient(135deg,#0a1a0a,#030d03); border:1px solid rgba(0,210,106,0.25); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:10px; transition:all 0.2s;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="width:42px; height:42px; border-radius:12px; background:rgba(0,210,106,0.12); display:flex; align-items:center; justify-content:center; font-size:20px;">🏦</div>
                <span style="color:rgba(255,255,255,0.3); font-size:16px;">›</span>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:#fff; margin-bottom:2px;">Osusu & Pay Small Small</h4>
                <p style="font-size:11px; color:rgba(255,255,255,0.5);">Savings & installment plans</p>
              </div>
            </a>

            <a href="#/app/community" class="service-menu-card" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:10px; transition:all 0.2s;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="width:42px; height:42px; border-radius:12px; background:rgba(56,189,248,0.12); display:flex; align-items:center; justify-content:center; font-size:20px;">👥</div>
                <span style="color:var(--text-muted); font-size:16px;">›</span>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:2px;">Community</h4>
                <p style="font-size:11px; color:var(--text-muted);">Discussions & announcements</p>
              </div>
            </a>

            <a href="#/app/atm" class="service-menu-card" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:10px; transition:all 0.2s;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="width:42px; height:42px; border-radius:12px; background:rgba(168,85,247,0.12); display:flex; align-items:center; justify-content:center; font-size:20px;">💳</div>
                <span style="color:var(--text-muted); font-size:16px;">›</span>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:2px;">Cards & ATM</h4>
                <p style="font-size:11px; color:var(--text-muted);">Manage card, find ATMs</p>
              </div>
            </a>
          </div>
        </div>

        <!-- ===== ECOSYSTEM APPS ===== -->
        <div>
          <p style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:14px;">⚡ Ecosystem Apps</p>
          <div style="display:flex; flex-direction:column; gap:10px;">

            <a href="#/app/zref" style="text-decoration:none; background:var(--bg-card); border:1px solid rgba(234,0,41,0.2); border-radius:16px; padding:16px; display:flex; align-items:center; gap:14px; transition:all 0.2s;">
              <div style="width:46px; height:46px; border-radius:13px; background:rgba(234,0,41,0.12); border:1px solid rgba(234,0,41,0.25); display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0;">🏛️</div>
              <div style="flex:1;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <h4 style="font-size:15px; font-weight:700; color:var(--text-primary);">Zref App</h4>
                  <span style="background:rgba(234,0,41,0.15); color:var(--zpay-green); font-size:10px; font-weight:700; padding:2px 8px; border-radius:4px;">REVENUE</span>
                </div>
                <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Pay community dues & levies instantly</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </a>

            <a href="#/app/zso" style="text-decoration:none; background:var(--bg-card); border:1px solid rgba(56,189,248,0.2); border-radius:16px; padding:16px; display:flex; align-items:center; gap:14px; transition:all 0.2s;">
              <div style="width:46px; height:46px; border-radius:13px; background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.25); display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0;">🔒</div>
              <div style="flex:1;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <h4 style="font-size:15px; font-weight:700; color:var(--text-primary);">Zso Escrow</h4>
                  <span style="background:rgba(56,189,248,0.12); color:var(--color-blue); font-size:10px; font-weight:700; padding:2px 8px; border-radius:4px;">ESCROW</span>
                </div>
                <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Safe account for transaction funds</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          </div>
        </div>

        <!-- ===== PAYMENTS ===== -->
        <div>
          <p style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:14px;">💳 Payments & Transfers</p>
          <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px;">

            <a href="#/app/send" class="service-menu-card" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:10px; transition:all 0.2s;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="width:42px; height:42px; border-radius:12px; background:rgba(234,0,41,0.1); display:flex; align-items:center; justify-content:center; color:var(--zpay-green);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
                <span style="color:var(--text-muted); font-size:16px;">›</span>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:2px;">Send Money</h4>
                <p style="font-size:11px; color:var(--text-muted);">Transfer to any bank</p>
              </div>
            </a>

            <a href="#/app/receive" class="service-menu-card" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:10px; transition:all 0.2s;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="width:42px; height:42px; border-radius:12px; background:rgba(56,189,248,0.1); display:flex; align-items:center; justify-content:center; color:var(--color-blue);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                </div>
                <span style="color:var(--text-muted); font-size:16px;">›</span>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:2px;">Receive Money</h4>
                <p style="font-size:11px; color:var(--text-muted);">Share account & QR code</p>
              </div>
            </a>

            <a href="#/app/qr-pay" class="service-menu-card" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:10px; transition:all 0.2s;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="width:42px; height:42px; border-radius:12px; background:rgba(245,158,11,0.1); display:flex; align-items:center; justify-content:center; font-size:20px;">⛶</div>
                <span style="color:var(--text-muted); font-size:16px;">›</span>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:2px;">QR Pay</h4>
                <p style="font-size:11px; color:var(--text-muted);">Scan & pay merchants</p>
              </div>
            </a>

            <a href="#/app/add-money" class="service-menu-card" style="text-decoration:none; background:var(--bg-card); border:1px solid rgba(234,0,41,0.2); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:10px; transition:all 0.2s;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="width:42px; height:42px; border-radius:12px; background:rgba(234,0,41,0.1); display:flex; align-items:center; justify-content:center; font-size:20px;">💳</div>
                <span style="color:var(--text-muted); font-size:16px;">›</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                <h4 style="font-size:14px; font-weight:700; color:var(--text-primary);">Fund Wallet</h4>
                <span style="background:var(--zpay-green); color:#fff; font-size:9px; font-weight:800; padding:2px 6px; border-radius:4px;">0% FEE</span>
              </div>
            </a>
          </div>
        </div>

        <!-- ===== UTILITIES ===== -->
        <div>
          <p style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:14px;">🔌 Utilities & Bills</p>

          <!-- Electricity Hero -->
          <a href="#/app/bills" style="text-decoration:none; display:block; margin-bottom:12px;">
            <div style="position:relative; overflow:hidden; border-radius:20px; padding:20px; background:linear-gradient(135deg,#151A21 0%,#11281E 60%,#08381E 100%); border:1px solid rgba(0,210,106,0.3); box-shadow:0 12px 30px -5px rgba(0,0,0,0.6); transition:transform 0.2s;">
              <div style="position:absolute; right:-40px; top:-40px; width:160px; height:160px; border-radius:50%; background:radial-gradient(circle,rgba(0,210,106,0.2) 0%,transparent 70%); pointer-events:none;"></div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <div style="display:flex; gap:6px;">
                  ${getCompanyLogo('ikedc', 30)}
                  ${getCompanyLogo('ekedc', 30)}
                  ${getCompanyLogo('aedc', 30)}
                  ${getCompanyLogo('ibedc', 30)}
                </div>
                <span style="background:rgba(0,210,106,0.2); border:1px solid rgba(0,210,106,0.35); color:#00D26A; font-size:10px; font-weight:700; padding:3px 8px; border-radius:99px;">Most Used</span>
              </div>
              <h3 style="font-size:18px; font-weight:700; color:#fff; margin-bottom:3px;">Electricity Tokens</h3>
              <p style="font-size:12px; color:rgba(255,255,255,0.65);">IKEDC, EKEDC, AEDC, IBEDC — Instant prepaid tokens</p>
            </div>
          </a>

          <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px;">
            <a href="#/app/airtime" class="service-menu-card" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; gap:4px;">
                ${getCompanyLogo('mtn', 24)}
                ${getCompanyLogo('airtel', 24)}
                ${getCompanyLogo('glo', 24)}
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:2px;">Airtime</h4>
                <p style="font-size:11px; color:var(--text-muted);">MTN, Airtel, Glo & 9mobile</p>
              </div>
            </a>

            <a href="#/app/data" class="service-menu-card" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; gap:4px;">
                ${getCompanyLogo('mtn', 24)}
                ${getCompanyLogo('airtel', 24)}
                ${getCompanyLogo('glo', 24)}
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:2px;">Data Bundles</h4>
                <p style="font-size:11px; color:var(--text-muted);">Instant 4G/5G packages</p>
              </div>
            </a>

            <a href="#/app/bills" class="service-menu-card" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; gap:4px;">
                ${getCompanyLogo('dstv', 24)}
                ${getCompanyLogo('gotv', 24)}
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:2px;">Cable TV</h4>
                <p style="font-size:11px; color:var(--text-muted);">DStv, GOtv, StarTimes</p>
              </div>
            </a>

            <a href="#/app/bills" class="service-menu-card" style="text-decoration:none; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; gap:4px;">
                ${getCompanyLogo('waec', 24)}
                ${getCompanyLogo('jamb', 24)}
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:2px;">WAEC / JAMB</h4>
                <p style="font-size:11px; color:var(--text-muted);">Exam pins & registration</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Support -->
        <a href="#/support" style="text-decoration:none; background:var(--bg-card); border:1px solid rgba(234,0,41,0.15); border-radius:16px; padding:16px; display:flex; align-items:center; gap:14px; margin-bottom:10px;">
          <div style="width:44px; height:44px; border-radius:12px; background:rgba(234,0,41,0.1); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;">🎧</div>
          <div style="flex:1;">
            <p style="font-size:14px; font-weight:700; color:var(--text-primary);">Need Help?</p>
            <p style="font-size:12px; color:var(--text-muted);">Talk to the ZenithCoop support team</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
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
  document.getElementById('header-notif-btn')?.addEventListener('click', () => {
    alert('🔔 No new notifications.');
  });
}
