import { store } from '../state/store.js';
import { BILLS_CATALOG } from '../state/mockData.js';
import { requestPinAuthorization } from '../components/pinPad.js';
import { launchConfetti } from '../components/confetti.js';
import { openReceiptModal } from '../components/receiptModal.js';
import { showToast } from '../components/notifications.js';

export function renderBillsView() {
  return `
    <div class="app-wrapper" style="max-width: 480px; margin: 0 auto; min-height: 100vh;">
      <header class="screen-header">
        <a href="#/app" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </a>
        <h3 class="screen-title">Pay Bills</h3>
        <div style="width: 36px;"></div>
      </header>

      <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <!-- Categories Tabs -->
          <div class="zpay-tabs" style="margin-bottom: 20px;" id="bills-category-tabs">
            <button class="zpay-tab-btn active" data-cat="electricity">⚡ Power</button>
            <button class="zpay-tab-btn" data-cat="cable">📺 TV</button>
            <button class="zpay-tab-btn" data-cat="internet">🌐 Internet</button>
            <button class="zpay-tab-btn" data-cat="education">🎓 Exams</button>
          </div>

          <!-- Dynamic Form Area -->
          <div id="bills-dynamic-content">
            <!-- Rendered below -->
          </div>
        </div>

        <div style="margin-top: 24px;">
          <button class="zpay-btn zpay-btn-primary zpay-btn-block" id="btn-bills-proceed" style="padding: 16px;">
            Continue &rarr;
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initBillsListeners() {
  let activeCat = 'electricity';
  const container = document.getElementById('bills-dynamic-content');
  const tabs = document.querySelectorAll('#bills-category-tabs .zpay-tab-btn');

  function renderCategory(cat) {
    activeCat = cat;
    if (cat === 'electricity') {
      container.innerHTML = `
        <div class="zpay-form-group">
          <label class="zpay-label">Distribution Company (DisCo)</label>
          <select class="zpay-input" id="bill-provider-select">
            ${BILLS_CATALOG.electricity.providers.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
          </select>
        </div>
        <div class="zpay-form-group">
          <label class="zpay-label">Meter Type</label>
          <div class="zpay-tabs">
            <button class="zpay-tab-btn active meter-type" data-type="Prepaid">Prepaid</button>
            <button class="zpay-tab-btn meter-type" data-type="Postpaid">Postpaid</button>
          </div>
        </div>
        <div class="zpay-form-group">
          <label class="zpay-label">Meter Number</label>
          <input type="text" class="zpay-input" id="bill-account-input" placeholder="e.g. 4501 9281 920" value="4501 9281 920" />
        </div>
        <div class="zpay-form-group">
          <label class="zpay-label">Amount (₦)</label>
          <input type="number" class="zpay-input" id="bill-amount-input" placeholder="5000" value="5000" />
        </div>
      `;
    } else if (cat === 'cable') {
      container.innerHTML = `
        <div class="zpay-form-group">
          <label class="zpay-label">Cable TV Provider</label>
          <select class="zpay-input" id="bill-provider-select">
            <option value="DStv Compact - ₦15,700">DStv Compact - ₦15,700</option>
            <option value="DStv Confam - ₦9,300">DStv Confam - ₦9,300</option>
            <option value="GOtv Jolli - ₦4,850">GOtv Jolli - ₦4,850</option>
            <option value="StarTimes Classic - ₦4,500">StarTimes Classic - ₦4,500</option>
          </select>
        </div>
        <div class="zpay-form-group">
          <label class="zpay-label">Smartcard / IUC Number</label>
          <input type="text" class="zpay-input" id="bill-account-input" placeholder="e.g. 1029384756" value="1029384756" />
        </div>
        <div class="zpay-form-group">
          <label class="zpay-label">Package Amount (₦)</label>
          <input type="number" class="zpay-input" id="bill-amount-input" value="15700" readonly style="opacity: 0.8;" />
        </div>
      `;
      const sel = container.querySelector('#bill-provider-select');
      sel.addEventListener('change', (e) => {
        const val = e.target.value;
        const match = val.match(/₦([\d,]+)/);
        if (match) {
          container.querySelector('#bill-amount-input').value = match[1].replace(',', '');
        }
      });
    } else if (cat === 'internet') {
      container.innerHTML = `
        <div class="zpay-form-group">
          <label class="zpay-label">Internet Service Provider</label>
          <select class="zpay-input" id="bill-provider-select">
            <option value="Spectranet 4G LTE">Spectranet 4G LTE</option>
            <option value="Smile Communications">Smile Communications</option>
            <option value="FiberOne Broadband">FiberOne Broadband</option>
          </select>
        </div>
        <div class="zpay-form-group">
          <label class="zpay-label">Account / User ID</label>
          <input type="text" class="zpay-input" id="bill-account-input" placeholder="e.g. SP-920194" value="SP-920194" />
        </div>
        <div class="zpay-form-group">
          <label class="zpay-label">Subscription Amount (₦)</label>
          <input type="number" class="zpay-input" id="bill-amount-input" value="7000" />
        </div>
      `;
    } else {
      // Education
      container.innerHTML = `
        <div class="zpay-form-group">
          <label class="zpay-label">Examination Body</label>
          <select class="zpay-input" id="bill-provider-select">
            <option value="JAMB UTME PIN - ₦6,200">JAMB UTME PIN - ₦6,200</option>
            <option value="WAEC Result Checker PIN - ₦3,800">WAEC Result Checker PIN - ₦3,800</option>
            <option value="NECO Token - ₦1,200">NECO Token - ₦1,200</option>
          </select>
        </div>
        <div class="zpay-form-group">
          <label class="zpay-label">Candidate Registration / Phone</label>
          <input type="text" class="zpay-input" id="bill-account-input" placeholder="0812 345 6789" value="0812 345 6789" />
        </div>
        <div class="zpay-form-group">
          <label class="zpay-label">Price (₦)</label>
          <input type="number" class="zpay-input" id="bill-amount-input" value="6200" readonly style="opacity: 0.8;" />
        </div>
      `;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderCategory(tab.dataset.cat);
    });
  });

  renderCategory('electricity');

  const btnProceed = document.getElementById('btn-bills-proceed');
  if (btnProceed) {
    btnProceed.addEventListener('click', () => {
      const provider = document.getElementById('bill-provider-select').value;
      const account = document.getElementById('bill-account-input').value.trim();
      const amount = parseFloat(document.getElementById('bill-amount-input').value);

      if (!amount || amount <= 0) {
        showToast("Please enter a valid bill amount.", "error");
        return;
      }
      if (!account) {
        showToast("Please enter meter/account number.", "error");
        return;
      }
      if (amount > store.balance) {
        showToast("Insufficient wallet balance.", "error");
        return;
      }

      requestPinAuthorization({
        title: `Pay ${provider.split('-')[0]}`,
        amount: amount,
        onSuccess: () => {
          const tx = store.deductFunds(amount, {
            title: `Bill Payment: ${provider.split('-')[0]}`,
            category: "Bills",
            recipient: provider,
            account: `Account: ${account}`
          });

          launchConfetti();
          showToast(`Bill settlement of ${store.formatMoney(amount)} successful! Token generated.`);
          openReceiptModal(tx);
        }
      });
    });
  }
}
