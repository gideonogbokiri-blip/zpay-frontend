import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';

export function renderReceiveMoneyView() {
  const phone = store.user.phone?.replace(/\s/g, '') || '08012345678';
  const tag = store.user.tag || '@johndoe';
  const name = store.user.name || 'John Doe';

  // Simple QR code using CSS grid pattern (visual only)
  const qrSvg = `
    <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" fill="white" rx="12"/>
      <!-- Top-left finder -->
      <rect x="10" y="10" width="50" height="50" rx="4" fill="#EA0029"/>
      <rect x="18" y="18" width="34" height="34" rx="2" fill="white"/>
      <rect x="24" y="24" width="22" height="22" rx="1" fill="#EA0029"/>
      <!-- Top-right finder -->
      <rect x="120" y="10" width="50" height="50" rx="4" fill="#EA0029"/>
      <rect x="128" y="18" width="34" height="34" rx="2" fill="white"/>
      <rect x="134" y="24" width="22" height="22" rx="1" fill="#EA0029"/>
      <!-- Bottom-left finder -->
      <rect x="10" y="120" width="50" height="50" rx="4" fill="#EA0029"/>
      <rect x="18" y="128" width="34" height="34" rx="2" fill="white"/>
      <rect x="24" y="134" width="22" height="22" rx="1" fill="#EA0029"/>
      <!-- Data modules (random pattern) -->
      <rect x="75" y="10" width="8" height="8" fill="#EA0029"/><rect x="88" y="10" width="8" height="8" fill="#EA0029"/>
      <rect x="75" y="24" width="8" height="8" fill="#EA0029"/><rect x="101" y="18" width="8" height="8" fill="#EA0029"/>
      <rect x="88" y="30" width="8" height="8" fill="#EA0029"/><rect x="101" y="36" width="8" height="8" fill="#EA0029"/>
      <rect x="75" y="44" width="8" height="8" fill="#EA0029"/><rect x="88" y="50" width="8" height="8" fill="#EA0029"/>
      <rect x="10" y="75" width="8" height="8" fill="#EA0029"/><rect x="24" y="88" width="8" height="8" fill="#EA0029"/>
      <rect x="38" y="75" width="8" height="8" fill="#EA0029"/><rect x="52" y="88" width="8" height="8" fill="#EA0029"/>
      <rect x="68" y="68" width="8" height="8" fill="#EA0029"/><rect x="82" y="75" width="8" height="8" fill="#EA0029"/>
      <rect x="96" y="68" width="8" height="8" fill="#EA0029"/><rect x="110" y="75" width="8" height="8" fill="#EA0029"/>
      <rect x="68" y="82" width="8" height="8" fill="#EA0029"/><rect x="124" y="82" width="8" height="8" fill="#EA0029"/>
      <rect x="138" y="68" width="8" height="8" fill="#EA0029"/><rect x="152" y="75" width="8" height="8" fill="#EA0029"/>
      <rect x="68" y="96" width="8" height="8" fill="#EA0029"/><rect x="82" y="110" width="8" height="8" fill="#EA0029"/>
      <rect x="96" y="110" width="8" height="8" fill="#EA0029"/><rect x="110" y="96" width="8" height="8" fill="#EA0029"/>
      <rect x="124" y="110" width="8" height="8" fill="#EA0029"/><rect x="138" y="96" width="8" height="8" fill="#EA0029"/>
      <rect x="152" y="110" width="8" height="8" fill="#EA0029"/>
      <rect x="68" y="124" width="8" height="8" fill="#EA0029"/><rect x="82" y="138" width="8" height="8" fill="#EA0029"/>
      <rect x="96" y="124" width="8" height="8" fill="#EA0029"/><rect x="110" y="138" width="8" height="8" fill="#EA0029"/>
      <rect x="124" y="152" width="8" height="8" fill="#EA0029"/><rect x="138" y="138" width="8" height="8" fill="#EA0029"/>
      <rect x="152" y="152" width="8" height="8" fill="#EA0029"/>
    </svg>
  `;

  return `
    <div class="app-wrapper">
      <header class="screen-header">
        <a href="#/app" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="screen-title">Receive Money</span>
        <div style="width:36px;"></div>
      </header>

      <div style="padding:20px; display:flex; flex-direction:column; gap:20px; align-items:center;">

        <!-- QR Code Card -->
        <div style="
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: 24px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          width: 100%;
          max-width: 320px;
          box-shadow: var(--shadow-lg);
        ">
          <div style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px;">Scan to Pay Me</div>

          <div style="border-radius:16px; overflow:hidden; box-shadow: 0 0 30px rgba(234,0,41,0.2);">
            ${qrSvg}
          </div>

          <div style="text-align:center;">
            <div style="font-size:18px; font-weight:800; color:var(--text-primary);">${name}</div>
            <div style="font-size:13px; color:var(--zpay-green); font-weight:600; margin-top:4px;">${tag}</div>
          </div>
        </div>

        <!-- Divider -->
        <div style="display:flex; align-items:center; gap:12px; width:100%;">
          <div style="flex:1; height:1px; background:var(--border-subtle);"></div>
          <span style="font-size:12px; color:var(--text-muted); font-weight:600;">OR SHARE YOUR ACCOUNT</span>
          <div style="flex:1; height:1px; background:var(--border-subtle);"></div>
        </div>

        <!-- Account Details Card -->
        <div style="background:var(--bg-surface); border:1px solid var(--border-medium); border-radius:20px; padding:20px; width:100%; display:flex; flex-direction:column; gap:14px;">

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Account Number</div>
              <div style="font-size:24px; font-weight:800; font-family:monospace; color:var(--text-primary); letter-spacing:2px; margin-top:4px;">${phone}</div>
            </div>
            <button id="copy-acct-btn" class="zpay-btn zpay-btn-secondary zpay-btn-sm" style="gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy
            </button>
          </div>

          <div style="height:1px; background:var(--border-subtle);"></div>

          <div style="display:flex; justify-content:space-between;">
            <div>
              <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Bank</div>
              <div style="font-size:14px; font-weight:700; color:var(--text-primary); margin-top:4px;">ZenithCoop Wallet</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Account Name</div>
              <div style="font-size:14px; font-weight:700; color:var(--text-primary); margin-top:4px;">${name}</div>
            </div>
          </div>
        </div>

        <!-- Share Button -->
        <button id="share-acct-btn" class="zpay-btn zpay-btn-primary zpay-btn-block" style="gap:10px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Share Account Details
        </button>

        <p style="font-size:12px; color:var(--text-muted); text-align:center; line-height:1.5;">
          Transfers from any Nigerian bank land instantly in your wallet — no fees.
        </p>
      </div>
    </div>
  `;
}

export function initReceiveMoneyListeners() {
  const copyBtn = document.getElementById('copy-acct-btn');
  const shareBtn = document.getElementById('share-acct-btn');
  const phone = store.user.phone?.replace(/\s/g, '') || '08012345678';
  const name = store.user.name || 'John Doe';

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(phone);
      showToast('Account number copied to clipboard!');
    });
  }

  if (shareBtn) {
    const text = `Send money to me on ZenithCoop:\nAccount: ${phone}\nBank: ZenithCoop Wallet\nName: ${name}`;
    if (navigator.share) {
      shareBtn.addEventListener('click', () => {
        navigator.share({ title: 'My ZenithCoop Account', text }).catch(() => {});
      });
    } else {
      shareBtn.addEventListener('click', () => {
        navigator.clipboard?.writeText(text);
        showToast('Account details copied to clipboard!');
      });
    }
  }
}
