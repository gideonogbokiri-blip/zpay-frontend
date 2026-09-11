import { store } from '../state/store.js';
import { showToast } from './notifications.js';
import { launchConfetti } from './confetti.js';

export function openPaystackCheckout({ amount, onSuccess, onCancel }) {
  const backdrop = document.createElement('div');
  backdrop.className = 'paystack-overlay';
  backdrop.id = 'paystack-checkout-modal';

  const formattedAmount = store.formatMoney(amount);

  backdrop.innerHTML = `
    <div class="paystack-modal">
      <div class="paystack-test-banner">
        ⚡ Paystack Live Sandbox Simulation — Test Environment
      </div>
      <div class="paystack-header">
        <div class="paystack-brand">
          <span class="paystack-logo">paystack</span>
          <span class="paystack-brand-sub">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Secured
          </span>
        </div>
        <button class="paystack-close-btn" id="paystack-close" title="Cancel">&times;</button>
      </div>

      <div class="paystack-amount-bar">
        <div>
          <p class="paystack-email">${store.user.email}</p>
          <p style="font-size: 11px; color: #94A3B8;">Paying to ZPay Technologies Ltd</p>
        </div>
        <div class="paystack-amount">${formattedAmount}</div>
      </div>

      <div class="paystack-body" id="paystack-main-body">
        <div class="paystack-channels">
          <div class="paystack-channel-item active" data-channel="card">
            <span>💳 Card</span>
          </div>
          <div class="paystack-channel-item" data-channel="bank">
            <span>🏦 Transfer</span>
          </div>
          <div class="paystack-channel-item" data-channel="ussd">
            <span>📱 USSD</span>
          </div>
        </div>

        <div class="paystack-content" id="paystack-channel-content">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  let currentChannel = 'card';
  const contentArea = backdrop.querySelector('#paystack-channel-content');

  function renderCardView() {
    contentArea.innerHTML = `
      <div>
        <div class="paystack-form-field">
          <label>CARD NUMBER</label>
          <input type="text" class="paystack-form-input" id="ps-card-number" placeholder="4084 0000 0000 4242" value="4084 1234 5678 4242" />
          <span class="paystack-test-card-btn" id="ps-autofill-card">Fill Test Card (Success)</span>
        </div>
        <div class="paystack-form-row">
          <div class="paystack-form-field">
            <label>CARD EXPIRY</label>
            <input type="text" class="paystack-form-input" id="ps-card-expiry" placeholder="MM / YY" value="12/28" />
          </div>
          <div class="paystack-form-field">
            <label>CVV</label>
            <input type="password" maxlength="3" class="paystack-form-input" id="ps-card-cvv" placeholder="123" value="456" />
          </div>
        </div>
      </div>

      <button class="paystack-btn-pay" id="ps-submit-pay">
        Pay ${formattedAmount}
      </button>
    `;

    contentArea.querySelector('#ps-autofill-card').addEventListener('click', () => {
      contentArea.querySelector('#ps-card-number').value = "4084 1234 5678 4242";
      contentArea.querySelector('#ps-card-expiry').value = "12/28";
      contentArea.querySelector('#ps-card-cvv').value = "456";
    });

    contentArea.querySelector('#ps-submit-pay').addEventListener('click', () => {
      triggerPaymentProcessing('Card');
    });
  }

  function renderBankView() {
    contentArea.innerHTML = `
      <div>
        <p style="font-size: 13px; color: #64748B; margin-bottom: 12px;">
          Transfer ${formattedAmount} to the Paystack virtual account below:
        </p>
        <div class="paystack-bank-box">
          <p style="font-size: 12px; color: #64748B; font-weight: 600;">WEMA BANK / PAYSTACK TITAN</p>
          <h4>7920 1849 20</h4>
          <p style="font-size: 11px; color: #0BA4DB; cursor: pointer;" id="ps-copy-acc">📋 Click to copy account</p>
        </div>
        <p style="font-size: 11px; color: #94A3B8; text-align: center;">
          Expires in 29:45 mins. Automatic confirmation upon transfer.
        </p>
      </div>

      <button class="paystack-btn-pay" id="ps-bank-done" style="background: #10B981;">
        I've Sent The Money
      </button>
    `;

    contentArea.querySelector('#ps-copy-acc').addEventListener('click', () => {
      navigator.clipboard?.writeText('7920184920');
      showToast("Account number copied! Transfer via your banking app.");
    });

    contentArea.querySelector('#ps-bank-done').addEventListener('click', () => {
      triggerPaymentProcessing('Bank Transfer');
    });
  }

  function renderUssdView() {
    contentArea.innerHTML = `
      <div>
        <div class="paystack-form-field">
          <label>SELECT YOUR BANK</label>
          <select class="paystack-form-input" id="ps-ussd-bank">
            <option value="*737*">GTBank (*737#)</option>
            <option value="*966*">Zenith Bank (*966#)</option>
            <option value="*901*">Access Bank (*901#)</option>
            <option value="*894*">First Bank (*894#)</option>
          </select>
        </div>
        <div class="paystack-bank-box" style="margin-top: 10px;">
          <p style="font-size: 12px; color: #64748B;">Dial code from your registered phone:</p>
          <h4 id="ps-ussd-code" style="color: #0BA4DB; font-size: 16px;">*737*50*${amount}*194#</h4>
        </div>
      </div>

      <button class="paystack-btn-pay" id="ps-ussd-done">
        I Have Dialed The Code
      </button>
    `;

    const select = contentArea.querySelector('#ps-ussd-bank');
    select.addEventListener('change', (e) => {
      contentArea.querySelector('#ps-ussd-code').innerText = `${e.target.value}50*${amount}*194#`;
    });

    contentArea.querySelector('#ps-ussd-done').addEventListener('click', () => {
      triggerPaymentProcessing('USSD');
    });
  }

  function switchChannel(channel) {
    currentChannel = channel;
    backdrop.querySelectorAll('.paystack-channel-item').forEach(item => {
      item.classList.toggle('active', item.dataset.channel === channel);
    });
    if (channel === 'card') renderCardView();
    if (channel === 'bank') renderBankView();
    if (channel === 'ussd') renderUssdView();
  }

  backdrop.querySelectorAll('.paystack-channel-item').forEach(item => {
    item.addEventListener('click', () => {
      switchChannel(item.dataset.channel);
    });
  });

  renderCardView();

  function triggerPaymentProcessing(method) {
    const mainBody = backdrop.querySelector('#paystack-main-body');
    mainBody.innerHTML = `
      <div class="paystack-processing" style="width: 100%;">
        <div class="paystack-spinner"></div>
        <h4 style="font-size: 18px; font-weight: 700; color: #0F172A;">Verifying with Paystack...</h4>
        <p style="font-size: 13px; color: #64748B;">Please do not refresh. Securing transaction confirmation...</p>
      </div>
    `;

    setTimeout(() => {
      // Step 2: Confirmation
      mainBody.innerHTML = `
        <div class="paystack-processing" style="width: 100%;">
          <div style="width: 54px; height: 54px; border-radius: 50%; background: #DCFCE7; color: #16A34A; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 800; animation: bounceSuccess 0.4s ease forwards;">
            ✓
          </div>
          <h4 style="font-size: 19px; font-weight: 800; color: #16A34A;">Payment Successful!</h4>
          <p style="font-size: 13px; color: #475569;">${formattedAmount} received by ZPay.</p>
        </div>
      `;

      setTimeout(() => {
        backdrop.remove();
        const tx = store.addFunds(amount, method);
        launchConfetti();
        showToast(`Wallet credited with ${formattedAmount} via Paystack!`);
        if (onSuccess) onSuccess(tx);
      }, 1200);
    }, 1800);
  }

  backdrop.querySelector('#paystack-close').addEventListener('click', () => {
    backdrop.remove();
    if (onCancel) onCancel();
  });
}
