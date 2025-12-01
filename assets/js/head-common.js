(function(){
  // Prevent flash of unstyled content by forcing dark theme early
  document.documentElement.setAttribute('data-theme','dark');

  // Google Analytics default consent (deny until accepted)
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('consent','default',{
    'analytics_storage':'denied',
    'ad_storage':'denied',
    'ad_user_data':'denied',
    'ad_personalization':'denied'
  });

  // Queue GA init + config (GA script loads async after this)
  gtag('js', new Date());
  gtag('config','G-20L5TV2NMP');

  // Vercel Web Analytics stub
  window.va = window.va || function(){ (window.vaq = window.vaq || []).push(arguments); };
})();
