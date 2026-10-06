import { store } from '../state/store.js';
import { MARKETPLACE_CATALOG } from '../state/mockData.js';
import { showToast } from '../components/notifications.js';

export function renderPaySmallSmallView() {
  const plans = store.marketplacePlans || [];
  const mainBal = store.balance;

  return `
    <div class="app-wrapper" style="padding-bottom: 90px;">
      
      <!-- Top Screen Header -->
      <header class="screen-header" style="background:var(--bg-app); position:sticky; top:0; z-index:20;">
        <a href="#/app/services" class="back-btn" title="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <div style="text-align:center;">
          <span class="screen-title" style="font-size:16px;">Pay Small Small</span>
          <div style="font-size:11px; color:var(--text-muted);">CDcare Style Marketplace</div>
        </div>
        <div style="width:36px; display:flex; justify-content:flex-end;">
          <span class="zpay-badge zpay-badge-warning" style="font-size:10px; padding:2px 6px;">0% Interest</span>
        </div>
      </header>

      <div style="padding: 16px 20px; display: flex; flex-direction: column; gap: 16px;">

        <!-- CDcare Style Promotional Banner -->
        <div style="background: linear-gradient(135deg, #180007 0%, #2a000d 50%, #0d0004 100%); border:1px solid rgba(234,0,41,0.35); border-radius:18px; padding:18px; position:relative; overflow:hidden;">
          <div style="position:relative; z-index:2;">
            <span class="zpay-badge zpay-badge-warning" style="font-size:10px; text-transform:uppercase; margin-bottom:8px; display:inline-flex; align-items:center; gap:5px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              Milestone Delivery
            </span>
            <h3 style="font-size:18px; font-weight:900; color:#fff; margin:4px 0 6px 0;">Buy Now. Pay Weekly or Monthly.</h3>
            <p style="font-size:12px; color:rgba(255,255,255,0.75); line-height:1.4; margin:0 0 12px 0;">
              Get brand new smartphones, laptops & appliances. Items are delivered to your doorstep once you reach <strong>50% payment</strong>!
            </p>
            <div style="display:flex; gap:8px; font-size:11px; color:rgba(255,255,255,0.9);">
              <span>✓ Zero Interest</span> &bull;
              <span>✓ Official Warranty</span> &bull;
              <span>✓ Free Delivery</span>
            </div>
          </div>
          <div style="position:absolute; right:10px; bottom:5px; opacity:0.12; transform:rotate(-15deg); pointer-events:none; color:#fff;">
            <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
        </div>

        <!-- Marketplace Tabs -->
        <div class="zpay-tabs">
          <button class="zpay-tab-btn active" id="tab-mp-catalog" style="display:inline-flex; align-items:center; gap:5px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Explore Marketplace
          </button>
          <button class="zpay-tab-btn" id="tab-mp-orders" style="display:inline-flex; align-items:center; gap:5px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            My Active Orders (${plans.length})
          </button>
        </div>

        <!-- ================= PANEL 1: CATALOG ================= -->
        <div id="panel-mp-catalog" style="display:flex; flex-direction:column; gap:14px;">
          
          <!-- Category Filter Pills -->
          <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:4px;" class="hide-scrollbar">
            <button class="cat-pill-btn active zpay-btn zpay-btn-secondary zpay-btn-sm" data-cat="all" style="font-size:11px; padding:5px 12px; border-radius:99px;">All</button>
            <button class="cat-pill-btn zpay-btn zpay-btn-secondary zpay-btn-sm" data-cat="Smartphones" style="font-size:11px; padding:5px 12px; border-radius:99px; display:inline-flex; align-items:center; gap:4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              Phones
            </button>
            <button class="cat-pill-btn zpay-btn zpay-btn-secondary zpay-btn-sm" data-cat="Laptops" style="font-size:11px; padding:5px 12px; border-radius:99px; display:inline-flex; align-items:center; gap:4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
              Laptops
            </button>
            <button class="cat-pill-btn zpay-btn zpay-btn-secondary zpay-btn-sm" data-cat="Appliances" style="font-size:11px; padding:5px 12px; border-radius:99px; display:inline-flex; align-items:center; gap:4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              Appliances
            </button>
            <button class="cat-pill-btn zpay-btn zpay-btn-secondary zpay-btn-sm" data-cat="Power & Solar" style="font-size:11px; padding:5px 12px; border-radius:99px; display:inline-flex; align-items:center; gap:4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Power/Solar
            </button>
            <button class="cat-pill-btn zpay-btn zpay-btn-secondary zpay-btn-sm" data-cat="Electronics" style="font-size:11px; padding:5px 12px; border-radius:99px; display:inline-flex; align-items:center; gap:4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
              TVs
            </button>
          </div>

          <!-- Product Grid -->
          <div id="marketplace-product-grid" style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px;">
            ${MARKETPLACE_CATALOG.map(prod => `
              <div class="product-card" data-category="${prod.category}" style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; overflow:hidden; display:flex; flex-direction:column; transition:transform 0.2s, border-color 0.2s;">
                <div style="position:relative; width:100%; height:140px; background:#0b101b; overflow:hidden;">
                  <img src="${prod.image}" alt="${prod.title}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.3s;" loading="lazy" />
                  <span class="zpay-badge zpay-badge-success" style="position:absolute; top:8px; left:8px; font-size:9px; padding:2px 6px; display:inline-flex; align-items:center; gap:4px;">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> Ships at 50%
                  </span>
                  <span style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.7); backdrop-filter:blur(4px); color:#fff; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; display:inline-flex; align-items:center; gap:3px;">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${prod.rating}
                  </span>
                </div>

                <div style="padding:12px; display:flex; flex-direction:column; flex:1; justify-content:space-between; gap:10px;">
                  <div>
                    <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${prod.brand}</span>
                    <h4 style="font-size:12.5px; font-weight:700; color:var(--text-primary); margin:2px 0 6px 0; line-height:1.3; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
                      ${prod.title}
                    </h4>
                    
                    <div style="display:flex; flex-direction:column; gap:2px;">
                      <div style="font-size:14px; font-weight:800; color:var(--zpay-green);">
                        ₦${prod.weeklyInstallment.toLocaleString()}<span style="font-size:10px; color:var(--text-muted); font-weight:500;">/wk</span>
                      </div>
                      <div style="font-size:11px; color:var(--text-muted);">
                        or ₦${prod.monthlyInstallment.toLocaleString()}/mo
                      </div>
                      <div style="font-size:10px; color:var(--text-secondary); margin-top:2px;">
                        Cash: ₦${prod.cashPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <button class="btn-start-plan zpay-btn zpay-btn-primary zpay-btn-block zpay-btn-sm" data-product-id="${prod.id}" style="font-size:11px; font-weight:700; padding:7px;">
                    Start Plan &rarr;
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ================= PANEL 2: MY ORDERS ================= -->
        <div id="panel-mp-orders" style="display:none; flex-direction:column; gap:14px;">
          ${plans.length === 0
            ? `<div style="text-align:center; padding:40px 20px; color:var(--text-muted);">
                <div style="width:56px; height:56px; border-radius:50%; background:rgba(234,0,41,0.1); color:var(--zpay-green); display:flex; align-items:center; justify-content:center; margin:0 auto 12px auto;">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
                <h4 style="font-size:15px; font-weight:700; color:var(--text-primary);">No active installment plans</h4>
                <p style="font-size:12px; margin-top:4px;">Browse the marketplace and start your first 0% interest installment order.</p>
                <button id="btn-goto-catalog" class="zpay-btn zpay-btn-primary" style="margin-top:14px;">Explore Catalog</button>
               </div>`
            : plans.map(plan => {
                const percent = Math.min(100, Math.round((plan.totalPaid / plan.cashPrice) * 100));
                const isMilestoneReached = percent >= plan.deliveryThreshold;
                const isComplete = plan.paidInstallments >= plan.totalInstallments;

                return `
                  <div class="zpay-card" style="border:1px solid var(--border-medium); padding:16px;">
                    <div style="display:flex; gap:12px; align-items:flex-start;">
                      <img src="${plan.image}" alt="${plan.title}" style="width:70px; height:70px; border-radius:12px; object-fit:cover; flex-shrink:0; background:#0b101b;" />
                      <div style="flex:1;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                          <h4 style="font-size:13px; font-weight:800; color:var(--text-primary); margin:0; line-height:1.3;">${plan.title}</h4>
                        </div>
                        <div style="font-size:11px; color:var(--text-muted); margin-top:3px;">
                          Total: <strong>${store.formatMoney(plan.cashPrice)}</strong> &bull; ${plan.frequency}
                        </div>
                        <div style="margin-top:6px;">
                          <span class="zpay-badge ${isMilestoneReached ? 'zpay-badge-success' : 'zpay-badge-warning'}" style="font-size:10px; display:inline-flex; align-items:center; gap:4px;">
                            ${plan.deliveryStatus || (isMilestoneReached ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> 50% Milestone Reached' : 'Saving towards 50% delivery')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Progress Bar -->
                    <div style="margin-top:14px;">
                      <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:6px;">
                        <span style="color:var(--text-secondary);">${plan.paidInstallments} of ${plan.totalInstallments} ${plan.frequency.toLowerCase()} installments paid</span>
                        <strong style="color:var(--zpay-green); font-size:12px;">${percent}%</strong>
                      </div>
                      <div style="background:var(--bg-input); border-radius:99px; height:8px; overflow:hidden; position:relative;">
                        <div style="width:${percent}%; height:100%; background:linear-gradient(90deg, var(--zpay-green), #38bdf8); border-radius:99px; transition:width 0.4s ease;"></div>
                        <!-- 50% milestone pin -->
                        <div style="position:absolute; left:50%; top:0; bottom:0; width:2px; background:rgba(255,255,255,0.4);" title="Delivery milestone: 50%"></div>
                      </div>
                      <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); margin-top:4px;">
                        <span>Paid: ${store.formatMoney(plan.totalPaid)}</span>
                        <span>Delivery Milestone: 50%</span>
                      </div>
                    </div>

                    ${!isComplete ? `
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; padding-top:12px; border-top:1px solid var(--border-subtle);">
                        <div>
                          <div style="font-size:10px; color:var(--text-muted);">Next Installment:</div>
                          <strong style="font-size:13px; color:var(--text-primary);">${store.formatMoney(plan.installmentAmount)}</strong>
                        </div>
                        <button class="btn-pay-installment zpay-btn zpay-btn-primary zpay-btn-sm" data-plan-id="${plan.id}" style="font-weight:700; padding:8px 14px;">
                          Pay Next Installment &rarr;
                        </button>
                      </div>
                    ` : `
                      <div style="margin-top:12px; padding:8px; background:rgba(0,210,106,0.1); border-radius:8px; text-align:center; font-size:12px; color:var(--zpay-green); font-weight:700;">
                        ✓ Plan Completed & Paid in Full!
                      </div>
                    `}
                  </div>
                `;
              }).join('')
          }
        </div>

      </div>

      <!-- ================= CHECKOUT / START PLAN MODAL ================= -->
      <div id="modal-mp-checkout" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:999; align-items:flex-end; justify-content:center;">
        <div style="background:var(--bg-card); width:100%; max-width:480px; max-height:85vh; border-radius:24px 24px 0 0; padding:24px; border-top:1px solid rgba(234,0,41,0.3); display:flex; flex-direction:column; gap:16px; overflow-y:auto;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 style="font-size:18px; font-weight:800; color:var(--text-primary);">Configure Installment Plan</h3>
              <p style="font-size:12px; color:var(--text-muted);">Pay small small with zero interest</p>
            </div>
            <button id="close-checkout-modal" style="background:none; border:none; color:var(--text-muted); font-size:20px; cursor:pointer;">✕</button>
          </div>

          <div id="checkout-product-summary" style="display:flex; gap:12px; align-items:center; background:var(--bg-input); border-radius:14px; padding:12px;">
            <!-- Rendered dynamically -->
          </div>

          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Payment Frequency</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <button class="btn-checkout-freq zpay-btn zpay-btn-secondary active" data-freq="Weekly" style="font-size:12px; padding:10px; justify-content:center;">
                Weekly Installments
              </button>
              <button class="btn-checkout-freq zpay-btn zpay-btn-secondary" data-freq="Monthly" style="font-size:12px; padding:10px; justify-content:center;">
                Monthly Installments
              </button>
            </div>
          </div>

          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Duration</label>
            <div id="duration-selector-row" style="display:grid; grid-template-columns:repeat(2,1fr); gap:10px;">
              <!-- Rendered based on freq -->
            </div>
          </div>

          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Delivery Home Address (in Nigeria)</label>
            <input id="input-delivery-address" type="text" placeholder="e.g. 14 Admiralty Way, Lekki Phase 1, Lagos" value="14 Admiralty Way, Lekki Phase 1, Lagos" class="zpay-input" style="width:100%;">
          </div>

          <!-- Summary card -->
          <div style="background:var(--bg-input); border-radius:14px; padding:14px; display:flex; flex-direction:column; gap:8px; font-size:12px;">
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>1st Installment (Due Today):</span>
              <strong id="calc-first-installment" style="color:var(--zpay-green); font-size:14px;">₦60,416</strong>
            </div>
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Available Wallet Balance:</span>
              <span style="color:var(--text-primary); font-weight:600;">${store.formatMoney(mainBal)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>Doorstep Delivery:</span>
              <span style="color:var(--color-blue); font-weight:700; display:inline-flex; align-items:center; gap:4px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                At 50% Milestone Reached
              </span>
            </div>
          </div>

          <button id="btn-confirm-start-plan" class="zpay-btn zpay-btn-primary zpay-btn-block" style="font-weight:700; padding:12px;">
            Pay 1st Installment &amp; Lock Order &rarr;
          </button>
        </div>
      </div>

    </div>
  `;
}

export function initPaySmallSmallListeners() {
  // Tabs
  const tabCatalog = document.getElementById('tab-mp-catalog');
  const tabOrders = document.getElementById('tab-mp-orders');
  const panelCatalog = document.getElementById('panel-mp-catalog');
  const panelOrders = document.getElementById('panel-mp-orders');

  if (tabCatalog && tabOrders) {
    tabCatalog.addEventListener('click', () => {
      tabCatalog.classList.add('active');
      tabOrders.classList.remove('active');
      panelCatalog.style.display = 'flex';
      panelOrders.style.display = 'none';
    });

    tabOrders.addEventListener('click', () => {
      tabOrders.classList.add('active');
      tabCatalog.classList.remove('active');
      panelOrders.style.display = 'flex';
      panelCatalog.style.display = 'none';
    });
  }

  document.getElementById('btn-goto-catalog')?.addEventListener('click', () => {
    tabCatalog?.click();
  });

  // Category Filtering
  const catPills = document.querySelectorAll('.cat-pill-btn');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.cat;

      document.querySelectorAll('.product-card').forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal & Plan configuration
  const checkoutModal = document.getElementById('modal-mp-checkout');
  const closeCheckoutBtn = document.getElementById('close-checkout-modal');
  const productSummaryEl = document.getElementById('checkout-product-summary');
  const durationSelectorEl = document.getElementById('duration-selector-row');
  const calcFirstEl = document.getElementById('calc-first-installment');
  const confirmBtn = document.getElementById('btn-confirm-start-plan');
  const freqBtns = document.querySelectorAll('.btn-checkout-freq');

  let activeProduct = MARKETPLACE_CATALOG[0];
  let selectedFreq = 'Weekly';
  let selectedDuration = 24; // 24 weeks or 6 months

  function updateCheckoutUI() {
    if (!productSummaryEl || !activeProduct) return;

    productSummaryEl.innerHTML = `
      <img src="${activeProduct.image}" alt="${activeProduct.title}" style="width:60px; height:60px; border-radius:10px; object-fit:cover;" />
      <div>
        <h4 style="font-size:13px; font-weight:800; color:var(--text-primary); margin:0;">${activeProduct.title}</h4>
        <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">
          Cash Price: <strong style="color:var(--text-primary);">${store.formatMoney(activeProduct.cashPrice)}</strong>
        </div>
      </div>
    `;

    if (durationSelectorEl) {
      if (selectedFreq === 'Weekly') {
        durationSelectorEl.innerHTML = `
          <button class="btn-duration zpay-btn zpay-btn-secondary ${selectedDuration === 24 ? 'active' : ''}" data-dur="24" style="font-size:11px; padding:8px; justify-content:center;">24 Weeks (6 Mos)</button>
          <button class="btn-duration zpay-btn zpay-btn-secondary ${selectedDuration === 12 ? 'active' : ''}" data-dur="12" style="font-size:11px; padding:8px; justify-content:center;">12 Weeks (3 Mos)</button>
        `;
      } else {
        durationSelectorEl.innerHTML = `
          <button class="btn-duration zpay-btn zpay-btn-secondary ${selectedDuration === 6 ? 'active' : ''}" data-dur="6" style="font-size:11px; padding:8px; justify-content:center;">6 Months</button>
          <button class="btn-duration zpay-btn zpay-btn-secondary ${selectedDuration === 3 ? 'active' : ''}" data-dur="3" style="font-size:11px; padding:8px; justify-content:center;">3 Months</button>
        `;
      }

      durationSelectorEl.querySelectorAll('.btn-duration').forEach(b => {
        b.addEventListener('click', () => {
          durationSelectorEl.querySelectorAll('.btn-duration').forEach(x => x.classList.remove('active'));
          b.classList.add('active');
          selectedDuration = parseInt(b.dataset.dur);
          calculateInstallment();
        });
      });
    }

    calculateInstallment();
  }

  function calculateInstallment() {
    if (!activeProduct) return;
    const total = activeProduct.cashPrice;
    let amt = 0;
    if (selectedFreq === 'Weekly') {
      amt = Math.round(total / selectedDuration);
    } else {
      amt = Math.round(total / selectedDuration);
    }
    if (calcFirstEl) {
      calcFirstEl.textContent = store.formatMoney(amt);
    }
  }

  freqBtns.forEach(b => {
    b.addEventListener('click', () => {
      freqBtns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      selectedFreq = b.dataset.freq;
      selectedDuration = selectedFreq === 'Weekly' ? 24 : 6;
      updateCheckoutUI();
    });
  });

  document.querySelectorAll('.btn-start-plan').forEach(btn => {
    btn.addEventListener('click', () => {
      const prodId = btn.dataset.productId;
      const found = MARKETPLACE_CATALOG.find(p => p.id === prodId);
      if (found) {
        activeProduct = found;
        selectedFreq = 'Weekly';
        selectedDuration = 24;
        freqBtns.forEach(x => x.dataset.freq === 'Weekly' ? x.classList.add('active') : x.classList.remove('active'));
        updateCheckoutUI();
        if (checkoutModal) checkoutModal.style.display = 'flex';
      }
    });
  });

  if (closeCheckoutBtn && checkoutModal) {
    closeCheckoutBtn.addEventListener('click', () => {
      checkoutModal.style.display = 'none';
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      try {
        const plan = store.startMarketplacePlan(activeProduct, selectedFreq, selectedDuration);
        if (checkoutModal) checkoutModal.style.display = 'none';
        showToast(`✓ Installment plan started for ${activeProduct.title}!`, 'success');
        // Switch to orders tab
        window.location.hash = '#/app/paysmallsmall';
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }

  // Pay Next Installment
  document.querySelectorAll('.btn-pay-installment').forEach(btn => {
    btn.addEventListener('click', () => {
      const planId = btn.dataset.planId;
      try {
        const plan = store.payMarketplaceInstallment(planId);
        showToast(`✓ Installment payment of ${store.formatMoney(plan.installmentAmount)} successful!`, 'success');
        window.location.hash = '#/app/paysmallsmall';
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  });
}
