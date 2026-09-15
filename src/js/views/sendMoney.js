import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';

const BANKS = [
  { code: '011', name: 'First Bank' },
  { code: '044', name: 'Access Bank' },
  { code: '058', name: 'GTBank' },
  { code: '057', name: 'Zenith Bank' },
  { code: '033', name: 'United Bank for Africa' },
  { code: '221', name: 'Stanbic IBTC' },
  { code: '232', name: 'Sterling Bank' },
  { code: '035', name: 'Wema Bank' },
  { code: '215', name: 'Unity Bank' },
  { code: '301', name: 'Jaiz Bank' },
  { code: 'zpay', name: 'ZenithCoop Wallet (Internal)' },
];

export function renderSendMoneyView() {
  return `
    <div class="app-wrapper">
      <header class="screen-header">
        <a href="#/app" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="screen-title">Send Money</span>
        <div style="width:36px;"></div>
      </header>

      <div style="padding: 20px; display:flex; flex-direction:column; gap:18px;">

        <!-- Balance Chip -->
        <div style="display:flex; align-items:center; justify-content:space-between; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:12px 16px;">
          <span style="font-size:13px; color:var(--text-secondary);">Available Balance</span>
          <span style="font-size:15px; font-weight:800; color:var(--zpay-green);">${store.formatMoney(store.balance)}</span>
        </div>

        <!-- Bank Select -->
        <div class="zpay-form-group">
          <label class="zpay-label">Select Bank</label>
          <div class="zpay-input-wrapper">
            <select id="send-bank" class="zpay-input" style="appearance:none; cursor:pointer;">
              <option value="">-- Choose Bank --</option>
              ${BANKS.map(b => `<option value="${b.code}">${b.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Account Number -->
        <div class="zpay-form-group">
          <label class="zpay-label">Account Number / Phone</label>
          <div class="zpay-input-wrapper">
            <input type="tel" id="send-account" class="zpay-input" placeholder="e.g. 0801234567 or 1234567890" maxlength="10" inputmode="numeric"/>
          </div>
          <div id="account-name-display" style="display:none; padding:10px 14px; background:rgba(234,0,41,0.07); border:1px solid rgba(234,0,41,0.2); border-radius:var(--radius-sm); font-size:13px; font-weight:700; color:var(--zpay-green); margin-top:4px;">
            ✓ <span id="resolved-name">--</span>
          </div>
        </div>

        <!-- Amount -->
        <div class="zpay-form-group">
          <label class="zpay-label">Amount (₦)</label>
          <div class="zpay-input-wrapper" style="background:var(--bg-input); border:1px solid var(--border-medium); border-radius:var(--radius-md); padding: 0 16px;">
            <span style="font-size:22px; font-weight:700; color:var(--text-muted); margin-right:6px;">₦</span>
            <input type="number" id="send-amount" class="zpay-input" placeholder="0.00" inputmode="decimal"
              style="border:none; background:transparent; font-size:28px; font-weight:800; padding:14px 0;"/>
          </div>
          <!-- Quick Amount Chips -->
          <div class="zpay-chips-row" style="grid-template-columns: repeat(4,1fr); margin-top:10px;">
            <button class="zpay-chip send-quick" data-amt="500">₦500</button>
            <button class="zpay-chip send-quick" data-amt="1000">₦1k</button>
            <button class="zpay-chip send-quick" data-amt="5000">₦5k</button>
            <button class="zpay-chip send-quick" data-amt="10000">₦10k</button>
          </div>
        </div>

        <!-- Note -->
        <div class="zpay-form-group">
          <label class="zpay-label">Note (optional)</label>
          <input type="text" id="send-note" class="zpay-input" placeholder="What's this for?"/>
        </div>

        <!-- Fee breakdown -->
        <div style="background:var(--bg-surface); border-radius:var(--radius-md); padding:14px 16px; display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; font-size:13px;">
            <span style="color:var(--text-secondary);">Transfer Fee</span>
            <span style="color:var(--zpay-green); font-weight:700;">₦0.00 (Free)</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:700;">
            <span style="color:var(--text-primary);">Total Deduction</span>
            <span id="send-total" style="color:var(--text-primary);">₦0.00</span>
          </div>
        </div>

        <button id="btn-send-proceed" class="zpay-btn zpay-btn-primary zpay-btn-block" disabled style="opacity:0.45;">
          Continue →
        </button>
      </div>

      <!-- PIN Confirmation Modal -->
      <div id="pin-modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.75); backdrop-filter:blur(10px); z-index:1000; display:none; align-items:flex-end; justify-content:center;">
        <div style="background:var(--bg-surface); border-top-left-radius:28px; border-top-right-radius:28px; border:1px solid var(--border-medium); padding:28px 24px 40px; width:100%; max-width:480px;">
          <div class="zpay-sheet-handle"></div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="width:28px;"></div>
            <h3 style="font-size:18px; font-weight:700;">Confirm Transfer</h3>
            <button id="close-pin-modal" style="background:none; border:none; color:var(--text-muted); font-size:20px; cursor:pointer; width:28px; text-align:right;">✕</button>
          </div>
          <div style="text-align:center; margin-bottom:20px;">
            <p style="font-size:13px; color:var(--text-secondary); margin-top:2px;">Sending <strong id="pin-amount-label" style="color:var(--zpay-green);">₦0</strong> to <strong id="pin-name-label">--</strong></p>
          </div>
          <div class="pin-pad-dots" id="pin-dots">
            <div class="pin-dot" id="dot-0"></div>
            <div class="pin-dot" id="dot-1"></div>
            <div class="pin-dot" id="dot-2"></div>
            <div class="pin-dot" id="dot-3"></div>
          </div>
          <div class="pin-keypad">
            ${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k => `
              <button class="pin-key ${k === '' ? 'pin-key-blank' : ''}" data-key="${k}">${k}</button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initSendMoneyListeners() {
  const bankSel = document.getElementById('send-bank');
  const accountInput = document.getElementById('send-account');
  const amountInput = document.getElementById('send-amount');
  const sendTotal = document.getElementById('send-total');
  const btn = document.getElementById('btn-send-proceed');
  const accountNameDisplay = document.getElementById('account-name-display');
  const resolvedName = document.getElementById('resolved-name');
  const pinModal = document.getElementById('pin-modal');
  const quickBtns = document.querySelectorAll('.send-quick');

  // Mock name resolution
  const mockNames = ['John Doe','Emeka Obi','Fatima Al-Hassan','Chidi Nwachukwu','Blessing Ade','Amina Usman'];
  let nameResolved = false;
  let resolveTimer;

  function formatNaira(v) {
    return '₦' + Number(v||0).toLocaleString('en-NG', { minimumFractionDigits:2, maximumFractionDigits:2 });
  }

  function checkForm() {
    const amt = parseFloat(amountInput.value) || 0;
    const acct = accountInput.value.trim();
    const bank = bankSel.value;
    const ok = nameResolved && acct.length >= 10 && bank && amt >= 1 && amt <= store.balance;
    btn.disabled = !ok;
    btn.style.opacity = ok ? '1' : '0.45';
    sendTotal.textContent = formatNaira(amt);
  }

  accountInput.addEventListener('input', () => {
    clearTimeout(resolveTimer);
    nameResolved = false;
    accountNameDisplay.style.display = 'none';
    if (accountInput.value.length >= 10 && bankSel.value) {
      resolvedName.textContent = 'Resolving...';
      accountNameDisplay.style.display = 'block';
      resolveTimer = setTimeout(() => {
        const name = mockNames[Math.floor(Math.random() * mockNames.length)];
        resolvedName.textContent = name;
        nameResolved = true;
        checkForm();
      }, 800);
    }
    checkForm();
  });

  bankSel.addEventListener('change', () => { accountInput.dispatchEvent(new Event('input')); });
  amountInput.addEventListener('input', checkForm);

  quickBtns.forEach(b => {
    b.addEventListener('click', () => {
      amountInput.value = b.dataset.amt;
      quickBtns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      checkForm();
    });
  });

  // PIN Modal
  let pinValue = '';
  btn.addEventListener('click', () => {
    document.getElementById('pin-amount-label').textContent = formatNaira(parseFloat(amountInput.value));
    document.getElementById('pin-name-label').textContent = resolvedName.textContent;
    pinModal.style.display = 'flex';
    pinValue = '';
    updateDots();
  });

  document.getElementById('close-pin-modal')?.addEventListener('click', () => {
    pinModal.style.display = 'none';
  });

  function updateDots() {
    for (let i = 0; i < 4; i++) {
      document.getElementById(`dot-${i}`).classList.toggle('filled', i < pinValue.length);
    }
  }

  document.querySelectorAll('.pin-key').forEach(key => {
    key.addEventListener('click', () => {
      const k = key.dataset.key;
      if (k === '⌫') { pinValue = pinValue.slice(0, -1); }
      else if (k === '') { return; }
      else if (pinValue.length < 4) { pinValue += k; }
      updateDots();
      if (pinValue.length === 4) {
        setTimeout(() => {
          if (store.verifyPin(pinValue)) {
            const amt = parseFloat(amountInput.value);
            const bank = BANKS.find(b => b.code === bankSel.value);
            try {
              store.deductFunds(amt, {
                title: `Transfer to ${resolvedName.textContent}`,
                category: 'Transfer',
                recipient: `${resolvedName.textContent} (${bank?.name || 'Bank'})`,
                account: accountInput.value,
                fee: 0,
                note: document.getElementById('send-note')?.value || ''
              });
              pinModal.style.display = 'none';
              showToast(`✓ ₦${amt.toLocaleString()} sent to ${resolvedName.textContent}!`);
              setTimeout(() => { window.location.hash = '#/app'; }, 1000);
            } catch(e) {
              showToast(e.message, 'error');
              pinModal.style.display = 'none';
            }
          } else {
            showToast('Wrong PIN. Try again.', 'error');
            pinValue = '';
            updateDots();
          }
        }, 300);
      }
    });
  });
}
