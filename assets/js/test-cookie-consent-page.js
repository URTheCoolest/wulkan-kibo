function checkStatus() {
  const consent = localStorage.getItem('wulkan_kibo_consent');
  const version = localStorage.getItem('wulkan_kibo_consent_version');
  const statusEl = document.getElementById('consent-status');
  if (!statusEl) return;
  if (consent) {
    statusEl.innerHTML = `
      <strong>Consent:</strong> ${consent}<br>
      <strong>Version:</strong> ${version || 'N/A'}<br>
      <strong>Status:</strong> ✅ Stored in localStorage
    `;
  } else {
    statusEl.innerHTML = `
      <strong>Status:</strong> ❌ No consent stored (modal should show)
    `;
  }
}

function resetAndReload() {
  if (typeof window.resetCookieConsent === 'function') {
    window.resetCookieConsent();
  } else {
    localStorage.removeItem('wulkan_kibo_consent');
    localStorage.removeItem('wulkan_kibo_consent_version');
    location.reload();
  }
}

// Initial status check
checkStatus();
