// CursorRules Guide - Main JavaScript
class App {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupCodeBlocks();
        this.setupScrollEffects();
        this.setupThemeToggle();
    }
    
    setupNavigation() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Active navigation highlighting
        this.updateActiveNavigation();
        window.addEventListener('scroll', () => this.updateActiveNavigation());
        
        // Mobile navigation
        this.setupMobileNavigation();
    }
    
    setupMobileNavigation() {
        // Create mobile menu button
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer || document.querySelector('.mobile-menu-btn')) return;
        
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.style.display = 'none';
        
        // Copy navigation links to mobile menu
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const clonedLinks = navLinks.cloneNode(true);
            clonedLinks.className = 'mobile-nav-links';
            mobileMenu.appendChild(clonedLinks);
        }
        
        // Add mobile menu to nav container
        navContainer.appendChild(mobileMenuBtn);
        navContainer.appendChild(mobileMenu);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.style.display !== 'none';
            mobileMenu.style.display = isOpen ? 'none' : 'block';
            mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
            mobileMenuBtn.innerHTML = isOpen ? '☰' : '✕';
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });
        
        // Close menu when clicking on links
        mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mobileMenu.style.display = 'none';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navContainer.contains(e.target) && mobileMenu.style.display !== 'none') {
                mobileMenu.style.display = 'none';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.style.display !== 'none') {
                mobileMenu.style.display = 'none';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            }
        });
    }
    
    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    setupCodeBlocks() {
        // Add copy functionality to code blocks
        document.querySelectorAll('.code-block').forEach(block => {
            this.addCopyButton(block);
        });
        
        // Syntax highlighting (if needed)
        this.highlightCode();
    }
    
    addCopyButton(codeBlock) {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copy';
        button.addEventListener('click', () => this.copyToClipboard(codeBlock));
        
        codeBlock.style.position = 'relative';
        codeBlock.appendChild(button);
    }
    
    async copyToClipboard(codeBlock) {
        const text = codeBlock.textContent.replace('Copy', '').trim();
        
        try {
            await navigator.clipboard.writeText(text);
            this.showCopyFeedback(codeBlock);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showCopyFeedback(codeBlock);
        }
    }
    
    showCopyFeedback(codeBlock) {
        const button = codeBlock.querySelector('.copy-btn');
        const originalText = button.textContent;
        
        button.textContent = 'Copied!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }
    
    highlightCode() {
        // Basic syntax highlighting for common patterns
        document.querySelectorAll('.code-block').forEach(block => {
            let html = block.innerHTML;
            
            // Highlight comments
            html = html.replace(/(#.*$)/gm, '<span class="comment">$1</span>');
            
            // Highlight keywords
            const keywords = ['You are', '##', '###', '- Use', '- Prefer', '- Always', '- Never'];
            keywords.forEach(keyword => {
                const regex = new RegExp(`(${keyword})`, 'g');
                html = html.replace(regex, '<span class="keyword">$1</span>');
            });
            
            block.innerHTML = html;
        });
    }
    
    setupScrollEffects() {
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                hero.style.transform = `translateY(${parallax}px)`;
            });
        }
        
        // Fade in animation for sections
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.section, .feature-card, .practice-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupThemeToggle() {
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Create theme switcher if it doesn't exist
        if (!document.querySelector('.theme-switcher')) {
            this.createThemeSwitcher();
        }
        
        // Initialize festive effects if in festive mode
        if (currentTheme === 'festive') {
            this.initFestiveEffects();
        }
    }
    
    createThemeSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        
        const themes = [
            { name: 'light', icon: '☀️', label: 'Light Mode' },
            { name: 'dark', icon: '🌙', label: 'Dark Mode' },
            { name: 'festive', icon: '🎄', label: 'Festive Mode' }
        ];
        
        themes.forEach(theme => {
            const button = document.createElement('button');
            button.innerHTML = theme.icon;
            button.setAttribute('aria-label', theme.label);
            button.setAttribute('data-theme', theme.name);
            
            if (theme.name === localStorage.getItem('theme') || 
                (!localStorage.getItem('theme') && theme.name === 'light')) {
                button.classList.add('active');
            }
            
            button.addEventListener('click', () => {
                this.switchTheme(theme.name);
            });
            
            switcher.appendChild(button);
        });
        
        // Add to body
        document.body.appendChild(switcher);
    }
    
    switchTheme(themeName) {
        // Update theme
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);
        
        // Update active button
        document.querySelectorAll('.theme-switcher button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === themeName) {
                btn.classList.add('active');
            }
        });
        
        // Handle festive effects
        if (themeName === 'festive') {
            this.initFestiveEffects();
        } else {
            this.removeFestiveEffects();
        }
        
        // Add transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    initFestiveEffects() {
        // Remove existing particles
        this.removeFestiveEffects();
        
        // Create particle container
        const particleContainer = document.createElement('div');
        particleContainer.className = 'festive-particles';
        document.body.appendChild(particleContainer);
        
        // Create floating particles
        this.createFloatingParticles(particleContainer);
        
        // Add festive sound effect (optional)
        this.playFestiveSound();
        
        // Add confetti effect on theme switch
        this.createConfettiEffect();
    }
    
    removeFestiveEffects() {
        const particles = document.querySelector('.festive-particles');
        if (particles) {
            particles.remove();
        }
    }
    
    createFloatingParticles(container) {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'festive-particle';
            
            // Random position and delay
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            container.appendChild(particle);
        }
    }
    
    createConfettiEffect() {
        const colors = ['#ec4899', '#a855f7', '#10b981', '#f59e0b', '#ff6b6b', '#c084fc'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.borderRadius = '50%';
            
            document.body.appendChild(confetti);
            
            // Animate confetti
            const animation = confetti.animate([
                { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.addEventListener('finish', () => {
                confetti.remove();
            });
        }
    }
    
    playFestiveSound() {
        // Create a simple festive sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            // Silently fail if audio context is not available
            console.log('Audio not available');
        }
    }
    
    // Utility methods
    debounce(func, wait) {
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
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new App());
} else {
    new App();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
