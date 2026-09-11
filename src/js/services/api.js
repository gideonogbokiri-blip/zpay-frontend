/**
 * ZPay API Service
 * Connects frontend to the production backend on Render (https://zpay-backend.onrender.com)
 * with automatic fallback to local backend (http://localhost:3001) during local development.
 */

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? (window.__USE_LOCAL_BACKEND__ ? 'http://localhost:3001' : 'https://zpay-backend.onrender.com')
  : 'https://zpay-backend.onrender.com';

export async function request(endpoint, options = {}) {
  const token = localStorage.getItem('zpay_token') || sessionStorage.getItem('zpay_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    // If Render is waking up or fetch failed on local, try alternative if appropriate
    if (API_BASE !== 'http://localhost:3001' && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
      try {
        const localRes = await fetch(`http://localhost:3001${endpoint}`, { ...options, headers });
        const localData = await localRes.json().catch(() => ({}));
        if (localRes.ok) return localData;
      } catch (_) {}
    }
    throw err;
  }
}

// Auth Endpoints
export async function signupUser({ fullName, phone, email, password }) {
  return request('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ fullName, phone, email, password })
  });
}

export async function verifyOtpCode({ verificationId, code }) {
  return request('/api/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ verificationId, code })
  });
}

export async function createPin({ pin }) {
  return request('/api/auth/create-pin', {
    method: 'POST',
    body: JSON.stringify({ pin })
  });
}

export async function loginUser({ identifier, password }) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password })
  });
}

// Wallet Funding Endpoint
export async function fundWallet({ amount, method = 'card' }) {
  return request('/api/wallet/fund', {
    method: 'POST',
    body: JSON.stringify({ amount, method })
  });
}

// Pay Utility / Buy Service Endpoint
export async function payService({ service, providerId, customerIdentifier, amount, pin }) {
  return request('/api/transactions/pay', {
    method: 'POST',
    body: JSON.stringify({ service, providerId, customerIdentifier, amount, pin })
  });
}
