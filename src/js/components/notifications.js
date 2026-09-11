// Toast and Notification System

export function showToast(message, type = 'success') {
  let container = document.getElementById('zpay-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'zpay-toast-container';
    container.className = 'zpay-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `zpay-toast ${type === 'error' ? 'toast-error' : ''}`;
  
  const icon = type === 'error' ? '⚠️' : '✅';
  toast.innerHTML = `
    <span style="font-size: 16px;">${icon}</span>
    <span style="flex: 1; font-weight: 500;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
