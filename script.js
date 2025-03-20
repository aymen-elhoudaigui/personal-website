// Theme Configuration
const themes = {
    professional: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      accent: '#0f3460'
    },
    modern: {
      primary: '#2d3436',
      secondary: '#353b48',
      accent: '#0984e3'
    },
    creative: {
      primary: '#2c2c54',
      secondary: '#474787',
      accent: '#706fd3'
    },
    dark: {
      primary: '#000000',
      secondary: '#121212',
      accent: '#BB86FC'
    },
    night: {
      primary: '#10002b',
      secondary: '#240046',
      accent: '#9d4edd'
    }
  };
  
  // Font Size Configuration
  const fontSizes = {
    small: {
      base: '14px',
      title: '2.2rem',
      subtitle: '1rem'
    },
    medium: {
      base: '16px',
      title: '2.5rem',
      subtitle: '1.1rem'
    },
    large: {
      base: '18px',
      title: '2.8rem',
      subtitle: '1.2rem'
    },
    xlarge: {
      base: '20px',
      title: '3rem',
      subtitle: '1.3rem'
    }
  };
  
  // Content Density Configuration
  const densities = {
    comfortable: {
      spacing: '2rem',
      padding: '2.5rem'
    },
    compact: {
      spacing: '1rem',
      padding: '1.5rem'
    },
    spacious: {
      spacing: '3rem',
      padding: '3rem'
    }
  };
  
  // Animation Presets
  const animationPresets = {
    smooth: {
      duration: '0.3s',
      timing: 'ease'
    },
    quick: {
      duration: '0.15s',
      timing: 'ease-out'
    },
    bounce: {
      duration: '0.5s',
      timing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  };
  
  // Navigation Handler
  class Navigation {
    constructor() {
      this.tabItems = document.querySelectorAll('.tab-item');
      this.sections = document.querySelectorAll('.section');
      this.initializeEventListeners();
      this.initializeFirstSection();
    }
  
    initializeEventListeners() {
      this.tabItems.forEach(tab => {
        tab.addEventListener('click', (e) => this.handleTabClick(e, tab));
      });
  
      window.addEventListener('hashchange', () => this.handleHashChange());
    }
  
    initializeFirstSection() {
      const hash = window.location.hash || '#home';
      this.activateTabFromHash(hash);
    }
  
    handleHashChange() {
      const hash = window.location.hash || '#home';
      this.activateTabFromHash(hash);
    }
  
    activateTabFromHash(hash) {
      const targetTab = document.querySelector(`.tab-item[href="${hash}"]`);
      if (targetTab) {
        this.handleTabClick(new Event('click'), targetTab);
      }
    }
  
    handleTabClick(e, tab) {
      e.preventDefault();
      this.deactivateAllTabs();
      this.activateTab(tab);
    }
  
    deactivateAllTabs() {
      this.tabItems.forEach(t => t.classList.remove('active'));
      this.sections.forEach(s => {
        s.classList.remove('active');
        s.style.opacity = '0';
      });
    }
  
    activateTab(tab) {
      tab.classList.add('active');
      const sectionId = tab.getAttribute('data-section');
      const activeSection = document.getElementById(sectionId);
      if (activeSection) {
        activeSection.classList.add('active');
        void activeSection.offsetWidth;
        activeSection.style.opacity = '1';
        activeSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  
  // Theme Manager
  class ThemeManager {
    constructor() {
      this.colorBtns = document.querySelectorAll('.color-btn');
      this.root = document.documentElement;
      this.initializeThemes();
    }
  
    initializeThemes() {
      this.colorBtns.forEach(btn => {
        const themeName = btn.getAttribute('data-theme');
        const theme = themes[themeName];
        btn.style.backgroundColor = theme.primary;
        btn.addEventListener('click', () => this.applyTheme(theme, btn));
      });
    }
  
    applyTheme(theme, btn) {
      this.root.style.setProperty('--primary-color', theme.primary);
      this.root.style.setProperty('--secondary-color', theme.secondary);
      this.root.style.setProperty('--accent-color', theme.accent);
      this.animateButton(btn);
    }
  
    animateButton(btn) {
      btn.style.transform = 'scale(1.1)';
      setTimeout(() => btn.style.transform = 'scale(1)', 200);
    }
  }
  
  // Settings Manager
  class SettingsManager {
    constructor() {
        this.fontSelect = document.getElementById('fontSize');
        this.densitySelect = document.getElementById('contentDensity');
        this.animationSelect = document.getElementById('animationStyle');
        this.themeToggle = document.getElementById('themeToggle'); // Updated ID
        this.motionToggle = document.getElementById('reduceMotion');
        this.root = document.documentElement;
        this.initializeEventListeners();
        this.loadSavedSettings();
    }

    initializeEventListeners() {
        if (this.fontSelect) {
            this.fontSelect.addEventListener('change', (e) => this.handleFontChange(e));
        }
        if (this.densitySelect) {
            this.densitySelect.addEventListener('change', (e) => this.handleDensityChange(e));
        }
        if (this.animationSelect) {
            this.animationSelect.addEventListener('change', (e) => this.handleAnimationChange(e));
        }
        if (this.themeToggle) {
            this.themeToggle.addEventListener('change', (e) => this.handleThemeChange(e)); // Updated handler
        }
        if (this.motionToggle) {
            this.motionToggle.addEventListener('change', (e) => this.handleMotionChange(e));
        }
    }

    loadSavedSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('portfolioSettings') || '{}');

        if (savedSettings.fontSize) {
            this.fontSelect.value = savedSettings.fontSize;
            this.handleFontChange({ target: { value: savedSettings.fontSize } });
        }

        if (savedSettings.density) {
            this.densitySelect.value = savedSettings.density;
            this.handleDensityChange({ target: { value: savedSettings.density } });
        }

        if (savedSettings.animation) {
            this.animationSelect.value = savedSettings.animation;
            this.handleAnimationChange({ target: { value: savedSettings.animation } });
        }

        if (savedSettings.theme !== undefined) {
            this.themeToggle.checked = savedSettings.theme === 'light';
            this.handleThemeChange({ target: { checked: savedSettings.theme === 'light' } });
        }

        if (savedSettings.reduceMotion !== undefined) {
            this.motionToggle.checked = savedSettings.reduceMotion;
            this.handleMotionChange({ target: { checked: savedSettings.reduceMotion } });
        }
    }

    saveSettings(settings) {
        const currentSettings = JSON.parse(localStorage.getItem('portfolioSettings') || '{}');
        localStorage.setItem('portfolioSettings', JSON.stringify({
            ...currentSettings,
            ...settings
        }));
    }

    handleFontChange(e) {
        const size = fontSizes[e.target.value];
        document.body.style.fontSize = size.base;
        document.querySelector('h1').style.fontSize = size.title;
        document.querySelector('.subtitle').style.fontSize = size.subtitle;
        this.saveSettings({ fontSize: e.target.value });
    }

    handleDensityChange(e) {
        const density = densities[e.target.value];
        this.root.style.setProperty('--section-spacing', density.spacing);
        this.root.style.setProperty('--section-padding', density.padding);
        this.saveSettings({ density: e.target.value });
    }

    handleAnimationChange(e) {
        const animation = animationPresets[e.target.value];
        this.root.style.setProperty('--transition-duration', animation.duration);
        this.root.style.setProperty('--transition-timing', animation.timing);
        this.saveSettings({ animation: e.target.value });
    }

    handleThemeChange(e) {
        const theme = e.target.checked ? 'light' : 'dark';
        this.applyTheme(themes[theme]);
        this.saveSettings({ theme });
    }

    applyTheme(theme) {
        this.root.style.setProperty('--primary-color', theme.primary);
        this.root.style.setProperty('--secondary-color', theme.secondary);
        this.root.style.setProperty('--accent-color', theme.accent);
        this.root.style.setProperty('--text-color', theme.text);
        this.root.style.setProperty('--background-color', theme.background);
    }

    handleMotionChange(e) {
        if (e.target.checked) {
            this.root.classList.add('reduce-motion');
        } else {
            this.root.classList.remove('reduce-motion');
        }
        this.saveSettings({ reduceMotion: e.target.checked });
    }
}  
  // Profile Picture Effects
  class ProfilePicture {
    constructor() {
      this.profilePic = document.querySelector('.profile-pic');
      if (this.profilePic) {
        this.initializeEventListeners();
      }
    }
  
    initializeEventListeners() {
      this.profilePic.addEventListener('mouseover', () => this.handleMouseOver());
      this.profilePic.addEventListener('mouseout', () => this.handleMouseOut());
    }
  
    handleMouseOver() {
      if (!document.documentElement.classList.contains('reduce-motion')) {
        this.profilePic.style.transform = 'scale(1.1) rotate(5deg)';
        this.profilePic.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
      }
    }
  
    handleMouseOut() {
      this.profilePic.style.transform = 'scale(1) rotate(0deg)';
      this.profilePic.style.boxShadow = 'none';
    }
  }
  
  // Scroll Animation Manager
  class ScrollAnimationManager {
    constructor() {
      this.observerOptions = {
        threshold: 0.1,
        rootMargin: '20px'
      };
      this.initializeObserver();
      this.observeElements();
    }
  
    initializeObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, this.observerOptions);
    }
  
    observeElements() {
      document.querySelectorAll('.timeline-item, .skill-category').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        this.observer.observe(item);
      });
    }
  }
  
  // Initialize all components
  document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new ThemeManager();
    new SettingsManager();
    new ProfilePicture();
    new ScrollAnimationManager();
  });