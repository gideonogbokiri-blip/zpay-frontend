import { FAQ_ITEMS } from '../state/mockData.js';
import { showToast } from '../components/notifications.js';

export function renderSupportView() {
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
          <a href="#/support" class="nav-link active">Support</a>
        </nav>
        <div class="nav-actions">
          <a href="#/login" class="zpay-btn zpay-btn-secondary zpay-btn-sm">Sign In</a>
          <a href="#/app" class="zpay-btn zpay-btn-primary zpay-btn-sm">Launch App 🚀</a>
        </div>
      </div>
    </header>

    <main class="web-container" style="padding: 70px 24px 100px 24px;">
      <div class="section-header">
        <span class="section-tag">Help & Support</span>
        <h1 class="section-title">How can we help you today?</h1>
        <p class="section-desc">Search our knowledge base, resolve transaction issues, or chat directly with our Lagos support squad.</p>
      </div>

      <!-- Quick Action Cards -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 60px;">
        <div class="zpay-card" style="text-align: center; padding: 30px;">
          <div style="font-size: 32px; margin-bottom: 12px;">🔍</div>
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Report a Transaction</h3>
          <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">Dispute a delayed transfer, failed recharge, or uncredited wallet top-up.</p>
          <button class="zpay-btn zpay-btn-outline zpay-btn-sm" id="btn-open-report">Report Transaction</button>
        </div>

        <div class="zpay-card" style="text-align: center; padding: 30px;">
          <div style="font-size: 32px; margin-bottom: 12px;">🔐</div>
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Account Recovery</h3>
          <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">Forgot your 4-digit PIN or changed your registered phone number?</p>
          <a href="#/login" class="zpay-btn zpay-btn-outline zpay-btn-sm">Reset PIN / Password</a>
        </div>

        <div class="zpay-card" style="text-align: center; padding: 30px;">
          <div style="font-size: 32px; margin-bottom: 12px;">💬</div>
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">24/7 Live Concierge</h3>
          <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">Speak directly with a support specialist. Typical reply time: 2 minutes.</p>
          <button class="zpay-btn zpay-btn-primary zpay-btn-sm" id="btn-live-chat">Start Live Chat</button>
        </div>
      </div>

      <!-- FAQ Section -->
      <div style="margin-top: 50px;">
        <h2 style="font-size: 26px; font-weight: 800; text-align: center; margin-bottom: 30px;">Frequently Asked Questions</h2>
        <div class="faq-accordion" id="faq-accordion-container">
          ${FAQ_ITEMS.map((item, idx) => `
            <div class="faq-item ${idx === 0 ? 'active' : ''}">
              <div class="faq-question">
                <span>${item.q}</span>
                <span class="faq-toggle-icon">▼</span>
              </div>
              <div class="faq-answer">
                ${item.a}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Contact Form Modal / Inline -->
      <div id="support-modal-container"></div>
    </main>
  `;
}

export function initSupportListeners() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) {
      q.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  const btnReport = document.getElementById('btn-open-report');
  if (btnReport) {
    btnReport.addEventListener('click', () => {
      const ref = prompt("Enter the Transaction Reference or ID (e.g. TRX_9201948271):");
      if (ref) {
        showToast(`Dispute ticket filed for ${ref}. Reference assigned: #SUP-${Math.floor(1000 + Math.random() * 9000)}. Our team will update you.`);
      }
    });
  }

  const btnChat = document.getElementById('btn-live-chat');
  if (btnChat) {
    btnChat.addEventListener('click', () => {
      showToast("Live Chat connected with Agent Tolani. Sending session handshake... 👋");
    });
  }
}
