# ZPay Web + Flutter App Screen Specification

## Product

**ZPay --- Your money. Your way.**

ZPay is a modern digital payment and wallet platform focused on simple
payments, wallet funding through Paystack, transfers, airtime, data,
bills, QR payments, and transaction management.

> **Important:** ZPay has no ATM functionality in this concept.

------------------------------------------------------------------------

# 1. Web Site Structure

The web experience should be a polished marketing and customer-facing
website that leads users toward creating an account or opening the app.

## `/` --- Landing Page

### Hero

**Headline:** \> Your money. Your way.

**Supporting text:** \> , fund your wallet, pay bills, buy
airtime and data --- all from one simple app.

**Buttons:** - Get Started - Sign In

### Hero visual

Show a premium ZPay mobile-phone mockup containing the ZPay dashboard.

### Trust strip

-   Fast payments
-   Secure transactions
-   Powered by Paystack
-   Built for everyday payments

### Feature section

Cards: 1. Receive Money 2. Fund Your Wallet 3. Pay Bills
5. Airtime & Data 6. QR Payments

------------------------------------------------------------------------

# 2. Web About / How It Works

## `/how-it-works`

Three steps:

### 01 --- Create your account

Sign up with your phone number or email and verify your account.

### 02 --- Fund your ZPay wallet

Use Paystack-supported payment methods to add money.

### 03 --- Pay with ZPay

 buy airtime, pay bills, request money or scan a QR code.

------------------------------------------------------------------------

# 3. Web Security Page

## `/security`

Explain:

-   PIN protection
-   Biometric authentication where supported
-   Secure sessions
-   Server-side transaction verification
-   Paystack payment verification
-   Transaction notifications
-   Account/device protection

Never expose secret API keys in the browser.

------------------------------------------------------------------------

# 4. Web Contact / Support

## `/support`

Include:

-   Help center
-   Frequently asked questions
-   Contact support
-   Report a transaction
-   Account recovery

------------------------------------------------------------------------

# 5. Web Authentication

## `/login`

Fields: - Email or phone number - Password

Actions: - Login - Forgot password - Continue with Google - Create
account

## `/signup`

Fields: - Full name - Phone number - Email - Password

Then:

`Sign Up → OTP → Create PIN → Dashboard`

## `/verify`

OTP verification screen with: - 6-digit code - Resend code - Countdown -
Change phone/email

------------------------------------------------------------------------

# 6. Flutter Mobile App Screens

## Splash Screen

Display:

**ZPay**

> Your money. Your way.

Animation: - ZPay logo scales/fades in - Short loading indicator -
Automatically routes to onboarding or authentication

------------------------------------------------------------------------

# 7. Onboarding

### Screen 01 --- Easy Payments

> ,fund wallet.

Visual: ZPay phone/payment illustration.

### Screen 02 --- Safe & Secure

> Your money and data are protected.

Visual: shield/security illustration.

### Screen 03 --- Everything in One Place

> Airtime, data, bills and payments --- all in ZPay.

Actions: - Get Started - Login

------------------------------------------------------------------------

# 8. Login

Header:

**Welcome Back 👋**

Fields: - Email or phone - Password

Buttons: - Login - Continue with Google

Links: - Forgot password? - Create account

------------------------------------------------------------------------

# 9. Sign Up

Header:

**Create Your ZPay Account**

Fields: - Full name - Phone number - Email - Password

Button:

**Create Account**

After registration:

`OTP → PIN → Biometric setup → Home`

------------------------------------------------------------------------

# 10. OTP Verification

Title:

**Verify Your Number**

Show masked phone number.

Components: - 6 OTP boxes - Resend code - Countdown - Edit phone number

------------------------------------------------------------------------

# 11. Home Dashboard

The home screen is the most important screen.

### Header

> Good morning, \[Name\] 👋

Notification icon.

### Balance Card

**Available Balance**

`₦25,450.00`

Actions:

-   Add Money
-   Hide/Show Balance

### Primary Actions

-   fund wallet 
-   QR Pay

### Quick Services

-   Airtime
-   Data
-   Bills
-   More

### Recent Transactions

Show the latest 4--5 transactions.

Each transaction includes: - Icon - Name - Date/time - Amount - Status

Bottom navigation:

`Home | Payments | Activity | Profile`

------------------------------------------------------------------------

# 12. Add Money

Title:

**Add Money**

Funding options should be powered through the backend and Paystack.

Suggested tabs:

-   Card
-   Bank
-   USSD

Amount:

`₦5,000`

Quick amount chips:

`₦5,000 | ₦10,000 | ₦20,000 | ₦50,000`

Button:

**Proceed to Pay**

------------------------------------------------------------------------

# 13. Paystack Payment

The app should launch the appropriate Paystack checkout/payment flow.

Flow:

`Add Money → Initialize Transaction → Paystack Checkout → Payment → Verify → Wallet Updated`

The client must NOT directly decide that a payment succeeded.

The backend verifies the Paystack transaction before crediting the
wallet.

------------------------------------------------------------------------

# 14. Send Money

Title:

**Send Money**

Fields:

-   Phone number / ZPay ID / bank account
-   Select contact
-   Amount
-   Optional note

Button:

**Continue**

Before submission show:

**Confirm Payment**

Recipient: `John Doe`

Amount: `₦5,000`

Fee: `₦0.00`

Total: `₦5,000`

Authentication:

-   PIN
-   Biometric where available

------------------------------------------------------------------------

# 15. Payment Success

Use a distinctive ZPay animation.

Show:

**Payment Successful!**

`₦5,000.00`

> Sent to John Doe

Actions: - View Receipt - Done

Animation idea:

`checkmark → expanding ring → subtle confetti → receipt card`

------------------------------------------------------------------------

# 16. Receive Money

Title:

**Receive Money**

Display:

### Your ZPay Tag

`@gideon_zpay`

Large QR code.

Buttons: - Share QR Code - Copy Payment Link

Also allow users to request a specific amount.

------------------------------------------------------------------------

# 17. QR Pay

Camera screen:

**Scan to Pay**

Features: - QR scanner - Flash - Upload QR - Manual ZPay ID

After scanning:

`Recipient → Amount → Confirm → PIN/Biometric → Success`

------------------------------------------------------------------------

# 18. Airtime

Title:

**Buy Airtime**

Networks: - MTN - Airtel - Glo - 9mobile

Fields: - Phone number - Amount

Quick amounts: `₦100 | ₦200 | ₦500 | ₦1,000 | ₦2,000 | ₦5,000`

Button:

**Proceed**

------------------------------------------------------------------------

# 19. Data

Title:

**Buy Data**

Select: - Network - Phone number - Data plan

Show plan cards with: - Data amount - Duration - Price

Button:

**Proceed**

------------------------------------------------------------------------

# 20. Bills

Title:

**Pay Bills**

Categories: - Electricity - Cable TV - Internet - Education -
Insurance - More

Each category opens a provider selection and payment flow.

------------------------------------------------------------------------

# 21. Activity / Transactions

Title:

**Transactions**

Filters: - All - Money In - Money Out - Pending

Each item:

`Icon | Description | Date | Amount | Status`

Transaction detail should contain:

-   Transaction ID
-   Date/time
-   Sender
-   Recipient
-   Amount
-   Fee
-   Total
-   Status
-   Reference

Actions: - Download/share receipt - Report a problem

------------------------------------------------------------------------

# 22. Profile

Header:

Profile avatar

Name: `Gideon`

Email/phone

Sections:

### Account

-   Personal Information
-   Security
-   Notifications

### Preferences

-   Appearance
-   Language

### Support

-   Help & Support
-   About ZPay

### Account

-   Log Out

------------------------------------------------------------------------

# 23. Security Screens

## PIN

-   Create PIN
-   Confirm PIN
-   Change PIN
-   Forgot PIN

## Biometrics

Allow: - Fingerprint - Face authentication where supported

## Device Security

Show: - Current device - Active sessions - Last login

------------------------------------------------------------------------

# 24. Design System

## Brand

Primary direction: - Deep black / charcoal - ZPay green - White - Soft
neutral backgrounds

Use the ZPay green primarily for: - Primary buttons - Success states -
Active navigation - Important highlights

Avoid making every component green.

## Typography

Use a modern font such as: - Inter - Plus Jakarta Sans

Typography should be: - Large and bold for balances - Medium for section
titles - Regular for supporting text

## Components

Build reusable Flutter components:

``` text
ZPayButton
ZPayTextField
ZPayBalanceCard
ZPayTransactionTile
ZPayServiceCard
ZPayBottomNav
ZPayPinInput
ZPayOtpInput
ZPaySuccessAnimation
ZPayAmountInput
ZPayQrCard
ZPayConfirmationSheet
```

------------------------------------------------------------------------

# 25. Animation System

Keep animations fast and subtle.

### Payment

``` text
Tap Pay
↓
Button loading
↓
Confirmation sheet
↓
PIN/Biometric
↓
Checkmark animation
↓
Success
↓
Balance update
```

### Add Money

``` text
Amount selected
↓
Paystack checkout
↓
Processing
↓
Verification
↓
Wallet balance animation
```

### Navigation

Use: - Fade - Slide - Scale - Hero transitions

Avoid excessive animation that slows payment actions.

------------------------------------------------------------------------

# 26. Flutter Architecture

Recommended stack:

``` text
Flutter
Dart
Riverpod
GoRouter
Dio
Freezed
JSON Serializable
Flutter Secure Storage
Firebase Cloud Messaging
```

Suggested structure:

``` text
lib/
├── core/
│   ├── constants/
│   ├── theme/
│   ├── router/
│   ├── network/
│   ├── storage/
│   └── utils/
│
├── features/
│   ├── auth/
│   ├── home/
│   ├── wallet/
│   ├── payments/
│   ├── transactions/
│   ├── airtime/
│   ├── data/
│   ├── bills/
│   ├── qr/
│   ├── profile/
│   └── notifications/
│
├── shared/
│   ├── widgets/
│   └── models/
│
└── main.dart
```

------------------------------------------------------------------------

# 27. Backend Architecture

Flutter should communicate with a secure ZPay backend.

``` text
Flutter App
     ↓
ZPay API
     ↓
Authentication
     ↓
Wallet / Ledger
     ↓
Paystack
     ↓
Database
```

The backend should own: - Wallet balances - Transaction creation -
Transaction status - Paystack verification - Webhooks - Fees - User
authorization - Idempotency - Audit logs

Never store Paystack secret keys in Flutter.

------------------------------------------------------------------------

# 28. Core API Endpoints

Example:

``` text
POST /auth/register
POST /auth/login
POST /auth/verify-otp
POST /auth/refresh

GET  /wallet
POST /wallet/fund
GET  /wallet/transactions

POST /payments/send
POST /payments/request
POST /payments/qr

POST /paystack/initialize
GET  /paystack/verify
POST /webhooks/paystack

POST /services/airtime
POST /services/data
POST /services/bills

GET /notifications
GET /profile
PATCH /profile
```

------------------------------------------------------------------------

# 29. Database Concept

Core entities:

``` text
users
wallets
wallet_transactions
payments
payment_recipients
funding_transactions
paystack_transactions
airtime_transactions
data_transactions
bill_transactions
notifications
devices
audit_logs
```

Use a proper ledger/transaction model rather than allowing the mobile
client to directly change a balance.

------------------------------------------------------------------------

# 30. Development Order

Build in this order:

### Phase 1

-   Flutter project
-   Theme
-   Routing
-   Splash
-   Onboarding
-   Login
-   Signup
-   OTP

### Phase 2

-   Home
-   Wallet
-   Add Money
-   Paystack integration
-   Transaction history

### Phase 3

-   Send
-   Receive
-   QR
-   PIN
-   Biometric
-   Success animations

### Phase 4

-   Airtime
-   Data
-   Bills

### Phase 5

-   Notifications
-   Profile
-   Security
-   Support
-   Receipts

### Phase 6

-   Testing
-   Security review
-   Error handling
-   Performance
-   Production deployment

------------------------------------------------------------------------

# 31. Codex / VS Code Build Rule

Do not ask the coding agent to generate the entire fintech application
in one huge operation.

Build one feature at a time.

Recommended instruction:

> Read ZPAY_APP_SPEC.md first. Do not change architecture without
> explaining why. Build the requested screen using reusable components,
> Riverpod state management, responsive Flutter layouts,
> loading/error/empty states, and production-quality error handling.
> Never place secret keys in the Flutter client. Follow the existing
> project structure.

Then give the agent one task at a time:

``` text
Build the ZPay splash and onboarding screens.
```

Then:

``` text
Build the authentication flow.
```

Then:

``` text
Build the ZPay home dashboard from ZPAY_APP_SPEC.md.
```

Then:

``` text
Build wallet funding and connect it to the backend Paystack flow.
```

This will produce a much cleaner project than generating everything at
once.

------------------------------------------------------------------------

# 32. Final Product Direction

ZPay should feel:

**Fast. Clean. Premium. Nigerian. Trustworthy.**

The key product experience is:

> **Open ZPay → see your money → choose what you want to do → confirm
> securely → get instant feedback.**

No unnecessary ATM features. No clutter. No confusing banking
terminology.

**ZPay should make everyday payments feel effortless.**
