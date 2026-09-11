import { store } from '../state/store.js';
import { getCompanyLogo } from '../components/companyLogos.js';

export function renderServicesView() {
  return `
    <div class="app-wrapper" style="max-width: 480px; margin: 0 auto; min-height: 100vh; padding-bottom: 90px; background: var(--bg-app);">
      <!-- Top Header -->
      <header style="display: flex; align-items: center; justify-content: space-between; padding: 20px 20px 10px 20px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: var(--zpay-green); color: #041209; font-weight: 900; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 0 12px rgba(0,210,106,0.35);">
            Z
          </div>
          <span style="font-size: 18px; font-weight: 800; letter-spacing: 2px; color: var(--text-primary);">ZPAY</span>
        </div>

        <a href="#/support" style="width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: var(--text-primary); text-decoration: none; position: relative;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span style="position: absolute; top: 9px; right: 9px; width: 8px; height: 8px; border-radius: 50%; background: #FF453A;"></span>
        </a>
      </header>

      <!-- Title & Subtitle -->
      <div style="padding: 10px 20px 16px 20px;">
        <h1 style="font-size: 28px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.5px; margin-bottom: 4px;">Services</h1>
        <p style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">Pay bills, top up and register in seconds</p>
      </div>

      <div style="padding: 0 20px; display: flex; flex-direction: column; gap: 20px;">
        <!-- Featured Hero Card (Electricity - Most Used) -->
        <a href="#/app/bills" style="text-decoration: none; display: block;">
          <div style="position: relative; overflow: hidden; border-radius: 20px; padding: 22px; background: linear-gradient(135deg, #151A21 0%, #11281E 60%, #08381E 100%); border: 1px solid rgba(0, 210, 106, 0.3); box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 210, 106, 0.15); transition: transform 0.2s ease, box-shadow 0.2s ease;">
            <!-- Glow circle in background -->
            <div style="position: absolute; right: -40px; top: -40px; width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle, rgba(0, 210, 106, 0.25) 0%, transparent 70%); pointer-events: none;"></div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <!-- DisCo logos row -->
              <div style="display: flex; gap: 6px; align-items: center;">
                ${getCompanyLogo('ikedc', 32)}
                ${getCompanyLogo('ekedc', 32)}
                ${getCompanyLogo('aedc', 32)}
                ${getCompanyLogo('ibedc', 32)}
              </div>
              <span style="background: rgba(0, 210, 106, 0.2); border: 1px solid rgba(0, 210, 106, 0.35); color: var(--zpay-green); font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.5px;">
                Most used
              </span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end;">
              <div>
                <h3 style="font-size: 20px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;">Electricity Tokens</h3>
                <p style="font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.75);">IKEDC, EKEDC, AEDC, IBEDC — Instant prepaid tokens</p>
              </div>
              <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; color: #FFFFFF;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </div>
        </a>

        <!-- Section: POPULAR -->
        <div>
          <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-muted); margin-bottom: 12px;">Popular Services</p>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
            <!-- Airtime -->
            <a href="#/app/airtime" class="service-menu-card" style="text-decoration: none; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 10px; transition: all 0.2s ease;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <!-- Network logos row -->
                <div style="display: flex; gap: 4px;">
                  ${getCompanyLogo('mtn', 24)}
                  ${getCompanyLogo('airtel', 24)}
                  ${getCompanyLogo('glo', 24)}
                  ${getCompanyLogo('9mobile', 24)}
                </div>
                <span style="color: var(--text-muted); font-size: 14px;">›</span>
              </div>
              <div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">Airtime</h4>
                <p style="font-size: 12px; color: var(--text-muted); line-height: 1.3;">MTN, Airtel, Glo & 9mobile</p>
              </div>
            </a>

            <!-- Data Plans -->
            <a href="#/app/data" class="service-menu-card" style="text-decoration: none; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 10px; transition: all 0.2s ease;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <!-- Network logos row -->
                <div style="display: flex; gap: 4px;">
                  ${getCompanyLogo('mtn', 24)}
                  ${getCompanyLogo('airtel', 24)}
                  ${getCompanyLogo('glo', 24)}
                  ${getCompanyLogo('9mobile', 24)}
                </div>
                <span style="color: var(--text-muted); font-size: 14px;">›</span>
              </div>
              <div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">Data Bundles</h4>
                <p style="font-size: 12px; color: var(--text-muted); line-height: 1.3;">Instant 4G/5G data packages</p>
              </div>
            </a>

            <!-- Cable TV -->
            <a href="#/app/bills" class="service-menu-card" style="text-decoration: none; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 10px; transition: all 0.2s ease;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; gap: 4px;">
                  ${getCompanyLogo('dstv', 24)}
                  ${getCompanyLogo('gotv', 24)}
                  ${getCompanyLogo('startimes', 24)}
                </div>
                <span style="color: var(--text-muted); font-size: 14px;">›</span>
              </div>
              <div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">Cable TV</h4>
                <p style="font-size: 12px; color: var(--text-muted); line-height: 1.3;">DStv, GOtv, StarTimes</p>
              </div>
            </a>

            <!-- QR & Contactless Pay -->
            <a href="#/app/qr-pay" class="service-menu-card" style="text-decoration: none; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 10px; transition: all 0.2s ease;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: rgba(245, 184, 46, 0.12); border: 1px solid rgba(245, 184, 46, 0.3); display: flex; align-items: center; justify-content: center; font-size: 18px;">⛶</div>
                <span style="color: var(--text-muted); font-size: 14px;">›</span>
              </div>
              <div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">QR Pay</h4>
                <p style="font-size: 12px; color: var(--text-muted); line-height: 1.3;">Scan merchant POS counters</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Section: FUND WALLET -->
        <a href="#/app/add-money" style="text-decoration: none; background: var(--bg-card); border: 1px solid rgba(0, 210, 106, 0.25); border-radius: 16px; padding: 16px; display: flex; align-items: center; gap: 14px;">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(0, 210, 106, 0.14); border: 1px solid var(--zpay-green); display: flex; align-items: center; justify-content: center; font-size: 20px; color: var(--zpay-green);">
            💳
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary);">Fund Wallet</h4>
              <span style="background: var(--zpay-green); color: #041209; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">0% FEE</span>
            </div>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Card, Dedicated Virtual Account, Bank Transfer</p>
          </div>
          <span style="color: var(--zpay-green); font-size: 18px; font-weight: 700;">+</span>
        </a>

        <!-- Section: EXAMS & REGISTRATION -->
        <div>
          <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-muted); margin-bottom: 12px;">Exams &amp; Registration</p>
          
          <div style="display: flex; gap: 10px;">
            <a href="#/app/bills" style="flex: 1; text-decoration: none; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 14px 12px; display: flex; align-items: center; gap: 10px;">
              <div style="display: flex; gap: 5px; align-items: center; flex-shrink: 0;">
                ${getCompanyLogo('waec', 32)}
                ${getCompanyLogo('jamb', 32)}
                ${getCompanyLogo('neco', 32)}
              </div>
              <div>
                <p style="font-size: 13px; font-weight: 700; color: var(--text-primary);">WAEC / JAMB</p>
                <p style="font-size: 11px; color: var(--text-muted);">NECO Exam PINs</p>
              </div>
            </a>

            <a href="#/app/bills" style="flex: 1; text-decoration: none; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 14px 12px; display: flex; align-items: center; gap: 10px;">
              <div style="width: 34px; height: 34px; border-radius: 10px; background: rgba(59, 130, 246, 0.12); display: flex; align-items: center; justify-content: center; font-size: 16px;">
                🎮
              </div>
              <div>
                <p style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Betting Wallet</p>
                <p style="font-size: 11px; color: var(--text-muted);">SportyBet, 1xBet</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Support / Assistant Card -->
        <a href="#/support" style="text-decoration: none; background: rgba(21, 26, 33, 1); border: 1px solid rgba(0, 210, 106, 0.2); border-radius: 16px; padding: 16px; display: flex; align-items: center; gap: 14px; margin-bottom: 20px;">
          <div style="width: 42px; height: 42px; border-radius: 12px; background: rgba(0, 210, 106, 0.12); display: flex; align-items: center; justify-content: center; font-size: 20px; color: var(--zpay-green);">
            🎧
          </div>
          <div style="flex: 1;">
            <p style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Need help?</p>
            <p style="font-size: 12px; color: var(--text-muted);">Talk to the ZPAY assistant anytime</p>
          </div>
          <span style="font-size: 18px; color: var(--zpay-green);">💬</span>
        </a>
      </div>

      <!-- Bottom Nav (Home | Services | Activity | Profile) -->
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
  // Can add active filters or service interactions
}
