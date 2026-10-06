import { store } from '../state/store.js';
import { showToast } from '../components/notifications.js';

// ─────────────────────────────────────────────────────────────────────────────
// SVG ICON LIBRARY (inline, no emoji)
// ─────────────────────────────────────────────────────────────────────────────
const ICONS = {
  target: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  group:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  browse: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  plus:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  back:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>`,
  bell:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  check:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`,
  clock:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  lock:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  wallet: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V22H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4z"/><path d="M20 12H14a2 2 0 0 0 0 4h6"/></svg>`,
  info:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  star:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  user:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  trend:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  money:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`,
  house:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  school: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  brief:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  car:    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  ring:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a9.5 9.5 0 0 0 0-19 9.5 9.5 0 0 0 0 19z"/><path d="M12 8v4l3 3"/></svg>`,
  chevronDown: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`,
  chevronUp:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>`,
  collect: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12l10 10 10-10"/></svg>`,
  pay:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22V2M22 12l-10-10-10 10"/></svg>`,
  users:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  list:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  eye:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  eyeOff: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
  crown:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.5 7L22 7l-3 7H5L2 7l6.5 2L12 2z"/><rect x="5" y="14" width="14" height="4" rx="1"/></svg>`,
};

// ─────────────────────────────────────────────────────────────────────────────
// GOAL CATEGORY ICONS
// ─────────────────────────────────────────────────────────────────────────────
const GOAL_ICONS = {
  house:  { svg: ICONS.house,  color: '#f59e0b', bg: 'rgba(245,158,11,0.15)'  },
  school: { svg: ICONS.school, color: '#38bdf8', bg: 'rgba(56,189,248,0.15)'  },
  brief:  { svg: ICONS.brief,  color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)'  },
  car:    { svg: ICONS.car,    color: '#10b981', bg: 'rgba(16,185,129,0.15)'  },
  ring:   { svg: ICONS.ring,   color: '#f43f5e', bg: 'rgba(244,63,94,0.15)'   },
  money:  { svg: ICONS.money,  color: '#22c55e', bg: 'rgba(34,197,94,0.15)'   },
  target: { svg: ICONS.target, color: '#22c55e', bg: 'rgba(34,197,94,0.15)'   },
};

function goalIcon(key) {
  return GOAL_ICONS[key] || GOAL_ICONS.target;
}

// ─────────────────────────────────────────────────────────────────────────────
// TURN TRACKER — renders a horizontal stepper for ajo groups
// ─────────────────────────────────────────────────────────────────────────────
function renderTurnTracker(group) {
  if (!group.members) return '';
  const sorted = [...group.members].sort((a, b) => a.turn - b.turn);

  const steps = sorted.map((m, i) => {
    const isMe = m.name.toLowerCase().includes('gideon');
    const isCollected = m.status === 'collected';
    const isCurrent = m.status === 'current' || m.status === 'my_turn_next';
    const isOpen = m.status === 'open';

    let dotBg = 'var(--bg-input)';
    let dotBorder = 'var(--border-subtle)';
    let dotColor = 'var(--text-muted)';
    let lineBg = 'var(--border-subtle)';
    let nameWeight = '500';
    let nameFontColor = 'var(--text-muted)';
    let tagHtml = '';

    if (isCollected) {
      dotBg = '#22c55e'; dotBorder = '#22c55e'; dotColor = '#fff';
      lineBg = '#22c55e';
      nameFontColor = 'var(--text-secondary)';
    } else if (isCurrent) {
      dotBg = '#f59e0b'; dotBorder = '#f59e0b'; dotColor = '#000';
      nameFontColor = '#f59e0b';
      nameWeight = '800';
      tagHtml = `<div style="font-size:9px; font-weight:800; color:#f59e0b; background:rgba(245,158,11,0.15); border-radius:4px; padding:1px 5px; margin-top:2px; text-align:center;">NOW</div>`;
    } else if (isMe && !isCollected) {
      dotBg = 'rgba(234,0,41,0.15)'; dotBorder = 'rgba(234,0,41,0.6)'; dotColor = '#ea0029';
      nameFontColor = 'var(--text-primary)';
      nameWeight = '700';
      tagHtml = `<div style="font-size:9px; font-weight:800; color:#ea0029; background:rgba(234,0,41,0.12); border-radius:4px; padding:1px 5px; margin-top:2px; text-align:center;">YOU</div>`;
    } else if (isOpen) {
      dotBorder = 'rgba(0,210,106,0.4)'; dotColor = 'var(--zpay-green)';
      tagHtml = `<div style="font-size:9px; color:var(--zpay-green); margin-top:2px; text-align:center;">Open</div>`;
    }

    const isLast = i === sorted.length - 1;
    const shortName = isOpen ? 'Slot' : m.name.split(' ')[0];

    return `
      <div style="display:flex; flex-direction:column; align-items:center; flex:1; position:relative;">
        <!-- Connecting line left -->
        ${i > 0 ? `<div style="position:absolute; top:14px; left:0; right:50%; height:2px; background:${isCollected ? '#22c55e' : 'var(--border-subtle)'};"></div>` : ''}
        <!-- Connecting line right -->
        ${!isLast ? `<div style="position:absolute; top:14px; left:50%; right:0; height:2px; background:${isCollected && i < sorted.length - 1 && sorted[i+1]?.status !== 'open' ? '#22c55e' : 'var(--border-subtle)'};"></div>` : ''}
        
        <!-- Dot -->
        <div style="
          width:28px; height:28px; border-radius:50%;
          background:${dotBg}; border:2px solid ${dotBorder};
          display:flex; align-items:center; justify-content:center;
          color:${dotColor}; font-size:11px; font-weight:800;
          position:relative; z-index:1; flex-shrink:0;
          ${isCurrent ? 'box-shadow:0 0 0 4px rgba(245,158,11,0.25);' : ''}
          ${isMe && !isCollected ? 'box-shadow:0 0 0 4px rgba(234,0,41,0.15);' : ''}
        ">
          ${isCollected ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : `${m.turn}`}
        </div>

        <!-- Label -->
        <div style="margin-top:6px; text-align:center;">
          <div style="font-size:10px; font-weight:${nameWeight}; color:${nameFontColor}; max-width:52px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${shortName}</div>
          ${tagHtml}
        </div>
      </div>
    `;
  });

  return `
    <div style="background:var(--bg-input); border-radius:14px; padding:16px 12px 12px; margin:0 0 14px 0;">
      <div style="font-size:11px; font-weight:700; color:var(--text-secondary); margin-bottom:14px; display:flex; align-items:center; gap:6px;">
        ${ICONS.list} Turn Order
      </div>
      <div style="display:flex; align-items:flex-start; overflow-x:auto; padding-bottom:4px; gap:0;">
        ${steps.join('')}
      </div>
      <div style="display:flex; gap:12px; margin-top:12px; font-size:10px; color:var(--text-muted); border-top:1px solid var(--border-subtle); padding-top:10px;">
        <div style="display:flex; align-items:center; gap:4px;"><div style="width:10px; height:10px; border-radius:50%; background:#22c55e;"></div> Collected</div>
        <div style="display:flex; align-items:center; gap:4px;"><div style="width:10px; height:10px; border-radius:50%; background:#f59e0b;"></div> Collecting</div>
        <div style="display:flex; align-items:center; gap:4px;"><div style="width:10px; height:10px; border-radius:50%; background:rgba(234,0,41,0.15); border:2px solid rgba(234,0,41,0.6);"></div> You</div>
        <div style="display:flex; align-items:center; gap:4px;"><div style="width:10px; height:10px; border-radius:50%; background:var(--bg-card); border:2px solid var(--border-subtle);"></div> Waiting</div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// GOAL CARD ICON SVG
// ─────────────────────────────────────────────────────────────────────────────
function getGoalIconKey(goal) {
  const t = (goal.title || '').toLowerCase();
  if (t.includes('rent') || t.includes('house') || t.includes('home')) return 'house';
  if (t.includes('school') || t.includes('fee') || t.includes('education')) return 'school';
  if (t.includes('business') || t.includes('capital') || t.includes('work')) return 'brief';
  if (t.includes('car') || t.includes('vehicle')) return 'car';
  if (t.includes('ring') || t.includes('wedding') || t.includes('marriage')) return 'ring';
  return 'money';
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN RENDER
// ─────────────────────────────────────────────────────────────────────────────
export function renderOsusuView() {
  const targetGoals = store.targetGoals || [];
  const ajoGroups   = store.ajoGroups   || [];
  const joinedGroups    = ajoGroups.filter(g => g.isJoined);
  const availableGroups = ajoGroups.filter(g => !g.isJoined);

  const totalLocked  = targetGoals.reduce((s, g) => s + (g.saved  || 0), 0);
  const totalTarget  = targetGoals.reduce((s, g) => s + (g.target || 0), 0);
  const overallPct   = totalTarget > 0 ? Math.round((totalLocked / totalTarget) * 100) : 0;
  const myTurnGroup  = joinedGroups.find(g => g.myStatus === 'your_turn');

  return `
  <div class="app-wrapper" style="padding-bottom:90px;">

    <!-- ── HEADER ──────────────────────────────────────────────────────────── -->
    <header class="screen-header" style="background:var(--bg-app); position:sticky; top:0; z-index:20; border-bottom:1px solid var(--border-subtle);">
      <a href="#/app/services" class="back-btn" title="Back">${ICONS.back}</a>
      <div style="text-align:center;">
        <span class="screen-title" style="font-size:16px; font-weight:800;">Osusu &amp; Ajo</span>
        <div style="font-size:11px; color:var(--text-muted); margin-top:1px;">Target Savings &bull; Rotational Thrift</div>
      </div>
      <button id="btn-open-create-goal" class="header-icon-btn" title="New Goal"
        style="background:rgba(0,210,106,0.12); color:var(--zpay-green); border:1px solid rgba(0,210,106,0.3);">
        ${ICONS.plus}
      </button>
    </header>

    <div style="padding:16px 18px; display:flex; flex-direction:column; gap:16px;">

      <!-- ── YOUR TURN BANNER ─────────────────────────────────────────────── -->
      ${myTurnGroup ? `
      <div id="your-turn-banner" style="
        background:linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.05));
        border:1.5px solid rgba(245,158,11,0.55); border-radius:18px; padding:18px 16px;
        animation:osusu-pulse 2s ease-in-out infinite alternate;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
          <div style="width:42px; height:42px; border-radius:14px; background:rgba(245,158,11,0.2);
            display:flex; align-items:center; justify-content:center; color:#f59e0b; flex-shrink:0;">
            ${ICONS.bell}
          </div>
          <div>
            <div style="font-size:15px; font-weight:900; color:#f59e0b; letter-spacing:0.3px;">It's Your Turn to Collect!</div>
            <div style="font-size:12px; color:rgba(255,255,255,0.65); margin-top:2px;">${myTurnGroup.name}</div>
          </div>
        </div>
        <p style="font-size:12px; color:var(--text-secondary); margin:0 0 14px; line-height:1.55;">
          Round ${myTurnGroup.currentRound} is complete. All members have contributed.
          Your pot of <strong style="color:#f59e0b; font-size:14px;">${store.formatMoney(myTurnGroup.potSize)}</strong> is ready.
        </p>
        <button id="btn-collect-banner" data-group-id="${myTurnGroup.id}" class="zpay-btn zpay-btn-block"
          style="background:linear-gradient(135deg,#f59e0b,#d97706); border:none; color:#000;
          font-weight:900; font-size:14px; padding:13px; justify-content:center; border-radius:12px; gap:8px;">
          ${ICONS.collect} &nbsp;Collect ${store.formatMoney(myTurnGroup.potSize)}
        </button>
      </div>
      ` : ''}

      <!-- ── SUMMARY CARD ─────────────────────────────────────────────────── -->
      <div class="balance-card" style="
        background:linear-gradient(135deg,#041f10,#020f08);
        border:1px solid rgba(0,210,106,0.35); box-shadow:0 10px 30px rgba(0,210,106,0.08);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <div style="font-size:12px; color:var(--zpay-green); font-weight:600; display:flex; align-items:center; gap:6px;">
            ${ICONS.lock} &nbsp;Total Locked Savings
          </div>
          <span class="zpay-badge zpay-badge-success" style="font-size:10px;">
            ${targetGoals.filter(g => g.status === 'Active').length} Active
          </span>
        </div>
        <div class="balance-amount" style="font-size:30px; color:#fff; margin:8px 0 10px;">${store.formatMoney(totalLocked)}</div>
        <div style="background:rgba(255,255,255,0.08); border-radius:99px; height:6px; overflow:hidden; margin-bottom:6px;">
          <div style="width:${Math.max(3, overallPct)}%; height:100%; background:var(--zpay-green); border-radius:99px; transition:width 0.5s;"></div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:11px; color:rgba(255,255,255,0.5);">
          <span>${store.formatMoney(totalLocked)} saved</span>
          <span>Target ${store.formatMoney(totalTarget)} &bull; ${overallPct}%</span>
        </div>
      </div>

      <!-- ── TABS ─────────────────────────────────────────────────────────── -->
      <div class="zpay-tabs" style="gap:6px;">
        <button class="zpay-tab-btn active" id="tab-goals"
          style="flex:1; display:flex; align-items:center; justify-content:center; gap:6px; font-size:12px;">
          ${ICONS.target} Goals
        </button>
        <button class="zpay-tab-btn" id="tab-my-ajo"
          style="flex:1; display:flex; align-items:center; justify-content:center; gap:6px; font-size:12px;">
          ${ICONS.group} My Ajo
        </button>
        <button class="zpay-tab-btn" id="tab-browse"
          style="flex:1; display:flex; align-items:center; justify-content:center; gap:6px; font-size:12px;">
          ${ICONS.browse} Browse
        </button>
      </div>

      <!-- ═══════════════════════════════════════════════════════════════════ -->
      <!-- PANEL 1 — TARGET GOALS                                              -->
      <!-- ═══════════════════════════════════════════════════════════════════ -->
      <div id="panel-goals" style="display:flex; flex-direction:column; gap:12px;">

        ${targetGoals.length === 0 ? `
          <div style="text-align:center; padding:48px 20px; background:var(--bg-card); border-radius:18px; border:1px solid var(--border-subtle);">
            <div style="color:var(--text-muted); margin-bottom:12px;">${ICONS.target}</div>
            <div style="font-size:15px; font-weight:800; color:var(--text-primary); margin-bottom:6px;">No savings goals yet</div>
            <p style="font-size:12px; color:var(--text-muted); margin:0 0 18px; line-height:1.6;">
              Create a goal to start locking money towards your dreams — rent, school fees, travel, and more.
            </p>
            <button id="btn-empty-create-goal" class="zpay-btn zpay-btn-primary" style="padding:10px 24px; font-weight:700;">
              ${ICONS.plus} &nbsp;Create First Goal
            </button>
          </div>
        ` : targetGoals.map(goal => {
            const pct   = Math.min(100, Math.round((goal.saved / goal.target) * 100));
            const done  = goal.saved >= goal.target;
            const icon  = goalIcon(getGoalIconKey(goal));
            return `
            <div class="zpay-card" style="padding:16px; border:1px solid var(--border-subtle); border-left:4px solid ${icon.color};">
              <!-- Title row -->
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="width:40px; height:40px; border-radius:12px; background:${icon.bg};
                    display:flex; align-items:center; justify-content:center; color:${icon.color}; flex-shrink:0;">
                    ${icon.svg}
                  </div>
                  <div>
                    <div style="font-size:14px; font-weight:800; color:var(--text-primary); margin-bottom:2px;">${goal.title}</div>
                    <div style="font-size:11px; color:var(--text-muted); display:flex; align-items:center; gap:4px;">
                      ${ICONS.clock} &nbsp;${goal.frequency} &bull; ${store.formatMoney(goal.contribution)}/period
                    </div>
                  </div>
                </div>
                <span class="zpay-badge ${done ? 'zpay-badge-success' : 'zpay-badge-info'}" style="font-size:10px; flex-shrink:0;">
                  ${done ? 'Complete' : pct + '%'}
                </span>
              </div>

              <!-- Progress bar -->
              <div style="background:var(--bg-input); border-radius:99px; height:8px; overflow:hidden; margin-bottom:8px;">
                <div style="width:${Math.max(3, pct)}%; height:100%; background:${icon.color}; border-radius:99px; transition:width 0.5s;"></div>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary); margin-bottom:14px;">
                <span>Saved: <strong style="color:var(--text-primary);">${store.formatMoney(goal.saved)}</strong></span>
                <span>Target: <strong style="color:var(--text-primary);">${store.formatMoney(goal.target)}</strong></span>
              </div>

              <!-- Next date -->
              ${goal.status === 'Active' ? `
                <div style="font-size:11px; color:var(--text-muted); margin-bottom:14px; display:flex; align-items:center; gap:4px;">
                  ${ICONS.clock} Next contribution: <strong style="color:var(--text-primary); margin-left:2px;">${goal.nextDate}</strong>
                </div>
              ` : ''}

              <!-- Actions -->
              <div style="display:grid; grid-template-columns:${done ? '1fr' : '1fr 1fr'}; gap:8px;">
                ${done ? `
                  <button class="zpay-btn zpay-btn-primary btn-withdraw-goal" data-goal-id="${goal.id}"
                    style="font-size:12px; font-weight:800; padding:10px; justify-content:center; gap:6px;">
                    ${ICONS.collect} &nbsp;Collect ${store.formatMoney(goal.saved)}
                  </button>
                ` : `
                  <button class="zpay-btn zpay-btn-primary btn-contribute-goal" data-goal-id="${goal.id}"
                    style="font-size:12px; font-weight:700; padding:10px; justify-content:center; gap:6px;">
                    ${ICONS.pay} &nbsp;Add ${store.formatMoney(goal.contribution)}
                  </button>
                  <button class="zpay-btn zpay-btn-secondary btn-withdraw-goal" data-goal-id="${goal.id}"
                    style="font-size:12px; padding:10px; justify-content:center; color:var(--text-muted);">
                    Break Goal
                  </button>
                `}
              </div>
            </div>
            `;
          }).join('')
        }

        <button id="btn-add-goal-bottom" class="zpay-btn zpay-btn-secondary zpay-btn-block"
          style="font-size:13px; font-weight:700; border-style:dashed; gap:8px;">
          ${ICONS.plus} &nbsp;New Savings Goal
        </button>
      </div>

      <!-- ═══════════════════════════════════════════════════════════════════ -->
      <!-- PANEL 2 — MY AJO GROUPS                                             -->
      <!-- ═══════════════════════════════════════════════════════════════════ -->
      <div id="panel-my-ajo" style="display:none; flex-direction:column; gap:14px;">

        ${joinedGroups.length === 0 ? `
          <div style="text-align:center; padding:48px 20px; background:var(--bg-card); border-radius:18px; border:1px solid var(--border-subtle);">
            <div style="color:var(--text-muted); margin-bottom:12px;">${ICONS.group}</div>
            <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Not in any Ajo group</div>
            <p style="font-size:12px; color:var(--text-muted); margin:6px 0 18px; line-height:1.6;">
              Browse and join a rotational thrift group to start saving with others.
            </p>
          </div>
        ` : joinedGroups.map(group => {
            const isMyTurn  = group.myStatus === 'your_turn';
            const collected = group.myStatus === 'collected';
            const waiting   = group.myStatus === 'waiting';
            const openSlots = group.totalSlots - group.filledSlots;

            let statusBg     = 'rgba(56,189,248,0.08)';
            let statusBorder = 'rgba(56,189,248,0.25)';
            let statusColor  = '#38bdf8';
            let statusLabel  = `Your turn: Round ${group.myTurn} of ${group.totalSlots}`;
            let statusIcon   = ICONS.clock;

            if (isMyTurn) {
              statusBg = 'rgba(245,158,11,0.12)'; statusBorder = 'rgba(245,158,11,0.45)'; statusColor = '#f59e0b';
              statusLabel = 'Your turn to collect!'; statusIcon = ICONS.bell;
            } else if (collected) {
              statusBg = 'rgba(34,197,94,0.08)'; statusBorder = 'rgba(34,197,94,0.25)'; statusColor = '#22c55e';
              statusLabel = 'You already collected'; statusIcon = ICONS.check;
            }

            return `
            <div class="zpay-card" style="padding:0; overflow:hidden; border:1px solid var(--border-subtle); border-radius:18px;">
              <!-- Card header -->
              <div style="padding:16px 16px 12px; border-bottom:1px solid var(--border-subtle);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                  <div>
                    <div style="font-size:14px; font-weight:800; color:var(--text-primary); margin-bottom:3px;">${group.name}</div>
                    <div style="font-size:11px; color:var(--text-muted); display:flex; align-items:center; gap:4px;">
                      ${ICONS.crown} &nbsp;${group.type} &bull; Admin: ${group.adminName}
                    </div>
                  </div>
                  <span class="zpay-badge zpay-badge-success" style="font-size:10px;">Joined</span>
                </div>
              </div>

              <div style="padding:14px 16px; display:flex; flex-direction:column; gap:12px;">

                <!-- Status strip -->
                <div style="background:${statusBg}; border:1px solid ${statusBorder}; border-radius:12px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
                  <div style="display:flex; align-items:center; gap:6px; color:${statusColor}; font-size:12px; font-weight:800;">
                    ${statusIcon} ${statusLabel}
                  </div>
                  <div style="font-size:11px; color:var(--text-muted);">Pot <strong style="color:var(--text-primary);">${store.formatMoney(group.potSize)}</strong></div>
                </div>

                <!-- Stats row -->
                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
                  <div style="background:var(--bg-input); border-radius:12px; padding:10px 8px; text-align:center;">
                    <div style="font-size:9px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">Contribution</div>
                    <div style="font-size:14px; font-weight:800; color:var(--zpay-green);">${store.formatMoney(group.contributionAmount)}</div>
                    <div style="font-size:9px; color:var(--text-muted); margin-top:2px;">${group.frequency}</div>
                  </div>
                  <div style="background:var(--bg-input); border-radius:12px; padding:10px 8px; text-align:center;">
                    <div style="font-size:9px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">Members</div>
                    <div style="font-size:14px; font-weight:800; color:var(--text-primary);">${group.filledSlots}/${group.totalSlots}</div>
                    <div style="font-size:9px; color:var(--text-muted); margin-top:2px;">${openSlots > 0 ? openSlots + ' open' : 'Full'}</div>
                  </div>
                  <div style="background:var(--bg-input); border-radius:12px; padding:10px 8px; text-align:center;">
                    <div style="font-size:9px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">Round</div>
                    <div style="font-size:14px; font-weight:800; color:#38bdf8;">${group.currentRound || '—'}/${group.totalSlots}</div>
                    <div style="font-size:9px; color:var(--text-muted); margin-top:2px;">${group.cycleLength}</div>
                  </div>
                </div>

                <!-- Turn tracker -->
                ${renderTurnTracker(group)}

                <!-- Action buttons -->
                <div style="display:grid; grid-template-columns:${isMyTurn ? '1fr 1fr' : '1fr'}; gap:8px;">
                  ${isMyTurn ? `
                    <button class="zpay-btn zpay-btn-primary btn-collect-pot" data-group-id="${group.id}"
                      style="font-size:12px; font-weight:900; padding:11px; justify-content:center; gap:6px;
                      background:linear-gradient(135deg,#f59e0b,#d97706); border:none; color:#000; border-radius:12px;">
                      ${ICONS.collect} &nbsp;Collect ${store.formatMoney(group.potSize)}
                    </button>
                    <button class="zpay-btn zpay-btn-secondary btn-pay-ajo" data-group-id="${group.id}"
                      style="font-size:12px; font-weight:700; padding:11px; justify-content:center; gap:6px; border-radius:12px;">
                      ${ICONS.pay} &nbsp;Pay Contribution
                    </button>
                  ` : `
                    <button class="zpay-btn zpay-btn-secondary btn-pay-ajo" data-group-id="${group.id}"
                      style="font-size:13px; font-weight:700; padding:11px; justify-content:center; gap:6px; border-radius:12px;">
                      ${ICONS.pay} &nbsp;Pay ${store.formatMoney(group.contributionAmount)}
                    </button>
                  `}
                </div>

                <!-- Next collection -->
                <div style="font-size:11px; color:var(--text-muted); text-align:center; display:flex; align-items:center; justify-content:center; gap:4px;">
                  ${ICONS.clock} Next: <strong style="color:var(--text-primary); margin-left:3px;">${group.nextCollection}</strong>
                </div>
              </div>
            </div>
            `;
          }).join('')
        }
      </div>

      <!-- ═══════════════════════════════════════════════════════════════════ -->
      <!-- PANEL 3 — BROWSE & JOIN                                             -->
      <!-- ═══════════════════════════════════════════════════════════════════ -->
      <div id="panel-browse" style="display:none; flex-direction:column; gap:14px;">
        <div>
          <h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin:0 0 3px;">Available Groups</h3>
          <p style="font-size:12px; color:var(--text-muted); margin:0; line-height:1.5;">
            Contribute on schedule. Collect the full pot when it's your turn.
          </p>
        </div>

        ${availableGroups.map(group => {
            const openSlots = group.totalSlots - group.filledSlots;
            const isFull    = openSlots <= 0;
            const fillPct   = Math.round((group.filledSlots / group.totalSlots) * 100);
            return `
            <div class="zpay-card" style="padding:16px; border:1px solid var(--border-subtle); border-radius:18px;">
              <!-- Header -->
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                <div>
                  <div style="font-size:14px; font-weight:800; color:var(--text-primary); margin-bottom:3px;">${group.name}</div>
                  <div style="font-size:11px; color:var(--text-muted); display:flex; align-items:center; gap:4px;">
                    ${ICONS.users} &nbsp;${group.type} &bull; By ${group.adminName}
                  </div>
                </div>
                <span class="zpay-badge ${isFull ? 'zpay-badge-danger' : 'zpay-badge-success'}" style="font-size:10px; flex-shrink:0;">
                  ${isFull ? 'Full' : openSlots + ' slots'}
                </span>
              </div>

              <p style="font-size:12px; color:var(--text-secondary); margin:0 0 14px; line-height:1.55;">${group.description}</p>

              <!-- Slot fill bar -->
              <div style="margin-bottom:14px;">
                <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); margin-bottom:5px;">
                  <span style="display:flex; align-items:center; gap:4px;">${ICONS.users} ${group.filledSlots} of ${group.totalSlots} members joined</span>
                  <span>${fillPct}%</span>
                </div>
                <div style="background:var(--bg-input); border-radius:99px; height:6px; overflow:hidden;">
                  <div style="width:${fillPct}%; height:100%; background:${isFull ? '#ef4444' : 'var(--zpay-green)'}; border-radius:99px;"></div>
                </div>
              </div>

              <!-- Key metrics -->
              <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:14px;">
                <div style="background:var(--bg-input); border-radius:12px; padding:10px 8px; text-align:center;">
                  <div style="font-size:9px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">You Pay</div>
                  <div style="font-size:13px; font-weight:800; color:var(--zpay-green);">${store.formatMoney(group.contributionAmount)}</div>
                  <div style="font-size:9px; color:var(--text-muted); margin-top:2px;">${group.frequency}</div>
                </div>
                <div style="background:var(--bg-input); border-radius:12px; padding:10px 8px; text-align:center;">
                  <div style="font-size:9px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">You Pack</div>
                  <div style="font-size:13px; font-weight:800; color:#f59e0b;">${store.formatMoney(group.potSize)}</div>
                  <div style="font-size:9px; color:var(--text-muted); margin-top:2px;">${group.totalSlots} members</div>
                </div>
                <div style="background:var(--bg-input); border-radius:12px; padding:10px 8px; text-align:center;">
                  <div style="font-size:9px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">Cycle</div>
                  <div style="font-size:13px; font-weight:800; color:var(--text-primary);">${group.cycleLength}</div>
                  <div style="font-size:9px; color:var(--text-muted); margin-top:2px;">Total</div>
                </div>
              </div>

              <!-- Rules accordion -->
              <button class="zpay-btn zpay-btn-secondary zpay-btn-block btn-toggle-rules" data-group-id="${group.id}"
                style="font-size:11px; padding:8px; margin-bottom:8px; border-style:dashed; justify-content:center; gap:6px;">
                ${ICONS.list} &nbsp;View Group Rules
                <span style="margin-left:auto;">${ICONS.chevronDown}</span>
              </button>
              <div id="rules-${group.id}" style="display:none; background:var(--bg-input); border-radius:12px; padding:12px; margin-bottom:12px; font-size:12px; color:var(--text-secondary);">
                <div style="font-weight:700; color:var(--text-primary); margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                  ${ICONS.info} Group Rules
                </div>
                ${group.rules.map((r, i) => `
                  <div style="display:flex; gap:8px; margin-bottom:6px; line-height:1.5;">
                    <span style="min-width:16px; height:16px; border-radius:50%; background:rgba(0,210,106,0.15); color:var(--zpay-green);
                      font-size:10px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px;">${i + 1}</span>
                    <span>${r}</span>
                  </div>
                `).join('')}
              </div>

              <!-- Join -->
              <button class="zpay-btn ${isFull ? 'zpay-btn-secondary' : 'zpay-btn-primary'} zpay-btn-block btn-join-group"
                data-group-id="${group.id}" ${isFull ? 'disabled' : ''}
                style="font-size:13px; font-weight:700; padding:11px; justify-content:center; gap:8px; border-radius:12px;
                ${isFull ? 'opacity:0.5; cursor:not-allowed;' : ''}">
                ${isFull ? `${ICONS.info} Group Full` : `${ICONS.group} &nbsp;Join This Group`}
              </button>
            </div>
            `;
          }).join('')
        }

        <!-- Create own group CTA -->
        <div style="background:rgba(0,210,106,0.05); border:1.5px dashed rgba(0,210,106,0.3); border-radius:18px; padding:20px 16px; text-align:center;">
          <div style="color:var(--zpay-green); margin-bottom:10px;">${ICONS.group}</div>
          <div style="font-size:14px; font-weight:800; color:var(--text-primary); margin-bottom:4px;">Start Your Own Ajo Group</div>
          <p style="font-size:12px; color:var(--text-muted); margin:0 0 16px; line-height:1.55;">
            Invite friends, set the amount and schedule, and ZPay handles all collections automatically.
          </p>
          <button id="btn-create-ajo" class="zpay-btn zpay-btn-primary" style="padding:10px 24px; font-weight:700; gap:8px;">
            ${ICONS.plus} Create Ajo Group
          </button>
        </div>
      </div>

    </div><!-- /padding wrapper -->

    <!-- ═══════════════════════════════════════════════════════════════════════ -->
    <!-- CREATE GOAL MODAL                                                       -->
    <!-- ═══════════════════════════════════════════════════════════════════════ -->
    <div id="modal-create-goal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:999; align-items:flex-end; justify-content:center;">
      <div style="
        background:var(--bg-card); width:100%; max-width:480px;
        border-radius:24px 24px 0 0; padding:24px 20px 32px;
        border-top:2px solid rgba(0,210,106,0.3);
        display:flex; flex-direction:column; gap:14px;
        max-height:92vh; overflow-y:auto;">

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h3 style="font-size:17px; font-weight:900; color:var(--text-primary); margin:0;">New Savings Goal</h3>
            <p style="font-size:11px; color:var(--text-muted); margin:3px 0 0;">Lock money toward a personal milestone</p>
          </div>
          <button id="btn-close-goal-modal" style="background:none; border:none; cursor:pointer; color:var(--text-muted); padding:4px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Category picker -->
        <div>
          <div class="zpay-label" style="margin-bottom:8px;">Category</div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            ${Object.entries({house:'House',school:'Education',brief:'Business',car:'Vehicle',ring:'Wedding',money:'General'}).map(([k, label]) => {
              const ic = goalIcon(k);
              return `
                <button class="goal-cat-btn" data-cat="${k}"
                  style="display:flex; flex-direction:column; align-items:center; gap:4px; padding:8px 10px;
                  border-radius:12px; background:var(--bg-input); border:2px solid transparent;
                  cursor:pointer; transition:all 0.18s; min-width:52px;">
                  <span style="color:${ic.color};">${ic.svg}</span>
                  <span style="font-size:10px; font-weight:600; color:var(--text-secondary);">${label}</span>
                </button>
              `;
            }).join('')}
          </div>
          <input type="hidden" id="goal-cat" value="money" />
        </div>

        <div class="zpay-form-group">
          <label class="zpay-label">Goal Title</label>
          <input id="goal-title" type="text" class="zpay-input" placeholder="e.g. House Rent, School Fees, New Car" />
        </div>

        <div class="zpay-form-group">
          <label class="zpay-label">Target Amount (₦)</label>
          <input id="goal-target" type="number" class="zpay-input" placeholder="0.00" />
          <div style="display:flex; gap:6px; margin-top:8px; flex-wrap:wrap;">
            ${[100000,200000,500000,1000000].map(a => `
              <button class="zpay-chip goal-chip-amount" data-amount="${a}"
                style="padding:5px 10px; border-radius:99px; background:var(--bg-input);
                border:1px solid var(--border-medium); font-size:11px; font-weight:600; color:var(--text-secondary); cursor:pointer;">
                ₦${(a/1000).toFixed(0)}k
              </button>
            `).join('')}
          </div>
        </div>

        <div class="zpay-form-group">
          <label class="zpay-label">Save Every</label>
          <div style="display:flex; gap:8px;">
            ${['Daily','Weekly','Monthly'].map(f => `
              <button class="goal-freq-btn" data-freq="${f}"
                style="flex:1; padding:8px 4px; border-radius:10px; font-size:12px; font-weight:700;
                background:${f==='Weekly'?'var(--zpay-green)':'var(--bg-input)'};
                color:${f==='Weekly'?'#fff':'var(--text-secondary)'};
                border:1px solid ${f==='Weekly'?'var(--zpay-green)':'var(--border-medium)'}; cursor:pointer; transition:all 0.18s;">
                ${f}
              </button>
            `).join('')}
          </div>
          <input type="hidden" id="goal-freq" value="Weekly" />
        </div>

        <div class="zpay-form-group">
          <label class="zpay-label" style="display:flex; justify-content:space-between;">
            First Contribution (₦)
            <span style="font-size:11px; color:var(--text-muted); font-weight:400;">
              Balance: <strong style="color:var(--zpay-green);">${store.formatMoney(store.balance)}</strong>
            </span>
          </label>
          <input id="goal-contribution" type="number" class="zpay-input" placeholder="0.00" />
          <div style="font-size:11px; color:var(--text-muted); margin-top:4px; display:flex; align-items:center; gap:4px;">
            ${ICONS.info} This amount is locked from your wallet immediately
          </div>
        </div>

        <button id="btn-submit-new-goal" class="zpay-btn zpay-btn-primary zpay-btn-block"
          style="font-weight:900; font-size:14px; padding:14px; justify-content:center; gap:8px; border-radius:14px;">
          ${ICONS.lock} &nbsp;Lock &amp; Start Saving
        </button>
      </div>
    </div>

  </div>

  <style>
    @keyframes osusu-pulse {
      from { box-shadow: 0 0 12px rgba(245,158,11,0.25); }
      to   { box-shadow: 0 0 28px rgba(245,158,11,0.55); }
    }
    .goal-cat-btn.selected { border-color: var(--zpay-green) !important; background: rgba(0,210,106,0.1) !important; }
    .goal-chip-amount:hover { background:var(--zpay-green) !important; color:#fff !important; border-color:var(--zpay-green) !important; }
  </style>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// LISTENERS
// ─────────────────────────────────────────────────────────────────────────────
export function initOsusuListeners() {

  // ── Tabs ──────────────────────────────────────────────────────────────────
  const TAB_MAP = {
    'tab-goals':    'panel-goals',
    'tab-my-ajo':   'panel-my-ajo',
    'tab-browse':   'panel-browse',
  };
  function switchTab(activeKey) {
    Object.entries(TAB_MAP).forEach(([tid, pid]) => {
      const t = document.getElementById(tid);
      const p = document.getElementById(pid);
      const on = tid === activeKey;
      if (t) t.classList.toggle('active', on);
      if (p) p.style.display = on ? 'flex' : 'none';
    });
  }
  Object.keys(TAB_MAP).forEach(tid => {
    document.getElementById(tid)?.addEventListener('click', () => switchTab(tid));
  });

  // ── Collect pot — banner ──────────────────────────────────────────────────
  document.getElementById('btn-collect-banner')?.addEventListener('click', e => {
    const gid = e.currentTarget.dataset.groupId;
    try {
      const amt = store.collectAjoPot(gid);
      showToast(`${store.formatMoney(amt)} credited to your wallet!`, 'success');
      window.location.hash = '#/app/osusu';
    } catch (err) { showToast(err.message, 'error'); }
  });

  // ── Contribute to goal ────────────────────────────────────────────────────
  document.querySelectorAll('.btn-contribute-goal').forEach(btn => {
    btn.addEventListener('click', () => {
      try {
        const g = store.contributeToGoal(btn.dataset.goalId);
        showToast(`Contribution added — ${Math.round((g.saved / g.target) * 100)}% done!`, 'success');
        window.location.hash = '#/app/osusu';
      } catch (err) { showToast(err.message, 'error'); }
    });
  });

  // ── Withdraw / break goal ─────────────────────────────────────────────────
  document.querySelectorAll('.btn-withdraw-goal').forEach(btn => {
    btn.addEventListener('click', () => {
      const goal = (store.targetGoals || []).find(g => g.id === btn.dataset.goalId);
      if (!goal) return;
      const msg = goal.saved >= goal.target
        ? `Collect ${store.formatMoney(goal.saved)} from "${goal.title}"?`
        : `Break "${goal.title}" early and withdraw ${store.formatMoney(goal.saved)}? Progress will be lost.`;
      if (confirm(msg)) {
        try {
          const amt = store.withdrawGoal(btn.dataset.goalId);
          showToast(`${store.formatMoney(amt)} added to your wallet!`, 'success');
          window.location.hash = '#/app/osusu';
        } catch (err) { showToast(err.message, 'error'); }
      }
    });
  });

  // ── Pay ajo contribution ──────────────────────────────────────────────────
  document.querySelectorAll('.btn-pay-ajo').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = (store.ajoGroups || []).find(g => g.id === btn.dataset.groupId);
      if (!group) return;
      if (confirm(`Pay ${store.formatMoney(group.contributionAmount)} to "${group.name}"?`)) {
        try {
          store.payAjoContribution(btn.dataset.groupId);
          showToast(`${store.formatMoney(group.contributionAmount)} paid to ${group.name}!`, 'success');
          window.location.hash = '#/app/osusu';
        } catch (err) { showToast(err.message, 'error'); }
      }
    });
  });

  // ── Collect pot from card ─────────────────────────────────────────────────
  document.querySelectorAll('.btn-collect-pot').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = (store.ajoGroups || []).find(g => g.id === btn.dataset.groupId);
      if (!group) return;
      if (confirm(`Collect your ${store.formatMoney(group.potSize)} ajo pot from "${group.name}"?`)) {
        try {
          const amt = store.collectAjoPot(btn.dataset.groupId);
          showToast(`${store.formatMoney(amt)} collected and added to your wallet!`, 'success');
          window.location.hash = '#/app/osusu';
        } catch (err) { showToast(err.message, 'error'); }
      }
    });
  });

  // ── Toggle group rules ────────────────────────────────────────────────────
  document.querySelectorAll('.btn-toggle-rules').forEach(btn => {
    btn.addEventListener('click', () => {
      const el = document.getElementById(`rules-${btn.dataset.groupId}`);
      if (!el) return;
      const open = el.style.display !== 'none';
      el.style.display = open ? 'none' : 'block';
    });
  });

  // ── Join group ────────────────────────────────────────────────────────────
  document.querySelectorAll('.btn-join-group').forEach(btn => {
    if (btn.disabled) return;
    btn.addEventListener('click', () => {
      const group = (store.ajoGroups || []).find(g => g.id === btn.dataset.groupId);
      if (!group) return;
      if (confirm(`Join "${group.name}"?\nContribute ${store.formatMoney(group.contributionAmount)} every ${group.frequency.toLowerCase()}.\nFirst collection: ${group.nextCollection}`)) {
        try {
          store.joinAjoGroup(btn.dataset.groupId);
          showToast(`Joined "${group.name}"! Check My Ajo for your turn.`, 'success');
          switchTab('tab-my-ajo');
          window.location.hash = '#/app/osusu';
        } catch (err) { showToast(err.message, 'error'); }
      }
    });
  });

  // ── Create ajo group ──────────────────────────────────────────────────────
  document.getElementById('btn-create-ajo')?.addEventListener('click', () => {
    showToast('Create Ajo Group coming soon! Members invited via ZPay link.', 'info');
  });

  // ── Goal modal open / close ───────────────────────────────────────────────
  const modal = document.getElementById('modal-create-goal');
  const openModal  = () => { if (modal) modal.style.display = 'flex'; };
  const closeModal = () => { if (modal) modal.style.display = 'none'; };

  document.getElementById('btn-open-create-goal')?.addEventListener('click', openModal);
  document.getElementById('btn-add-goal-bottom')?.addEventListener('click', openModal);
  document.getElementById('btn-empty-create-goal')?.addEventListener('click', openModal);
  document.getElementById('btn-close-goal-modal')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // ── Category picker ───────────────────────────────────────────────────────
  document.querySelectorAll('.goal-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.goal-cat-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const hidden = document.getElementById('goal-cat');
      if (hidden) hidden.value = btn.dataset.cat;
    });
    if (btn.dataset.cat === 'money') btn.classList.add('selected');
  });

  // ── Quick amount chips ────────────────────────────────────────────────────
  document.querySelectorAll('.goal-chip-amount').forEach(btn => {
    btn.addEventListener('click', () => {
      const inp = document.getElementById('goal-target');
      if (inp) inp.value = btn.dataset.amount;
    });
  });

  // ── Frequency picker ──────────────────────────────────────────────────────
  document.querySelectorAll('.goal-freq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.goal-freq-btn').forEach(b => {
        b.style.background = 'var(--bg-input)';
        b.style.color = 'var(--text-secondary)';
        b.style.borderColor = 'var(--border-medium)';
      });
      btn.style.background = 'var(--zpay-green)';
      btn.style.color = '#fff';
      btn.style.borderColor = 'var(--zpay-green)';
      const hidden = document.getElementById('goal-freq');
      if (hidden) hidden.value = btn.dataset.freq;
    });
  });

  // ── Submit new goal ───────────────────────────────────────────────────────
  document.getElementById('btn-submit-new-goal')?.addEventListener('click', () => {
    const title        = document.getElementById('goal-title')?.value?.trim();
    const target       = document.getElementById('goal-target')?.value;
    const contribution = document.getElementById('goal-contribution')?.value;
    const cat          = document.getElementById('goal-cat')?.value || 'money';
    const frequency    = document.getElementById('goal-freq')?.value || 'Weekly';
    const icon         = goalIcon(cat);

    try {
      store.createTargetGoal({ title, emoji: cat, target, contribution, frequency, color: icon.color });
      closeModal();
      showToast(`"${title}" goal created! First contribution locked.`, 'success');
      window.location.hash = '#/app/osusu';
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}
