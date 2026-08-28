# zPay – Exact UI Design Spec (Login + Dashboard)

> **Instruction for AI coding tools (Cursor / OpenCode / Claude / v0 / etc.):**  
> Recreate this UI **exactly** as described. Use Tailwind CSS. Do not invent new colors, spacing, or layout. Match the visual hierarchy, green palette, and component structure precisely.

---

## 1. Brand & Color Palette

| Token              | Hex       | Tailwind Class     | Usage                          |
|--------------------|-----------|--------------------|--------------------------------|
| Primary Green      | `#059669` | `bg-emerald-600`   | Buttons, icons, accents        |
| Dark Green         | `#064E3B` | `text-emerald-900` | Headings, logo text            |
| Medium Green       | `#10B981` | `bg-emerald-500`   | Hover states, leaf accent      |
| Soft Green BG      | `#ECFDF5` | `bg-emerald-50`    | Page background, cards         |
| White              | `#FFFFFF` | `bg-white`         | Cards, inputs                  |
| Muted Text         | `#6B7280` | `text-gray-500`    | Secondary text                 |
| Border             | `#D1FAE5` | `border-emerald-100` | Input borders, dividers     |

**Gradient used on phone headers:**  
`bg-gradient-to-br from-emerald-600 to-emerald-700`

---

## 2. Typography

- Font: `Inter` (or system-ui)
- Logo / Headings: `font-bold` / `font-semibold`
- Body: `font-medium` or `font-normal`
- Balance amount: `text-2xl font-bold tracking-tight`

---

## 3. Overall Layout (Flyer Style)

Two iPhone-style mockups side-by-side on a soft emerald-50 background with subtle wavy shapes.

- Left phone → **Login Screen**
- Right phone → **Dashboard Screen**

---

## 4. Login Screen (Exact Structure)

```
┌─────────────────────────────────┐
│  Green gradient header          │
│  Z logo + "zPay"                │
│  "Simple. Secure. Nigerian."    │
├─────────────────────────────────┤
│                                 │
│  White card (rounded-2xl)       │
│                                 │
│  Welcome Back                   │
│  Login to continue...           │
│                                 │
│  [👤 Email or Phone     👁]     │
│  [🔒 Password           👁]     │
│                                 │
│  Forgot password?   Create acct │
│                                 │
│  [        Login        ]        │  ← full-width emerald-600 button
│                                 │
│  🔒 Secure login powered by zPay│
└─────────────────────────────────┘
```

### Tailwind Code – Login Screen

```html
<div class="w-[320px] h-[640px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-gray-900 relative">
  <!-- Status bar (optional) -->
  <div class="absolute top-0 left-0 right-0 h-8 bg-emerald-700 flex items-center justify-between px-6 text-white text-xs">
    <span>9:41</span>
    <div class="flex gap-1">
      <span>●●●</span>
      <span>📶</span>
      <span>🔋</span>
    </div>
  </div>

  <!-- Header -->
  <div class="bg-gradient-to-br from-emerald-600 to-emerald-700 pt-12 pb-8 px-6 text-center">
    <div class="text-4xl font-bold text-white tracking-tight">Z<span class="text-emerald-200">Pay</span></div>
    <p class="text-emerald-100 text-sm mt-1">Simple. Secure. Nigerian.</p>
  </div>

  <!-- Form Card -->
  <div class="px-6 -mt-4">
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-emerald-50">
      <h2 class="text-xl font-bold text-emerald-900">Welcome Back</h2>
      <p class="text-sm text-gray-500 mt-1">Login to continue to your account.</p>

      <!-- Email -->
      <div class="mt-6 relative">
        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        </div>
        <input type="text" placeholder="Email or Phone" 
               class="w-full pl-10 pr-10 py-3 rounded-xl border border-emerald-100 bg-emerald-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"/>
        <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        </div>
      </div>

      <!-- Password -->
      <div class="mt-4 relative">
        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        </div>
        <input type="password" placeholder="Password" 
               class="w-full pl-10 pr-10 py-3 rounded-xl border border-emerald-100 bg-emerald-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"/>
        <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        </div>
      </div>

      <!-- Links -->
      <div class="flex justify-between mt-4 text-sm">
        <a href="#" class="text-emerald-600 hover:underline">Forgot password?</a>
        <a href="#" class="text-emerald-600 font-medium hover:underline">Create account</a>
      </div>

      <!-- Login Button -->
      <button class="w-full mt-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition">
        Login
      </button>

      <!-- Security note -->
      <p class="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        Secure login powered by zPay
      </p>
    </div>
  </div>
</div>
```

---

## 5. Dashboard Screen (Exact Structure)

```
┌─────────────────────────────────┐
│  Green header                   │
│  Hello, Ada 👋                  │
│  Good to have you back          │
│                    [Profile 👩] │
├─────────────────────────────────┤
│                                 │
│  Wallet Balance                 │
│  ₦12,450.00          👁         │
│  [ + Fund Wallet ]              │
│                                 │
│  Quick Services                 │
│  ┌────┐ ┌────┐ ┌────┐          │
│  │⚡  │ │📱  │ │📶  │          │
│  │Elec│ │Air │ │Data│          │
│  └────┘ └────┘ └────┘          │
│  ┌────┐ ┌────┐ ┌────┐          │
│  │WAEC│ │JAMB│ │NECO│          │
│  └────┘ └────┘ └────┘          │
│                                 │
│  ─────────────────────────────  │
│  🏠 Home  🕒 History  💬 Support 👤 Profile
└─────────────────────────────────┘
```

### Tailwind Code – Dashboard Screen

```html
<div class="w-[320px] h-[640px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-gray-900 relative">
  <!-- Status bar -->
  <div class="absolute top-0 left-0 right-0 h-8 bg-emerald-800 flex items-center justify-between px-6 text-white text-xs z-10">
    <span>9:41</span>
    <div class="flex gap-1 items-center">
      <span>📶</span>
      <span>🔋</span>
    </div>
  </div>

  <!-- Header -->
  <div class="bg-gradient-to-br from-emerald-700 to-emerald-800 pt-10 pb-6 px-5 text-white">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold flex items-center gap-1">Hello, Ada <span>👋</span></h1>
        <p class="text-emerald-200 text-sm">Good to have you back</p>
      </div>
      <img src="https://i.pravatar.cc/100?img=47" alt="Ada" class="w-12 h-12 rounded-full border-2 border-emerald-300 object-cover"/>
    </div>
  </div>

  <!-- Balance Card -->
  <div class="px-5 -mt-4">
    <div class="bg-white rounded-2xl shadow-lg p-5 border border-emerald-50">
      <p class="text-sm text-gray-500">Wallet Balance</p>
      <div class="flex items-center justify-between mt-1">
        <h2 class="text-2xl font-bold text-emerald-900 tracking-tight">₦12,450.00</h2>
        <button class="text-gray-400 hover:text-emerald-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        </button>
      </div>
      <button class="mt-4 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition">
        <span class="text-lg">+</span> Fund Wallet
      </button>
    </div>
  </div>

  <!-- Quick Services -->
  <div class="px-5 mt-6">
    <h3 class="text-sm font-semibold text-gray-700 mb-3">Quick Services</h3>
    <div class="grid grid-cols-3 gap-3">
      <!-- Electricity -->
      <button class="bg-emerald-50 hover:bg-emerald-100 rounded-2xl p-4 flex flex-col items-center gap-2 transition">
        <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <span class="text-xs font-medium text-emerald-900">Electricity</span>
      </button>

      <!-- Airtime -->
      <button class="bg-emerald-50 hover:bg-emerald-100 rounded-2xl p-4 flex flex-col items-center gap-2 transition">
        <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
        </div>
        <span class="text-xs font-medium text-emerald-900">Airtime</span>
      </button>

      <!-- Data -->
      <button class="bg-emerald-50 hover:bg-emerald-100 rounded-2xl p-4 flex flex-col items-center gap-2 transition">
        <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>
        </div>
        <span class="text-xs font-medium text-emerald-900">Data</span>
      </button>

      <!-- WAEC -->
      <button class="bg-emerald-50 hover:bg-emerald-100 rounded-2xl p-4 flex flex-col items-center gap-2 transition">
        <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-xs">
          WAEC
        </div>
        <span class="text-xs font-medium text-emerald-900">WAEC</span>
      </button>

      <!-- JAMB -->
      <button class="bg-emerald-50 hover:bg-emerald-100 rounded-2xl p-4 flex flex-col items-center gap-2 transition">
        <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-xs">
          JAMB
        </div>
        <span class="text-xs font-medium text-emerald-900">JAMB</span>
      </button>

      <!-- NECO -->
      <button class="bg-emerald-50 hover:bg-emerald-100 rounded-2xl p-4 flex flex-col items-center gap-2 transition">
        <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-xs">
          NECO
        </div>
        <span class="text-xs font-medium text-emerald-900">NECO</span>
      </button>
    </div>
  </div>

  <!-- Bottom Navigation -->
  <div class="absolute bottom-0 left-0 right-0 bg-white border-t border-emerald-50 px-2 py-3 flex justify-around">
    <button class="flex flex-col items-center gap-1 text-emerald-600">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
      <span class="text-[10px] font-medium">Home</span>
    </button>
    <button class="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <span class="text-[10px]">History</span>
    </button>
    <button class="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
      <span class="text-[10px]">Support</span>
    </button>
    <button class="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
      <span class="text-[10px]">Profile</span>
    </button>
  </div>
</div>
```

---

## 6. How to Use This File with Your Coding AI

Copy this entire Markdown file and paste it into Cursor / OpenCode / Claude with this prompt:

> **“Build the exact zPay Login and Dashboard screens described in this file using Tailwind CSS.  
> Do not change colors, spacing, layout, or component structure.  
> Match the design 1:1. Use the provided HTML + Tailwind code as the source of truth.”**

---

## 7. Logo SVG (copy-paste ready)

```svg
<svg width="240" height="72" viewBox="0 0 240 72" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="36" cy="36" r="28" fill="#ECFDF5"/>
  <path d="M18 18 H52 L30 36 L54 54 H18 L40 36 Z" fill="#059669" stroke="#047857" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M46 14 C52 8 60 12 56 20 C52 16 48 16 46 14Z" fill="#10B981"/>
  <text x="72" y="46" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="32" fill="#064E3B">zPay</text>
</svg>
```

---

**Files created:**
- `zPay-Logo.svg`
- `zPay-UI-Design-Spec.md`

You now have everything needed for your coding tool to reproduce this exact design.
