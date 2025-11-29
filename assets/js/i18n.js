(function(){
  const DEFAULT_LANG = 'pl';
  const SUPPORTED = ['pl', 'en', 'fr'];
  const STORAGE_KEY = 'site.lang';

  function getCurrentLang(){
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    return DEFAULT_LANG;
  }

  function setCurrentLang(lang){
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
  }

  async function loadTranslations(lang){
    const res = await fetch(`/assets/i18n/${lang}.json`);
    if (!res.ok) throw new Error('Failed to load translations: ' + lang);
    return res.json();
  }

  function applyTranslations(dict){
    // Elements with data-i18n="key" or data-i18n-attr="title" etc.
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getNested(dict, key);
      if (val != null){
        if (el.hasAttribute('data-i18n-html')){
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });
    // Attribute translations: data-i18n-attr="title" data-i18n="key.path"
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const attr = el.getAttribute('data-i18n-attr');
      const key = el.getAttribute('data-i18n');
      const val = getNested(dict, key);
      if (val != null){
        el.setAttribute(attr, val);
      }
    });
  }

  function getNested(obj, path){
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
  }

  async function initI18n(){
    const current = getCurrentLang();
    try {
      const dict = await loadTranslations(current);
      applyTranslations(dict);
      updateLangSwitcher(current);
    } catch (e){
      console.error(e);
    }
  }

  function updateLangSwitcher(current){
    const select = document.querySelector('#lang-select');
    if (!select) return;
    select.value = current;
  }

  async function onLangChange(lang){
    setCurrentLang(lang);
    const dict = await loadTranslations(lang);
    applyTranslations(dict);
    updateLangSwitcher(lang);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initI18n();
    const select = document.querySelector('#lang-select');
    if (select){
      select.addEventListener('change', (e) => {
        const lang = e.target.value;
        onLangChange(lang);
      });
    }
  });

  // Expose minimal API if needed
  window.SiteI18n = {
    setLanguage: onLangChange,
    getLanguage: getCurrentLang
  };
})();
