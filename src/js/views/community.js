import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';

export function renderCommunityView() {
  return `
    <div class="app-wrapper">
      <header class="screen-header">
        <a href="#/app/services" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="screen-title">Cooperative Community</span>
        <button id="header-new-post-btn" class="header-icon-btn" title="New Post">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </header>

      <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px;">
        <!-- Stats Row -->
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px;">
          <div class="zpay-card" style="text-align:center; padding:16px 8px;">
            <div style="font-size:20px; font-weight:800; color:var(--zpay-green);">248</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Members</div>
          </div>
          <div class="zpay-card" style="text-align:center; padding:16px 8px;">
            <div id="discussions-count" style="font-size:20px; font-weight:800; color:var(--zpay-green);">34</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Discussions</div>
          </div>
          <div class="zpay-card" style="text-align:center; padding:16px 8px;">
            <div style="font-size:20px; font-weight:800; color:var(--color-warning);">3</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Announcements</div>
          </div>
        </div>

        <!-- Pinned Announcement -->
        <div style="
          background: linear-gradient(135deg, rgba(234,0,41,0.12), rgba(234,0,41,0.04));
          border: 1px solid rgba(234,0,41,0.25);
          border-left: 4px solid var(--zpay-green);
          border-radius: var(--radius-md);
          padding: 16px;
        ">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
            <span style="color:var(--color-warning); display:flex; align-items:center;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </span>
            <span style="font-weight:700; font-size:14px; color:var(--text-primary);">General Meeting – Saturday</span>
            <span class="zpay-badge zpay-badge-warning" style="margin-left:auto; font-size:10px;">Pinned</span>
          </div>
          <p style="font-size:13px; color:var(--text-secondary); line-height:1.5; margin:0;">
            Annual general meeting this Saturday at 10 AM. Venue: Zenith Cooperative Main Hall. Attendance is compulsory for all members.
          </p>
        </div>

        <!-- Discussions -->
        <div>
          <div class="section-title-row">
            <h4 class="section-heading">Recent Discussions</h4>
            <a class="section-link">View All →</a>
          </div>
          <div class="transactions-list" id="community-posts-list">
            <div class="transaction-tile" style="flex-direction:column; align-items:flex-start; gap:10px;">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:var(--bg-card); color:var(--text-primary); font-weight:700; font-size:15px;">J</div>
                <div class="tx-info">
                  <h5>Jane Doe</h5>
                  <span>2 hours ago</span>
                </div>
              </div>
              <p style="font-size:13px; color:var(--text-secondary); margin:0 0 0 52px; line-height:1.5;">Has anyone received the Q3 dividends yet? I haven't gotten mine.</p>
              <div style="display:flex; gap:16px; margin-left:52px;">
                <span style="font-size:12px; color:var(--text-muted); cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> 12 Replies
                </span>
                <span style="font-size:12px; color:var(--text-muted); cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> 5 Likes
                </span>
              </div>
            </div>

            <div class="transaction-tile" style="flex-direction:column; align-items:flex-start; gap:10px;">
              <div class="tx-left">
                <div class="tx-icon-box" style="background:rgba(234,0,41,0.1); color:var(--zpay-green); font-weight:700; font-size:12px;">ADM</div>
                <div class="tx-info">
                  <h5>Admin</h5>
                  <span>Yesterday</span>
                </div>
              </div>
              <p style="font-size:13px; color:var(--text-secondary); margin:0 0 0 52px; line-height:1.5;">Updated loan policy documents are now available. Please review before next month.</p>
              <div style="display:flex; gap:16px; margin-left:52px;">
                <span style="font-size:12px; color:var(--text-muted); cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> 0 Replies
                </span>
                <span style="font-size:12px; color:var(--text-muted); cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> 20 Likes
                </span>
              </div>
            </div>
          </div>
        </div>

        <button id="btn-new-discussion" class="zpay-btn zpay-btn-primary zpay-btn-block">+ Start a New Discussion</button>
      </div>

      <!-- New Discussion Modal -->
      <div id="post-modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:999; align-items:flex-end; justify-content:center;">
        <div style="background:var(--bg-card); width:100%; max-width:480px; border-radius:24px 24px 0 0; padding:24px; border-top:1px solid rgba(234,0,41,0.3); display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="font-size:18px; font-weight:700; color:var(--text-primary);">New Discussion</h3>
            <button id="close-post-modal" style="background:none; border:none; color:var(--text-muted); font-size:20px; cursor:pointer;">✕</button>
          </div>
          <div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Topic or Message</label>
            <textarea id="discussion-content" rows="4" placeholder="Share updates, ask questions or start a topic with fellow cooperative members..." class="zpay-input" style="width:100%; resize:none;"></textarea>
          </div>
          <button id="submit-post-btn" class="zpay-btn zpay-btn-primary zpay-btn-block">Post Discussion</button>
        </div>
      </div>
    </div>
  `;
}

export function initCommunityListeners() {
  const modal = document.getElementById('post-modal');
  const openBtn = document.getElementById('btn-new-discussion');
  const headerBtn = document.getElementById('header-new-post-btn');
  const closeBtn = document.getElementById('close-post-modal');
  const submitBtn = document.getElementById('submit-post-btn');

  const openModal = () => { if (modal) modal.style.display = 'flex'; };
  const closeModal = () => { if (modal) modal.style.display = 'none'; };

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (headerBtn) headerBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const text = document.getElementById('discussion-content')?.value.trim();
      if (!text) {
        showToast('Please type your discussion message.', 'error');
        return;
      }

      closeModal();
      showToast('✓ Discussion posted to Cooperative Forum!');

      const list = document.getElementById('community-posts-list');
      if (list) {
        const item = document.createElement('div');
        item.className = 'transaction-tile';
        item.style.cssText = 'flex-direction:column; align-items:flex-start; gap:10px;';
        item.innerHTML = `
          <div class="tx-left">
            <div class="tx-icon-box" style="background:rgba(234,0,41,0.15); color:var(--zpay-green); font-weight:700; font-size:15px;">${store.user.name.charAt(0)}</div>
            <div class="tx-info">
              <h5>${store.user.name}</h5>
              <span>Just now</span>
            </div>
          </div>
          <p style="font-size:13px; color:var(--text-secondary); margin:0 0 0 52px; line-height:1.5;">${text}</p>
          <div style="display:flex; gap:16px; margin-left:52px;">
            <span style="font-size:12px; color:var(--text-muted); display:inline-flex; align-items:center; gap:4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> 0 Replies
            </span>
            <span style="font-size:12px; color:var(--text-muted); display:inline-flex; align-items:center; gap:4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> 1 Like
            </span>
          </div>
        `;
        list.prepend(item);
      }

      const countEl = document.getElementById('discussions-count');
      if (countEl) {
        countEl.textContent = String(parseInt(countEl.textContent || '34') + 1);
      }
    });
  }
}
