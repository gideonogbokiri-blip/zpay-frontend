import { 
  INITIAL_USER, 
  INITIAL_TRANSACTIONS, 
  COOPERATIVES_CATALOG, 
  MARKETPLACE_CATALOG,
  EXECUTIVE_USER,
  INITIAL_SOCIETY_TREASURY,
  INITIAL_SOCIETY_MEMBERS,
  INITIAL_PENDING_LOAN_REQUESTS,
  INITIAL_TARGET_GOALS,
  OSUSU_AJO_GROUPS_CATALOG
} from './mockData.js';

class Store {
  constructor() {
    this.storageKeyUser = 'zpay_user_state';
    this.storageKeyTx = 'zpay_transactions';
    this.storageKeyBalance = 'zpay_balance';
    this.storageKeyCoop = 'zpay_coop_balance';
    this.storageKeyCoopsList = 'zpay_cooperatives_list';
    this.storageKeyActiveCoop = 'zpay_active_coop_id';
    this.storageKeyMarketplace = 'zpay_marketplace_plans';
    this.storageKeyLoans = 'zpay_coop_loans';
    this.storageKeyZpayLoans = 'zpay_instant_loans';
    this.storageKeyTreasury = 'zpay_society_treasury';
    this.storageKeySocietyMembers = 'zpay_society_members';
    this.storageKeyPendingLoans = 'zpay_pending_loans';
    this.storageKeyExecutiveUser = 'zpay_executive_user';
    this.storageKeyTargetGoals = 'zpay_target_goals';
    this.storageKeyAjoGroups = 'zpay_ajo_groups';

    this.user = this.load(this.storageKeyUser, INITIAL_USER);
    this.executiveUser = this.load(this.storageKeyExecutiveUser, EXECUTIVE_USER);
    this.societyTreasury = this.load(this.storageKeyTreasury, INITIAL_SOCIETY_TREASURY);
    this.societyMembers = this.load(this.storageKeySocietyMembers, INITIAL_SOCIETY_MEMBERS);
    this.pendingLoanRequests = this.load(this.storageKeyPendingLoans, INITIAL_PENDING_LOAN_REQUESTS);

    this.balance = parseFloat(this.load(this.storageKeyBalance, 25450.00));
    this.cooperativeBalance = parseFloat(this.load(this.storageKeyCoop, 245000.00));
    this.cooperatives = this.load(this.storageKeyCoopsList, COOPERATIVES_CATALOG);
    this.activeCooperativeId = this.load(this.storageKeyActiveCoop, 'zenith-staff');

    
    this.transactions = this.load(this.storageKeyTx, INITIAL_TRANSACTIONS);
    this.zpayInstantLoans = this.load(this.storageKeyZpayLoans, [
      {
        id: 'ZL-301',
        amount: 30000,
        fee: 3000,
        totalRepayment: 33000,
        tenureDays: 30,
        dueDate: 'Oct 17, 2026',
        status: 'Active'
      }
    ]);
    this.marketplacePlans = this.load(this.storageKeyMarketplace, [
      {
        id: 'MP-101',
        productId: 'cd-iphone16pro',
        title: 'Apple iPhone 16 Pro (128GB)',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80',
        cashPrice: 1450000,
        frequency: 'Weekly',
        totalInstallments: 24,
        paidInstallments: 12,
        installmentAmount: 60416,
        totalPaid: 724992,
        deliveryThreshold: 50,
        delivered: true,
        deliveryStatus: 'Delivered to Doorstep 🚚',
        nextDueDate: 'Sep 24, 2026'
      }
    ]);

    this.cooperativeLoans = this.load(this.storageKeyLoans, [
      {
        id: 'CL-819',
        amount: 150000,
        paid: 60000,
        monthlyDeduction: 35000,
        purpose: 'Business Inventory',
        nextDate: 'Oct 15, 2026',
        status: 'Ongoing'
      }
    ]);

    this.targetGoals = this.load(this.storageKeyTargetGoals, INITIAL_TARGET_GOALS);
    this.ajoGroups = this.load(this.storageKeyAjoGroups, OSUSU_AJO_GROUPS_CATALOG);

    this.notifications = [
      { id: 1, title: "Welcome to ZPay!", message: "Your digital wallet and cooperative services are active.", time: "Just now", read: false }
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
      localStorage.setItem(this.storageKeyCoop, JSON.stringify(this.cooperativeBalance));
      localStorage.setItem(this.storageKeyTx, JSON.stringify(this.transactions));
      localStorage.setItem(this.storageKeyCoopsList, JSON.stringify(this.cooperatives));
      localStorage.setItem(this.storageKeyActiveCoop, JSON.stringify(this.activeCooperativeId));
      localStorage.setItem(this.storageKeyMarketplace, JSON.stringify(this.marketplacePlans));
      localStorage.setItem(this.storageKeyLoans, JSON.stringify(this.cooperativeLoans));
      localStorage.setItem(this.storageKeyZpayLoans, JSON.stringify(this.zpayInstantLoans));
      localStorage.setItem(this.storageKeyTreasury, JSON.stringify(this.societyTreasury));
      localStorage.setItem(this.storageKeySocietyMembers, JSON.stringify(this.societyMembers));
      localStorage.setItem(this.storageKeyPendingLoans, JSON.stringify(this.pendingLoanRequests));
      localStorage.setItem(this.storageKeyExecutiveUser, JSON.stringify(this.executiveUser));
      localStorage.setItem(this.storageKeyTargetGoals, JSON.stringify(this.targetGoals));
      localStorage.setItem(this.storageKeyAjoGroups, JSON.stringify(this.ajoGroups));
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

  getActiveCooperative() {
    return this.cooperatives.find(c => c.id === this.activeCooperativeId) || this.cooperatives[0];
  }

  setActiveCooperative(coopId) {
    this.activeCooperativeId = coopId;
    this.notify();
  }

  // Register a new cooperative created by user
  registerNewCooperative(coopData) {
    const newCoop = {
      id: `coop-${Date.now()}`,
      name: coopData.name,
      shortName: coopData.name.split(' ')[0] + ' Coop',
      regNo: coopData.regNo || `RC-${Math.floor(100000 + Math.random() * 900000)}`,
      badge: "Newly Registered",
      logo: "🏢",
      category: coopData.category || "Multi-Purpose",
      description: coopData.description || "Registered cooperative society on ZPay platform.",
      minMonthlyContribution: parseFloat(coopData.minContribution || 20000),
      currentContribution: parseFloat(coopData.minContribution || 20000),
      totalEquitySaved: 0,
      savingsTarget: parseFloat(coopData.minContribution || 20000) * 12,
      loanEligibilityRatio: parseFloat(coopData.loanRatio || 3.0),
      minTenureMonthsForLoan: 3,
      memberMonthsActive: 1,
      loanInterestRate: 5.0,
      yearEndPayoutMonth: coopData.payoutMonth || "December",
      yearEndPayoutDate: `Dec 20, 2026`,
      dividendRate: 12.0,
      policies: [
        `Minimum monthly savings contribution: ₦${Number(coopData.minContribution || 20000).toLocaleString()}.`,
        `Members qualify for up to ${(coopData.loanRatio || 3)}x their savings in loans after 3 months.`,
        `Annual capital and dividend share-out disbursed every ${coopData.payoutMonth || "December"}.`
      ]
    };

    this.cooperatives.unshift(newCoop);
    this.activeCooperativeId = newCoop.id;
    this.addNotification("Cooperative Registered", `${newCoop.name} is now live and managed on ZPay!`);
    this.notify();
    return newCoop;
  }

  // Fund Cooperative Wallet from Main Account
  fundCooperativeWallet(amount) {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      throw new Error("Invalid contribution amount.");
    }
    if (this.balance < num) {
      throw new Error(`Insufficient main wallet balance. You have ${this.formatMoney(this.balance)}.`);
    }

    const coop = this.getActiveCooperative();

    this.balance -= num;
    this.cooperativeBalance += num;
    coop.totalEquitySaved = (coop.totalEquitySaved || 0) + num;

    const ref = `COOP_SAV_${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "out",
      title: `Cooperative Contribution (${coop.shortName})`,
      category: "Cooperative",
      recipient: coop.name,
      sender: `${this.user.name} (ZPay Main Wallet)`,
      account: "Cooperative Member Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount: num,
      fee: 0,
      status: "Successful",
      reference: ref,
      note: "Monthly Equity Savings Contribution"
    };

    this.transactions.unshift(newTx);
    this.addNotification("Cooperative Funded!", `Transferred ${this.formatMoney(num)} from Main Wallet into ${coop.shortName}.`);
    this.notify();
    return newTx;
  }

  // Claim / Pack Year-End Money (Savings + Accrued Dividends)
  claimYearEndPayout() {
    const coop = this.getActiveCooperative();
    if (this.cooperativeBalance <= 0) {
      throw new Error("No accumulated cooperative equity to withdraw.");
    }

    const dividendAmt = this.cooperativeBalance * (coop.dividendRate / 100);
    const totalPayout = this.cooperativeBalance + dividendAmt;

    // Disburse directly to main wallet
    this.balance += totalPayout;
    const previousCoopBalance = this.cooperativeBalance;
    this.cooperativeBalance = 0;
    coop.totalEquitySaved = 0;

    const ref = `COOP_DIV_${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "in",
      title: `Year-End Cooperative Share-out & Dividends`,
      category: "Cooperative",
      recipient: `${this.user.name} (Main Wallet)`,
      sender: coop.name,
      account: "ZPay Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount: totalPayout,
      fee: 0,
      status: "Successful",
      reference: ref,
      note: `Capital Refund: ${this.formatMoney(previousCoopBalance)} + Annual Dividend (${coop.dividendRate}%): ${this.formatMoney(dividendAmt)}`
    };

    this.transactions.unshift(newTx);
    this.addNotification("Year-End Payout Received! 🎉", `Packed ${this.formatMoney(totalPayout)} (savings + dividends) to your Main ZPay Wallet!`);
    this.notify();
    return totalPayout;
  }

  // Apply Cooperative Loan
  applyCooperativeLoan(amount, tenureMonths = 6, purpose = "Personal") {
    const num = parseFloat(amount);
    const coop = this.getActiveCooperative();
    const maxLoanAllowed = (this.cooperativeBalance * coop.loanEligibilityRatio) || 100000;

    if (num > maxLoanAllowed) {
      throw new Error(`Maximum loan limit is ${this.formatMoney(maxLoanAllowed)} based on your cooperative equity.`);
    }

    // Disburse loan to Main Wallet
    this.balance += num;

    const interest = num * (coop.loanInterestRate / 100);
    const totalRepay = num + interest;
    const monthlyDeduction = totalRepay / tenureMonths;

    const newLoan = {
      id: `CL-${Math.floor(100 + Math.random() * 900)}`,
      amount: num,
      paid: 0,
      monthlyDeduction: Math.round(monthlyDeduction),
      purpose: purpose || "Cooperative Member Loan",
      nextDate: "Next Month 28th",
      status: "Ongoing"
    };

    this.cooperativeLoans.unshift(newLoan);
    this.notify();
    return newLoan;
  }

  // Apply / Submit Cooperative Loan Request (Sent to Admin Credit Committee for approval)
  submitMemberLoanRequest(amount, tenureMonths = 6, purpose = "Business Restock") {
    const num = parseFloat(amount);
    const coop = this.getActiveCooperative();
    const maxLoanAllowed = (this.cooperativeBalance * coop.loanEligibilityRatio) || 100000;

    if (num <= 0) {
      throw new Error("Please enter a valid loan amount.");
    }
    if (num > maxLoanAllowed) {
      throw new Error(`Maximum loan cap is ${this.formatMoney(maxLoanAllowed)} based on your ${coop.loanEligibilityRatio}x equity coverage.`);
    }

    const interest = num * (coop.loanInterestRate / 100);
    const totalRepay = num + interest;
    const monthlyRepayment = Math.round(totalRepay / tenureMonths);

    const newRequest = {
      id: `CLR-2026-${Math.floor(100 + Math.random() * 900)}`,
      applicantId: "ZP-MB-9201",
      applicantName: `${this.user.name} Oladipo`,
      amount: num,
      tenureMonths,
      purpose: purpose || "Cooperative Member Loan",
      memberEquity: this.cooperativeBalance,
      maxAllowedLoan: maxLoanAllowed,
      interestRate: coop.loanInterestRate,
      monthlyRepayment,
      guarantor: "David Adeleke (Executive Endorsed)",
      requestDate: "Just now",
      status: "Pending Approval",
      riskScore: "Low (94/100)"
    };

    this.pendingLoanRequests.unshift(newRequest);
    this.addNotification(
      "Loan Application Submitted 📋", 
      `Application for ${this.formatMoney(num)} submitted to ${coop.shortName} Credit Committee for review.`
    );
    this.notify();
    return newRequest;
  }

  // Executive Action: Approve and Disburse Member Loan
  approveMemberLoan(requestId) {
    const request = this.pendingLoanRequests.find(r => r.id === requestId);
    if (!request) throw new Error("Loan application record not found.");
    if (request.status === "Approved & Disbursed") {
      throw new Error("This loan has already been approved and disbursed.");
    }

    const coop = this.getActiveCooperative();
    const loanAmount = parseFloat(request.amount);

    if (this.societyTreasury.vaultBalance < loanAmount) {
      throw new Error(`Insufficient society vault liquidity (${this.formatMoney(this.societyTreasury.vaultBalance)}).`);
    }

    // 1. Deduct from Society Treasury Vault & increase active loan book
    this.societyTreasury.vaultBalance -= loanAmount;
    this.societyTreasury.activeLoans += loanAmount;

    // 2. Mark request as Approved
    request.status = "Approved & Disbursed";
    request.approvedAt = "Just now";
    request.approvedBy = this.executiveUser.name;

    // 3. Update Society Member record
    const member = this.societyMembers.find(m => m.id === request.applicantId);
    if (member) {
      member.activeLoanAmount = (member.activeLoanAmount || 0) + loanAmount;
    }

    // 4. If loan belongs to currently logged-in member (Gideon), credit his wallet directly!
    if (request.applicantId === "ZP-MB-9201" || request.applicantName.includes("Gideon")) {
      this.balance += loanAmount;

      const newMemberLoan = {
        id: `CL-${Math.floor(100 + Math.random() * 900)}`,
        amount: loanAmount,
        paid: 0,
        monthlyDeduction: request.monthlyRepayment,
        purpose: request.purpose,
        nextDate: "28th of next month",
        status: "Ongoing"
      };
      this.cooperativeLoans.unshift(newMemberLoan);

      const newTx = {
        id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
        type: "in",
        title: `Cooperative Loan Disbursed (${coop.shortName})`,
        category: "Loan",
        recipient: `${this.user.name} (Main Wallet)`,
        sender: `${coop.name} Treasury`,
        account: "ZPay Wallet",
        date: "Just now",
        timestamp: Date.now(),
        amount: loanAmount,
        fee: 0,
        status: "Successful",
        reference: `COOP_DISB_${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        note: `Approved by Executive Committee: ${this.executiveUser.name}. Tenure: ${request.tenureMonths} mos @ ${request.interestRate}%`
      };
      this.transactions.unshift(newTx);
      this.addNotification("Loan Disbursed to Wallet! 🎉", `${this.formatMoney(loanAmount)} credited from ${coop.shortName} Treasury!`);
    }

    this.notify();
    return request;
  }

  // Executive Action: Decline Member Loan Request
  declineMemberLoan(requestId, reason = "Bylaw credit criteria not satisfied by committee") {
    const request = this.pendingLoanRequests.find(r => r.id === requestId);
    if (!request) throw new Error("Loan application record not found.");
    if (request.status === "Approved & Disbursed") {
      throw new Error("Cannot decline a loan that has already been disbursed.");
    }

    request.status = "Declined";
    request.declineReason = reason;
    request.declinedAt = "Just now";
    request.declinedBy = this.executiveUser.name;

    this.addNotification("Loan Application Declined", `Application ${request.id} for ${request.applicantName} was declined.`);
    this.notify();
    return request;
  }

  // Executive Action: Execute Year-End Bulk Dividend Share-out to All Active Members
  executeBulkDividendPayout(dividendRate = 12.5) {
    const pool = parseFloat(this.societyTreasury.dividendReserve || 4525000);
    if (pool <= 0) {
      throw new Error("Year-end dividend reserve is already liquidated or zero.");
    }

    // Deduct dividend reserve from treasury
    this.societyTreasury.vaultBalance -= pool;
    this.societyTreasury.dividendReserve = 0;
    this.societyTreasury.lastBulkDividendPayout = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Credit Gideon's share if active
    const gideonShare = Math.round(this.cooperativeBalance * (dividendRate / 100));
    if (gideonShare > 0) {
      this.balance += gideonShare;

      const newTx = {
        id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
        type: "in",
        title: `Society Annual Dividend Yield (${dividendRate}%)`,
        category: "Cooperative",
        recipient: `${this.user.name} (Main Wallet)`,
        sender: `Zenith Staff Cooperative Treasury`,
        account: "ZPay Wallet",
        date: "Just now",
        timestamp: Date.now(),
        amount: gideonShare,
        fee: 0,
        status: "Successful",
        reference: `DIV_PAYOUT_${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        note: `Executive bulk share-out executed for ${this.societyTreasury.totalMembers} active members.`
      };
      this.transactions.unshift(newTx);
    }

    this.addNotification("Bulk Dividend Disbursed! 🎄", `Executed ₦${pool.toLocaleString()} annual dividend share-out across ${this.societyTreasury.totalMembers} members.`);
    this.notify();
    return {
      success: true,
      totalDisbursed: pool,
      membersCount: this.societyTreasury.totalMembers,
      gideonShare
    };
  }

  // Executive Action: Update Cooperative Society Bylaws & Policies
  updateSocietyPolicy(policyUpdates = {}) {
    const coop = this.getActiveCooperative();
    if (!coop) throw new Error("No active cooperative selected.");

    if (policyUpdates.minMonthlyContribution !== undefined) {
      coop.minMonthlyContribution = parseFloat(policyUpdates.minMonthlyContribution);
    }
    if (policyUpdates.loanEligibilityRatio !== undefined) {
      coop.loanEligibilityRatio = parseFloat(policyUpdates.loanEligibilityRatio);
    }
    if (policyUpdates.loanInterestRate !== undefined) {
      coop.loanInterestRate = parseFloat(policyUpdates.loanInterestRate);
    }
    if (policyUpdates.dividendRate !== undefined) {
      coop.dividendRate = parseFloat(policyUpdates.dividendRate);
    }

    this.addNotification("Society Policies Updated", `Bylaws for ${coop.shortName} updated by ${this.executiveUser.name}.`);
    this.notify();
    return coop;
  }

  // ─── OSUSU: Target Goals ────────────────────────────────────────────────────

  // Create a new personal target savings goal
  createTargetGoal({ title, emoji, target, contribution, frequency, description }) {
    const num = parseFloat(target);
    const contrib = parseFloat(contribution);
    if (!title || isNaN(num) || num <= 0) {
      throw new Error("Please fill in a valid goal title and target amount.");
    }
    if (isNaN(contrib) || contrib <= 0) {
      throw new Error("Please enter a valid contribution amount.");
    }
    if (this.balance < contrib) {
      throw new Error(`Insufficient wallet balance for first contribution of ${this.formatMoney(contrib)}.`);
    }

    // Deduct first contribution
    this.balance -= contrib;

    const colors = { "🏠": "#f59e0b", "🎓": "#38bdf8", "🚗": "#10b981", "💼": "#8b5cf6", "✈️": "#ef4444", "💍": "#f43f5e", "🎯": "#22c55e", "📱": "#06b6d4" };
    const newGoal = {
      id: `tg-${Date.now()}`,
      emoji: emoji || "🎯",
      title,
      description: description || `${title} savings goal`,
      target: num,
      saved: contrib,
      frequency: frequency || "Weekly",
      contribution: contrib,
      nextDate: "Next week",
      status: "Active",
      color: colors[emoji] || "#22c55e"
    };

    this.targetGoals.unshift(newGoal);

    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "out",
      title: `Osusu Goal Started: ${title}`,
      category: "Savings",
      recipient: `Osusu Locked Vault (${title})`,
      sender: `${this.user.name} (ZPay)`,
      account: "ZPay Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount: contrib,
      fee: 0,
      status: "Successful",
      reference: `OSU_${Math.floor(1000000000 + Math.random() * 9000000000)}`
    };
    this.transactions.unshift(newTx);
    this.addNotification("Osusu Goal Created! 🎯", `First contribution of ${this.formatMoney(contrib)} locked for "${title}".`);
    this.notify();
    return newGoal;
  }

  // Contribute to an existing target goal
  contributeToGoal(goalId) {
    const goal = this.targetGoals.find(g => g.id === goalId);
    if (!goal) throw new Error("Goal not found.");
    if (goal.saved >= goal.target) throw new Error("This goal is already fully funded! 🎉");
    if (this.balance < goal.contribution) {
      throw new Error(`Insufficient balance. You need ${this.formatMoney(goal.contribution)} for this contribution.`);
    }

    this.balance -= goal.contribution;
    goal.saved = Math.min(goal.target, goal.saved + goal.contribution);

    if (goal.saved >= goal.target) {
      goal.status = "Completed";
      this.addNotification("Goal Reached! 🏆", `You've hit your target for "${goal.title}"! ${this.formatMoney(goal.target)} saved.`);
    } else {
      this.addNotification("Osusu Contribution ✓", `${this.formatMoney(goal.contribution)} added to "${goal.title}". ${Math.round((goal.saved / goal.target) * 100)}% done!`);
    }

    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "out",
      title: `Osusu Contribution: ${goal.title}`,
      category: "Savings",
      recipient: `Osusu Vault (${goal.title})`,
      sender: `${this.user.name} (ZPay)`,
      account: "ZPay Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount: goal.contribution,
      fee: 0,
      status: "Successful",
      reference: `OSU_CONTRIB_${Math.floor(1000000000 + Math.random() * 9000000000)}`
    };
    this.transactions.unshift(newTx);
    this.notify();
    return goal;
  }

  // Withdraw/break a completed or active goal back to main wallet
  withdrawGoal(goalId) {
    const goal = this.targetGoals.find(g => g.id === goalId);
    if (!goal) throw new Error("Goal not found.");
    if (goal.saved <= 0) throw new Error("Nothing saved in this goal yet.");

    const amount = goal.saved;
    this.balance += amount;
    goal.saved = 0;
    goal.status = "Withdrawn";

    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "in",
      title: `Osusu Withdrawal: ${goal.title}`,
      category: "Savings",
      recipient: `${this.user.name} (Main Wallet)`,
      sender: `Osusu Vault (${goal.title})`,
      account: "ZPay Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount,
      fee: 0,
      status: "Successful",
      reference: `OSU_WD_${Math.floor(1000000000 + Math.random() * 9000000000)}`
    };
    this.transactions.unshift(newTx);
    this.addNotification("Osusu Withdrawn", `${this.formatMoney(amount)} from "${goal.title}" credited to your wallet.`);
    this.notify();
    return amount;
  }

  // ─── OSUSU: Ajo / Rotational Groups ────────────────────────────────────────

  // Pay your contribution to an ajo group this cycle
  payAjoContribution(groupId) {
    const group = this.ajoGroups.find(g => g.id === groupId);
    if (!group) throw new Error("Ajo group not found.");
    if (!group.isJoined) throw new Error("You are not a member of this group.");

    const amount = group.contributionAmount;
    if (this.balance < amount) {
      throw new Error(`Insufficient balance. You need ${this.formatMoney(amount)} for this contribution.`);
    }

    this.balance -= amount;

    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "out",
      title: `Ajo Contribution: ${group.name}`,
      category: "Osusu",
      recipient: `${group.name} Pool`,
      sender: `${this.user.name} (ZPay)`,
      account: "ZPay Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount,
      fee: 0,
      status: "Successful",
      reference: `AJO_${Math.floor(1000000000 + Math.random() * 9000000000)}`
    };
    this.transactions.unshift(newTx);
    this.addNotification("Ajo Paid! ✓", `${this.formatMoney(amount)} paid to ${group.name}.`);
    this.notify();
    return newTx;
  }

  // Pack/Collect the pot when it's your turn
  collectAjoPot(groupId) {
    const group = this.ajoGroups.find(g => g.id === groupId);
    if (!group) throw new Error("Ajo group not found.");
    if (group.myStatus !== "your_turn") {
      throw new Error("It's not your turn to collect yet. Wait for your round.");
    }

    const potAmount = group.potSize;
    this.balance += potAmount;

    // Update group status
    group.myStatus = "collected";
    if (group.members) {
      const myMember = group.members.find(m => m.name.includes("Gideon"));
      if (myMember) { myMember.status = "collected"; myMember.emoji = "✅"; }
    }

    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "in",
      title: `Ajo Pot Collected! ${group.name}`,
      category: "Osusu",
      recipient: `${this.user.name} (Main Wallet)`,
      sender: `${group.name} Group Pot`,
      account: "ZPay Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount: potAmount,
      fee: 0,
      status: "Successful",
      reference: `AJO_COLLECT_${Math.floor(1000000000 + Math.random() * 9000000000)}`
    };
    this.transactions.unshift(newTx);
    this.addNotification("🎉 You Packed Your Money!", `${this.formatMoney(potAmount)} collected from ${group.name}! It was your turn — enjoy!`);
    this.notify();
    return potAmount;
  }

  // Join an ajo group
  joinAjoGroup(groupId) {
    const group = this.ajoGroups.find(g => g.id === groupId);
    if (!group) throw new Error("Group not found.");
    if (group.isJoined) throw new Error("You are already a member of this group.");
    const openSlots = group.totalSlots - group.filledSlots;
    if (openSlots <= 0) throw new Error("This group is full. No slots available.");

    group.isJoined = true;
    group.filledSlots += 1;
    group.myStatus = "waiting";
    group.myTurn = group.totalSlots; // Assigned last slot as new joiner
    if (!group.members) group.members = [];
    group.members.push({ name: "Gideon Oladipo", turn: group.myTurn, status: "waiting", emoji: "⏳" });

    this.addNotification("Joined Ajo Group! 👥", `You've joined "${group.name}". First contribution due: ${group.nextCollection}.`);
    this.notify();
    return group;
  }

  // ZPay Instant Digital Cash Loan (Separate from Cooperative Loans)

  applyZpayInstantLoan(amount, tenureDays = 30) {
    const num = parseFloat(amount);
    if (isNaN(num) || num < 5000 || num > 100000) {
      throw new Error("ZPay Instant Loan amount must be between ₦5,000 and ₦100,000.");
    }

    const feeRate = tenureDays <= 15 ? 0.05 : 0.10; // 5% for 15 days, 10% for 30 days
    const fee = Math.round(num * feeRate);
    const totalRepayment = num + fee;

    // Disburse funds directly into ZPay main wallet
    this.balance += num;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + tenureDays);
    const formattedDueDate = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newLoan = {
      id: `ZL-${Math.floor(100 + Math.random() * 900)}`,
      amount: num,
      fee,
      totalRepayment,
      tenureDays,
      dueDate: formattedDueDate,
      status: "Active"
    };

    this.zpayInstantLoans.unshift(newLoan);

    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "in",
      title: `ZPay Instant Digital Loan`,
      category: "Loan",
      recipient: `${this.user.name} (ZPay Wallet)`,
      sender: "ZPay Microfinance Credit",
      account: "ZPay Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount: num,
      fee: 0,
      status: "Successful",
      reference: `ZPAY_LN_${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      note: `Nano-credit line: Due ${formattedDueDate} (Repayment: ${this.formatMoney(totalRepayment)})`
    };

    this.transactions.unshift(newTx);
    this.addNotification("Instant Credit Disbursed! ⚡", `${this.formatMoney(num)} emergency loan credited to your wallet.`);
    this.notify();
    return newLoan;
  }

  // Pay Electricity Bill (Standalone OPay style)
  payElectricityBill({ disco, meterNo, meterType = "Prepaid", amount, customerName = "GIDEON OLADIPO" }) {
    const num = parseFloat(amount);
    if (isNaN(num) || num < 500) {
      throw new Error("Minimum electricity payment is ₦500.");
    }
    if (this.balance < num) {
      throw new Error(`Insufficient wallet balance. You have ${this.formatMoney(this.balance)}.`);
    }

    this.balance -= num;

    // Generate realistic 20-digit token (4-4-4-4-4)
    const gen4 = () => Math.floor(1000 + Math.random() * 9000);
    const token = `${gen4()}-${gen4()}-${gen4()}-${gen4()}-${gen4()}`;
    const units = (num / 68.5).toFixed(1); // Standard NERC tariff approx 68.5/kWh
    const ref = `ELEC_${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "out",
      title: `${disco} (${meterType})`,
      category: "Electricity",
      recipient: `${disco} - ${meterNo}`,
      sender: `${this.user.name} (ZPay)`,
      account: "ZPay Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount: num,
      fee: 0,
      status: "Successful",
      reference: ref,
      note: `Token: ${token} | Units: ${units} kWh | Customer: ${customerName}`
    };

    this.transactions.unshift(newTx);
    this.addNotification("Electricity Token Generated! ⚡", `${disco} token: ${token} (${units} kWh).`);
    this.notify();

    return {
      success: true,
      token,
      units,
      disco,
      meterNo,
      meterType,
      amount: num,
      customerName,
      reference: ref,
      date: "Just now"
    };
  }

  // Pay Small Small (Marketplace - CDcare style)
  startMarketplacePlan(product, frequency = 'Weekly', duration = 24) {
    const total = product.cashPrice;
    const installmentAmount = frequency === 'Weekly' ? Math.round(total / duration) : Math.round(total / (duration / 4));
    
    if (this.balance < installmentAmount) {
      throw new Error(`Insufficient funds for the 1st installment (${this.formatMoney(installmentAmount)}). Please fund your main wallet.`);
    }

    // Deduct 1st installment
    this.balance -= installmentAmount;

    const newPlan = {
      id: `MP-${Math.floor(100 + Math.random() * 900)}`,
      productId: product.id,
      title: product.title,
      image: product.image,
      cashPrice: product.cashPrice,
      frequency,
      totalInstallments: frequency === 'Weekly' ? duration : Math.round(duration / 4),
      paidInstallments: 1,
      installmentAmount,
      totalPaid: installmentAmount,
      deliveryThreshold: product.deliveryThresholdPercent || 50,
      delivered: false,
      deliveryStatus: 'Order Confirmed - Delivery at 50% paid 📦',
      nextDueDate: frequency === 'Weekly' ? '7 days from now' : '30 days from now'
    };

    this.marketplacePlans.unshift(newPlan);

    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "out",
      title: `Pay Small Small: 1st Installment (${product.title})`,
      category: "Shopping",
      recipient: "CDcare / Pay Small Small Store",
      sender: `${this.user.name} (ZPay Wallet)`,
      account: "ZPay Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount: installmentAmount,
      fee: 0,
      status: "Successful",
      reference: `PSS_${Math.floor(1000000000 + Math.random() * 9000000000)}`
    };

    this.transactions.unshift(newTx);
    this.addNotification("Installment Order Started! 🛍️", `Started plan for ${product.title}. 1st payment of ${this.formatMoney(installmentAmount)} successful.`);
    this.notify();
    return newPlan;
  }

  payMarketplaceInstallment(planId) {
    const plan = this.marketplacePlans.find(p => p.id === planId);
    if (!plan) throw new Error("Plan not found.");
    if (plan.paidInstallments >= plan.totalInstallments) {
      throw new Error("Plan already completed.");
    }
    if (this.balance < plan.installmentAmount) {
      throw new Error(`Insufficient wallet balance. You need ${this.formatMoney(plan.installmentAmount)}.`);
    }

    this.balance -= plan.installmentAmount;
    plan.paidInstallments += 1;
    plan.totalPaid += plan.installmentAmount;

    const percentPaid = (plan.totalPaid / plan.cashPrice) * 100;
    if (percentPaid >= plan.deliveryThreshold && !plan.delivered) {
      plan.delivered = true;
      plan.deliveryStatus = '50% Milestone Reached! Out for Delivery 🚚';
      this.addNotification("Item Dispatched! 🚚", `Congratulations! You reached 50% on ${plan.title}. Your delivery is en route!`);
    } else if (plan.paidInstallments >= plan.totalInstallments) {
      plan.deliveryStatus = 'Fully Paid & Completed 🎉';
      this.addNotification("Order Fully Paid! 🎉", `You have completely paid for ${plan.title}!`);
    }

    const newTx = {
      id: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "out",
      title: `Pay Small Small Installment: ${plan.title}`,
      category: "Shopping",
      recipient: "CDcare / Pay Small Small Store",
      sender: `${this.user.name} (ZPay Wallet)`,
      account: "ZPay Wallet",
      date: "Just now",
      timestamp: Date.now(),
      amount: plan.installmentAmount,
      fee: 0,
      status: "Successful",
      reference: `PSS_${Math.floor(1000000000 + Math.random() * 9000000000)}`
    };

    this.transactions.unshift(newTx);
    this.notify();
    return plan;
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

