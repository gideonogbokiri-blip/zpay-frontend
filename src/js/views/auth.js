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
          <div style="width: 140px; height: 140px; margin: 0 auto 30px auto; border-radius: 36px; background: var(--zpay-green-light); border: 2px solid var(--border-highlight); display: flex; align-items: center; justify-content: center; font-size: 60px;">
            ⚡
          </div>
          <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 12px;">Easy Payments</h2>
          <p style="color: var(--text-secondary); font-size: 16px; line-height: 1.6;">
            Send, receive and pay with ease. Instant zero-fee transfers to any Nigerian bank.
          </p>
        </div>

        <div class="onboarding-slide" data-slide="2" style="display: none;">
          <div style="width: 140px; height: 140px; margin: 0 auto 30px auto; border-radius: 36px; background: rgba(56, 189, 248, 0.12); border: 2px solid rgba(56, 189, 248, 0.4); display: flex; align-items: center; justify-content: center; font-size: 60px;">
            🛡️
          </div>
          <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 12px;">Safe & Secure</h2>
          <p style="color: var(--text-secondary); font-size: 16px; line-height: 1.6;">
            Your money and personal data are protected by bank-grade encryption and mandatory PIN authorization.
          </p>
        </div>

        <div class="onboarding-slide" data-slide="3" style="display: none;">
          <div style="width: 140px; height: 140px; margin: 0 auto 30px auto; border-radius: 36px; background: rgba(168, 85, 247, 0.12); border: 2px solid rgba(168, 85, 247, 0.4); display: flex; align-items: center; justify-content: center; font-size: 60px;">
            📱
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
      btnNext.innerText = 'Get Started 🚀';
    }
  }
}

export function renderLoginView() {
  return `
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 40px 24px; max-width: 440px; margin: 0 auto;">
      <div style="margin-bottom: 32px;">
        <a href="#/" class="logo-brand" style="margin-bottom: 24px;">
          <div class="logo-icon">Z</div>
          <span>ZPay</span>
        </a>
        <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">Welcome Back 👋</h1>
        <p style="color: var(--text-secondary); font-size: 15px;">Enter your registered details to access your account</p>
      </div>

      <form id="login-form">
        <div class="zpay-form-group">
          <label class="zpay-label">Email or Phone Number</label>
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

        <button type="submit" class="zpay-btn zpay-btn-primary zpay-btn-block" style="margin-top: 10px;">
          Sign In to ZPay
        </button>
      </form>

      <div style="display: flex; align-items: center; gap: 12px; margin: 24px 0;">
        <div style="flex: 1; height: 1px; background: var(--border-subtle);"></div>
        <span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Or continue with</span>
        <div style="flex: 1; height: 1px; background: var(--border-subtle);"></div>
      </div>

      <button class="zpay-btn zpay-btn-secondary zpay-btn-block" id="btn-google-auth">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/></svg>
        Continue with Google
      </button>

      <p style="text-align: center; margin-top: 30px; font-size: 14px; color: var(--text-secondary);">
        Don't have an account? <a href="#/signup" style="color: var(--zpay-green); font-weight: 700;">Create account</a>
      </p>
    </div>
  `;
}

export function initLoginListeners() {
  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Welcome back, Gideon! Logging in...");
      window.location.hash = '#/app';
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
  return `
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 40px 24px; max-width: 440px; margin: 0 auto;">
      <div style="margin-bottom: 28px;">
        <a href="#/" class="logo-brand" style="margin-bottom: 20px;">
          <div class="logo-icon">Z</div>
          <span>ZPay</span>
        </a>
        <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">Create Your Account</h1>
        <p style="color: var(--text-secondary); font-size: 14px;">Sign Up &bull; OTP &bull; PIN &bull; Dashboard</p>
      </div>

      <form id="signup-form">
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
          Create Account &rarr;
        </button>
      </form>

      <p style="text-align: center; margin-top: 24px; font-size: 14px; color: var(--text-secondary);">
        Already have an account? <a href="#/login" style="color: var(--zpay-green); font-weight: 700;">Sign in</a>
      </p>
    </div>
  `;
}

export function initSignupListeners() {
  const form = document.getElementById('signup-form');
  const btn = form?.querySelector('button[type="submit"]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullName = document.getElementById('reg-name')?.value.trim();
      const phone = document.getElementById('reg-phone')?.value.replace(/\s+/g, '');
      const email = document.getElementById('reg-email')?.value.trim();
      const password = document.getElementById('reg-password')?.value;

      if (!email || !email.includes('@')) {
        showToast("Please enter a valid Gmail / email address.", "error");
        return;
      }

      const originalBtnText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 8px;">⏳ Sending verification code to ${email}...</span>`;

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
}

export function renderVerifyOtpView() {
  let pending = {};
  try {
    pending = JSON.parse(sessionStorage.getItem('zpay_pending_signup') || '{}');
  } catch (_) {}
  const targetEmail = pending.email || 'your Gmail address';

  return `
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 40px 24px; max-width: 440px; margin: 0 auto; text-align: center;">
      <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--zpay-green-light); color: var(--zpay-green); display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 20px auto;">
        ✉️
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
