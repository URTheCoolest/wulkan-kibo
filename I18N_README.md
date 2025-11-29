# Wulkan Kibo - Internationalization (i18n) Documentation

## Overview

The Wulkan Kibo website now supports **three languages**:
- 🇵🇱 **Polish (pl)** - Default language
- 🇬🇧 **English (en)**
- 🇫🇷 **French (fr)**

All pages are fully translated, including navigation, content, forms, and footers.

---

## How It Works

### 1. **Language Switcher**
Every page has a language dropdown in the navigation bar:
```html
<select id="lang-select" aria-label="Wybierz język">
  <option value="pl">Polski</option>
  <option value="en">Angielski</option>
  <option value="fr">Francuski</option>
</select>
```

When a user selects a language:
- The selection is saved to `localStorage` (persists across page reloads)
- All text marked with `data-i18n` attributes is instantly translated
- The change applies across all pages

### 2. **Translation Files**

Located in `assets/i18n/`:
- `pl.json` - Polish translations
- `en.json` - English translations
- `fr.json` - French translations

**Structure example:**
```json
{
  "site": {
    "nav": {
      "home": "Home",
      "about": "About",
      "contact": "Contact",
      "recipes": "Recipes"
    }
  },
  "home": {
    "heroTitle": "Discover the Rich Flavors of Africa",
    "heroSubtitle": "Learn authentic African recipes..."
  }
}
```

### 3. **Translation Script**

The `assets/js/i18n.js` script:
- Loads the appropriate JSON file based on selected language
- Updates all elements with `data-i18n` attributes
- Supports nested keys (e.g., `site.nav.home`)
- Handles both text content and HTML attributes

---

## Usage Guide

### Marking Text for Translation

**Basic text content:**
```html
<h1 data-i18n="about.title">O Wulkan Kibo</h1>
```

**Attributes (like placeholders):**
```html
<input 
  data-i18n="contact.emailPlaceholder"
  data-i18n-attr="placeholder"
  placeholder="your.email@example.com">
```

**HTML content (use sparingly):**
```html
<p data-i18n="about.intro" data-i18n-html>Rich <strong>flavors</strong> of Africa</p>
```

### Key Naming Convention

Keys follow a hierarchical structure:
- `site.*` - Sitewide elements (nav, footer, language selector)
- `home.*` - Homepage content
- `about.*` - About page content
- `contact.*` - Contact page content
- `thankYou.*` - Thank you page content
- `recipes.*` - Recipe pages content

---

## Adding New Translations

### Step 1: Add keys to JSON files

In `assets/i18n/pl.json`:
```json
{
  "newSection": {
    "title": "Nowy Tytuł",
    "description": "Opis po polsku"
  }
}
```

In `assets/i18n/en.json`:
```json
{
  "newSection": {
    "title": "New Title",
    "description": "Description in English"
  }
}
```

In `assets/i18n/fr.json`:
```json
{
  "newSection": {
    "title": "Nouveau Titre",
    "description": "Description en français"
  }
}
```

### Step 2: Mark HTML elements

```html
<h2 data-i18n="newSection.title">Nowy Tytuł</h2>
<p data-i18n="newSection.description">Opis po polsku</p>
```

### Step 3: Test

1. Open the page in a browser
2. Use the language dropdown
3. Verify all three languages display correctly

---

## Translated Pages

✅ **All pages are fully translated:**
- `index.html` - Homepage with hero, search, recipe cards
- `about.html` - About page with team bios, mission, history
- `contact.html` - Contact form with labels, placeholders, FAQ
- `thank-you.html` - Thank you confirmation page
- `recipes/index.html` - Recipe listing page with filters
- `recipes/african-jollof.html` - Jollof Rice recipe
- `recipes/peanut-stew.html` - Peanut Stew recipe
- `recipes/plantain-fritters.html` - Plantain Fritters recipe

---

## Technical Details

### Initialization

The i18n system initializes on `DOMContentLoaded`:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  initI18n(); // Loads saved language and applies translations
  
  const select = document.querySelector('#lang-select');
  select.addEventListener('change', (e) => {
    onLangChange(e.target.value); // Applies new language
  });
});
```

### Storage

Language preference is stored in `localStorage`:
```javascript
localStorage.setItem('site.lang', 'en'); // Save
localStorage.getItem('site.lang');       // Retrieve
```

### Translation Loading

Translations are loaded asynchronously:
```javascript
async function loadTranslations(lang){
  const res = await fetch(`/assets/i18n/${lang}.json`);
  return res.json();
}
```

### DOM Updates

Elements are updated via:
```javascript
element.textContent = translatedValue;  // For text
element.innerHTML = translatedValue;    // For HTML (with data-i18n-html)
element.setAttribute(attr, translatedValue); // For attributes
```

---

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Works without JavaScript (shows default Polish text)

---

## SEO Considerations

**Current Implementation:**
- Client-side translation (JavaScript-based)
- Default language (Polish) is in HTML source
- Google can index Polish content

**For Better SEO:**
Consider creating separate HTML files per language:
- `/en/about.html` - English version
- `/fr/about.html` - French version
- Or use server-side rendering with `lang` attribute updates

---

## Troubleshooting

### Issue: Translations not loading
**Check:**
1. Browser console for errors
2. Translation JSON files are accessible at `/assets/i18n/`
3. Keys match between HTML and JSON files

### Issue: Some text not translating
**Check:**
1. Element has `data-i18n` attribute
2. Key exists in all three JSON files
3. Key path is correct (e.g., `site.nav.home`)

### Issue: Placeholder not translating
**Make sure you have both:**
```html
<input 
  data-i18n="key.path"
  data-i18n-attr="placeholder">
```

---

## Future Enhancements

Potential improvements:
- [ ] Add language auto-detection based on browser settings
- [ ] Create server-side rendering for better SEO
- [ ] Add more languages (German, Spanish, etc.)
- [ ] Implement language-specific URLs (`/pl/`, `/en/`, `/fr/`)
- [ ] Add language switcher flags/icons
- [ ] Create translation management interface

---

## Credits

**Implementation:**
- Translation system: Custom JavaScript (i18n.js)
- Languages: Polish (native), English, French
- All translations completed: November 2025

For questions or issues, contact the Wulkan Kibo team at wulkan.kibo@gmail.com
