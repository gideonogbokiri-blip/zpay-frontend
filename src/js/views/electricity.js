import { store } from '../state/store.js';
import { requestPinAuthorization } from '../components/pinPad.js';
import { launchConfetti } from '../components/confetti.js';
import { openReceiptModal } from '../components/receiptModal.js';
import { showToast } from '../components/notifications.js';

export const DISCO_PROVIDERS = [
  { id: 'ikedc', name: 'Ikeja Electric (IKEDC)', short: 'IKEDC', iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>', color: '#EA0029' },
  { id: 'ekedc', name: 'Eko Electric (EKEDC)', short: 'EKEDC', iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>', color: '#0284C7' },
  { id: 'aedc', name: 'Abuja Electric (AEDC)', short: 'AEDC', iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>', color: '#059669' },
  { id: 'ibedc', name: 'Ibadan Electric (IBEDC)', short: 'IBEDC', iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>', color: '#D97706' },
  { id: 'kedco', name: 'Kano Electric (KEDCO)', short: 'KEDCO', iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>', color: '#7C3AED' },
  { id: 'eedc', name: 'Enugu Electric (EEDC)', short: 'EEDC', iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v1m0 18v1M4.93 4.93l.7.7m12.74 12.74l.7.7M2 12h1m18 0h1M4.93 19.07l.7-.7m12.74-12.74l.7-.7M9 16a5 5 0 1 1 6 0V18a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2z"/></svg>', color: '#DC2626' },
  { id: 'phed', name: 'Port Harcourt (PHED)', short: 'PHED', iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>', color: '#0D9488' },
  { id: 'jed', name: 'Jos Electric (JED)', short: 'JED', iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="8" y2="12"/><line x1="16" y1="21" x2="16" y2="12"/></svg>', color: '#E11D48' }
];

export function renderElectricityView() {
  const mainBal = store.balance;

  return `
    <div class="app-wrapper" style="padding-bottom: 90px;">
      
      <!-- Top Screen Header -->
      <header class="screen-header" style="background:var(--bg-app); position:sticky; top:0; z-index:20;">
        <a href="#/app/services" class="back-btn" title="Back to Services">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <div style="text-align:center;">
          <span class="screen-title" style="font-size:16px;">Electricity Bills</span>
          <div style="font-size:11px; color:var(--text-muted);">Instant 20-Digit Token Delivery</div>
        </div>
        <div style="width:36px; display:flex; justify-content:flex-end;">
          <a href="#/app/transactions" style="color:var(--text-muted); text-decoration:none; display:flex; align-items:center;" title="History">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </a>
        </div>
      </header>

      <div style="padding: 16px 20px; display: flex; flex-direction: column; gap: 18px;">

        <!-- DisCo Selector Grid -->
        <div>
          <label style="font-size:12px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:10px;">
            Select Distribution Company (DisCo)
          </label>
          <div id="disco-grid" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px;">
            ${DISCO_PROVIDERS.map((d, idx) => `
              <button class="disco-btn ${idx === 0 ? 'active' : ''}" data-disco-id="${d.id}" data-disco-name="${d.name}" style="background:var(--bg-card); border:1.5px solid ${idx === 0 ? 'var(--zpay-green)' : 'var(--border-subtle)'}; border-radius:14px; padding:10px 4px; display:flex; flex-direction:column; align-items:center; gap:6px; cursor:pointer; transition:all 0.2s;">
                <span style="color:${d.color}; display:flex; align-items:center; justify-content:center; height:24px;">${d.iconSvg}</span>
                <span style="font-size:10px; font-weight:800; color:${idx === 0 ? 'var(--zpay-green)' : 'var(--text-primary)'}; text-align:center; line-height:1.2;">
                  ${d.short}
                </span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Meter Type Toggle -->
        <div>
          <label style="font-size:12px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:8px;">
            Meter Type
          </label>
          <div class="zpay-tabs">
            <button class="zpay-tab-btn active" id="type-prepaid" data-type="Prepaid" style="display:inline-flex; align-items:center; justify-content:center; gap:6px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Prepaid (Generates Token)
            </button>
            <button class="zpay-tab-btn" id="type-postpaid" data-type="Postpaid" style="display:inline-flex; align-items:center; justify-content:center; gap:6px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Postpaid (Bill Clearance)
            </button>
          </div>
        </div>

        <!-- Meter Number Input & Live Lookup -->
        <div class="zpay-card" style="border:1px solid var(--border-medium); padding:16px;">
          <label style="font-size:12px; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px;">Meter Number</label>
          <div style="position:relative;">
            <input type="text" id="input-meter-no" class="zpay-input" placeholder="e.g. 0429 8192 018" value="0429 8192 018" style="width:100%; font-size:15px; font-weight:700; letter-spacing:1px;" />
            <button id="btn-sample-meter" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:rgba(234,0,41,0.1); border:none; color:var(--zpay-green); font-size:11px; font-weight:700; padding:4px 8px; border-radius:6px; cursor:pointer;">
              Verify
            </button>
          </div>

          <!-- Customer Verification Card (OPay Style) -->
          <div id="meter-verified-badge" style="margin-top:12px; background:rgba(0,210,106,0.08); border:1px solid rgba(0,210,106,0.25); border-radius:12px; padding:10px 12px; display:flex; flex-direction:column; gap:4px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:var(--text-muted);">Verified Customer:</span>
              <span class="zpay-badge zpay-badge-success" style="font-size:9px; padding:1px 6px;">Active &bull; Band A</span>
            </div>
            <div style="font-size:13px; font-weight:800; color:var(--text-primary);" id="verified-customer-name">
              GIDEON OLADIPO
            </div>
            <div style="font-size:11px; color:var(--text-secondary);" id="verified-address">
              14 Admiralty Way, Lekki Phase 1, Lagos
            </div>
          </div>
        </div>

        <!-- Recharge Amount & Units Calculator -->
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label style="font-size:12px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.5px;">Recharge Amount (₦)</label>
            <span style="font-size:11px; color:var(--text-muted);">Balance: <strong style="color:var(--text-primary);">${store.formatMoney(mainBal)}</strong></span>
          </div>

          <input type="number" id="input-electricity-amt" class="zpay-input" placeholder="Enter amount" value="5000" style="width:100%; font-size:18px; font-weight:800; color:var(--zpay-green);" />

          <!-- Amount Chips -->
          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; margin-top:10px;">
            <button class="elec-chip zpay-btn zpay-btn-secondary" data-amt="2000" style="font-size:11px; padding:8px 4px;">₦2,000</button>
            <button class="elec-chip zpay-btn zpay-btn-secondary active" data-amt="5000" style="font-size:11px; padding:8px 4px; border-color:var(--zpay-green); color:var(--zpay-green); font-weight:700;">₦5,000</button>
            <button class="elec-chip zpay-btn zpay-btn-secondary" data-amt="10000" style="font-size:11px; padding:8px 4px;">₦10,000</button>
            <button class="elec-chip zpay-btn zpay-btn-secondary" data-amt="20000" style="font-size:11px; padding:8px 4px;">₦20,000</button>
          </div>

          <!-- Estimated Units Badge -->
          <div style="margin-top:12px; background:var(--bg-input); border-radius:12px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">
            <span style="color:var(--text-muted);">Estimated Power Units:</span>
            <strong style="color:var(--color-blue); font-size:13px;" id="estimated-units-text">~ 73.0 kWh (Band A)</strong>
          </div>
        </div>

        <!-- Pay Button -->
        <button id="btn-pay-electricity" class="zpay-btn zpay-btn-primary zpay-btn-block" style="padding:15px; font-size:15px; font-weight:800; margin-top:8px;">
          Pay Electricity Bill &rarr;
        </button>

      </div>

      <!-- ================= TOKEN SUCCESS MODAL ================= -->
      <div id="modal-token-success" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.88); z-index:999; align-items:center; justify-content:center; padding:20px;">
        <div style="background:var(--bg-card); width:100%; max-width:440px; border-radius:24px; padding:24px; border:1px solid rgba(0,210,106,0.4); display:flex; flex-direction:column; gap:16px; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,0.8);">
          <div style="width:56px; height:56px; border-radius:50%; background:rgba(0,210,106,0.12); color:var(--zpay-green); display:flex; align-items:center; justify-content:center; margin:0 auto;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          
          <div>
            <h3 style="font-size:19px; font-weight:800; color:var(--text-primary); margin:0;">Token Generated Successfully!</h3>
            <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">Enter this 20-digit token into your prepaid meter keypad</p>
          </div>

          <!-- The 20-digit token box -->
          <div style="background:var(--bg-input); border:1.5px dashed var(--zpay-green); border-radius:16px; padding:16px; position:relative;">
            <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">20-Digit Recharge Token</div>
            <div id="display-generated-token" style="font-family:var(--font-mono); font-size:18px; font-weight:900; color:#fff; letter-spacing:2px;">
              4819-2049-1829-4820-1940
            </div>
            <button id="btn-copy-token" class="zpay-btn zpay-btn-secondary zpay-btn-sm" style="margin-top:10px; font-size:11px; padding:6px 12px; border-radius:99px; display:inline-flex; align-items:center; gap:5px; margin-left:auto; margin-right:auto;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Tap to Copy Token
            </button>
          </div>

          <div style="background:var(--bg-input); border-radius:12px; padding:12px; font-size:12px; display:flex; flex-direction:column; gap:6px; text-align:left;">
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Provider:</span>
              <strong style="color:var(--text-primary);" id="res-disco">Ikeja Electric (IKEDC)</strong>
            </div>
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Meter Number:</span>
              <strong style="color:var(--text-primary);" id="res-meter">0429 8192 018</strong>
            </div>
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Units Purchased:</span>
              <strong style="color:var(--color-blue);" id="res-units">73.0 kWh</strong>
            </div>
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Amount Paid:</span>
              <strong style="color:var(--zpay-green);" id="res-amount">₦5,000.00</strong>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <button id="btn-view-elec-receipt" class="zpay-btn zpay-btn-secondary" style="font-size:12px;">
              Receipt
            </button>
            <button id="btn-close-token-modal" class="zpay-btn zpay-btn-primary" style="font-size:12px; font-weight:700;">
              Done
            </button>
          </div>
        </div>
      </div>

    </div>
  `;
}

export function initElectricityListeners() {
  let selectedDisco = DISCO_PROVIDERS[0].name;
  let selectedType = 'Prepaid';
  let lastBillResult = null;

  // DisCo selection
  const discoBtns = document.querySelectorAll('.disco-btn');
  discoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      discoBtns.forEach(b => {
        b.classList.remove('active');
        b.style.borderColor = 'var(--border-subtle)';
        b.querySelector('span:last-child').style.color = 'var(--text-primary)';
      });
      btn.classList.add('active');
      btn.style.borderColor = 'var(--zpay-green)';
      btn.querySelector('span:last-child').style.color = 'var(--zpay-green)';
      selectedDisco = btn.dataset.discoName;
    });
  });

  // Meter Type Toggle
  const btnPrepaid = document.getElementById('type-prepaid');
  const btnPostpaid = document.getElementById('type-postpaid');
  if (btnPrepaid && btnPostpaid) {
    btnPrepaid.addEventListener('click', () => {
      selectedType = 'Prepaid';
      btnPrepaid.classList.add('active');
      btnPostpaid.classList.remove('active');
    });
    btnPostpaid.addEventListener('click', () => {
      selectedType = 'Postpaid';
      btnPostpaid.classList.add('active');
      btnPrepaid.classList.remove('active');
    });
  }

  // Amount Chips & Calculator
  const amtInput = document.getElementById('input-electricity-amt');
  const unitsText = document.getElementById('estimated-units-text');
  const chips = document.querySelectorAll('.elec-chip');

  function updateUnits() {
    const val = parseFloat(amtInput?.value || 0);
    const units = (val / 68.5).toFixed(1);
    if (unitsText) {
      unitsText.textContent = `~ ${units} kWh (${selectedType === 'Prepaid' ? 'Band A' : 'Postpaid'})`;
    }
  }

  chips.forEach(c => {
    c.addEventListener('click', () => {
      chips.forEach(x => {
        x.classList.remove('active');
        x.style.borderColor = 'var(--border-medium)';
        x.style.color = 'var(--text-secondary)';
      });
      c.classList.add('active');
      c.style.borderColor = 'var(--zpay-green)';
      c.style.color = 'var(--zpay-green)';
      if (amtInput) amtInput.value = c.dataset.amt;
      updateUnits();
    });
  });

  if (amtInput) {
    amtInput.addEventListener('input', updateUnits);
  }

  // Meter Verify Button
  document.getElementById('btn-sample-meter')?.addEventListener('click', () => {
    const meter = document.getElementById('input-meter-no')?.value.trim();
    if (!meter) {
      showToast('Please enter a valid meter number.', 'error');
      return;
    }
    showToast(`✓ Meter ${meter} verified for ${selectedDisco}!`, 'success');
  });

  // Pay Button
  const payBtn = document.getElementById('btn-pay-electricity');
  const tokenModal = document.getElementById('modal-token-success');

  if (payBtn) {
    payBtn.addEventListener('click', () => {
      const meterNo = document.getElementById('input-meter-no')?.value.trim() || '04298192018';
      const amount = parseFloat(amtInput?.value || 0);

      if (isNaN(amount) || amount < 500) {
        showToast('Please enter a valid amount (minimum ₦500).', 'error');
        return;
      }
      if (store.balance < amount) {
        showToast(`Insufficient balance. You have ${store.formatMoney(store.balance)}. Please fund your wallet.`, 'error');
        return;
      }

      // PIN Authorization
      requestPinAuthorization({
        title: "Confirm Electricity Bill",
        amount: amount,
        recipient: `${selectedDisco} (${meterNo})`,
        onSuccess: () => {
          try {
            const res = store.payElectricityBill({
              disco: selectedDisco,
              meterNo,
              meterType: selectedType,
              amount,
              customerName: "GIDEON OLADIPO"
            });

            lastBillResult = res;

            // Fill Token Modal
            const tokenDisplay = document.getElementById('display-generated-token');
            const resDisco = document.getElementById('res-disco');
            const resMeter = document.getElementById('res-meter');
            const resUnits = document.getElementById('res-units');
            const resAmount = document.getElementById('res-amount');

            if (tokenDisplay) tokenDisplay.textContent = res.token;
            if (resDisco) resDisco.textContent = res.disco;
            if (resMeter) resMeter.textContent = res.meterNo;
            if (resUnits) resUnits.textContent = `${res.units} kWh`;
            if (resAmount) resAmount.textContent = store.formatMoney(res.amount);

            launchConfetti();
            if (tokenModal) tokenModal.style.display = 'flex';
          } catch (err) {
            showToast(err.message, 'error');
          }
        }
      });
    });
  }

  // Copy token
  document.getElementById('btn-copy-token')?.addEventListener('click', () => {
    const token = document.getElementById('display-generated-token')?.textContent.trim();
    if (token) {
      navigator.clipboard?.writeText(token);
      showToast('✓ 20-digit token copied to clipboard!', 'success');
    }
  });

  // View Receipt
  document.getElementById('btn-view-elec-receipt')?.addEventListener('click', () => {
    if (lastBillResult) {
      if (tokenModal) tokenModal.style.display = 'none';
      openReceiptModal({
        id: lastBillResult.reference,
        type: 'out',
        title: `${lastBillResult.disco} (${lastBillResult.meterType})`,
        category: 'Electricity',
        recipient: `${lastBillResult.disco} - ${lastBillResult.meterNo}`,
        sender: `${store.user.name} (ZPay)`,
        account: 'ZPay Wallet',
        date: lastBillResult.date,
        amount: lastBillResult.amount,
        fee: 0,
        status: 'Successful',
        reference: lastBillResult.reference,
        note: `Token: ${lastBillResult.token} | Units: ${lastBillResult.units} kWh`
      });
    }
  });

  document.getElementById('btn-close-token-modal')?.addEventListener('click', () => {
    if (tokenModal) tokenModal.style.display = 'none';
    window.location.hash = '#/app/services';
  });
}
