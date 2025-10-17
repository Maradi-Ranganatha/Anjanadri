document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            //hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Add glow effect on hover
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px rgba(102, 126, 234, 0.8)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });

    // Parallax effect for company name
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const companyName = document.getElementById('companyName');
        const tagline = document.getElementById('tagline');

        if (companyName && tagline) {
            companyName.style.transform = `translateY(${scrolled * 0.5}px)`;
            tagline.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});