import '../css/variables.css';
import '../css/reset.css';
import '../css/animations.css';
import '../css/components.css';
import '../css/website.css';
import '../css/app.css';
import '../css/paystack.css';

import { store } from './state/store.js';
import { Router } from './router/router.js';

document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme preference
  document.documentElement.setAttribute('data-theme', store.user.theme || 'dark');

  // Initialize router
  const appRoot = document.getElementById('app-root');
  const router = new Router(appRoot);
  router.init();

  // If on initial visit without hash, stay on #/ or route appropriately
  if (!window.location.hash) {
    window.location.hash = '#/';
  }
});
