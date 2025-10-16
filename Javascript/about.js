// About Section Interactive JavaScript
(function() {
    'use strict';

    // Initialize on DOM load
    document.addEventListener('DOMContentLoaded', function() {
        initScrollAnimations();
        initParallaxEffect();
        initImageHoverEffects();
        updateDynamicYear();
        initSmoothScrolling();
    });

    // Scroll-based reveal animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    
                    // Add staggered animation delay for multiple elements
                    const delay = entry.target.dataset.delay || 0;
                    entry.target.style.transitionDelay = delay + 'ms';
                }
            });
        }, observerOptions);

        // Observe elements with data-aos attribute
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(function(element, index) {
            // Add staggered delay
            element.dataset.delay = index * 100;
            observer.observe(element);
        });

        // Also observe other key elements
        const sections = document.querySelectorAll('.description-text, .featured-image');
        sections.forEach(function(section) {
            observer.observe(section);
        });
    }

    // Parallax effect for background
    function initParallaxEffect() {
        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) return;

        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    const sectionTop = aboutSection.offsetTop;
                    const sectionHeight = aboutSection.offsetHeight;
                    
                    // Only apply parallax when section is in view
                    if (scrolled + window.innerHeight > sectionTop && 
                        scrolled < sectionTop + sectionHeight) {
                        const parallaxValue = (scrolled - sectionTop) * 0.3;
                        aboutSection.style.backgroundPositionY = parallaxValue + 'px';
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Image hover effects with 3D transform
    function initImageHoverEffects() {
        const images = document.querySelectorAll('.featured-image');
        
        images.forEach(function(img) {
            const container = img.closest('.right-column');
            if (!container) return;

            container.addEventListener('mousemove', function(e) {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                img.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
            });

            container.addEventListener('mouseleave', function() {
                img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // Update dynamic year in content (if needed)
    function updateDynamicYear() {
        const currentYear = new Date().getFullYear();
        const yearElements = document.querySelectorAll('[data-year]');
        
        yearElements.forEach(function(element) {
            element.textContent = currentYear;
        });
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Add floating animation to description text
    function initFloatingAnimation() {
        const descText = document.querySelector('.description-text');
        if (!descText) return;

        let floatDirection = 1;
        let floatPosition = 0;

        setInterval(function() {
            floatPosition += 0.5 * floatDirection;
            
            if (floatPosition > 10 || floatPosition < -10) {
                floatDirection *= -1;
            }
            
            descText.style.transform = 'translateY(' + floatPosition + 'px)';
        }, 50);
    }

    // Lazy load images with fade-in effect
    function initLazyLoading() {
        const images = document.querySelectorAll('.featured-image');
        
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.8s ease';
                    
                    // Simulate loading
                    setTimeout(function() {
                        img.style.opacity = '1';
                    }, 100);
                    
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // Add text reveal animation
    function initTextReveal() {
        const textElements = document.querySelectorAll('.description-text');
        
        textElements.forEach(function(element) {
            const text = element.textContent;
            element.textContent = '';
            element.style.opacity = '1';
            
            let index = 0;
            const interval = setInterval(function() {
                if (index < text.length) {
                    element.textContent += text[index];
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 20);
        });
    }

    // Performance optimization: Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

    // Add resize handler with debounce
    const handleResize = debounce(function() {
        // Recalculate animations on resize
        const animatedElements = document.querySelectorAll('.aos-animate');
        animatedElements.forEach(function(element) {
            element.style.transition = 'none';
            setTimeout(function() {
                element.style.transition = '';
            }, 10);
        });
    }, 250);

    window.addEventListener('resize', handleResize);

    // Add subtle cursor effect
    function initCursorEffect() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Grow cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('.featured-image, .description-text, a, button');
        interactiveElements.forEach(function(element) {
            element.addEventListener('mouseenter', function() {
                cursor.style.transform = 'scale(2)';
            });
            element.addEventListener('mouseleave', function() {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize lazy loading
    initLazyLoading();

})();

// premium flooring section-------------------------------------------------------------------------------------------------------------
// Premium Flooring JavaScript Functionality
//our values
// Values Section Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Add extended descriptions to each card (optional data)
    const valueDetails = {
        'Quality': 'Every project undergoes rigorous quality checks. We source premium materials and employ skilled craftsmen who take pride in their work, ensuring lasting results.',
        'Integrity': 'We believe in building relationships based on trust. From initial consultation to project completion, we maintain open communication and deliver on our promises.',
        'Customer Focus': 'We listen to your needs, respect your timeline, and work within your budget. Your vision becomes our mission, and your satisfaction drives our success.'
    };
    
    // Get all value cards
    const valueCards = document.querySelectorAll('.value-card');
    
    // Add extended description divs
    valueCards.forEach(card => {
        const title = card.querySelector('h3').textContent.trim();
        if (valueDetails[title]) {
            const descDiv = document.createElement('div');
            descDiv.className = 'value-description';
            descDiv.innerHTML = `<p>${valueDetails[title]}</p>`;
            card.appendChild(descDiv);
        }
    });
    
    // Click to expand/highlight functionality
    valueCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle active class on clicked card
            const isActive = this.classList.contains('active');
            
            // Remove active class from all cards
            valueCards.forEach(c => c.classList.remove('active'));
            
            // If card wasn't active, make it active
            if (!isActive) {
                this.classList.add('active');
            }
        });
    });
    
    // Scroll animation with Intersection Observer
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe section heading
    const heading = document.querySelector('.values-section h2');
    if (heading) {
        observer.observe(heading);
    }
    
    // Observe each value card with staggered delay
    valueCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Optional: Add keyboard navigation
    valueCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${card.querySelector('h3').textContent} value card`);
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Optional: Close expanded card when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.value-card')) {
            valueCards.forEach(card => card.classList.remove('active'));
        }
    });
    
    // Parallax effect on scroll (subtle)
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const section = document.querySelector('.values-section');
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const scrolled = window.pageYOffset;
                    
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        valueCards.forEach((card, index) => {
                            const speed = 0.05 + (index * 0.01);
                            const yPos = -(scrolled * speed);
                            card.style.transform = `translateY(${yPos}px)`;
                        });
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Add smooth hover effect for icons
    valueCards.forEach(card => {
        const icon = card.querySelector('i');
        if (icon) {
            card.addEventListener('mouseenter', function() {
                icon.style.animation = 'none';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 10);
            });
        }
    });
    
    // Console log for debugging
    console.log('Values section initialized with', valueCards.length, 'cards');
});

// Optional: Add custom icon pulse animation on page load
const style = document.createElement('style');
style.textContent = `
    @keyframes iconPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .value-card i {
        animation: iconPulse 2s ease-in-out infinite;
    }
    
    .value-card:hover i,
    .value-card.active i {
        animation: none;
    }
`;
document.head.appendChild(style);