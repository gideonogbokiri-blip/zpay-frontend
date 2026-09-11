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
