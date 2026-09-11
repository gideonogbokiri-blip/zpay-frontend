import { store } from '../state/store.js';
import { openPaystackCheckout } from '../components/paystackModal.js';
import { showToast } from '../components/notifications.js';

export function renderAddMoneyView() {
  const currentBalance = store.formatMoney(store.balance);

  return `
    <div class="app-wrapper" style="max-width: 480px; margin: 0 auto; min-height: 100vh;">
      <!-- Header -->
      <header style="display: flex; align-items: center; gap: 12px; padding: 20px 20px 12px 20px; background: var(--bg-app);">
        <a href="#/app" style="width: 44px; height: 44px; border-radius: 999px; background: rgba(0, 210, 106, 0.12); border: 1px solid rgba(0, 210, 106, 0.35); display: flex; align-items: center; justify-content: center; color: var(--zpay-green); font-size: 24px; font-weight: 700; text-decoration: none; transition: all 0.2s ease;">
          ‹
        </a>
        <div style="flex: 1;">
          <h2 style="font-size: 24px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Fund wallet</h2>
          <p style="font-size: 15px; font-weight: 500; color: var(--text-secondary); line-height: 1.4;">Add money to your ZPAY wallet</p>
        </div>
      </header>

      <div style="padding: 12px 20px 112px 20px; display: flex; flex-direction: column; gap: 4px;">
        <!-- Amount Input Section -->
        <div style="margin-bottom: 0;">
          <label style="font-size: 13px; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 6px; display: block;">Amount (NGN)</label>
          <div style="display: flex; align-items: center; border-radius: 14px; border: 1px solid rgba(255,255,255,0.10); background: rgba(21, 26, 33, 1); padding: 0 16px; min-height: 54px;">
            <span style="font-size: 20px; font-weight: 700; color: var(--text-secondary); margin-right: 4px;">₦</span>
            <input type="number" id="fund-amount-input" placeholder="0" value="" style="flex: 1; font-size: 17px; font-weight: 500; color: var(--text-primary); background: transparent; border: none; outline: none; padding: 14px 0;" inputmode="numeric" />
          </div>
          <p style="font-size: 13px; font-weight: 500; color: var(--text-muted); margin-top: 4px;">Minimum amount is NGN 1.</p>
        </div>

        <!-- Transfer Info Card -->
        <div style="background: rgba(21, 26, 33, 1); border: 1px solid rgba(0, 210, 106, 0.25); border-radius: 20px; padding: 16px; margin-top: 16px; box-shadow: 0 4px 20px rgba(0, 210, 106, 0.05);">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(0, 210, 106, 0.14); border: 1px solid var(--zpay-green); display: flex; align-items: center; justify-content: center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--zpay-green)" stroke-width="2.5"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="M16 19h6m-3-3v6"/></svg>
            </div>
            <div style="flex: 1;">
              <p style="font-size: 15px; font-weight: 700; color: var(--zpay-green); line-height: 1.3;">Transfer to your ZPAY account</p>
              <p style="font-size: 13px; font-weight: 500; color: var(--text-muted);">Use your phone number as the account number</p>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <div style="font-family: monospace; font-size: 38px; font-weight: 700; color: var(--text-primary); letter-spacing: -1px;">${store.user.phone.replace(/\s/g, '')}</div>
            <div style="background: var(--zpay-green); border-radius: 10px; padding: 4px 12px; box-shadow: 0 0 12px rgba(0,210,106,0.3);">
              <span style="font-size: 15px; font-weight: 800; color: #041209;">ZPAY</span>
            </div>
          </div>

          <p style="font-size: 13px; font-weight: 500; color: var(--text-muted); line-height: 1.5;">Send money to this account from any Nigerian bank or app. It lands in your ZPAY wallet instantly.</p>
        </div>

        <!-- Quick Amount Pills -->
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px;" id="quick-amount-pills">
          <button class="quick-amt-pill" data-amt="1000" style="flex: 1; min-width: 70px; padding: 8px 16px; background: rgba(21, 26, 33, 1); border: 1px solid rgba(255,255,255,0.10); border-radius: 999px; color: var(--text-primary); font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.15s ease; text-align: center;">₦1,000</button>
          <button class="quick-amt-pill" data-amt="2000" style="flex: 1; min-width: 70px; padding: 8px 16px; background: rgba(21, 26, 33, 1); border: 1px solid rgba(255,255,255,0.10); border-radius: 999px; color: var(--text-primary); font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.15s ease; text-align: center;">₦2,000</button>
          <button class="quick-amt-pill" data-amt="5000" style="flex: 1; min-width: 70px; padding: 8px 16px; background: rgba(21, 26, 33, 1); border: 1px solid rgba(255,255,255,0.10); border-radius: 999px; color: var(--text-primary); font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.15s ease; text-align: center;">₦5,000</button>
          <button class="quick-amt-pill" data-amt="10000" style="flex: 1; min-width: 70px; padding: 8px 16px; background: rgba(21, 26, 33, 1); border: 1px solid rgba(255,255,255,0.10); border-radius: 999px; color: var(--text-primary); font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.15s ease; text-align: center;">₦10,000</button>
        </div>

        <!-- Summary Breakdown -->
        <div style="display: flex; flex-direction: column; gap: 0; margin-top: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.10);">
            <span style="font-size: 17px; font-weight: 500; color: var(--text-secondary);">Amount</span>
            <span id="summary-amount" style="font-size: 17px; font-weight: 500; color: var(--text-primary);">₦0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.10);">
            <span style="font-size: 17px; font-weight: 500; color: var(--text-secondary);">Fee</span>
            <span style="font-size: 17px; font-weight: 500; color: var(--text-primary);">₦0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
            <span style="font-size: 17px; font-weight: 700; color: var(--text-primary);">Total</span>
            <span id="summary-total" style="font-size: 17px; font-weight: 700; color: var(--zpay-green);">₦0.00</span>
          </div>
        </div>

        <!-- Balance Info Card -->
        <div style="background: rgba(17, 21, 27, 1); border: 1px solid rgba(255,255,255,0.10); border-radius: 10px; padding: 16px; margin-top: 16px; display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 15px; font-weight: 500; color: var(--text-secondary);">Current wallet balance</span>
            <span style="font-size: 17px; font-weight: 700; color: var(--text-primary);">${currentBalance}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 15px; font-weight: 500; color: var(--text-secondary);">Total to pay</span>
            <span id="info-total-pay" style="font-size: 17px; font-weight: 700; color: var(--zpay-green);">₦0.00</span>
          </div>
          <div style="height: 1px; background: rgba(255,255,255,0.10); margin: 4px 0;"></div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 15px; font-weight: 500; color: var(--text-secondary);">Remaining balance</span>
            <span id="info-remaining" style="font-size: 17px; font-weight: 700; color: var(--zpay-green);">${currentBalance}</span>
          </div>
        </div>

        <!-- Fund Wallet Button -->
        <div style="margin-top: 24px;">
          <button id="btn-fund-wallet" disabled style="width: 100%; padding: 18px; font-size: 18px; font-weight: 800; background: var(--zpay-green); color: #041209; border: none; border-radius: 14px; cursor: pointer; box-shadow: 0 4px 20px rgba(0, 210, 106, 0.25); opacity: 0.45; transition: all 0.2s ease;">
            Fund wallet
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initAddMoneyListeners() {
  const input = document.getElementById('fund-amount-input');
  const summaryAmount = document.getElementById('summary-amount');
  const summaryTotal = document.getElementById('summary-total');
  const infoTotalPay = document.getElementById('info-total-pay');
  const infoRemaining = document.getElementById('info-remaining');
  const btnFund = document.getElementById('btn-fund-wallet');
  const pills = document.querySelectorAll('.quick-amt-pill');

  function formatNaira(val) {
    return '₦' + Number(val || 0).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function updateSummary() {
    const amt = parseFloat(input.value) || 0;
    summaryAmount.textContent = formatNaira(amt);
    summaryTotal.textContent = formatNaira(amt);
    infoTotalPay.textContent = formatNaira(amt);

    const remaining = store.balance + amt;
    infoRemaining.textContent = formatNaira(remaining);

    // Enable/disable button
    if (amt >= 1) {
      btnFund.disabled = false;
      btnFund.style.opacity = '1';
      btnFund.style.cursor = 'pointer';
    } else {
      btnFund.disabled = true;
      btnFund.style.opacity = '0.45';
      btnFund.style.cursor = 'default';
    }

    // Update pill active states
    pills.forEach(pill => {
      if (parseInt(pill.dataset.amt) === amt) {
        pill.style.borderColor = 'var(--zpay-green)';
        pill.style.background = 'rgba(0, 210, 106, 0.15)';
        pill.style.color = 'var(--zpay-green)';
      } else {
        pill.style.borderColor = 'rgba(255,255,255,0.10)';
        pill.style.background = 'rgba(21, 26, 33, 1)';
        pill.style.color = 'var(--text-primary)';
      }
    });
  }

  if (input) {
    input.addEventListener('input', updateSummary);
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      input.value = pill.dataset.amt;
      updateSummary();
    });
  });

  if (btnFund) {
    btnFund.addEventListener('click', () => {
      const amount = parseFloat(input.value);
      if (!amount || amount < 1) {
        showToast("Minimum funding amount is ₦1.", "error");
        return;
      }

      openPaystackCheckout({
        amount: amount,
        onSuccess: (tx) => {
          setTimeout(() => {
            window.location.hash = '#/app';
          }, 400);
        }
      });
    });
  }

  // Initial state
  updateSummary();
}
