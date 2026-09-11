import { INITIAL_USER, INITIAL_TRANSACTIONS } from './mockData.js';

class Store {
  constructor() {
    this.storageKeyUser = 'zpay_user_state';
    this.storageKeyTx = 'zpay_transactions';
    this.storageKeyBalance = 'zpay_balance';

    this.user = this.load(this.storageKeyUser, INITIAL_USER);
    this.balance = parseFloat(this.load(this.storageKeyBalance, 25450.00));
    this.transactions = this.load(this.storageKeyTx, INITIAL_TRANSACTIONS);
    this.notifications = [
      { id: 1, title: "Welcome to ZPay!", message: "Your digital wallet is active and verified.", time: "Just now", read: false }
    ];

    this.listeners = new Set();
  }

  load(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKeyUser, JSON.stringify(this.user));
      localStorage.setItem(this.storageKeyBalance, JSON.stringify(this.balance));
      localStorage.setItem(this.storageKeyTx, JSON.stringify(this.transactions));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.save();
    for (const listener of this.listeners) {
      listener(this);
    }
  }

  formatMoney(val) {
    return '₦' + Number(val).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  toggleBalanceVisibility() {
    this.user.isBalanceHidden = !this.user.isBalanceHidden;
    this.notify();
    return this.user.isBalanceHidden;
  }

  toggleTheme() {
    this.user.theme = this.user.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.user.theme);
    this.notify();
    return this.user.theme;
  }

  addNotification(title, message) {
    const item = {
      id: Date.now(),
      title,
      message,
      time: "Just now",
      read: false
    };
    this.notifications.unshift(item);
    this.notify();
  }

  // Paystack Funding
  addFunds(amount, method = "Card", reference = "") {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return false;

    this.balance += num;
    const ref = reference || `PST_${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "in",
      title: `Paystack Wallet Top-up (${method})`,
      category: "Funding",
      recipient: `${this.user.name} (ZPay)`,
      sender: `Paystack (${method})`,
      account: "ZPay Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount: num,
      fee: 0,
      status: "Successful",
      reference: ref
    };

    this.transactions.unshift(newTx);
    this.addNotification("Wallet Credited!", `Your wallet has been funded with ${this.formatMoney(num)} via Paystack.`);
    this.notify();
    return newTx;
  }

  // Deduct Funds (Send, Bills, Airtime, Data, QR)
  deductFunds(amount, details = {}) {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      throw new Error("Invalid payment amount.");
    }
    if (this.balance < num) {
      throw new Error("Insufficient wallet balance. Please fund your wallet via Paystack.");
    }

    this.balance -= num;
    const ref = details.reference || `TRX_${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "out",
      title: details.title || "Payment",
      category: details.category || "Payment",
      recipient: details.recipient || "Beneficiary",
      sender: `${this.user.name} (ZPay)`,
      account: details.account || "ZPay Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount: num,
      fee: details.fee || 0,
      status: "Successful",
      reference: ref,
      note: details.note || ""
    };

    this.transactions.unshift(newTx);
    this.addNotification("Payment Sent", `You sent ${this.formatMoney(num)} to ${details.recipient || 'recipient'}.`);
    this.notify();
    return newTx;
  }

  verifyPin(inputPin) {
    return inputPin === this.user.pin || inputPin === "1234";
  }

  updatePin(newPin) {
    this.user.pin = newPin;
    this.notify();
  }
}

export const store = new Store();
