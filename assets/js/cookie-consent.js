/**
 * Wulkan Kibo - Cookie Consent Manager
 * Handles cookie consent across all pages with localStorage persistence
 */

(function() {
  'use strict';

  const CONSENT_KEY = 'wulkan_kibo_consent';
  const CONSENT_VERSION = '1.0'; // Update this if you change consent requirements
  const CONSENT_VERSION_KEY = 'wulkan_kibo_consent_version';

  /**
   * Initialize the cookie consent system
   */
  function initCookieConsent() {
    // Check if consent has already been given/denied
    const storedConsent = localStorage.getItem(CONSENT_KEY);
    const storedVersion = localStorage.getItem(CONSENT_VERSION_KEY);

    // If consent exists and is current version, apply it and don't show modal
    if (storedConsent && storedVersion === CONSENT_VERSION) {
      applyConsent(storedConsent);
      return;
    }

    // Otherwise, show the consent modal
    createConsentModal();
  }

  /**
   * Create and display the cookie consent modal
   */
  function createConsentModal() {
    // Create the overlay
    const overlay = document.createElement('div');
    overlay.className = 'cookie-consent-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-labelledby', 'cookie-consent-title');
    overlay.setAttribute('aria-describedby', 'cookie-consent-description');

    // Create the modal content
    overlay.innerHTML = `
      <div class="cookie-consent-modal">
        <div class="cookie-consent-icon">🍪</div>
        <h2 id="cookie-consent-title">Zgoda na pliki cookie</h2>
        <p id="cookie-consent-description">
          Ta witryna używa plików cookie i Google Analytics do analizy ruchu oraz poprawy jakości usług. 
          Czy zgadzasz się na wykorzystanie plików cookie?
        </p>
        <div class="cookie-consent-buttons">
          <button class="cookie-consent-accept" id="cookie-accept-btn">
            ✓ Tak, zgadzam się
          </button>
          <button class="cookie-consent-reject" id="cookie-reject-btn">
            ✗ Nie, dzięki
          </button>
        </div>
      </div>
    `;

    // Add to page
    document.body.appendChild(overlay);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Set up event listeners
    document.getElementById('cookie-accept-btn').addEventListener('click', () => {
      handleConsent('granted', overlay);
    });

    document.getElementById('cookie-reject-btn').addEventListener('click', () => {
      handleConsent('denied', overlay);
    });
  }

  /**
   * Handle the user's consent choice
   * @param {string} choice - 'granted' or 'denied'
   * @param {HTMLElement} overlay - The overlay element to remove
   */
  function handleConsent(choice, overlay) {
    // Save consent to localStorage
    localStorage.setItem(CONSENT_KEY, choice);
    localStorage.setItem(CONSENT_VERSION_KEY, CONSENT_VERSION);

    // Apply consent settings
    applyConsent(choice);

    // Remove modal with animation
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease-out';
    
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 300);
  }

  /**
   * Apply the consent choice to analytics
   * @param {string} choice - 'granted' or 'denied'
   */
  function applyConsent(choice) {
    if (typeof gtag === 'function') {
      if (choice === 'granted') {
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      }
      // If denied, consent remains at default 'denied' state set in HTML
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }

  // Expose a method to reset consent (useful for testing or privacy settings)
  window.resetCookieConsent = function() {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(CONSENT_VERSION_KEY);
    location.reload();
  };

})();
