/**
 * Wulkan Kibo - Main JavaScript
 * Handles navigation, search, filtering, modals, and interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // Theme Toggle
  // ========================================
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Function to set the theme
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Initialize theme: use saved, else system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    setTheme(savedTheme);
  } else {
    const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', systemTheme);
  }

  // Keep in sync with system if user hasn't chosen explicitly
  if (!savedTheme) {
    try {
      prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
      });
    } catch (_) {
      // Fallback for older browsers
      prefersDarkScheme.addListener && prefersDarkScheme.addListener((e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
      });
    }
  }

  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }
  
  // ========================================
  // Mobile Navigation Toggle
  // ========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // ========================================
  // Search Functionality (Debounced)
  // ========================================
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  function performSearch(searchTerm, cards) {
    searchTerm = searchTerm.toLowerCase().trim();
    let visibleCount = 0;
    
    cards.forEach(card => {
      const title = card.getAttribute('data-title')?.toLowerCase() || '';
      const tags = card.getAttribute('data-tags')?.toLowerCase() || '';
      const ingredients = card.getAttribute('data-ingredients')?.toLowerCase() || '';
      
      const matches = title.includes(searchTerm) || 
                      tags.includes(searchTerm) || 
                      ingredients.includes(searchTerm);
      
      if (matches || searchTerm === '') {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    updateResultsCount(visibleCount);
    return visibleCount;
  }
  
  // Home page search
  const homeSearch = document.getElementById('home-search');
  if (homeSearch) {
    const featuredRecipes = document.querySelectorAll('#featured-recipes .recipe-card');
    
    const debouncedSearch = debounce((searchTerm) => {
      performSearch(searchTerm, featuredRecipes);
    }, 300);
    
    homeSearch.addEventListener('input', (e) => {
      debouncedSearch(e.target.value);
    });
  }
  
  // Recipe page search
  const recipeSearch = document.getElementById('recipe-search');
  if (recipeSearch) {
    const allRecipeCards = document.querySelectorAll('#recipes-container .recipe-card');
    
    const debouncedRecipeSearch = debounce((searchTerm) => {
      const visibleCount = performSearch(searchTerm, allRecipeCards);
      showNoResults(visibleCount === 0);
    }, 300);
    
    recipeSearch.addEventListener('input', (e) => {
      debouncedRecipeSearch(e.target.value);
    });
  }
  
  // ========================================
  // Filter Functionality
  // ========================================
  const filterTags = document.querySelectorAll('.filter-tag');
  const recipesContainer = document.getElementById('recipes-container');
  
  if (filterTags.length > 0 && recipesContainer) {
    const recipeCards = recipesContainer.querySelectorAll('.recipe-card');
    
    filterTags.forEach(tag => {
      tag.addEventListener('click', function() {
        // Update active state
        filterTags.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        let visibleCount = 0;
        
        recipeCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = '';
            visibleCount++;
          } else {
            const cardTags = card.getAttribute('data-tags') || '';
            if (cardTags.includes(filterValue)) {
              card.style.display = '';
              visibleCount++;
            } else {
              card.style.display = 'none';
            }
          }
        });
        
        updateResultsCount(visibleCount);
        showNoResults(visibleCount === 0);
      });
    });
  }
  
  function updateResultsCount(count) {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
      const countSpan = resultsCount.querySelector('.count');
      if (countSpan) {
        countSpan.textContent = count;
      }
    }
  }
  
  function showNoResults(show) {
    const noResults = document.getElementById('no-results');
    if (noResults) {
      noResults.style.display = show ? 'block' : 'none';
    }
  }
  
  // ========================================
  // Video Modal
  // ========================================
  const modal = document.getElementById('video-modal');
  const modalOverlay = modal?.querySelector('.modal-overlay');
  const modalClose = modal?.querySelector('.modal-close');
  const videoContainer = document.getElementById('video-container');
  
  // Open modal
  document.querySelectorAll('[data-video]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const videoId = this.getAttribute('data-video');
      openVideoModal(videoId);
    });
  });
  
  function openVideoModal(videoId) {
    if (!modal || !videoContainer) return;
    
    // Create YouTube iframe
    const iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.title = 'Video Player';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus trap
    modalClose?.focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
  
  function closeVideoModal() {
    if (!modal || !videoContainer) return;
    
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    videoContainer.innerHTML = '';
    document.body.style.overflow = '';
  }
  
  // Close modal handlers
  if (modalClose) {
    modalClose.addEventListener('click', closeVideoModal);
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeVideoModal);
  }
  
  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeVideoModal();
    }
  });
  
  // ========================================
  // Lazy Loading Images (Fallback for older browsers)
  // ========================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // ========================================
  // Share Functionality
  // ========================================
  const shareButtons = document.querySelectorAll('[data-share="native"]');
  
  shareButtons.forEach(btn => {
    btn.addEventListener('click', async function() {
      const shareData = {
        title: document.title,
        text: document.querySelector('meta[name="description"]')?.content || '',
        url: window.location.href
      };
      
      // Check if Web Share API is supported
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.error('Share failed:', err);
            fallbackShare();
          }
        }
      } else {
        fallbackShare();
      }
    });
  });
  
  function fallbackShare() {
    // Copy URL to clipboard as fallback
    const url = window.location.href;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        promptManualCopy(url);
      });
    } else {
      promptManualCopy(url);
    }
  }
  
  function promptManualCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      alert('Link copied to clipboard!');
    } catch (err) {
      alert('Please copy this link: ' + text);
    }
    
    document.body.removeChild(textarea);
  }
  
  // ========================================
  // Contact Form Handling
  // ========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual endpoint)
      // Option 1: Use Formspree - uncomment the action attribute in HTML
      // Option 2: Use serverless function - implement /api/contact
      
      // Demo: Simulate success after 1 second
      setTimeout(() => {
        showFormStatus('success', 'Thank you! Your message has been sent. (This is a demo - configure form submission in the code)');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
      
      // For real implementation with Formspree, use:
      /*
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          showFormStatus('success', 'Thank you! Your message has been sent.');
          contactForm.reset();
        } else {
          showFormStatus('error', 'Oops! There was a problem sending your message.');
        }
      } catch (error) {
        showFormStatus('error', 'Oops! There was a problem sending your message.');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
      */
    });
  }
  
  function showFormStatus(type, message) {
    if (!formStatus) return;
    
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 5000);
  }
  
  // ========================================
  // Simple Pagination (Client-side)
  // ========================================
  const paginationContainer = document.getElementById('pagination');
  const itemsPerPage = 6;
  
  if (paginationContainer && recipesContainer) {
    const allCards = Array.from(recipesContainer.querySelectorAll('.recipe-card'));
    let currentPage = 1;
    
    function showPage(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      
      allCards.forEach((card, index) => {
        if (index >= start && index < end && card.style.display !== 'none') {
          card.style.display = '';
        } else if (card.style.display !== 'none') {
          card.style.display = 'none';
        }
      });
      
      currentPage = page;
      renderPagination();
      
      // Scroll to top of recipes
      recipesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function renderPagination() {
      const visibleCards = allCards.filter(card => {
        const computedStyle = window.getComputedStyle(card);
        return computedStyle.display !== 'none';
      });
      
      const totalPages = Math.ceil(visibleCards.length / itemsPerPage);
      
      if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
      }
      
      let html = '';
      
      // Previous button
      html += `<button ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}" aria-label="Previous page">‹ Prev</button>`;
      
      // Page numbers
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
          html += `<button class="${i === currentPage ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}" ${i === currentPage ? 'aria-current="page"' : ''}>${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
          html += `<span>...</span>`;
        }
      }
      
      // Next button
      html += `<button ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}" aria-label="Next page">Next ›</button>`;
      
      paginationContainer.innerHTML = html;
      
      // Add event listeners
      paginationContainer.querySelectorAll('button[data-page]').forEach(btn => {
        btn.addEventListener('click', function() {
          const page = parseInt(this.getAttribute('data-page'));
          showPage(page);
        });
      });
    }
    
    // Initialize pagination if needed
    if (allCards.length > itemsPerPage) {
      showPage(1);
    }
  }
  
  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        history.pushState(null, null, href);
      }
    });
  });
  
  // ========================================
  // Recipe Structured Data Helper
  // (For future dynamic recipe generation)
  // ========================================
  function generateRecipeStructuredData(recipeData) {
    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": recipeData.name,
      "image": recipeData.image,
      "author": {
        "@type": "Organization",
        "name": "Wulkan Kibo"
      },
      "datePublished": recipeData.datePublished,
      "description": recipeData.description,
      "prepTime": recipeData.prepTime,
      "cookTime": recipeData.cookTime,
      "totalTime": recipeData.totalTime,
      "recipeYield": recipeData.servings,
      "recipeCategory": recipeData.category,
      "recipeCuisine": recipeData.cuisine,
      "keywords": recipeData.keywords,
      "recipeIngredient": recipeData.ingredients,
      "recipeInstructions": recipeData.instructions.map((step, index) => ({
        "@type": "HowToStep",
        "text": step
      }))
    };
    
    return structuredData;
  }
  
  // ========================================
  // Print Recipe Functionality Enhancement
  // ========================================
  window.addEventListener('beforeprint', function() {
    // Expand all collapsed sections before printing
    document.querySelectorAll('details').forEach(detail => {
      detail.setAttribute('open', '');
    });
  });
  
  // ========================================
  // Console Welcome Message
  // ========================================
  console.log('%c🌋 Wulkan Kibo', 'font-size: 24px; font-weight: bold; color: #d97706;');
  console.log('%cWelcome to Wulkan Kibo! Thanks for checking out the code.', 'font-size: 14px; color: #6b7280;');
  console.log('%cThis site is open source under the MIT License.', 'font-size: 12px; color: #9ca3af;');
  
});

// ========================================
// Sitemap Generator (Development Helper)
// ========================================
function generateSitemap() {
  const baseUrl = window.location.origin;
  const pages = [
    '/',
    '/recipes/',
    '/recipes/african-jollof.html',
    '/recipes/peanut-stew.html',
    '/recipes/plantain-fritters.html',
    '/about.html',
    '/contact.html'
  ];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  pages.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${page}</loc>\n`;
    sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  console.log('Generated Sitemap:\n', sitemap);
  return sitemap;
}

// Expose for console access during development
window.generateSitemap = generateSitemap;

// ========================================
// Vercel Speed Insights
// ========================================
// Load Vercel Speed Insights safely (don't break the app if it fails)
try {
  import('https://cdn.jsdelivr.net/npm/@vercel/speed-insights@latest/dist/speed-insights.mjs')
    .then(({ injectSpeedInsights }) => {
      try { injectSpeedInsights(); } catch (_) { /* noop */ }
    })
    .catch(() => { /* noop */ });
} catch (_) {
  // Dynamic import not supported; skip insights
}