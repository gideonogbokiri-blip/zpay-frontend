import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';
import { signupUser, verifyOtpCode, createPin, loginUser } from '../services/api.js';

export function renderSplashView() {
  return `
    <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #080C14; text-align: center; padding: 20px;">
      <div class="logo-icon animate-pulse" style="width: 80px; height: 80px; font-size: 40px; margin-bottom: 24px; border-radius: 24px; box-shadow: 0 0 40px rgba(0, 210, 106, 0.4);">
        Z
      </div>
      <h1 style="font-size: 38px; font-weight: 900; letter-spacing: -1px; margin-bottom: 8px;">ZPay</h1>
      <p style="font-size: 16px; color: var(--text-secondary); margin-bottom: 40px;">Your money. Your way.</p>
      
      <div style="width: 180px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 99px; overflow: hidden;">
        <div style="width: 40%; height: 100%; background: var(--zpay-green); border-radius: 99px; animation: scanBeam 1.8s infinite;"></div>
      </div>
    </div>
  `;
}

export function initSplashRouting() {
  setTimeout(() => {
    window.location.hash = '#/onboarding';
  }, 1600);
}

export function renderOnboardingView() {
  return `
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; padding: 40px 24px; max-width: 440px; margin: 0 auto;">
      <div style="display: flex; justify-content: flex-end;">
        <a href="#/app" class="zpay-btn zpay-btn-ghost zpay-btn-sm" style="font-weight: 600;">Skip</a>
      </div>

      <div id="onboarding-slider" style="text-align: center; margin: 40px 0;">
        <div class="onboarding-slide active" data-slide="1">
          <div style="width: 140px; height: 140px; margin: 0 auto 30px auto; border-radius: 36px; background: var(--zpay-green-light); border: 2px solid var(--border-highlight); display: flex; align-items: center; justify-content: center; color: var(--zpay-green);">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 12px;">Easy Payments</h2>
          <p style="color: var(--text-secondary); font-size: 16px; line-height: 1.6;">
            Send, receive and pay with ease. Instant zero-fee transfers to any Nigerian bank.
          </p>
        </div>

        <div class="onboarding-slide" data-slide="2" style="display: none;">
          <div style="width: 140px; height: 140px; margin: 0 auto 30px auto; border-radius: 36px; background: rgba(56, 189, 248, 0.12); border: 2px solid rgba(56, 189, 248, 0.4); display: flex; align-items: center; justify-content: center; color: var(--color-blue);">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 12px;">Safe & Secure</h2>
          <p style="color: var(--text-secondary); font-size: 16px; line-height: 1.6;">
            Your money and personal data are protected by bank-grade encryption and mandatory PIN authorization.
          </p>
        </div>

        <div class="onboarding-slide" data-slide="3" style="display: none;">
          <div style="width: 140px; height: 140px; margin: 0 auto 30px auto; border-radius: 36px; background: rgba(168, 85, 247, 0.12); border: 2px solid rgba(168, 85, 247, 0.4); display: flex; align-items: center; justify-content: center; color: #a855f7;">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </div>
          <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 12px;">Everything in One Place</h2>
          <p style="color: var(--text-secondary); font-size: 16px; line-height: 1.6;">
            Airtime, high-speed data, electricity tokens, cable TV, and QR payments — all inside ZPay.
          </p>
        </div>
      </div>

      <div>
        <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 30px;" id="onboarding-dots">
          <div class="onboard-dot active" style="width: 24px; height: 8px; border-radius: 4px; background: var(--zpay-green);"></div>
          <div class="onboard-dot" style="width: 8px; height: 8px; border-radius: 4px; background: var(--border-medium);"></div>
          <div class="onboard-dot" style="width: 8px; height: 8px; border-radius: 4px; background: var(--border-medium);"></div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <button class="zpay-btn zpay-btn-primary zpay-btn-block" id="btn-onboarding-next">
            Continue &rarr;
          </button>
          <a href="#/login" class="zpay-btn zpay-btn-secondary zpay-btn-block">
            I already have an account
          </a>
        </div>
      </div>
    </div>
  `;
}

export function initOnboardingListeners() {
  let currentSlide = 1;
  const btnNext = document.getElementById('btn-onboarding-next');
  if (!btnNext) return;

  btnNext.addEventListener('click', () => {
    if (currentSlide < 3) {
      currentSlide++;
      updateSlider();
    } else {
      window.location.hash = '#/signup';
    }
  });

  function updateSlider() {
    const slides = document.querySelectorAll('.onboarding-slide');
    const dots = document.querySelectorAll('.onboard-dot');
    
    slides.forEach(s => {
      s.style.display = s.dataset.slide == currentSlide ? 'block' : 'none';
    });

    dots.forEach((dot, idx) => {
      if (idx === currentSlide - 1) {
        dot.style.width = '24px';
        dot.style.background = 'var(--zpay-green)';
      } else {
        dot.style.width = '8px';
        dot.style.background = 'var(--border-medium)';
      }
    });

    if (currentSlide === 3) {
      btnNext.innerText = 'Get Started';
    }
  }
}

export function renderLoginView() {
  return `
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 40px 24px; max-width: 440px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <a href="#/" class="logo-brand" style="margin-bottom: 20px;">
          <div class="logo-icon">Z</div>
          <span>ZPay</span>
        </a>
        <h1 style="font-size: 26px; font-weight: 800; margin-bottom: 6px;">Welcome Back</h1>
        <p style="color: var(--text-secondary); font-size: 14px;">Sign in to your personal or cooperative dashboard</p>
      </div>

      <!-- Account Type Pill Switcher -->
      <div class="zpay-tabs" style="margin-bottom:20px;">
        <button class="zpay-tab-btn active" id="login-tab-personal" style="display:inline-flex; align-items:center; justify-content:center; gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Personal Account
        </button>
        <button class="zpay-tab-btn" id="login-tab-coop" style="display:inline-flex; align-items:center; justify-content:center; gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>
          Cooperative Portal
        </button>
      </div>

      <form id="login-form">
        <div class="zpay-form-group">
          <label class="zpay-label" id="login-label-identifier">Email or Phone Number</label>
          <input type="text" class="zpay-input" id="login-identifier" placeholder="e.g. 08123456789 or name@example.com" value="gideon@zpay.ng" required />
        </div>

        <div class="zpay-form-group">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label class="zpay-label">Password</label>
            <a href="#/verify" style="font-size: 12px; color: var(--zpay-green); font-weight: 600;">Forgot password?</a>
          </div>
          <div class="zpay-input-wrapper">
            <input type="password" class="zpay-input" id="login-password" placeholder="••••••••" value="password123" required />
          </div>
        </div>

        <button type="submit" class="zpay-btn zpay-btn-primary zpay-btn-block" id="btn-submit-login" style="margin-top: 10px;">
          Sign In to ZPay
        </button>
      </form>

      <!-- Prominent Cooperative Account Banner / Action -->
      <div style="margin-top: 20px; background: rgba(234,0,41,0.06); border: 1px dashed rgba(234,0,41,0.3); border-radius: 14px; padding: 14px; display: flex; align-items: center; justify-content: space-between;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:38px; height:38px; border-radius:10px; background:rgba(234,0,41,0.12); color:var(--zpay-green); display:flex; align-items:center; justify-content:center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>
          </div>
          <div>
            <div style="font-size:13px; font-weight:700; color:var(--text-primary);">Are you a Cooperative Society?</div>
            <div style="font-size:11px; color:var(--text-muted);">Manage member contributions & loans</div>
          </div>
        </div>
        <a href="#/signup?type=coop" class="zpay-btn zpay-btn-secondary zpay-btn-sm" style="font-size:11px; white-space:nowrap; border-color:var(--border-highlight);">
          Create Coop &rarr;
        </a>
      </div>

      <div style="display: flex; align-items: center; gap: 12px; margin: 20px 0 16px 0;">
        <div style="flex: 1; height: 1px; background: var(--border-subtle);"></div>
        <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Or continue with</span>
        <div style="flex: 1; height: 1px; background: var(--border-subtle);"></div>
      </div>

      <button class="zpay-btn zpay-btn-secondary zpay-btn-block" id="btn-google-auth">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/></svg>
        Continue with Google
      </button>

      <p style="text-align: center; margin-top: 24px; font-size: 14px; color: var(--text-secondary);">
        Don't have an account? <a href="#/signup" style="color: var(--zpay-green); font-weight: 700;">Create account</a>
      </p>
    </div>
  `;
}

export function initLoginListeners() {
  let isCoopLogin = false;
  const tabPersonal = document.getElementById('login-tab-personal');
  const tabCoop = document.getElementById('login-tab-coop');
  const labelId = document.getElementById('login-label-identifier');
  const inputId = document.getElementById('login-identifier');
  const submitBtn = document.getElementById('btn-submit-login');

  if (tabPersonal && tabCoop) {
    tabPersonal.addEventListener('click', () => {
      isCoopLogin = false;
      tabPersonal.classList.add('active');
      tabCoop.classList.remove('active');
      if (labelId) labelId.textContent = "Email or Phone Number";
      if (inputId) { inputId.value = "gideon@zpay.ng"; inputId.placeholder = "e.g. 08123456789 or name@example.com"; }
      if (submitBtn) submitBtn.textContent = "Sign In to ZPay";
    });

    tabCoop.addEventListener('click', () => {
      isCoopLogin = true;
      tabCoop.classList.add('active');
      tabPersonal.classList.remove('active');
      if (labelId) labelId.textContent = "Cooperative RC No. or Society Email";
      if (inputId) { inputId.value = "coop@zenithstaff.org.ng"; inputId.placeholder = "e.g. LSCS/2018/49102 or coop@domain.org"; }
      if (submitBtn) submitBtn.textContent = "Access Cooperative Portal";
    });
  }

  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isCoopLogin) {
        showToast("✓ Authenticated as Cooperative Executive Administrator!");
        window.location.hash = '#/app/cooperative-admin';
      } else {
        showToast("Welcome back, Gideon! Logging in...");
        window.location.hash = '#/app';
      }
    });
  }

  const btnGoogle = document.getElementById('btn-google-auth');
  if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
      showToast("Google OAuth authenticated successfully!");
      window.location.hash = '#/app';
    });
  }
}

export function renderSignupView() {
  const hash = window.location.hash || '';
  const isCoopDefault = hash.includes('type=coop');

  return `
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 40px 24px; max-width: 460px; margin: 0 auto;">
      <div style="margin-bottom: 20px;">
        <a href="#/" class="logo-brand" style="margin-bottom: 16px;">
          <div class="logo-icon">Z</div>
          <span>ZPay</span>
        </a>
        <h1 style="font-size: 26px; font-weight: 800; margin-bottom: 6px;">Create Your Account</h1>
        <p style="color: var(--text-secondary); font-size: 14px;">Join thousands of individuals and cooperative societies</p>
      </div>

      <!-- Account Type Selector Tabs -->
      <div class="zpay-tabs" style="margin-bottom:20px;">
        <button class="zpay-tab-btn ${!isCoopDefault ? 'active' : ''}" id="signup-tab-personal" style="display:inline-flex; align-items:center; justify-content:center; gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Personal Account
        </button>
        <button class="zpay-tab-btn ${isCoopDefault ? 'active' : ''}" id="signup-tab-coop" style="display:inline-flex; align-items:center; justify-content:center; gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>
          Cooperative Society
        </button>
      </div>

      <!-- Form 1: Personal Signup -->
      <form id="signup-form-personal" style="display: ${!isCoopDefault ? 'block' : 'none'};">
        <div class="zpay-form-group">
          <label class="zpay-label">Full Legal Name</label>
          <input type="text" class="zpay-input" id="reg-name" placeholder="Gideon Oladipo" value="Gideon Oladipo" required />
        </div>

        <div class="zpay-form-group">
          <label class="zpay-label">Phone Number</label>
          <input type="tel" class="zpay-input" id="reg-phone" placeholder="0812 345 6789" value="0812 345 6789" required />
        </div>

        <div class="zpay-form-group">
          <label class="zpay-label">Email Address</label>
          <input type="email" class="zpay-input" id="reg-email" placeholder="gideon@example.com" value="gideon@zpay.ng" required />
        </div>

        <div class="zpay-form-group">
          <label class="zpay-label">Password</label>
          <input type="password" class="zpay-input" id="reg-password" placeholder="Create a strong password" value="SecurePassword2026!" required />
        </div>

        <button type="submit" class="zpay-btn zpay-btn-primary zpay-btn-block" style="margin-top: 10px;">
          Create Personal Account &rarr;
        </button>
      </form>

      <!-- Form 2: Cooperative Society Registration -->
      <form id="signup-form-coop" style="display: ${isCoopDefault ? 'block' : 'none'};">
        <div class="zpay-form-group">
          <label class="zpay-label">Cooperative Society Legal Name</label>
          <input type="text" class="zpay-input" id="coop-reg-name" placeholder="e.g. Apex Horizon Multi-Purpose Cooperative Society Ltd" value="Apex Horizon Multi-Purpose Cooperative Society Ltd" required />
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="zpay-form-group">
            <label class="zpay-label">Cooperative Sector</label>
            <select class="zpay-input" id="coop-reg-category">
              <option value="Multi-Purpose">Multi-Purpose</option>
              <option value="Thrift & Credit">Thrift & Credit</option>
              <option value="Staff Welfare">Staff Welfare</option>
              <option value="Agricultural">Agricultural</option>
            </select>
          </div>
          <div class="zpay-form-group">
            <label class="zpay-label">State / CAC Reg No</label>
            <input type="text" class="zpay-input" id="coop-reg-rc" placeholder="LSCS/2026/9102" value="LSCS/2026/9102" required />
          </div>
        </div>

        <div class="zpay-form-group">
          <label class="zpay-label">Society Administrator Full Name</label>
          <input type="text" class="zpay-input" id="coop-admin-name" placeholder="Executive Secretary / President" value="Gideon Oladipo" required />
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="zpay-form-group">
            <label class="zpay-label">Official Email</label>
            <input type="email" class="zpay-input" id="coop-reg-email" placeholder="admin@apexcoop.ng" value="admin@apexcoop.ng" required />
          </div>
          <div class="zpay-form-group">
            <label class="zpay-label">Admin Phone</label>
            <input type="tel" class="zpay-input" id="coop-reg-phone" placeholder="0812 345 6789" value="0812 345 6789" required />
          </div>
        </div>

        <!-- Policy Rules Setup -->
        <div style="background:var(--bg-card); border:1px solid var(--border-medium); border-radius:12px; padding:12px; margin-bottom:14px; display:flex; flex-direction:column; gap:10px;">
          <div style="font-size:12px; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            Cooperative Rules & Policy Setup
          </div>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Min Monthly Savings (₦)</label>
              <input type="number" class="zpay-input" id="coop-policy-min" value="20000" style="padding:6px 10px; font-size:12px;" />
            </div>
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Loan Multiplier Ratio</label>
              <select class="zpay-input" id="coop-policy-ratio" style="padding:6px 10px; font-size:12px;">
                <option value="2.0">2x Member Savings</option>
                <option value="2.5">2.5x Member Savings</option>
                <option value="3.0" selected>3x Member Savings</option>
                <option value="4.0">4x Member Savings</option>
              </select>
            </div>
          </div>

          <div>
            <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Year-End Payout ("Pack Money") Month</label>
            <select class="zpay-input" id="coop-policy-payout" style="padding:6px 10px; font-size:12px;">
              <option value="November">November (Pre-Holiday)</option>
              <option value="December" selected>December (End of Year)</option>
              <option value="January">January (New Year)</option>
            </select>
          </div>
        </div>

        <button type="submit" class="zpay-btn zpay-btn-primary zpay-btn-block" id="btn-submit-coop-signup">
          Register Cooperative Society &rarr;
        </button>
      </form>

      <p style="text-align: center; margin-top: 20px; font-size: 14px; color: var(--text-secondary);">
        Already have an account? <a href="#/login" style="color: var(--zpay-green); font-weight: 700;">Sign in</a>
      </p>
    </div>
  `;
}

export function initSignupListeners() {
  const tabPersonal = document.getElementById('signup-tab-personal');
  const tabCoop = document.getElementById('signup-tab-coop');
  const formPersonal = document.getElementById('signup-form-personal');
  const formCoop = document.getElementById('signup-form-coop');

  if (tabPersonal && tabCoop) {
    tabPersonal.addEventListener('click', () => {
      tabPersonal.classList.add('active');
      tabCoop.classList.remove('active');
      if (formPersonal) formPersonal.style.display = 'block';
      if (formCoop) formCoop.style.display = 'none';
    });

    tabCoop.addEventListener('click', () => {
      tabCoop.classList.add('active');
      tabPersonal.classList.remove('active');
      if (formPersonal) formPersonal.style.display = 'none';
      if (formCoop) formCoop.style.display = 'block';
    });
  }

  // 1. Personal Signup
  if (formPersonal) {
    formPersonal.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullName = document.getElementById('reg-name')?.value.trim();
      const phone = document.getElementById('reg-phone')?.value.replace(/\s+/g, '');
      const email = document.getElementById('reg-email')?.value.trim();
      const password = document.getElementById('reg-password')?.value;

      if (!email || !email.includes('@')) {
        showToast("Please enter a valid Gmail / email address.", "error");
        return;
      }

      const btn = formPersonal.querySelector('button[type="submit"]');
      const originalBtnText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span>⏳ Sending verification code...</span>`;

      try {
        const res = await signupUser({ fullName, phone, email, password });
        sessionStorage.setItem('zpay_pending_signup', JSON.stringify({
          verificationId: res.verificationId,
          fullName,
          phone,
          email,
          password
        }));
        showToast(`Verification code sent to ${email}!`, "success");
        setTimeout(() => {
          window.location.hash = '#/verify';
        }, 500);
      } catch (err) {
        console.error('Signup error:', err);
        showToast(err.message || "Failed to send code. Please try again.", "error");
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
      }
    });
  }

  // 2. Cooperative Society Signup
  if (formCoop) {
    formCoop.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('coop-reg-name')?.value.trim();
      const category = document.getElementById('coop-reg-category')?.value;
      const regNo = document.getElementById('coop-reg-rc')?.value.trim();
      const adminName = document.getElementById('coop-admin-name')?.value.trim();
      const email = document.getElementById('coop-reg-email')?.value.trim();
      const minContribution = document.getElementById('coop-policy-min')?.value;
      const loanRatio = document.getElementById('coop-policy-ratio')?.value;
      const payoutMonth = document.getElementById('coop-policy-payout')?.value;

      if (!name) {
        showToast("Please enter the legal name of the cooperative society.", "error");
        return;
      }

      const newCoop = store.registerNewCooperative({
        name,
        category,
        regNo,
        adminName,
        email,
        minContribution,
        loanRatio,
        payoutMonth
      });

      showToast(`✓ ${newCoop.name} successfully registered! Opening Cooperative Hub...`, "success");
      setTimeout(() => {
        window.location.hash = '#/app/cooperative';
      }, 600);
    });
  }
}


export function renderVerifyOtpView() {
  let pending = {};
  try {
    pending = JSON.parse(sessionStorage.getItem('zpay_pending_signup') || '{}');
  } catch (_) {}
  const targetEmail = pending.email || 'your Gmail address';

  return `
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 40px 24px; max-width: 440px; margin: 0 auto; text-align: center;">
      <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--zpay-green-light); color: var(--zpay-green); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      </div>

      <h1 style="font-size: 26px; font-weight: 800; margin-bottom: 8px;">Check Your Email</h1>
      <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 24px;">
        We sent a 6-digit verification code to <br/>
        <strong style="color: var(--zpay-green); font-size: 15px;">${targetEmail}</strong>
      </p>

      <div class="otp-container" id="otp-input-group">
        <input type="text" maxlength="1" class="otp-box" autofocus />
        <input type="text" maxlength="1" class="otp-box" />
        <input type="text" maxlength="1" class="otp-box" />
        <input type="text" maxlength="1" class="otp-box" />
        <input type="text" maxlength="1" class="otp-box" />
        <input type="text" maxlength="1" class="otp-box" />
      </div>

      <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 24px;">
        Didn't receive it? Check Spam or <strong id="btn-resend-otp" style="color: var(--zpay-green); cursor: pointer;">Resend code</strong>
      </p>

      <button class="zpay-btn zpay-btn-primary zpay-btn-block" id="btn-verify-otp">
        Verify &amp; Open Account &rarr;
      </button>

      <div style="margin-top: 24px; display: flex; justify-content: center; gap: 16px; font-size: 13px;">
        <a href="#/signup" style="color: var(--text-secondary);">Change Email</a>
      </div>
    </div>
  `;
}

export function initVerifyOtpListeners() {
  const btn = document.getElementById('btn-verify-otp');
  const boxes = document.querySelectorAll('.otp-box');

  // Auto focus progression
  boxes.forEach((box, idx) => {
    box.addEventListener('input', () => {
      if (box.value.length === 1 && idx < boxes.length - 1) {
        boxes[idx + 1].focus();
      }
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && idx > 0) {
        boxes[idx - 1].focus();
      }
    });
  });

  if (btn) {
    btn.addEventListener('click', async () => {
      const code = Array.from(boxes).map(b => b.value.trim()).join('');
      if (code.length < 6) {
        showToast("Please enter the complete 6-digit code sent to your email.", "error");
        return;
      }

      let pending = {};
      try {
        pending = JSON.parse(sessionStorage.getItem('zpay_pending_signup') || '{}');
      } catch (_) {}

      btn.disabled = true;
      const originalText = btn.innerHTML;
      btn.innerHTML = `Verifying code...`;

      try {
        if (pending.verificationId) {
          const verifyRes = await verifyOtpCode({
            verificationId: pending.verificationId,
            code
          });

          if (verifyRes.token) {
            localStorage.setItem('zpay_token', verifyRes.token);
            sessionStorage.setItem('zpay_token', verifyRes.token);

            // Initialize default PIN
            try {
              await createPin({ pin: '1234' });
            } catch (_) {}

            if (pending.fullName) {
              store.user.name = pending.fullName;
              store.user.email = pending.email;
              store.user.phone = pending.phone;
            }
          }
        }

        showToast("Email verified successfully! Welcome to ZPay!", "success");
        setTimeout(() => {
          window.location.hash = '#/app';
        }, 500);
      } catch (err) {
        console.error('OTP verify error:', err);
        showToast(err.message || "Invalid or expired verification code.", "error");
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    });
  }

  const btnResend = document.getElementById('btn-resend-otp');
  if (btnResend) {
    btnResend.addEventListener('click', async () => {
      let pending = {};
      try {
        pending = JSON.parse(sessionStorage.getItem('zpay_pending_signup') || '{}');
      } catch (_) {}
      if (pending.email) {
        btnResend.innerText = 'Resending...';
        try {
          const res = await signupUser(pending);
          pending.verificationId = res.verificationId;
          sessionStorage.setItem('zpay_pending_signup', JSON.stringify(pending));
          showToast(`New code sent to ${pending.email}!`, "success");
        } catch (e) {
          showToast("Failed to resend code: " + e.message, "error");
        } finally {
          btnResend.innerText = 'Resend code';
        }
      } else {
        window.location.hash = '#/signup';
      }
    });
  }
}
