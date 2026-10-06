export function renderAtmView() {
  return `
    <div class="app-wrapper">
      <header class="screen-header">
        <a href="#/app/services" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="screen-title">Cards & ATM</span>
        <div style="width:36px;"></div>
      </header>

      <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px;">
        <!-- Virtual Card -->
        <div style="
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, #EA0029 0%, #7B000F 100%);
          border-radius: 20px;
          padding: 24px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 16px 40px rgba(234,0,41,0.35);
          position: relative;
          overflow: hidden;
        ">
          <!-- Decorative circles -->
          <div style="position:absolute; top:-30px; right:-30px; width:120px; height:120px; border-radius:50%; background:rgba(255,255,255,0.08);"></div>
          <div style="position:absolute; bottom:-40px; left:-20px; width:160px; height:160px; border-radius:50%; background:rgba(255,255,255,0.05);"></div>

          <div style="display:flex; justify-content:space-between; align-items:center; position:relative;">
            <div>
              <div style="font-size:10px; opacity:0.7; text-transform:uppercase; letter-spacing:1px;">Zenith Cooperative</div>
              <div style="font-weight:800; font-size:18px; margin-top:2px;">Member Card</div>
            </div>
            <div style="font-size:28px; font-weight:900; opacity:0.9;">Z</div>
          </div>

          <div style="position:relative;">
            <div style="font-family:monospace; font-size:18px; letter-spacing:3px; margin-bottom:12px;">**** **** **** 4521</div>
            <div style="display:flex; justify-content:space-between; align-items:flex-end;">
              <div>
                <div style="font-size:10px; opacity:0.7; text-transform:uppercase;">Card Holder</div>
                <div style="font-weight:600; font-size:14px; margin-top:2px;">John Doe</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:10px; opacity:0.7; text-transform:uppercase;">Expires</div>
                <div style="font-weight:600; font-size:14px; margin-top:2px;">12/28</div>
              </div>
              <div style="font-size:13px; font-weight:800; opacity:0.9; letter-spacing:1px;">VISA</div>
            </div>
          </div>
        </div>

        <!-- Card Actions -->
        <div style="display:grid; grid-template-columns: repeat(3,1fr); gap:12px;">
          <div class="service-card" style="padding:14px 8px; display:flex; flex-direction:column; align-items:center; gap:6px;">
            <div style="color:var(--color-blue); display:flex; align-items:center; justify-content:center; height:24px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/></svg>
            </div>
            <span class="service-name">Freeze</span>
          </div>
          <div class="service-card" style="padding:14px 8px; display:flex; flex-direction:column; align-items:center; gap:6px;">
            <div style="color:var(--text-primary); display:flex; align-items:center; justify-content:center; height:24px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            </div>
            <span class="service-name">Request New</span>
          </div>
          <div class="service-card" style="padding:14px 8px; display:flex; flex-direction:column; align-items:center; gap:6px;">
            <div style="color:var(--text-primary); display:flex; align-items:center; justify-content:center; height:24px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <span class="service-name">Details</span>
          </div>
        </div>

        <!-- Card Settings -->
        <div>
          <h4 class="section-heading" style="margin-bottom:12px;">Card Settings</h4>
          <div class="transactions-list">
            <div class="transaction-tile" id="freeze-card-tile">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(56,189,248,0.1); color:var(--color-blue);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/></svg>
                </div>
                <div class="tx-info">
                  <h5>Freeze Card</h5>
                  <span>Temporarily disable all transactions</span>
                </div>
              </div>
              <div class="toggle-switch" id="freeze-toggle"></div>
            </div>

            <div class="transaction-tile">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(245,158,11,0.1); color:var(--color-warning);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div class="tx-info">
                  <h5>Transaction Alerts</h5>
                  <span>Get notified on every spend</span>
                </div>
              </div>
              <div class="toggle-switch on" id="alerts-toggle"></div>
            </div>

            <div class="transaction-tile">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(234,0,41,0.1); color:var(--zpay-green);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div class="tx-info">
                  <h5>Find Nearest ATM</h5>
                  <span>Locate Zenith Bank ATMs near you</span>
                </div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initAtmListeners() {
  const freezeToggle = document.getElementById('freeze-toggle');
  if (freezeToggle) {
    freezeToggle.addEventListener('click', () => {
      freezeToggle.classList.toggle('on');
    });
  }
  const alertsToggle = document.getElementById('alerts-toggle');
  if (alertsToggle) {
    alertsToggle.addEventListener('click', () => {
      alertsToggle.classList.toggle('on');
    });
  }
}
