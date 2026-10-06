import { store } from '../state/store.js';
import { requestPinAuthorization } from '../components/pinPad.js';
import { launchConfetti } from '../components/confetti.js';
import { openReceiptModal } from '../components/receiptModal.js';
import { showToast } from '../components/notifications.js';

export function renderQrPayView() {
  return `
    <div class="app-wrapper" style="max-width: 480px; margin: 0 auto; min-height: 100vh;">
      <header class="screen-header">
        <a href="#/app" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </a>
        <h3 class="screen-title">Scan to Pay</h3>
        <button class="header-icon-btn" id="btn-qr-flash" title="Flashlight" style="display:flex; align-items:center; justify-content:center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </button>
      </header>

      <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; text-align: center;">
        <div>
          <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">
            Align the merchant's ZPay QR code within the frame to pay instantly
          </p>

          <!-- Camera Scanner Viewfinder -->
          <div class="qr-scanner-box" id="scanner-viewfinder">
            <div class="qr-scanner-beam"></div>
            
            <!-- Reticle corner borders -->
            <div style="position: absolute; top: 12px; left: 12px; width: 28px; height: 28px; border-top: 3px solid var(--zpay-green); border-left: 3px solid var(--zpay-green); border-top-left-radius: 8px;"></div>
            <div style="position: absolute; top: 12px; right: 12px; width: 28px; height: 28px; border-top: 3px solid var(--zpay-green); border-right: 3px solid var(--zpay-green); border-top-right-radius: 8px;"></div>
            <div style="position: absolute; bottom: 12px; left: 12px; width: 28px; height: 28px; border-bottom: 3px solid var(--zpay-green); border-left: 3px solid var(--zpay-green); border-bottom-left-radius: 8px;"></div>
            <div style="position: absolute; bottom: 12px; right: 12px; width: 28px; height: 28px; border-bottom: 3px solid var(--zpay-green); border-right: 3px solid var(--zpay-green); border-bottom-right-radius: 8px;"></div>

            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.25; color: var(--text-muted);">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
          </div>

          <!-- Quick Test Merchants to simulate live scanning -->
          <div style="margin-top: 24px;">
            <p style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 10px;">TAP TO SIMULATE INSTANT SCAN</p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button class="zpay-card scan-mock-btn" data-merchant="Genesis Supermarket" data-amount="3500" style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; text-align: left;">
                <div>
                  <h5 style="font-size: 14px; font-weight: 700;">Genesis Supermarket</h5>
                  <span style="font-size: 12px; color: var(--text-muted);">POS Checkout Counter #4</span>
                </div>
                <span class="zpay-badge zpay-badge-success">Scan ₦3,500</span>
              </button>

              <button class="zpay-card scan-mock-btn" data-merchant="Choplife Eatery Lekki" data-amount="1800" style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; text-align: left;">
                <div>
                  <h5 style="font-size: 14px; font-weight: 700;">Choplife Eatery Lekki</h5>
                  <span style="font-size: 12px; color: var(--text-muted);">Table 12 Order</span>
                </div>
                <span class="zpay-badge zpay-badge-success">Scan ₦1,800</span>
              </button>
            </div>
          </div>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px;">
          <button class="zpay-btn zpay-btn-secondary" id="btn-upload-qr" style="flex: 1; display:inline-flex; align-items:center; justify-content:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Upload QR
          </button>
          <button class="zpay-btn zpay-btn-outline" id="btn-manual-zpayid" style="flex: 1; display:inline-flex; align-items:center; justify-content:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="6" y1="8" x2="6.01" y2="8"/><line x1="10" y1="8" x2="10.01" y2="8"/><line x1="14" y1="8" x2="14.01" y2="8"/><line x1="18" y1="8" x2="18.01" y2="8"/><line x1="6" y1="12" x2="6.01" y2="12"/><line x1="18" y1="12" x2="18.01" y2="12"/><line x1="8" y1="16" x2="16" y2="16"/></svg>
            Manual ZPay ID
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initQrPayListeners() {
  const flashBtn = document.getElementById('btn-qr-flash');
  let flashOn = false;
  if (flashBtn) {
    flashBtn.addEventListener('click', () => {
      flashOn = !flashOn;
      flashBtn.style.color = flashOn ? '#F59E0B' : 'var(--text-secondary)';
      showToast(flashOn ? "Torch Flashlight ON" : "Flashlight OFF");
    });
  }

  const mockButtons = document.querySelectorAll('.scan-mock-btn');
  mockButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const merchant = btn.dataset.merchant;
      const amount = parseFloat(btn.dataset.amount);

      triggerQrCheckout(merchant, amount);
    });
  });

  const btnUpload = document.getElementById('btn-upload-qr');
  if (btnUpload) {
    btnUpload.addEventListener('click', () => {
      showToast("Select QR Code image from your gallery...");
      setTimeout(() => {
        triggerQrCheckout("Genesis Supermarket", 3500);
      }, 700);
    });
  }

  const btnManual = document.getElementById('btn-manual-zpayid');
  if (btnManual) {
    btnManual.addEventListener('click', () => {
      const id = prompt("Enter Merchant ZPay Tag (e.g. @genesis_market):", "@genesis_market");
      if (id) {
        const amt = prompt("Enter payment amount (₦):", "2500");
        if (amt && parseFloat(amt) > 0) {
          triggerQrCheckout(id, parseFloat(amt));
        }
      }
    });
  }
}

function triggerQrCheckout(merchant, amount) {
  requestPinAuthorization({
    title: `Pay to ${merchant}`,
    amount: amount,
    onSuccess: () => {
      const tx = store.deductFunds(amount, {
        title: `QR Pay: ${merchant}`,
        category: "QR Payment",
        recipient: merchant,
        account: "ZPay QR Terminal"
      });

      launchConfetti();
      showToast(`Paid ${store.formatMoney(amount)} to ${merchant}!`);
      openReceiptModal(tx);
    }
  });
}
