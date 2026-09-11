export function renderHowItWorksView() {
  return `
    <header class="web-header">
      <div class="web-container nav-wrapper">
        <a href="#/" class="logo-brand">
          <div class="logo-icon">Z</div>
          <span>ZPay</span>
        </a>
        <nav class="nav-links">
          <a href="#/how-it-works" class="nav-link active">How It Works</a>
          <a href="#/security" class="nav-link">Security</a>
          <a href="#/support" class="nav-link">Support</a>
        </nav>
        <div class="nav-actions">
          <a href="#/login" class="zpay-btn zpay-btn-secondary zpay-btn-sm">Sign In</a>
          <a href="#/app" class="zpay-btn zpay-btn-primary zpay-btn-sm">Launch App 🚀</a>
        </div>
      </div>
    </header>

    <main class="web-container" style="padding: 70px 24px 100px 24px;">
      <div class="section-header">
        <span class="section-tag">How ZPay Works</span>
        <h1 class="section-title">Getting started is as simple as 1, 2, 3</h1>
        <p class="section-desc">Experience frictionless digital payments built specifically for Nigeria's mobile-first lifestyle.</p>
      </div>

      <div class="how-it-works-steps">
        <!-- Step 1 -->
        <div class="step-card">
          <div class="step-number">01</div>
          <h3>Create your account</h3>
          <p>Sign up with your phone number or email and verify your identity in seconds using our seamless 6-digit OTP code and secure 4-digit transaction PIN.</p>
          <div style="margin-top: 24px; padding: 16px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--zpay-green);">
              <span>✓ Phone/Email Verification</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--zpay-green); margin-top: 6px;">
              <span>✓ Instant Biometric Link</span>
            </div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="step-card">
          <div class="step-number">02</div>
          <h3>Fund your ZPay wallet</h3>
          <p>Add funds instantly to your wallet via debit cards (Mastercard, Visa, Verve), your free dedicated virtual account number, or direct bank transfer.</p>
          <div style="margin-top: 24px; padding: 16px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--color-blue);">
              <span>💳 Instant Card Funding</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--color-blue); margin-top: 6px;">
              <span>🏦 Free Dedicated Virtual Account</span>
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="step-card">
          <div class="step-number">03</div>
          <h3>Pay with ZPay</h3>
          <p>Buy airtime & data with instant delivery, pay electricity & cable TV, or scan QR codes at merchants with zero fees.</p>
          <div style="margin-top: 24px; padding: 16px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--zpay-green);">
              <span>⚡ Under 3-Second Execution</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--zpay-green); margin-top: 6px;">
              <span>🧾 Instant Shareable Receipts</span>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 60px; text-align: center;">
        <a href="#/app" class="zpay-btn zpay-btn-primary" style="padding: 16px 36px; font-size: 16px;">
          Try ZPay Interactive App Now
        </a>
      </div>
    </main>
  `;
}
