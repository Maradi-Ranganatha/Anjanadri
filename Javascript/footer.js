// Modern Footer JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Dynamic Year Update
    updateCopyrightYear();
    
    // Create and Add Back to Top Button
    createBackToTopButton();
    
    // Footer Scroll Animation
    observeFooter();
    
    // Social Icon Animations
    animateSocialIcons();
    
    // Link Hover Effects
    enhanceLinkEffects();
    
    // Icon Pulse Effect on Hover
    addIconPulseEffect();
});

// Update Copyright Year Dynamically
function updateCopyrightYear() {
    const copyrightText = document.querySelector('.text-center.mt-3 p');
    if (copyrightText) {
        const currentYear = new Date().getFullYear();
        copyrightText.innerHTML = `&copy; ${currentYear} Anjanadri Floor Tech. All rights reserved.`;
    }
}

// Create Back to Top Button
function createBackToTopButton() {
    // Create button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Show/Hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Observe Footer for Scroll Animation
function observeFooter() {
    const footer = document.querySelector('footer');
    
    if (!footer) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add('fade-in');
                observer.unobserve(footer);
            }
        });
    }, observerOptions);
    
    observer.observe(footer);
}

// Animate Social Icons Sequentially
function animateSocialIcons() {
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    socialIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0) rotate(0deg)';
        icon.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1) rotate(360deg)';
        }, 100 * index + 500);
    });
    
    // Add click animation
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.animation = 'pulse 0.4s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 400);
        });
    });
}

// Enhance Link Hover Effects
function enhanceLinkEffects() {
    const links = document.querySelectorAll('footer ul.list-unstyled li a');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Add Pulse Effect to Contact Icons
function addIconPulseEffect() {
    const contactIcons = document.querySelectorAll('footer p i');
    
    contactIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'iconPulse 0.6s ease';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Add CSS animation dynamically
    if (!document.getElementById('iconPulseStyle')) {
        const style = document.createElement('style');
        style.id = 'iconPulseStyle';
        style.textContent = `
            @keyframes iconPulse {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.3) rotate(-10deg); }
                50% { transform: scale(1.4) rotate(10deg); }
                75% { transform: scale(1.3) rotate(-5deg); }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(0.9); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add ripple effect to headings on click
document.addEventListener('DOMContentLoaded', function() {
    const headings = document.querySelectorAll('footer h5');
    
    headings.forEach(heading => {
        heading.style.cursor = 'pointer';
        heading.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 212, 255, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    if (!document.getElementById('rippleStyle')) {
        const style = document.createElement('style');
        style.id = 'rippleStyle';
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Smooth parallax effect on scroll
window.addEventListener('scroll', function() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    const scrolled = window.pageYOffset;
    const footerTop = footer.offsetTop;
    const windowHeight = window.innerHeight;
    
    if (scrolled + windowHeight > footerTop) {
        const offset = (scrolled + windowHeight - footerTop) * 0.1;
        footer.style.backgroundPosition = `center ${offset}px`;
    }
});