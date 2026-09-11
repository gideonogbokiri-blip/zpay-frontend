import { store } from '../state/store.js';
import { DATA_PLANS } from '../state/mockData.js';
import { requestPinAuthorization } from '../components/pinPad.js';
import { launchConfetti } from '../components/confetti.js';
import { openReceiptModal } from '../components/receiptModal.js';
import { showToast } from '../components/notifications.js';

export function renderDataPlansView() {
  const initialPlans = DATA_PLANS.mtn;

  return `
    <div class="app-wrapper" style="max-width: 480px; margin: 0 auto; min-height: 100vh;">
      <header class="screen-header">
        <a href="#/app" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </a>
        <h3 class="screen-title">Buy Data</h3>
        <div style="width: 36px;"></div>
      </header>

      <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <!-- Telecom Network Selector -->
          <div class="network-selector-row">
            <div class="network-pill active" data-network="mtn">
              <div class="network-logo-dot network-mtn">M</div>
              <span style="font-size: 12px; font-weight: 700;">MTN</span>
            </div>
            <div class="network-pill" data-network="airtel">
              <div class="network-logo-dot network-airtel">A</div>
              <span style="font-size: 12px; font-weight: 700;">Airtel</span>
            </div>
            <div class="network-pill" data-network="glo">
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
            <input type="tel" class="zpay-input" id="data-phone" placeholder="0803 123 4567" value="0803 123 4567" />
          </div>

          <!-- Plan Selection Cards -->
          <p style="font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">SELECT DATA BUNDLE</p>
          <div class="data-plans-grid" id="data-plans-container">
            ${initialPlans.map((p, idx) => `
              <div class="data-plan-card ${idx === 0 ? 'active' : ''}" data-id="${p.id}" data-price="${p.price}" data-name="${p.name}">
                <div>
                  <h5 style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${p.name}</h5>
                  <span style="font-size: 12px; color: var(--text-muted);">Validity: ${p.validity}</span>
                </div>
                <div style="text-align: right;">
                  <h4 style="font-size: 15px; font-weight: 800; color: var(--zpay-green);">${store.formatMoney(p.price)}</h4>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 24px;">
          <button class="zpay-btn zpay-btn-primary zpay-btn-block" id="btn-data-proceed" style="padding: 16px;">
            Proceed &rarr;
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initDataPlansListeners() {
  let currentNetwork = 'mtn';
  let selectedPlan = DATA_PLANS.mtn[0];

  const pills = document.querySelectorAll('.network-pill');
  const container = document.getElementById('data-plans-container');
  const inputPhone = document.getElementById('data-phone');

  function renderPlans(networkKey) {
    const plans = DATA_PLANS[networkKey] || [];
    selectedPlan = plans[0];
    container.innerHTML = plans.map((p, idx) => `
      <div class="data-plan-card ${idx === 0 ? 'active' : ''}" data-id="${p.id}" data-price="${p.price}" data-name="${p.name}">
        <div>
          <h5 style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${p.name}</h5>
          <span style="font-size: 12px; color: var(--text-muted);">Validity: ${p.validity}</span>
        </div>
        <div style="text-align: right;">
          <h4 style="font-size: 15px; font-weight: 800; color: var(--zpay-green);">${store.formatMoney(p.price)}</h4>
        </div>
      </div>
    `).join('');

    bindPlanClicks();
  }

  function bindPlanClicks() {
    container.querySelectorAll('.data-plan-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.data-plan-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedPlan = {
          name: card.dataset.name,
          price: parseFloat(card.dataset.price)
        };
      });
    });
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentNetwork = pill.dataset.network;
      renderPlans(currentNetwork);
    });
  });

  bindPlanClicks();

  const btnProceed = document.getElementById('btn-data-proceed');
  if (btnProceed) {
    btnProceed.addEventListener('click', () => {
      const phone = inputPhone.value.trim();
      if (!selectedPlan) {
        showToast("Please select a data bundle.", "error");
        return;
      }
      if (!phone) {
        showToast("Please enter phone number.", "error");
        return;
      }
      if (selectedPlan.price > store.balance) {
        showToast("Insufficient wallet balance.", "error");
        return;
      }

      requestPinAuthorization({
        title: `Subscribe ${selectedPlan.name}`,
        amount: selectedPlan.price,
        onSuccess: () => {
          const tx = store.deductFunds(selectedPlan.price, {
            title: `${currentNetwork.toUpperCase()} Data: ${selectedPlan.name}`,
            category: "Data",
            recipient: phone,
            account: `${currentNetwork.toUpperCase()} Broadband`
          });

          launchConfetti();
          showToast(`${selectedPlan.name} bundle successfully activated on ${phone}!`);
          openReceiptModal(tx);
        }
      });
    });
  }
}
