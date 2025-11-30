# 🌋 Wulkan Kibo

> Learn to cook authentic African dishes with video tutorials, detailed recipes, and step-by-step instructions.

**Wulkan Kibo** is a multilingual web platform dedicated to sharing the rich culinary traditions of African cuisine with the world. Through comprehensive video tutorials, detailed recipes, and cultural insights, we make it easy for anyone to master authentic African cooking at home.

## 🌍 About the Project

Wulkan Kibo (Swahili for "Volcano Kibo" - the highest peak of Mount Kilimanjaro) represents the peak of African culinary excellence. Our mission is to preserve and share traditional African recipes, cooking techniques, and food culture through an accessible, modern web experience.

### Key Features

- **🎥 Video Tutorials**: High-quality cooking demonstrations for each recipe
- **📖 Detailed Recipes**: Step-by-step instructions with ingredients, cooking times, and tips
- **🌐 Multilingual Support**: Full internationalization (Polish, English, French)
- **🔍 Smart Search & Filtering**: Find recipes by name, ingredients, or cuisine type
- **📱 Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **🌙 Dark/Light Theme**: User-selectable theme with preference persistence
- **♿ Accessible**: Built with WCAG compliance in mind
- **🚀 SEO Optimized**: Structured data, meta tags, and sitemap for discoverability

## 🍲 Recipe Collection

Current recipes include:
- **African Jollof Rice** - The iconic West African one-pot rice dish
- **West African Peanut Stew** - Rich and hearty groundnut-based stew
- **Plantain Fritters (Kelewele)** - Spiced fried plantain snack

Each recipe includes:
- JSON-LD structured data for rich search results
- Embedded YouTube video tutorials
- Detailed ingredient lists and measurements
- Step-by-step cooking instructions
- Pro tips and cultural context
- Nutritional information

## 🛠️ Technical Overview

**Type**: Static HTML website (hand-authored pages, CSS and JavaScript)  
**Deployment**: Configured for Vercel with static site deployment

## 🛠️ Technical Overview

**Type**: Static HTML website (hand-authored pages, CSS and JavaScript)  
**Deployment**: Configured for Vercel with static site deployment

### Architecture

The website is built as a modern static site with no build step required:

- **Pure HTML/CSS/JS**: No frameworks or bundlers - just clean, maintainable web standards
- **Component-based CSS**: Modular styling with CSS custom properties for theming
- **Progressive Enhancement**: Core content accessible without JavaScript
- **Client-side Rendering**: Dynamic features like search, filtering, and theme switching handled via vanilla JavaScript

### Technology Stack

- **HTML5**: Semantic markup with accessibility attributes
- **CSS3**: Modern CSS with Grid, Flexbox, custom properties, and media queries
- **Vanilla JavaScript**: Zero dependencies - all features built with native browser APIs
- **JSON-LD**: Structured data for search engine optimization
- **Google Analytics**: Privacy-focused analytics with consent management

## 📁 Project Structure

### Root Files

```
├── index.html              # Home page with hero, featured recipes, and search
├── about.html              # About page with mission and team information
├── contact.html            # Contact form (demo with client-side handling)
├── thank-you.html          # Contact form confirmation page
├── manifest.json           # PWA manifest for app-like experience
├── robots.txt              # Search engine crawler directives
├── sitemap.xml             # XML sitemap for SEO
├── vercel.json             # Vercel deployment configuration
└── LICENSE                 # MIT License
```

### HTML Pages

- **`index.html`**: Landing page featuring hero section, recipe highlights, search functionality, and video modal
- **`about.html`**: Mission statement, platform features, and team member profiles
- **`contact.html`**: Contact form with client-side validation (ready for Formspree or serverless backend integration)
- **`thank-you.html`**: Confirmation page after form submission

### Recipes Directory (`recipes/`)

```
recipes/
├── index.html              # Recipe listing with search, filters, and pagination
├── african-jollof.html     # Jollof rice recipe with video tutorial
├── peanut-stew.html        # West African peanut stew recipe
└── plantain-fritters.html  # Plantain fritters (Kelewele) recipe
```

Each recipe page includes:
- JSON-LD structured data for rich search results
- Embedded YouTube video tutorial
- Ingredient lists with measurements
- Step-by-step instructions
- Cooking tips and variations
- Navigation back to recipe index

### Assets Directory (`assets/`)

```
assets/
├── css/
│   └── styles.css          # Main stylesheet (~1000+ lines of production CSS)
├── js/
│   ├── main.js             # Core functionality (theme, nav, search, modal)
│   ├── i18n.js             # Internationalization system
│   └── cookie-consent.js   # GDPR-compliant cookie consent manager
├── i18n/
│   ├── en.json             # English translations
│   ├── fr.json             # French translations
│   └── pl.json             # Polish translations
├── icons/
│   ├── volcano.svg         # Site favicon (SVG)
│   ├── volcano-32.png      # 32x32 favicon
│   └── volcano-192.png     # 192x192 app icon
└── images/
    ├── team/               # Team member photos
    └── *.png               # Recipe thumbnails and hero images
```

## ✨ Key Features in Detail

### 🎨 Theming System

- Dark and light mode with smooth transitions
- User preference stored in `localStorage`
- System preference detection via `prefers-color-scheme`
- CSS custom properties for easy theme customization
- Theme toggle button in navigation

### 🌐 Internationalization (i18n)

The site supports three languages with dynamic content switching:

- **Polish (pl)**: Default language
- **English (en)**: Full translation
- **French (fr)**: Full translation

Translation files are loaded dynamically and content is replaced on-the-fly without page reload. The language selector persists user choice in `localStorage`.

### 🔍 Search & Filter

- **Real-time search**: Debounced search with instant results
- **Tag filtering**: Filter recipes by cuisine type, dish category, or dietary preferences
- **Client-side pagination**: Browse recipes without full page loads
- **Responsive search UI**: Works seamlessly on all device sizes

### 📹 Video Integration

- YouTube video embeds with lazy loading
- Custom video modal with keyboard navigation
- Fallback for video playback errors
- Accessible video controls

### 📧 Contact Form

The contact form includes:
- Client-side validation
- Success/error messaging
- Demo submission flow (simulated)
- Ready for integration with:
  - Formspree
  - Vercel serverless functions
  - Third-party form services

### 🍪 Cookie Consent

GDPR-compliant cookie consent manager:
- Initial consent banner
- Granular consent options (analytics, marketing)
- Google Analytics integration with consent mode
- Preference storage and recall

## 🚀 Deployment

### Vercel Configuration

The site is configured for Vercel deployment via `vercel.json`:

```json
{
  "builds": [{
    "src": "public/**",
    "use": "@vercel/static"
  }]
}
```

**Note**: The current configuration serves files from the `public/` directory. You have two options:

1. **Move files to `public/`**: Copy all HTML files and assets into `public/` directory
2. **Update `vercel.json`**: Change configuration to serve from repository root

### Deployment Steps

1. Connect repository to Vercel
2. Configure build settings (none required for static site)
3. Set environment variables (if using form backend)
4. Deploy!

The site will be automatically deployed on every push to the main branch.

## 📊 SEO & Analytics

### Search Engine Optimization

- **Meta tags**: Comprehensive Open Graph and Twitter Card tags
- **Structured data**: JSON-LD for Organization, WebSite, and Recipe schemas
- **Sitemap**: XML sitemap at `/sitemap.xml`
- **Robots.txt**: Proper crawler directives
- **Canonical URLs**: Prevent duplicate content issues
- **Hreflang tags**: Multi-language SEO support
- **Semantic HTML**: Proper heading hierarchy and landmarks

### Analytics

- **Google Analytics 4**: Configured with tag ID `G-20L5TV2NMP`
- **Consent Management**: Respects user privacy choices
- **Vercel Web Analytics**: Built-in performance monitoring
- **Custom events**: Track recipe views, video plays, form submissions

## ♿ Accessibility

The site follows WCAG 2.1 guidelines:

- **Semantic HTML**: Proper use of headings, landmarks, and ARIA attributes
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Skip Links**: Jump to main content for screen reader users
- **Focus Management**: Visible focus indicators and logical tab order
- **Alt Text**: All images include descriptive alternative text
- **Color Contrast**: Meets WCAG AA standards for text readability
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **Screen Reader Support**: ARIA labels and live regions where appropriate

## 🔧 Development

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)
- Text editor or IDE

### Local Development

Since this is a static site, you can simply open `index.html` in a browser. However, for the best experience (especially for features like i18n), use a local server:

**Option 1: Python**
```bash
python -m http.server 8000
```

**Option 2: Node.js (http-server)**
```bash
npx http-server -p 8000
```

**Option 3: VS Code Live Server**
Install the Live Server extension and click "Go Live"

Then navigate to `http://localhost:8000`

### File Organization

The site follows a simple, flat structure:
- Top-level pages in root directory
- Recipes in `/recipes/`
- All assets in `/assets/`
- No build process or compilation needed

### Adding New Recipes

1. Create a new HTML file in `/recipes/` (e.g., `new-recipe.html`)
2. Copy the structure from an existing recipe page
3. Update the recipe content, ingredients, and instructions
4. Add recipe thumbnail to `/assets/images/`
5. Include JSON-LD structured data
6. Embed YouTube video tutorial
7. Add recipe card to `/recipes/index.html`
8. Update sitemap.xml with new recipe URL

## 🗺️ Roadmap

Future enhancements planned:

- [ ] User accounts and saved recipes
- [ ] Recipe ratings and reviews
- [ ] Print-friendly recipe cards
- [ ] Ingredient shopping lists
- [ ] Cooking timer integration
- [ ] Recipe submission from community
- [ ] Newsletter subscription
- [ ] Social media sharing buttons
- [ ] Recipe collections/categories
- [ ] Advanced search filters (cooking time, difficulty, dietary restrictions)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Meet the team behind Wulkan Kibo on our [About page](about.html).

## 📬 Contact

Have questions, recipe suggestions, or feedback? Visit our [Contact page](contact.html) or reach out to us on [YouTube](https://www.youtube.com/@wulkankibo).

## 🙏 Contributing

We welcome contributions! Whether it's:
- New recipe submissions
- Translation improvements
- Bug fixes
- Feature suggestions
- Documentation updates

Please feel free to open an issue or submit a pull request.

---

**Made with ❤️ for African cuisine enthusiasts worldwide**