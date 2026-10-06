import { renderLandingView } from '../views/landing.js';
import { renderHowItWorksView } from '../views/howItWorks.js';
import { renderSecurityView } from '../views/security.js';
import { renderSupportView, initSupportListeners } from '../views/support.js';
import { 
  renderSplashView, initSplashRouting,
  renderOnboardingView, initOnboardingListeners,
  renderLoginView, initLoginListeners,
  renderSignupView, initSignupListeners,
  renderVerifyOtpView, initVerifyOtpListeners
} from '../views/auth.js';
import { renderDashboardView, initDashboardListeners } from '../views/dashboard.js';
import { renderAddMoneyView, initAddMoneyListeners } from '../views/addMoney.js';
import { renderQrPayView, initQrPayListeners } from '../views/qrPay.js';
import { renderAirtimeView, initAirtimeListeners } from '../views/airtime.js';
import { renderDataPlansView, initDataPlansListeners } from '../views/dataPlans.js';
import { renderBillsView, initBillsListeners } from '../views/bills.js';
import { renderServicesView, initServicesListeners } from '../views/services.js';
import { renderActivityView, initActivityListeners } from '../views/activity.js';
import { renderProfileView, initProfileListeners } from '../views/profile.js';
import { renderLoansView, initLoansListeners } from '../views/loans.js';
import { renderAtmView, initAtmListeners } from '../views/atm.js';
import { renderCommunityView, initCommunityListeners } from '../views/community.js';
import { renderOsusuView, initOsusuListeners } from '../views/osusu.js';
import { renderZrefView, initZrefListeners } from '../views/zref.js';
import { renderZsoView, initZsoListeners } from '../views/zso.js';
import { renderSendMoneyView, initSendMoneyListeners } from '../views/sendMoney.js';
import { renderReceiveMoneyView, initReceiveMoneyListeners } from '../views/receiveMoney.js';
import { renderCooperativeView, initCooperativeListeners } from '../views/cooperative.js';
import { renderCooperativeAdminView, initCooperativeAdminListeners } from '../views/cooperativeAdmin.js';
import { renderPaySmallSmallView, initPaySmallSmallListeners } from '../views/paySmallSmall.js';
import { renderElectricityView, initElectricityListeners } from '../views/electricity.js';

class Router {
  constructor(appElement) {
    this.appElement = appElement;
    this.deviceFrameMode = false; // By default standard responsive layout
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  init() {
    this.handleRoute();
  }

  getHash() {
    const hash = window.location.hash || '#/';
    return hash.replace(/^#/, '');
  }

  toggleDeviceFrame() {
    this.deviceFrameMode = !this.deviceFrameMode;
    this.handleRoute();
  }

  handleRoute() {
    const rawPath = this.getHash();
    const cleanPath = rawPath.split('?')[0];

    window.scrollTo(0, 0);

    // App routes start with /app, /splash, /onboarding
    const isAppRoute = cleanPath.startsWith('/app') || cleanPath === '/splash' || cleanPath === '/onboarding';

    let html = '';
    let listenerInit = null;

    switch (cleanPath) {
      case '/':
      case '':
        html = renderLandingView();
        break;
      case '/how-it-works':
        html = renderHowItWorksView();
        break;
      case '/security':
        html = renderSecurityView();
        break;
      case '/support':
        html = renderSupportView();
        listenerInit = initSupportListeners;
        break;
      case '/splash':
        html = renderSplashView();
        listenerInit = initSplashRouting;
        break;
      case '/onboarding':
        html = renderOnboardingView();
        listenerInit = initOnboardingListeners;
        break;
      case '/login':
        html = renderLoginView();
        listenerInit = initLoginListeners;
        break;
      case '/signup':
        html = renderSignupView();
        listenerInit = initSignupListeners;
        break;
      case '/verify':
        html = renderVerifyOtpView();
        listenerInit = initVerifyOtpListeners;
        break;
      
      // Mobile / Web App Routes
      case '/app':
        html = renderDashboardView();
        listenerInit = initDashboardListeners;
        break;
      case '/app/add-money':
        html = renderAddMoneyView();
        listenerInit = initAddMoneyListeners;
        break;
      case '/app/send':
        html = renderSendMoneyView();
        listenerInit = initSendMoneyListeners;
        break;
      case '/app/receive':
        html = renderReceiveMoneyView();
        listenerInit = initReceiveMoneyListeners;
        break;
      case '/app/qr-pay':
        html = renderQrPayView();
        listenerInit = initQrPayListeners;
        break;
      case '/app/airtime':
        html = renderAirtimeView();
        listenerInit = initAirtimeListeners;
        break;
      case '/app/data':
        html = renderDataPlansView();
        listenerInit = initDataPlansListeners;
        break;
      case '/app/bills':
        html = renderBillsView();
        listenerInit = initBillsListeners;
        break;
      case '/app/electricity':
      case '/app/power':
        html = renderElectricityView();
        listenerInit = initElectricityListeners;
        break;
      case '/app/services':
      case '/app/service':
        html = renderServicesView();
        listenerInit = initServicesListeners;
        break;
      case '/app/transactions':
        html = renderActivityView();
        listenerInit = initActivityListeners;
        break;
      case '/app/profile':
        html = renderProfileView();
        listenerInit = initProfileListeners;
        break;

      case '/app/cooperative':
      case '/app/coop':
        html = renderCooperativeView();
        listenerInit = initCooperativeListeners;
        break;
      case '/app/cooperative-admin':
      case '/app/coop-admin':
        html = renderCooperativeAdminView();
        listenerInit = initCooperativeAdminListeners;
        break;
      case '/app/paysmallsmall':
      case '/app/marketplace':
        html = renderPaySmallSmallView();
        listenerInit = initPaySmallSmallListeners;
        break;
      case '/app/loans':
        html = renderLoansView();
        listenerInit = initLoansListeners;
        break;
      case '/app/atm':
        html = renderAtmView();
        listenerInit = initAtmListeners;
        break;
      case '/app/community':
        html = renderCommunityView();
        listenerInit = initCommunityListeners;
        break;
      case '/app/osusu':
        html = renderOsusuView();
        listenerInit = initOsusuListeners;
        break;
      case '/app/zref':
        html = renderZrefView();
        listenerInit = initZrefListeners;
        break;
      case '/app/zso':
        html = renderZsoView();
        listenerInit = initZsoListeners;
        break;

      default:
        html = renderLandingView();
        break;
    }

    // Wrap app routes if device frame is toggled or for desktop app presentation
    if (isAppRoute && cleanPath.startsWith('/app')) {
      this.appElement.innerHTML = `
        <div style="min-height: 100vh; background: var(--bg-app); display: flex; justify-content: center; align-items: flex-start; padding: ${this.deviceFrameMode ? '40px 10px' : '0'};">
          ${this.deviceFrameMode ? `
            <div class="phone-mockup-frame" style="width: 390px; height: 820px; box-shadow: 0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0,210,106,0.2);">
              <div class="phone-notch">
                <div class="phone-speaker"></div>
                <div class="phone-camera"></div>
              </div>
              <div class="phone-screen" style="padding-top: 10px;">
                ${html}
              </div>
            </div>
          ` : `
            <div style="width: 100%; max-width: 480px; min-height: 100vh; background: var(--bg-app); box-shadow: 0 0 50px rgba(0,0,0,0.5);">
              ${html}
            </div>
          `}

          <!-- Floating Simulator Mode Switcher on Desktop -->
          <div class="mode-switcher-bar">
            <span style="color: var(--text-secondary);">View:</span>
            <button id="toggle-frame-mode" class="zpay-btn zpay-btn-secondary zpay-btn-sm" style="padding: 4px 10px; font-size: 11px;">
              ${this.deviceFrameMode ? '🖥️ Full Screen App' : '📱 Mobile Mockup'}
            </button>
            <a href="#/" class="zpay-btn zpay-btn-ghost zpay-btn-sm" style="padding: 4px 8px; font-size: 11px;">
              🌐 Website
            </a>
          </div>
        </div>
      `;

      const toggleBtn = document.getElementById('toggle-frame-mode');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => this.toggleDeviceFrame());
      }
    } else {
      this.appElement.innerHTML = html;
    }

    if (listenerInit) {
      setTimeout(() => listenerInit(), 0);
    }
  }
}

export { Router };
