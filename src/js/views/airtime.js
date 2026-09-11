import { store } from '../state/store.js';
import { requestPinAuthorization } from '../components/pinPad.js';
import { launchConfetti } from '../components/confetti.js';
import { openReceiptModal } from '../components/receiptModal.js';
import { showToast } from '../components/notifications.js';

export function renderAirtimeView() {
  return `
    <div class="app-wrapper" style="max-width: 480px; margin: 0 auto; min-height: 100vh;">
      <header class="screen-header">
        <a href="#/app" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </a>
        <h3 class="screen-title">Buy Airtime</h3>
        <div style="width: 36px;"></div>
      </header>

      <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <!-- Network Selector: MTN | Airtel | Glo | 9mobile -->
          <p style="font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 10px;">SELECT TELECOM NETWORK</p>
          <div class="network-selector-row">
            <div class="network-pill active" data-network="MTN">
              <div class="network-logo-dot network-mtn">M</div>
              <span style="font-size: 12px; font-weight: 700;">MTN</span>
            </div>
            <div class="network-pill" data-network="Airtel">
              <div class="network-logo-dot network-airtel">A</div>
              <span style="font-size: 12px; font-weight: 700;">Airtel</span>
            </div>
            <div class="network-pill" data-network="Glo">
              <div class="network-logo-dot network-glo">G</div>
              <span style="font-size: 12px; font-weight: 700;">Glo</span>
            </div>
            <div class="network-pill" data-network="9mobile">
              <div class="network-logo-dot network-9mobile">9</div>
              <span style="font-size: 12px; font-weight: 700;">9mobile</span>
            </div>
          </div>

          <!-- Phone Number -->
          <div class="zpay-form-group">
            <label class="zpay-label">Phone Number</label>
            <div class="zpay-input-wrapper">
              <input type="tel" class="zpay-input" id="airtime-phone" placeholder="0803 123 4567" value="0803 123 4567" />
              <span class="zpay-input-icon" id="airtime-contact-pick" title="Use My Number">📱</span>
            </div>
          </div>

          <!-- Amount -->
          <div class="zpay-form-group">
            <label class="zpay-label">Amount</label>
            <div class="zpay-input-wrapper" style="border-bottom: 2px solid var(--zpay-green); padding: 4px 0;">
              <span class="zpay-input-currency">₦</span>
              <input type="number" class="zpay-input" id="airtime-amount" placeholder="0.00" value="1000" style="font-size: 26px; font-weight: 800; border: none; background: transparent; padding: 0;" />
            </div>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">Available Balance: ${store.formatMoney(store.balance)}</p>
          </div>

          <!-- Quick Amounts: ₦100 | ₦200 | ₦500 | ₦1,000 | ₦2,000 | ₦5,000 -->
          <div class="zpay-chips-row" style="grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <div class="zpay-chip" data-amt="100">₦100</div>
            <div class="zpay-chip" data-amt="200">₦200</div>
            <div class="zpay-chip" data-amt="500">₦500</div>
            <div class="zpay-chip active" data-amt="1000">₦1,000</div>
            <div class="zpay-chip" data-amt="2000">₦2,000</div>
            <div class="zpay-chip" data-amt="5000">₦5,000</div>
          </div>
        </div>

        <div style="margin-top: 24px;">
          <button class="zpay-btn zpay-btn-primary zpay-btn-block" id="btn-airtime-proceed" style="padding: 16px;">
            Proceed &rarr;
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initAirtimeListeners() {
  let selectedNetwork = 'MTN';
  const pills = document.querySelectorAll('.network-pill');
  const inputAmount = document.getElementById('airtime-amount');
  const inputPhone = document.getElementById('airtime-phone');
  const chips = document.querySelectorAll('.zpay-chip');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedNetwork = pill.dataset.network;
    });
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      inputAmount.value = chip.dataset.amt;
    });
  });

  const btnProceed = document.getElementById('btn-airtime-proceed');
  if (btnProceed) {
    btnProceed.addEventListener('click', () => {
      const amount = parseFloat(inputAmount.value);
      const phone = inputPhone.value.trim();

      if (!amount || amount < 50) {
        showToast("Minimum airtime recharge is ₦50.", "error");
        return;
      }
      if (!phone) {
        showToast("Please enter a valid phone number.", "error");
        return;
      }
      if (amount > store.balance) {
        showToast("Insufficient wallet balance.", "error");
        return;
      }

      requestPinAuthorization({
        title: `Recharge ${selectedNetwork} Airtime`,
        amount: amount,
        onSuccess: () => {
          const tx = store.deductFunds(amount, {
            title: `${selectedNetwork} Airtime Recharge`,
            category: "Airtime",
            recipient: phone,
            account: `${selectedNetwork} Telecom Network`
          });

          launchConfetti();
          showToast(`Recharge of ${store.formatMoney(amount)} sent to ${phone}!`);
          openReceiptModal(tx);
        }
      });
    });
  }
}
