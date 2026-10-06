// Initial mock data and catalogs

export const INITIAL_USER = {
  name: "Gideon",
  tag: "@gideon_zpay",
  phone: "0812 345 6789",
  email: "gideon@zpay.ng",
  accountNumber: "7028194012",
  bankName: "ZPay Microfinance Bank",
  tier: "Tier 2 Verified",
  pin: "1234",
  biometricsEnabled: true,
  theme: "dark",
  isBalanceHidden: false
};

export const INITIAL_TRANSACTIONS = [
  {
    id: "ZP-849201",
    type: "out",
    title: "Transfer to John Doe",
    category: "Transfer",
    recipient: "John Doe",
    sender: "Gideon (ZPay)",
    account: "GTBank •••• 8291",
    date: "Yesterday, 4:32 PM",
    timestamp: Date.now() - 86400000,
    amount: 5000,
    fee: 0,
    status: "Successful",
    reference: "TRX_9201948271"
  },
  {
    id: "ZP-849182",
    type: "in",
    title: "Paystack Wallet Top-up",
    category: "Funding",
    recipient: "Gideon (ZPay)",
    sender: "Paystack (Card •••• 4242)",
    account: "ZPay Wallet",
    date: "2 days ago, 11:15 AM",
    timestamp: Date.now() - 172800000,
    amount: 20000,
    fee: 0,
    status: "Successful",
    reference: "PST_8192837190"
  },
  {
    id: "ZP-849091",
    type: "out",
    title: "MTN Airtime Purchase",
    category: "Airtime",
    recipient: "0803 123 4567",
    sender: "Gideon (ZPay)",
    account: "MTN Nigeria",
    date: "3 days ago, 08:20 PM",
    timestamp: Date.now() - 259200000,
    amount: 1000,
    fee: 0,
    status: "Successful",
    reference: "ART_7162534189"
  },
  {
    id: "ZP-848972",
    type: "out",
    title: "DStv Compact Subscription",
    category: "Bills",
    recipient: "DStv Nigeria",
    sender: "Gideon (ZPay)",
    account: "Smartcard •••• 9301",
    date: "5 days ago, 02:45 PM",
    timestamp: Date.now() - 432000000,
    amount: 12500,
    fee: 0,
    status: "Successful",
    reference: "BIL_5019283746"
  },
  {
    id: "ZP-848810",
    type: "in",
    title: "Payment from Sarah Connor",
    category: "Transfer",
    recipient: "Gideon (ZPay)",
    sender: "Sarah Connor (@sarah_c)",
    account: "ZPay Tag",
    date: "1 week ago, 01:10 PM",
    timestamp: Date.now() - 604800000,
    amount: 10000,
    fee: 0,
    status: "Successful",
    reference: "TRX_1092837465"
  }
];

export const NIGERIAN_BANKS = [
  { id: "gtb", name: "Guaranty Trust Bank (GTB)", code: "058" },
  { id: "access", name: "Access Bank", code: "044" },
  { id: "zenith", name: "Zenith Bank", code: "057" },
  { id: "kuda", name: "Kuda Microfinance Bank", code: "50211" },
  { id: "opay", name: "OPay Digital Services", code: "999992" },
  { id: "palmpay", name: "PalmPay", code: "999991" },
  { id: "firstbank", name: "First Bank of Nigeria", code: "011" },
  { id: "uba", name: "United Bank for Africa (UBA)", code: "033" },
  { id: "moniepoint", name: "Moniepoint MFB", code: "50515" }
];

export const SAVED_CONTACTS = [
  { name: "John Doe", tag: "@john_doe", bank: "GTBank", phone: "0803 219 9840" },
  { name: "Sarah Connor", tag: "@sarah_c", bank: "Kuda", phone: "0814 552 1102" },
  { name: "David Adeleke", tag: "@davido_o", bank: "Zenith", phone: "0902 443 8819" },
  { name: "Amaka Eze", tag: "@amaka_z", bank: "Access Bank", phone: "0706 912 3344" }
];

export const DATA_PLANS = {
  mtn: [
    { id: "m1", name: "1.5GB Monthly", validity: "30 Days", price: 1200 },
    { id: "m2", name: "3GB Weekly", validity: "7 Days", price: 1500 },
    { id: "m3", name: "5GB Monthly", validity: "30 Days", price: 2500 },
    { id: "m4", name: "10GB Monthly", validity: "30 Days", price: 4000 },
    { id: "m5", name: "20GB Monthly", validity: "30 Days", price: 7500 }
  ],
  airtel: [
    { id: "a1", name: "1.5GB Monthly", validity: "30 Days", price: 1200 },
    { id: "a2", name: "4GB Weekly", validity: "7 Days", price: 1800 },
    { id: "a3", name: "6GB Monthly", validity: "30 Days", price: 2500 },
    { id: "a4", name: "11GB Monthly", validity: "30 Days", price: 4000 }
  ],
  glo: [
    { id: "g1", name: "2GB Monthly", validity: "30 Days", price: 1200 },
    { id: "g2", name: "5.8GB Monthly", validity: "30 Days", price: 2500 },
    { id: "g3", name: "10GB Monthly", validity: "30 Days", price: 3800 }
  ],
  "9mobile": [
    { id: "9m1", name: "1.5GB Monthly", validity: "30 Days", price: 1200 },
    { id: "9m2", name: "4.5GB Monthly", validity: "30 Days", price: 2000 },
    { id: "9m3", name: "11GB Monthly", validity: "30 Days", price: 4000 }
  ]
};

export const BILLS_CATALOG = {
  electricity: {
    title: "Electricity DisCos",
    providers: [
      { id: "ikedc", name: "Ikeja Electric (IKEDC)", meterType: ["Prepaid", "Postpaid"] },
      { id: "ekedc", name: "Eko Electric (EKEDC)", meterType: ["Prepaid", "Postpaid"] },
      { id: "aedc", name: "Abuja Electric (AEDC)", meterType: ["Prepaid", "Postpaid"] },
      { id: "ibedc", name: "Ibadan Electric (IBEDC)", meterType: ["Prepaid", "Postpaid"] }
    ]
  },
  cable: {
    title: "Cable TV Providers",
    providers: [
      { id: "dstv", name: "DStv Nigeria", plans: ["DStv Padi - ₦3,600", "DStv Yanga - ₦5,100", "DStv Confam - ₦9,300", "DStv Compact - ₦15,700"] },
      { id: "gotv", name: "GOtv Nigeria", plans: ["GOtv Smallie - ₦1,575", "GOtv Jinja - ₦3,300", "GOtv Jolli - ₦4,850", "GOtv Max - ₦7,200"] },
      { id: "startimes", name: "StarTimes", plans: ["Nova - ₦1,700", "Basic - ₦3,000", "Classic - ₦4,500"] }
    ]
  },
  internet: {
    title: "Internet Service Providers",
    providers: [
      { id: "spectranet", name: "Spectranet 4G LTE", plans: ["Unified 20GB - ₦7,000", "Unlimited 20Mbps - ₦21,500"] },
      { id: "smile", name: "Smile Communications", plans: ["10GB Bigga - ₦4,000", "Unlimited Essential - ₦19,800"] },
      { id: "fiberone", name: "FiberOne Broadband", plans: ["Home Fast 30Mbps - ₦14,800"] }
    ]
  },
  education: {
    title: "Education & Examinations",
    providers: [
      { id: "jamb", name: "JAMB UTME PIN", price: 6200 },
      { id: "waec", name: "WAEC Result Checker PIN", price: 3800 },
      { id: "neco", name: "NECO Token", price: 1200 }
    ]
  }
};

export const FAQ_ITEMS = [
  {
    q: "How do I fund my ZPay wallet?",
    a: "You can fund your ZPay wallet instantly using any Paystack-supported method including debit/credit cards (Visa, Mastercard, Verve), direct bank transfers to your dedicated virtual account, or USSD codes."
  },
  {
    q: "Are transfers to other banks free on ZPay?",
    a: "Yes! ZPay offers 100% free transfers to any Nigerian bank or ZPay user. There are no hidden maintenance fees or surprise stamp duties."
  },
  {
    q: "What security measures protect my ZPay account?",
    a: "ZPay uses bank-grade 256-bit SSL encryption, a mandatory 4-digit transaction PIN, biometric authentication (fingerprint and Face ID), and real-time fraud monitoring. We never expose your sensitive card numbers or credentials."
  },
  {
    q: "Can I use ZPay without ATM cards?",
    a: "Absolutely. ZPay is built specifically for seamless digital payments, QR codes, wallet transfers, and bill payments. No plastic ATM card is required!"
  },
  {
    q: "How fast are airtime and data recharges delivered?",
    a: "Airtime and data purchases on MTN, Airtel, Glo, and 9mobile are processed instantaneously and delivered to your phone in under 3 seconds."
  }
];

// ─── OSUSU: Personal Target Goals ────────────────────────────────────────────
export const INITIAL_TARGET_GOALS = [
  {
    id: "tg-001",
    emoji: "🏠",
    title: "House Rent Savings",
    description: "Save for annual Lagos apartment rent",
    target: 600000,
    saved: 270000,
    frequency: "Monthly",
    contribution: 40000,
    nextDate: "Oct 28, 2026",
    status: "Active",
    color: "#f59e0b"
  },
  {
    id: "tg-002",
    emoji: "🎓",
    title: "Children's School Fees",
    description: "Save for private school tuition",
    target: 200000,
    saved: 150000,
    frequency: "Weekly",
    contribution: 10000,
    nextDate: "Sep 21, 2026",
    status: "Active",
    color: "#38bdf8"
  },
  {
    id: "tg-003",
    emoji: "💼",
    title: "Business Capital Fund",
    description: "Emergency capital for business restocking",
    target: 500000,
    saved: 75000,
    frequency: "Monthly",
    contribution: 25000,
    nextDate: "Oct 28, 2026",
    status: "Active",
    color: "#8b5cf6"
  }
];

// ─── OSUSU: Available Rotational Ajo / Esusu Groups to Join ──────────────────
export const OSUSU_AJO_GROUPS_CATALOG = [
  {
    id: "ajo-001",
    name: "Lagos Professionals Weekly Ajo",
    emoji: "👔",
    type: "Rotational Ajo",
    description: "10 working professionals contributing ₦5,000 every week. Pot of ₦50,000 rotates to one member each week.",
    frequency: "Weekly",
    contributionAmount: 5000,
    potSize: 50000,
    totalSlots: 10,
    filledSlots: 9,
    nextCollection: "Sep 22, 2026 (Monday)",
    cycleLength: "10 Weeks",
    rules: [
      "Pay ₦5,000 every Monday by 10am",
      "One member collects the full ₦50,000 pot each week",
      "Order is randomised at group start — no swapping",
      "Missed payment results in slot suspension"
    ],
    members: [
      { name: "Gideon Oladipo", turn: 4, status: "my_turn_next", emoji: "🟡" },
      { name: "Sarah Connor", turn: 1, status: "collected", emoji: "✅" },
      { name: "David Adeleke", turn: 2, status: "collected", emoji: "✅" },
      { name: "Amaka Eze", turn: 3, status: "collected", emoji: "✅" },
      { name: "Tunde Bakare", turn: 5, status: "waiting", emoji: "⏳" },
      { name: "Folake Adeyemi", turn: 6, status: "waiting", emoji: "⏳" },
      { name: "Mike Obi", turn: 7, status: "waiting", emoji: "⏳" },
      { name: "Yemi Alade", turn: 8, status: "waiting", emoji: "⏳" },
      { name: "Emeka Nwosu", turn: 9, status: "waiting", emoji: "⏳" },
      { name: "Chioma Bello", turn: 10, status: "waiting", emoji: "⏳" }
    ],
    currentRound: 4,
    myTurn: 4,
    myStatus: "your_turn", // "your_turn", "waiting", "collected"
    isJoined: true,
    adminName: "David Adeleke"
  },
  {
    id: "ajo-002",
    name: "Mama Market Monthly Esusu",
    emoji: "🛒",
    type: "Rotational Esusu",
    description: "6 market women contributing ₦20,000 monthly. ₦120,000 collected by one trader per month for business restocking.",
    frequency: "Monthly",
    contributionAmount: 20000,
    potSize: 120000,
    totalSlots: 6,
    filledSlots: 6,
    nextCollection: "Oct 1, 2026",
    cycleLength: "6 Months",
    rules: [
      "Pay ₦20,000 by the 1st of every month",
      "Collector gets ₦120,000 for their month",
      "Payout order drawn by ballot at group kickoff",
      "Late payments incur a ₦2,000 penalty"
    ],
    members: [
      { name: "Mama Chidinma", turn: 1, status: "collected", emoji: "✅" },
      { name: "Iya Tunde", turn: 2, status: "current", emoji: "🔔" },
      { name: "Gideon Oladipo", turn: 3, status: "waiting", emoji: "⏳" },
      { name: "Mama Sule", turn: 4, status: "waiting", emoji: "⏳" },
      { name: "Auntie Rose", turn: 5, status: "waiting", emoji: "⏳" },
      { name: "Mrs. Nwoye", turn: 6, status: "waiting", emoji: "⏳" }
    ],
    currentRound: 2,
    myTurn: 3,
    myStatus: "waiting",
    isJoined: true,
    adminName: "Mama Chidinma"
  },
  {
    id: "ajo-003",
    name: "Zenith Staff Biweekly Thrift",
    emoji: "🏦",
    type: "Rotational Ajo",
    description: "8 colleagues contributing ₦10,000 every 2 weeks. One member packs ₦80,000 every payout cycle.",
    frequency: "Bi-Weekly",
    contributionAmount: 10000,
    potSize: 80000,
    totalSlots: 8,
    filledSlots: 5,
    nextCollection: "Oct 4, 2026",
    cycleLength: "16 Weeks",
    rules: [
      "₦10,000 contribution every other Friday",
      "Pot of ₦80,000 rotates every 2 weeks",
      "3 open slots available — invite friends to fill"
    ],
    members: [
      { name: "Folake Adeyemi", turn: 1, status: "collected", emoji: "✅" },
      { name: "Amaka Eze", turn: 2, status: "collected", emoji: "✅" },
      { name: "Emeka Nwosu", turn: 3, status: "current", emoji: "🔔" },
      { name: "Tunde Bakare", turn: 4, status: "waiting", emoji: "⏳" },
      { name: "Gideon Oladipo", turn: 5, status: "waiting", emoji: "⏳" },
      { name: "[Open Slot]", turn: 6, status: "open", emoji: "➕" },
      { name: "[Open Slot]", turn: 7, status: "open", emoji: "➕" },
      { name: "[Open Slot]", turn: 8, status: "open", emoji: "➕" }
    ],
    currentRound: 3,
    myTurn: 5,
    myStatus: "waiting",
    isJoined: true,
    adminName: "Folake Adeyemi"
  },
  {
    id: "ajo-004",
    name: "Weekend Hustle Daily Savings",
    emoji: "💰",
    type: "Daily Ajo",
    description: "20 hustlers saving ₦1,000 every day. You pack ₦20,000 on your designated day — no waiting months!",
    frequency: "Daily",
    contributionAmount: 1000,
    potSize: 20000,
    totalSlots: 20,
    filledSlots: 17,
    nextCollection: "Sep 21, 2026",
    cycleLength: "20 Days",
    rules: [
      "₦1,000 daily contribution — every day counts",
      "One member collects ₦20,000 on their day",
      "Cycle restarts immediately after completion",
      "Auto-debit enabled from ZPay wallet"
    ],
    members: null, // Not joined yet
    currentRound: null,
    myTurn: null,
    myStatus: "not_joined",
    isJoined: false,
    adminName: "Weekend Hustle Admin",
    openSlots: 3
  },
  {
    id: "ajo-005",
    name: "New Mums Monthly Pot",
    emoji: "👶",
    type: "Rotational Esusu",
    description: "Mothers-only group contributing ₦15,000/month. The ₦150,000 pot goes to whoever needs it most — voted by members.",
    frequency: "Monthly",
    contributionAmount: 15000,
    potSize: 150000,
    totalSlots: 10,
    filledSlots: 8,
    nextCollection: "Oct 1, 2026",
    cycleLength: "10 Months",
    rules: [
      "₦15,000 per month",
      "Pot winner voted by group consensus each month",
      "Strict members-only WhatsApp group for transparency",
      "2 open slots — female members only"
    ],
    members: null,
    currentRound: null,
    myTurn: null,
    myStatus: "not_joined",
    isJoined: false,
    adminName: "Mama Kechi",
    openSlots: 2
  }
];

export const COOPERATIVES_CATALOG = [

  {
    id: "zenith-staff",
    name: "Zenith Staff Multi-Purpose Cooperative Society Ltd",
    shortName: "Zenith Staff Cooperative",
    regNo: "LSCS/2018/49102",
    badge: "Verified Enterprise",
    logo: "🏦",
    category: "Multi-Purpose",
    description: "Corporate multi-purpose thrift, investment and credit society for Zenith ecosystem professionals.",
    minMonthlyContribution: 25000,
    currentContribution: 25000,
    totalEquitySaved: 245000,
    savingsTarget: 300000,
    loanEligibilityRatio: 3.0, // Member can borrow up to 300% of their equity savings
    minTenureMonthsForLoan: 3,
    memberMonthsActive: 5,
    loanInterestRate: 5.0, // 5% flat per annum
    yearEndPayoutMonth: "December",
    yearEndPayoutDate: "Dec 15, 2026",
    dividendRate: 12.5, // 12.5% projected annual dividend share
    policies: [
      "Minimum monthly savings equity of ₦25,000 deducted on the 28th.",
      "Loan eligibility requires at least 3 consecutive months of active savings.",
      "Borrow up to 300% of your total cooperative equity at 5% flat annual interest.",
      "Annual dividend and capital payout (pack your money) disbursed every December 15th.",
      "Members may rollover funds into next year's pool for compound dividends."
    ]
  },
  {
    id: "lagos-tech",
    name: "Lagos Tech Innovators Thrift & Credit Society",
    shortName: "Lagos Tech Thrift",
    regNo: "LSCS/2021/82019",
    badge: "Tech Sector",
    logo: "💻",
    category: "Thrift & Credit",
    description: "Empowering developers, founders, and tech professionals across Nigeria through pooled savings and micro-venture loans.",
    minMonthlyContribution: 15000,
    currentContribution: 15000,
    totalEquitySaved: 95000,
    savingsTarget: 180000,
    loanEligibilityRatio: 2.5,
    minTenureMonthsForLoan: 4,
    memberMonthsActive: 2,
    loanInterestRate: 6.0,
    yearEndPayoutMonth: "December",
    yearEndPayoutDate: "Dec 20, 2026",
    dividendRate: 14.0,
    policies: [
      "Minimum monthly contribution of ₦15,000.",
      "Loan eligibility requires 4 months tenure and 40% equity coverage.",
      "Maximum loan cap is 2.5x your current equity balance at 6% p.a.",
      "Annual liquidation & payout done on Dec 20th."
    ]
  },
  {
    id: "federal-staff",
    name: "Federal Civil Service Staff Welfare Cooperative",
    shortName: "Civil Service Cooperative",
    regNo: "FCTA/COP/2012/114",
    badge: "Public Sector",
    logo: "🏛️",
    category: "Staff Welfare",
    description: "Dedicated to public servants with guaranteed low-interest loans, asset financing, and annual retirement bonuses.",
    minMonthlyContribution: 10000,
    currentContribution: 10000,
    totalEquitySaved: 0,
    savingsTarget: 120000,
    loanEligibilityRatio: 3.0,
    minTenureMonthsForLoan: 3,
    memberMonthsActive: 0,
    loanInterestRate: 4.5,
    yearEndPayoutMonth: "November",
    yearEndPayoutDate: "Nov 30, 2026",
    dividendRate: 10.0,
    policies: [
      "₦10,000 minimum monthly contribution.",
      "Loan borrowing ratio up to 3x equity at 4.5% subsidized interest.",
      "Annual package payout distributed in late November for end-of-year planning."
    ]
  },
  {
    id: "greenfield-agri",
    name: "Greenfield Farmers & Agribusiness Cooperative",
    shortName: "Greenfield Agri-Coop",
    regNo: "OGCS/2019/33019",
    badge: "Agribusiness",
    logo: "🌾",
    category: "Agricultural",
    description: "Agricultural commodity financing, grain storage cooperative, and seasonal farm equipment loans.",
    minMonthlyContribution: 5000,
    currentContribution: 5000,
    totalEquitySaved: 0,
    savingsTarget: 60000,
    loanEligibilityRatio: 2.0,
    minTenureMonthsForLoan: 6,
    memberMonthsActive: 0,
    loanInterestRate: 5.0,
    yearEndPayoutMonth: "December",
    yearEndPayoutDate: "Dec 31, 2026",
    dividendRate: 15.5,
    policies: [
      "₦5,000 minimum monthly seasonal savings.",
      "Members access up to 200% loan for seedlings, fertilizer, and tractor leasing.",
      "Annual harvest share-out and money packing at year-end."
    ]
  }
];

export const MARKETPLACE_CATALOG = [
  {
    id: "cd-iphone16pro",
    title: "Apple iPhone 16 Pro (128GB)",
    brand: "Apple",
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80",
    cashPrice: 1450000,
    weeklyInstallment: 60416, // 24 weeks
    monthlyInstallment: 241666, // 6 months
    deliveryThresholdPercent: 50, // Delivered when 50% paid!
    rating: 4.9,
    reviewsCount: 142,
    specs: ["6.3\" Super Retina XDR", "A18 Pro Chip", "48MP Fusion Camera", "Titanium Finish"]
  },
  {
    id: "cd-s25ultra",
    title: "Samsung Galaxy S25 Ultra 5G (256GB)",
    brand: "Samsung",
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
    cashPrice: 1620000,
    weeklyInstallment: 67500,
    monthlyInstallment: 270000,
    deliveryThresholdPercent: 50,
    rating: 4.8,
    reviewsCount: 98,
    specs: ["Snapdragon 8 Elite", "200MP Quad Camera", "Built-in S-Pen", "5000mAh Battery"]
  },
  {
    id: "cd-macbook-m3",
    title: "Apple MacBook Pro 14\" M3 Chip",
    brand: "Apple",
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
    cashPrice: 1850000,
    weeklyInstallment: 77083,
    monthlyInstallment: 308333,
    deliveryThresholdPercent: 50,
    rating: 4.9,
    reviewsCount: 84,
    specs: ["Apple M3 8-Core CPU", "18-Hour Battery", "Liquid Retina XDR", "512GB SSD"]
  },
  {
    id: "cd-dell-xps",
    title: "Dell XPS 15 Intel Core i7 (16GB RAM / 1TB SSD)",
    brand: "Dell",
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
    cashPrice: 1280000,
    weeklyInstallment: 53333,
    monthlyInstallment: 213333,
    deliveryThresholdPercent: 50,
    rating: 4.7,
    reviewsCount: 65,
    specs: ["Intel Core i7 13th Gen", "RTX 4050 Graphics", "OLED Touch Display", "1TB NVMe"]
  },
  {
    id: "cd-hisense-ac",
    title: "Hisense 1.5HP Inverter Split Air Conditioner",
    brand: "Hisense",
    category: "Appliances",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=80",
    cashPrice: 385000,
    weeklyInstallment: 16041,
    monthlyInstallment: 64166,
    deliveryThresholdPercent: 50,
    rating: 4.8,
    reviewsCount: 173,
    specs: ["Fast Cooling Inverter", "Eco Energy Saver (60%)", "Copper Condenser", "R32 Refrigerant"]
  },
  {
    id: "cd-samsung-fridge",
    title: "Samsung 320L Double Door Frost-Free Refrigerator",
    brand: "Samsung",
    category: "Appliances",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&auto=format&fit=crop&q=80",
    cashPrice: 590000,
    weeklyInstallment: 24583,
    monthlyInstallment: 98333,
    deliveryThresholdPercent: 50,
    rating: 4.9,
    reviewsCount: 112,
    specs: ["Digital Inverter (10 Yr Warranty)", "All-Around Cooling", "Deodorizing Filter", "Frost Free"]
  },
  {
    id: "cd-ecoflow-solar",
    title: "EcoFlow Delta 2 Solar Generator Kit (1024Wh + Solar Panel)",
    brand: "EcoFlow",
    category: "Power & Solar",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80",
    cashPrice: 1150000,
    weeklyInstallment: 47916,
    monthlyInstallment: 191666,
    deliveryThresholdPercent: 50,
    rating: 5.0,
    reviewsCount: 89,
    specs: ["1800W AC Output (Surge 2700W)", "0-80% in 50 Mins", "LFP Long-Life Battery", "Powers TV, Fridge & PC"]
  },
  {
    id: "cd-tcl-smart-tv",
    title: "TCL 55\" 4K UHD HDR Google Smart TV",
    brand: "TCL",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80",
    cashPrice: 420000,
    weeklyInstallment: 17500,
    monthlyInstallment: 70000,
    deliveryThresholdPercent: 50,
    rating: 4.8,
    reviewsCount: 154,
    specs: ["4K HDR 10+", "Google TV & Voice Remote", "Dolby Audio", "Frameless Bezel Design"]
  }
];

export const EXECUTIVE_USER = {
  id: "EXEC-PRES-01",
  name: "Dr. Babatunde Alabi",
  title: "President / Credit Committee Chair",
  role: "Cooperative Executive Administrator",
  societyName: "Zenith Staff Multi-Purpose Cooperative Society Ltd",
  regNo: "LSCS/2018/49102",
  email: "president@zenithstaff.org.ng",
  phone: "0802 884 9102",
  signatoryLevel: "Dual Category A Signatory",
  tenureExpires: "December 2027"
};

export const INITIAL_SOCIETY_TREASURY = {
  vaultBalance: 48500000.00,
  memberEquityPool: 36200000.00,
  activeLoans: 12300000.00,
  dividendReserve: 4525000.00,
  totalMembers: 142,
  repaymentRate: 98.4,
  fiscalYear: "FY 2026"
};

export const INITIAL_SOCIETY_MEMBERS = [
  {
    id: "ZP-MB-9201",
    name: "Gideon Oladipo",
    role: "Regular Contributor",
    email: "gideon@zpay.ng",
    phone: "0812 345 6789",
    totalEquitySaved: 245000,
    monthlyContribution: 25000,
    tenureMonths: 5,
    standing: "Good Standing",
    tier: "Tier 2 Contributor",
    activeLoanAmount: 60000,
    joinedDate: "April 2026"
  },
  {
    id: "ZP-MB-8402",
    name: "Sarah Connor",
    role: "Regular Contributor",
    email: "sarah.c@zenith.com",
    phone: "0803 441 9021",
    totalEquitySaved: 180000,
    monthlyContribution: 20000,
    tenureMonths: 6,
    standing: "Good Standing",
    tier: "Tier 1 Contributor",
    activeLoanAmount: 0,
    joinedDate: "March 2026"
  },
  {
    id: "ZP-MB-7719",
    name: "David Adeleke",
    role: "Senior Executive Member",
    email: "david.a@zenith.com",
    phone: "0805 119 2381",
    totalEquitySaved: 620000,
    monthlyContribution: 50000,
    tenureMonths: 14,
    standing: "Good Standing",
    tier: "Executive Tier",
    activeLoanAmount: 180000,
    joinedDate: "July 2025"
  },
  {
    id: "ZP-MB-6104",
    name: "Amaka Eze",
    role: "Regular Contributor",
    email: "amaka.eze@zenith.com",
    phone: "0809 332 1089",
    totalEquitySaved: 310000,
    monthlyContribution: 30000,
    tenureMonths: 8,
    standing: "Good Standing",
    tier: "Tier 2 Contributor",
    activeLoanAmount: 0,
    joinedDate: "January 2026"
  },
  {
    id: "ZP-MB-5590",
    name: "Tunde Bakare",
    role: "Associate Member",
    email: "tunde.b@zenith.com",
    phone: "0701 882 3491",
    totalEquitySaved: 125000,
    monthlyContribution: 15000,
    tenureMonths: 4,
    standing: "Deduction Paused",
    tier: "Tier 1 Contributor",
    activeLoanAmount: 45000,
    joinedDate: "May 2026"
  },
  {
    id: "ZP-MB-4412",
    name: "Folake Adeyemi",
    role: "Senior Contributor",
    email: "folake.a@zenith.com",
    phone: "0814 209 7781",
    totalEquitySaved: 490000,
    monthlyContribution: 40000,
    tenureMonths: 11,
    standing: "Good Standing",
    tier: "Tier 3 Contributor",
    activeLoanAmount: 0,
    joinedDate: "October 2025"
  }
];

export const INITIAL_PENDING_LOAN_REQUESTS = [
  {
    id: "CLR-2026-081",
    applicantId: "ZP-MB-9201",
    applicantName: "Gideon Oladipo",
    amount: 200000,
    tenureMonths: 6,
    purpose: "Business Inventory Restock",
    memberEquity: 245000,
    maxAllowedLoan: 735000,
    interestRate: 5.0,
    monthlyRepayment: 35000,
    guarantor: "David Adeleke (Approved)",
    requestDate: "Today, 10:14 AM",
    status: "Pending Approval",
    riskScore: "Low (92/100)"
  },
  {
    id: "CLR-2026-079",
    applicantId: "ZP-MB-8402",
    applicantName: "Sarah Connor",
    amount: 150000,
    tenureMonths: 4,
    purpose: "Professional Certification Exam Fees",
    memberEquity: 180000,
    maxAllowedLoan: 540000,
    interestRate: 5.0,
    monthlyRepayment: 39375,
    guarantor: "Folake Adeyemi (Approved)",
    requestDate: "Yesterday, 3:45 PM",
    status: "Pending Approval",
    riskScore: "Low (96/100)"
  },
  {
    id: "CLR-2026-074",
    applicantId: "ZP-MB-7719",
    applicantName: "David Adeleke",
    amount: 500000,
    tenureMonths: 12,
    purpose: "Home Renovation & Solar System",
    memberEquity: 620000,
    maxAllowedLoan: 1860000,
    interestRate: 5.0,
    monthlyRepayment: 43750,
    guarantor: "Dr. Babatunde Alabi (Approved)",
    requestDate: "2 days ago",
    status: "Pending Approval",
    riskScore: "Very Low (99/100)"
  }
];


