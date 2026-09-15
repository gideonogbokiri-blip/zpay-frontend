import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';

export function renderOsusuView() {
  return `
    <div class="app-wrapper">
      <header class="screen-header">
        <a href="#/app/services" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="screen-title">Osusu & Pay Small Small</span>
        <div style="width:36px;"></div>
      </header>

      <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px;">
        <!-- Total Savings Card -->
        <div class="balance-card" style="background: linear-gradient(135deg, #1a0007 0%, #0d0003 100%); border:1px solid rgba(234,0,41,0.3);">
          <div class="balance-label">🏦 Total Osusu Savings</div>
          <div class="balance-amount" style="margin:10px 0;">₦245,000.00</div>
          <div style="background: rgba(255,255,255,0.08); border-radius: 99px; height: 6px; overflow:hidden; margin-bottom:8px;">
            <div style="width: 65%; height: 100%; background: var(--zpay-green); border-radius: 99px;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:12px; color:rgba(255,255,255,0.6);">
            <span>₦245,000 saved</span>
            <span>Target: ₦375,000</span>
          </div>
        </div>

        <!-- Tabs -->
        <div class="zpay-tabs">
          <button class="zpay-tab-btn active" id="tab-contributions">My Contributions</button>
          <button class="zpay-tab-btn" id="tab-plans">Pay Small Small</button>
        </div>

        <!-- Active Contributions -->
        <div id="panel-contributions">
          <div class="transactions-list" id="osusu-list">
            <div class="transaction-tile">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(234,0,41,0.1);">🎯</div>
                <div class="tx-info">
                  <h5>December Holiday Fund</h5>
                  <span>₦10,000 / week • Ends Dec 31</span>
                </div>
              </div>
              <div class="tx-right">
                <div style="font-size:13px; font-weight:700; color:var(--zpay-green);">75%</div>
                <div style="width:50px; background:var(--bg-input); border-radius:99px; height:4px; margin-top:6px; overflow:hidden;">
                  <div style="width:75%; height:100%; background:var(--zpay-green); border-radius:99px;"></div>
                </div>
              </div>
            </div>

            <div class="transaction-tile">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(56,189,248,0.1);">💼</div>
                <div class="tx-info">
                  <h5>Business Capital</h5>
                  <span>₦25,000 / month • Ends Jun 27</span>
                </div>
              </div>
              <div class="tx-right">
                <div style="font-size:13px; font-weight:700; color:var(--color-blue);">30%</div>
                <div style="width:50px; background:var(--bg-input); border-radius:99px; height:4px; margin-top:6px; overflow:hidden;">
                  <div style="width:30%; height:100%; background:var(--color-blue); border-radius:99px;"></div>
                </div>
              </div>
            </div>
          </div>
          <button id="btn-new-osusu" class="zpay-btn zpay-btn-primary zpay-btn-block" style="margin-top:16px;">+ Create New Osusu Plan</button>
        </div>

        <!-- Pay Small Small Panel (hidden by default) -->
        <div id="panel-plans" style="display:none;">
          <div class="transactions-list">
            <div class="transaction-tile">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(168,85,247,0.1);">📱</div>
                <div class="tx-info">
                  <h5>iPhone 16 Pro</h5>
                  <span>6 payments of ₦125,000</span>
                </div>
              </div>
              <div class="tx-right">
                <div class="tx-amount" style="color:var(--color-purple);">₦750,000</div>
                <span class="zpay-badge zpay-badge-warning" style="margin-top:4px;">2/6 Paid</span>
              </div>
            </div>
            <div class="transaction-tile">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(245,158,11,0.1);">🏠</div>
                <div class="tx-info">
                  <h5>Household Furniture</h5>
                  <span>3 payments of ₦50,000</span>
                </div>
              </div>
              <div class="tx-right">
                <div class="tx-amount" style="color:var(--color-warning);">₦150,000</div>
                <span class="zpay-badge zpay-badge-success" style="margin-top:4px;">Completed</span>
              </div>
            </div>
          </div>
          <button id="btn-browse-plans" class="zpay-btn zpay-btn-secondary zpay-btn-block" style="margin-top:16px;">Browse Installment Plans</button>
        </div>
      </div>

      <!-- New Osusu Modal -->
      <div id="osusu-modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:999; align-items:flex-end; justify-content:center;">
        <div style="background:var(--bg-card); width:100%; max-width:480px; border-radius:24px 24px 0 0; padding:24px; border-top:1px solid rgba(234,0,41,0.3); display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="font-size:18px; font-weight:700; color:var(--text-primary);">Create Osusu Plan</h3>
            <button id="close-osusu-modal" style="background:none; border:none; color:var(--text-muted); font-size:20px; cursor:pointer;">✕</button>
          </div>
          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Goal Title</label>
            <input id="osusu-title-input" type="text" placeholder="e.g. Rent Savings, New Car, School Fees" class="zpay-input" style="width:100%;">
          </div>
          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Target Amount (₦)</label>
            <input id="osusu-target-input" type="number" placeholder="Enter target amount" class="zpay-input" style="width:100%;">
          </div>
          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Frequency</label>
            <select id="osusu-freq-select" class="zpay-input" style="width:100%;">
              <option value="Daily">Daily</option>
              <option value="Weekly" selected>Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <button id="submit-osusu-btn" class="zpay-btn zpay-btn-primary zpay-btn-block">Start Osusu Plan</button>
        </div>
      </div>
    </div>
  `;
}

export function initOsusuListeners() {
  const tabContributions = document.getElementById('tab-contributions');
  const tabPlans = document.getElementById('tab-plans');
  const panelContributions = document.getElementById('panel-contributions');
  const panelPlans = document.getElementById('panel-plans');

  if (tabContributions && tabPlans) {
    tabContributions.addEventListener('click', () => {
      tabContributions.classList.add('active');
      tabPlans.classList.remove('active');
      panelContributions.style.display = '';
      panelPlans.style.display = 'none';
    });
    tabPlans.addEventListener('click', () => {
      tabPlans.classList.add('active');
      tabContributions.classList.remove('active');
      panelPlans.style.display = '';
      panelContributions.style.display = 'none';
    });
  }

  const modal = document.getElementById('osusu-modal');
  const openBtn = document.getElementById('btn-new-osusu');
  const closeBtn = document.getElementById('close-osusu-modal');
  const submitBtn = document.getElementById('submit-osusu-btn');

  if (openBtn) openBtn.addEventListener('click', () => { if (modal) modal.style.display = 'flex'; });
  if (closeBtn) closeBtn.addEventListener('click', () => { if (modal) modal.style.display = 'none'; });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const title = document.getElementById('osusu-title-input')?.value || 'Osusu Goal';
      const target = parseFloat(document.getElementById('osusu-target-input')?.value || 0);
      const freq = document.getElementById('osusu-freq-select')?.value || 'Weekly';

      if (isNaN(target) || target <= 0) {
        showToast('Please enter a valid target amount.', 'error');
        return;
      }

      if (modal) modal.style.display = 'none';
      showToast(`✓ Osusu Plan "${title}" created successfully!`);

      const list = document.getElementById('osusu-list');
      if (list) {
        const item = document.createElement('div');
        item.className = 'transaction-tile';
        item.innerHTML = `
          <div class="tx-left">
            <div class="tx-icon-box" style="background:rgba(234,0,41,0.1);">🎯</div>
            <div class="tx-info">
              <h5>${title}</h5>
              <span>${freq} plan • Target ₦${target.toLocaleString()}</span>
            </div>
          </div>
          <div class="tx-right">
            <div style="font-size:13px; font-weight:700; color:var(--zpay-green);">0%</div>
            <div style="width:50px; background:var(--bg-input); border-radius:99px; height:4px; margin-top:6px; overflow:hidden;">
              <div style="width:5%; height:100%; background:var(--zpay-green); border-radius:99px;"></div>
            </div>
          </div>
        `;
        list.prepend(item);
      }
    });
  }

  document.getElementById('btn-browse-plans')?.addEventListener('click', () => {
    showToast('Browse Electronics, Appliances and Vehicles with 0% interest!');
  });
}
