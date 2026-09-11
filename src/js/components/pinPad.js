import { store } from '../state/store.js';
import { showToast } from './notifications.js';

export function requestPinAuthorization({ title = "Enter Transaction PIN", amount = null, onSuccess, onCancel }) {
  let pin = "";
  
  const backdrop = document.createElement('div');
  backdrop.className = 'zpay-modal-backdrop';
  backdrop.id = 'pin-modal-backdrop';

  backdrop.innerHTML = `
    <div class="zpay-bottom-sheet" style="max-width: 380px;">
      <div class="zpay-sheet-handle"></div>
      <div style="text-align: center; margin-bottom: 8px;">
        <h3 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">${title}</h3>
        ${amount ? `<p style="font-size: 22px; font-weight: 800; color: var(--zpay-green); margin-top: 4px;">${store.formatMoney(amount)}</p>` : ''}
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Enter your 4-digit security PIN (Default: 1234)</p>
      </div>

      <div class="pin-pad-dots" id="pin-dots">
        <div class="pin-dot"></div>
        <div class="pin-dot"></div>
        <div class="pin-dot"></div>
        <div class="pin-dot"></div>
      </div>

      <div class="pin-keypad">
        <button class="pin-key" data-num="1">1</button>
        <button class="pin-key" data-num="2">2</button>
        <button class="pin-key" data-num="3">3</button>
        <button class="pin-key" data-num="4">4</button>
        <button class="pin-key" data-num="5">5</button>
        <button class="pin-key" data-num="6">6</button>
        <button class="pin-key" data-num="7">7</button>
        <button class="pin-key" data-num="8">8</button>
        <button class="pin-key" data-num="9">9</button>
        <button class="pin-key key-action" id="pin-biometric" title="Use Biometrics">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
        </button>
        <button class="pin-key" data-num="0">0</button>
        <button class="pin-key key-action" id="pin-backspace" title="Delete">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>
        </button>
      </div>

      <div style="margin-top: 20px; text-align: center;">
        <button class="zpay-btn zpay-btn-ghost zpay-btn-sm" id="pin-cancel-btn">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  const dots = backdrop.querySelectorAll('.pin-dot');

  function updateDots() {
    dots.forEach((dot, index) => {
      if (index < pin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
  }

  function handleCheckPin() {
    if (pin.length === 4) {
      if (store.verifyPin(pin)) {
        closeModal();
        if (onSuccess) onSuccess(pin);
      } else {
        // Shake error
        const dotsContainer = backdrop.querySelector('#pin-dots');
        dotsContainer.style.transform = 'translateX(10px)';
        setTimeout(() => dotsContainer.style.transform = 'translateX(-10px)', 80);
        setTimeout(() => dotsContainer.style.transform = 'translateX(8px)', 160);
        setTimeout(() => dotsContainer.style.transform = 'translateX(0)', 240);
        showToast("Incorrect PIN. Please try again or use 1234.", "error");
        pin = "";
        updateDots();
      }
    }
  }

  backdrop.querySelectorAll('.pin-key[data-num]').forEach(button => {
    button.addEventListener('click', () => {
      if (pin.length < 4) {
        pin += button.getAttribute('data-num');
        updateDots();
        if (pin.length === 4) {
          setTimeout(handleCheckPin, 150);
        }
      }
    });
  });

  backdrop.querySelector('#pin-backspace').addEventListener('click', () => {
    if (pin.length > 0) {
      pin = pin.slice(0, -1);
      updateDots();
    }
  });

  // Biometric Fast Pass
  backdrop.querySelector('#pin-biometric').addEventListener('click', () => {
    showToast("Biometric Authenticated via TouchID / FaceID ✅");
    closeModal();
    if (onSuccess) onSuccess("biometric");
  });

  function closeModal() {
    backdrop.remove();
  }

  backdrop.querySelector('#pin-cancel-btn').addEventListener('click', () => {
    closeModal();
    if (onCancel) onCancel();
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeModal();
      if (onCancel) onCancel();
    }
  });
}
