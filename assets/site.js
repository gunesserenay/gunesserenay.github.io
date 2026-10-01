(() => {
  'use strict';
  let enabled = false;
  const allowedEvents = new Set(['google_play_click', 'app_store_click', 'privacy_click', 'terms_click', 'support_click']);
  function enableAnalytics() {
    const config = window.AIChefAnalyticsConfig || {};
    if (enabled || config.consentGranted !== true || !/^G-[A-Z0-9]+$/.test(config.measurementId || '') || config.measurementId === 'G-XXXXXXXXXX') return;
    enabled = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', config.measurementId, { send_page_view: true, allow_google_signals: false, allow_ad_personalization_signals: false });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.measurementId);
    document.head.appendChild(script);
  }
  // A future consent manager can set consentGranted and dispatch this event after consent.
  window.addEventListener('aichef:analytics-consent', () => {
    if (window.AIChefAnalyticsConfig?.consentGranted === true) {
      if (enabled) {
        window['ga-disable-' + window.AIChefAnalyticsConfig.measurementId] = false;
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
      } else enableAnalytics();
    }
    else if (enabled) {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
      window['ga-disable-' + window.AIChefAnalyticsConfig.measurementId] = true;
    }
  });
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-event]');
    if (!link || !enabled || window.AIChefAnalyticsConfig?.consentGranted !== true || !allowedEvents.has(link.dataset.event)) return;
    window.gtag('event', link.dataset.event, { link_url: link.href, link_location: link.dataset.location || 'navigation', transport_type: 'beacon' });
  });
  enableAnalytics();
})();
