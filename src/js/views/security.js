export function renderSecurityView() {
  return `
    <header class="web-header">
      <div class="web-container nav-wrapper">
        <a href="#/" class="logo-brand">
          <div class="logo-icon">Z</div>
          <span>ZPay</span>
        </a>
        <nav class="nav-links">
          <a href="#/how-it-works" class="nav-link">How It Works</a>
          <a href="#/security" class="nav-link active">Security</a>
          <a href="#/support" class="nav-link">Support</a>
        </nav>
        <div class="nav-actions">
          <a href="#/login" class="zpay-btn zpay-btn-secondary zpay-btn-sm">Sign In</a>
          <a href="#/app" class="zpay-btn zpay-btn-primary zpay-btn-sm">Launch App</a>
        </div>
      </div>
    </header>

    <main class="web-container" style="padding: 70px 24px 100px 24px;">
      <div class="section-header">
        <span class="section-tag">Security & Compliance</span>
        <h1 class="section-title">Built with bank-grade defense at every layer</h1>
        <p class="section-desc">Your funds and identity are safeguarded by state-of-the-art cryptography, strict compliance, and rigorous transaction authentication.</p>
      </div>

      <div class="security-grid">
        <div class="security-card">
          <div class="security-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">4-Digit Transaction PIN Protection</h3>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">Every payment, transfer, airtime, or bill settlement requires explicit authorization with your secret encrypted PIN, preventing unauthorized transfers.</p>
          </div>
        </div>

        <div class="security-card">
          <div class="security-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
          </div>
          <div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Biometric Authentication</h3>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">Seamless hardware-level TouchID and FaceID support allows ultra-fast, tamper-proof authorization on supported mobile and web devices.</p>
          </div>
        </div>

        <div class="security-card">
          <div class="security-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">PCI-DSS Certified Payment Security</h3>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">Direct integration with PCI-DSS Level 1 certified payment infrastructure. ZPay never stores your raw card numbers, and every transaction is end-to-end encrypted and cryptographically verified.</p>
          </div>
        </div>

        <div class="security-card">
          <div class="security-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>
          </div>
          <div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Server-Side Transaction Ledger</h3>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">Double-entry ledger architecture. Wallet balances cannot be manipulated on the client, and all transactions maintain a permanent audit log.</p>
          </div>
        </div>

        <div class="security-card">
          <div class="security-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
          <div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Real-Time Transaction Alerts</h3>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">Instant push notifications and receipts for every incoming and outgoing payment, ensuring you always have full visibility over your money.</p>
          </div>
        </div>

        <div class="security-card">
          <div class="security-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Device & Session Management</h3>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">Monitor all active logins across browsers and mobile phones. Easily revoke untrusted sessions with a single click from your profile settings.</p>
          </div>
        </div>
      </div>

      <div style="margin-top: 50px; padding: 24px; background: rgba(0, 210, 106, 0.08); border: 1px solid rgba(0, 210, 106, 0.25); border-radius: var(--radius-lg); text-align: center;">
        <h4 style="font-size: 16px; font-weight: 700; color: var(--zpay-green); margin-bottom: 6px;">Zero Secret Exposure Guarantee</h4>
        <p style="font-size: 14px; color: var(--text-secondary); max-width: 700px; margin: 0 auto;">
          In accordance with ZPay security standards, secret API keys and private tokens are strictly isolated from client-side bundles and web browsers.
        </p>
      </div>
    </main>
  `;
}
