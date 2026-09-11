import { store } from '../state/store.js';

export function renderLandingView() {
  return `
    <header class="web-header">
      <div class="web-container nav-wrapper">
        <a href="#/" class="logo-brand">
          <div class="logo-icon">Z</div>
          <span>ZPay</span>
        </a>
        <nav class="nav-links">
          <a href="#/how-it-works" class="nav-link">How It Works</a>
          <a href="#/security" class="nav-link">Security</a>
          <a href="#/support" class="nav-link">Support</a>
        </nav>
        <div class="nav-actions">
          <a href="#/login" class="zpay-btn zpay-btn-secondary zpay-btn-sm">Sign In</a>
          <a href="#/app" class="zpay-btn zpay-btn-primary zpay-btn-sm">Launch App 🚀</a>
        </div>
      </div>
    </header>

    <main>
      <!-- Hero Section -->
      <section class="web-hero">
        <div class="hero-glow"></div>
        <div class="web-container">
          <div class="hero-grid">
            <div class="hero-content">
              <div class="hero-badge">
                <span class="zpay-badge zpay-badge-success">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Next-Gen Nigerian Digital Payments
                </span>
              </div>
              <h1 class="hero-title">
                Your money. <br/>
                <span>Your way.</span>
              </h1>
              <p class="hero-subtitle">
                Experience premium digital convenience with ZPay. Instant high-speed airtime, blazing-fast data bundles, instant electricity tokens, and seamless utility payments — backed by high-uptime reliability and zero-hassle delivery.
              </p>
              <div class="hero-cta-group">
                <a href="#/app" class="zpay-btn zpay-btn-primary" style="padding: 16px 32px; font-size: 16px;">
                  Open Web App
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
                <a href="#/signup" class="zpay-btn zpay-btn-secondary" style="padding: 16px 28px;">
                  Create Account
                </a>
              </div>

              <div class="hero-stats">
                <div class="hero-stat-item">
                  <h4>₦0.00</h4>
                  <p>Funding Fees</p>
                </div>
                <div class="hero-stat-item">
                  <h4>&lt; 3s</h4>
                  <p>Settlement Speed</p>
                </div>
                <div class="hero-stat-item">
                  <h4>99.9%</h4>
                  <p>Uptime Reliability</p>
                </div>
              </div>
            </div>

            <!-- Interactive 3D Phone Mockup in Hero -->
            <div class="mockup-container">
              <!-- Radial Glow under device -->
              <div class="mockup-glow"></div>

              <!-- Floating Badges -->
              <div class="floating-badge badge-left">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--zpay-green-light); color: var(--zpay-green); display: flex; align-items: center; justify-content: center; font-size: 16px;">
                  ⚡
                </div>
                <div>
                  <p style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Wallet Funded</p>
                  <h5 style="font-size: 13px; font-weight: 700; color: var(--text-primary);">+₦20,000 Instant Top-up</h5>
                </div>
              </div>

              <div class="floating-badge badge-right">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(0, 163, 255, 0.15); color: var(--color-blue); display: flex; align-items: center; justify-content: center; font-size: 16px;">
                  🛡️
                </div>
                <div>
                  <p style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Bank-Grade</p>
                  <h5 style="font-size: 13px; font-weight: 700; color: var(--text-primary);">256-Bit Encrypted</h5>
                </div>
              </div>

              <div class="floating-badge badge-bottom">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--zpay-green-light); color: var(--zpay-green); display: flex; align-items: center; justify-content: center; font-size: 16px;">
                  ₦
                </div>
                <div>
                  <p style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Zero Fees</p>
                  <h5 style="font-size: 13px; font-weight: 700; color: var(--text-primary);">₦0.00 Funding Charges</h5>
                </div>
              </div>

              <!-- Realistic 3D Phone Frame -->
              <div class="phone-mockup-frame">
                <!-- Glass Glare Reflection -->
                <div class="phone-glass-glare"></div>

                <!-- Dynamic Island -->
                <div class="phone-dynamic-island">
                  <div class="dynamic-island-sensor"></div>
                  <div class="dynamic-island-cam"></div>
                </div>

                <!-- iPhone Status Bar -->
                <div class="phone-status-bar">
                  <span>9:41</span>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><rect x="0" y="7" width="2" height="3" rx="0.5"/><rect x="3" y="5" width="2" height="5" rx="0.5"/><rect x="6" y="3" width="2" height="7" rx="0.5"/><rect x="9" y="0" width="2" height="10" rx="0.5"/></svg>
                    <span style="font-size: 10px; font-weight: 800;">5G</span>
                    <svg width="18" height="10" viewBox="0 0 22 11" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1" y="1" width="18" height="9" rx="2.5"/><rect x="2.5" y="2.5" width="13" height="6" rx="1.5" fill="#22C55E"/><path d="M20 4v3" stroke-linecap="round"/></svg>
                  </div>
                </div>

                <!-- Live Phone Screen Content -->
                <div class="phone-screen" id="hero-phone-screen">
                  <!-- User Header -->
                  <div style="padding: 10px 14px 8px 14px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06);">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #00D26A, #059669); color: #041209; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 13px; box-shadow: 0 0 10px rgba(0,210,106,0.35);">G</div>
                      <div>
                        <p style="font-size: 10px; color: var(--text-muted); line-height: 1.2;">Good morning 👋</p>
                        <h5 style="font-size: 13px; font-weight: 700; color: #FFF; line-height: 1.2;">Gideon</h5>
                      </div>
                    </div>
                    <span class="zpay-badge zpay-badge-success" style="font-size: 9px; padding: 2px 7px; font-weight: 700;">● Online</span>
                  </div>

                  <!-- Available Balance Card -->
                  <div style="margin: 8px 12px 10px 12px; padding: 14px; background: linear-gradient(135deg, #162035, #0E1626); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                      <p style="font-size: 10px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Available Balance</p>
                      <span style="font-size: 11px; opacity: 0.7;">👁️</span>
                    </div>
                    <h3 style="font-size: 24px; font-weight: 800; color: #FFF; margin: 2px 0 10px 0; letter-spacing: -0.5px;">${store.formatMoney(store.balance)}</h3>
                    <div style="display: flex; gap: 6px;">
                      <a href="#/app/add-money" class="zpay-btn zpay-btn-primary zpay-btn-sm" style="flex: 1; padding: 7px 4px; font-size: 11px; font-weight: 700; border-radius: 8px;">+ Fund Wallet</a>
                      <a href="#/app/qr-pay" class="zpay-btn zpay-btn-secondary zpay-btn-sm" style="flex: 1; padding: 7px 4px; font-size: 11px; font-weight: 700; border-radius: 8px;">⛶ QR Pay</a>
                    </div>
                  </div>
                  
                  <!-- 4-Icon Service Grid -->
                  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; padding: 0 12px 10px 12px;">
                    <a href="#/app/airtime" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); padding: 8px 2px; border-radius: 10px; text-align: center; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 3px;">
                      <div style="font-size: 16px;">📱</div>
                      <span style="font-size: 10px; font-weight: 600; color: var(--text-primary);">Airtime</span>
                    </a>
                    <a href="#/app/data" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); padding: 8px 2px; border-radius: 10px; text-align: center; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 3px;">
                      <div style="font-size: 16px;">📶</div>
                      <span style="font-size: 10px; font-weight: 600; color: var(--text-primary);">Data</span>
                    </a>
                    <a href="#/app/bills" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); padding: 8px 2px; border-radius: 10px; text-align: center; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 3px;">
                      <div style="font-size: 16px;">⚡</div>
                      <span style="font-size: 10px; font-weight: 600; color: var(--text-primary);">Bills</span>
                    </a>
                    <a href="#/app/qr-pay" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); padding: 8px 2px; border-radius: 10px; text-align: center; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 3px;">
                      <div style="font-size: 16px;">⛶</div>
                      <span style="font-size: 10px; font-weight: 600; color: var(--text-primary);">Scan</span>
                    </a>
                  </div>

                  <!-- Dedicated Virtual Account Pill -->
                  <div style="margin: 0 12px 10px 12px; padding: 8px 12px; background: rgba(0, 210, 106, 0.08); border: 1px solid rgba(0, 210, 106, 0.25); border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <p style="font-size: 9px; color: var(--zpay-green); font-weight: 700; text-transform: uppercase;">ZPAY Dedicated Account</p>
                      <p style="font-size: 12px; font-weight: 700; color: #FFF; font-family: monospace;">08012345678</p>
                    </div>
                    <span style="background: var(--zpay-green); color: #041209; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">FREE</span>
                  </div>

                  <!-- Recent Transactions -->
                  <div style="padding: 0 12px 6px 12px; flex: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <p style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Recent Activity</p>
                      <a href="#/app/transactions" style="font-size: 10px; color: var(--zpay-green); text-decoration: none; font-weight: 600;">See All</a>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                      <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 7px 9px; border-radius: 8px; font-size: 11px; border: 1px solid rgba(255,255,255,0.04);">
                        <div style="display: flex; align-items: center; gap: 7px;">
                          <span style="font-size: 13px;">💳</span>
                          <div>
                            <p style="font-size: 11px; font-weight: 600; color: #FFF; line-height: 1.1;">Wallet Top-up</p>
                            <p style="font-size: 9px; color: var(--text-muted);">Wallet Funding</p>
                          </div>
                        </div>
                        <span style="font-weight: 700; color: var(--zpay-green); font-size: 11px;">+₦20,000</span>
                      </div>
                      <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 7px 9px; border-radius: 8px; font-size: 11px; border: 1px solid rgba(255,255,255,0.04);">
                        <div style="display: flex; align-items: center; gap: 7px;">
                          <span style="font-size: 13px;">⚡</span>
                          <div>
                            <p style="font-size: 11px; font-weight: 600; color: #FFF; line-height: 1.1;">IKEDC Electricity</p>
                            <p style="font-size: 9px; color: var(--text-muted);">Prepaid Token</p>
                          </div>
                        </div>
                        <span style="font-weight: 700; color: var(--text-primary); font-size: 11px;">-₦5,000</span>
                      </div>
                    </div>
                  </div>

                  <!-- In-Phone Mini Bottom Nav -->
                  <div style="padding: 6px 14px; background: rgba(8, 12, 18, 0.95); border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-around; align-items: center;">
                    <a href="#/app" style="color: var(--zpay-green); font-size: 9px; display: flex; flex-direction: column; align-items: center; gap: 1px; text-decoration: none;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                      <span>Home</span>
                    </a>
                    <a href="#/app/services" style="color: var(--text-muted); font-size: 9px; display: flex; flex-direction: column; align-items: center; gap: 1px; text-decoration: none;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
                      <span>Services</span>
                    </a>
                    <a href="#/app/transactions" style="color: var(--text-muted); font-size: 9px; display: flex; flex-direction: column; align-items: center; gap: 1px; text-decoration: none;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                      <span>Activity</span>
                    </a>
                    <a href="#/app/profile" style="color: var(--text-muted); font-size: 9px; display: flex; flex-direction: column; align-items: center; gap: 1px; text-decoration: none;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <span>Profile</span>
                    </a>
                  </div>

                  <!-- Open Live App CTA inside phone -->
                  <div style="padding: 8px 12px; background: rgba(13,18,31,0.95); border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
                    <a href="#/app" class="zpay-btn zpay-btn-primary zpay-btn-sm" style="width: 100%; padding: 6px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; gap: 4px;">
                      Launch App Experience &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Strip -->
      <section class="trust-strip">
        <div class="web-container">
          <div class="trust-items">
            <div class="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <span>Instant Settlements</span>
            </div>
            <div class="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Bank-Grade 256-Bit Security</span>
            </div>
            <div class="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <span>Instant Airtime & 5G Data</span>
            </div>
            <div class="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
              <span>Built for Everyday Nigerian Payments</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Feature Section (Cards 1-6) -->
      <section class="web-features">
        <div class="web-container">
          <div class="section-header">
            <span class="section-tag">Features</span>
            <h2 class="section-title">Everything you need to move money</h2>
            <p class="section-desc">Designed with speed, uncompromising security, and seamless Nigerian banking integrations.</p>
          </div>

          <div class="feature-grid">
            <!-- 1. Fund Your Wallet -->
            <div class="feature-card">
              <div class="feature-icon-box">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="M16 19h6m-3-3v6"/></svg>
              </div>
              <h3>1. Instant Wallet Funding</h3>
              <p>Top up your ZPAY balance effortlessly in seconds using your dedicated virtual account, debit card, or direct transfer with 0% hidden fee.</p>
            </div>

            <!-- 2. QR Payments -->
            <div class="feature-card">
              <div class="feature-icon-box">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </div>
              <h3>2. QR & Merchant Pay</h3>
              <p>Scan and pay at merchant POS counters or generate quick payment codes with zero hassle and instant receipt confirmation.</p>
            </div>

            <!-- 3. Dedicated Account -->
            <div class="feature-card">
              <div class="feature-icon-box">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              </div>
              <h3>3. Dedicated Account</h3>
              <p>Get your personal ZPAY account number to receive bank transfers from any Nigerian bank directly into your wallet.</p>
            </div>

            <!-- 4. Pay Bills -->
            <div class="feature-card">
              <div class="feature-icon-box">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h3>4. Pay Utility Bills</h3>
              <p>Settle electricity tokens (IKEDC, EKEDC, AEDC, IBEDC), DStv, GOtv, internet, and exam PINs with instant receipt tokens.</p>
            </div>

            <!-- 5. Airtime & Data -->
            <div class="feature-card">
              <div class="feature-icon-box">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              </div>
              <h3>5. Premium Airtime & Data Bundles</h3>
              <p>Enjoy uninterrupted connection with quality MTN, Airtel, Glo, and 9mobile data and airtime delivered in under 3 seconds with maximum network uptime.</p>
            </div>

            <!-- 6. Real-Time Security -->
            <div class="feature-card">
              <div class="feature-icon-box">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3>6. Bank-Grade Security</h3>
              <p>All wallet transactions and funding processes are protected by bank-grade 256-bit encryption, PIN authorization, and verified secure gateways.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section style="padding: 60px 0 100px 0;">
        <div class="web-container">
          <div class="zpay-card" style="background: linear-gradient(135deg, #141E33, #090E17); border: 1px solid rgba(0, 210, 106, 0.3); text-align: center; padding: 60px 20px;">
            <span class="zpay-badge zpay-badge-success" style="margin-bottom: 16px;">Fast &bull; Clean &bull; Premium</span>
            <h2 style="font-size: 38px; font-weight: 800; margin-bottom: 16px;">Ready to make payments effortless?</h2>
            <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 30px auto; font-size: 16px;">
              Join thousands of Nigerians managing their daily expenses, transfers, and subscriptions on ZPay.
            </p>
            <div style="display: flex; justify-content: center; gap: 14px;">
              <a href="#/app" class="zpay-btn zpay-btn-primary" style="padding: 16px 36px;">Open ZPay Now</a>
              <a href="#/signup" class="zpay-btn zpay-btn-secondary" style="padding: 16px 28px;">Create Free Account</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="web-footer">
      <div class="web-container">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="logo-brand" style="margin-bottom: 16px;">
              <div class="logo-icon">Z</div>
              <span>ZPay</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; max-width: 320px;">
              Your money. Your way. ZPay is a modern digital payment and wallet platform built for everyday financial freedom in Nigeria.
            </p>
          </div>
          <div class="footer-col">
            <h4>Features</h4>
            <ul>
              <li><a href="#/app/add-money">Fund Wallet</a></li>
              <li><a href="#/app/airtime">Airtime & Data</a></li>
              <li><a href="#/app/bills">Pay Utility Bills</a></li>
              <li><a href="#/app/qr-pay">QR Payments</a></li>
              <li><a href="#/app/transactions">Transaction History</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#/how-it-works">How It Works</a></li>
              <li><a href="#/security">Security & Privacy</a></li>
              <li><a href="#/support">Support & Help</a></li>
              <li><a href="#/support">Report Transaction</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Legal & Trust</h4>
            <ul>
              <li><a href="#/security">NDPR Compliance</a></li>
              <li><a href="#/security">Bank-Grade Security</a></li>
              <li><a href="#/security">Terms of Service</a></li>
              <li><a href="#/security">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} ZPay Technologies Ltd. All rights reserved.</p>
          <p>Powered by ZaroxIT solutions</p>
        </div>
      </div>
    </footer>
  `;
}
