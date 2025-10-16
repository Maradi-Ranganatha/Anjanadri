const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hide');
                        // Reset animation
                        item.style.animation = 'none';
                        setTimeout(() => {
                            item.style.animation = '';
                        }, 10);
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });

        // Play video on hover for video items
        const videoItems = document.querySelectorAll('.portfolio-item video');
        videoItems.forEach(video => {
            const item = video.closest('.portfolio-item');
            
            item.addEventListener('mouseenter', () => {
                video.play();
            });
            
            item.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        });

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideUp 0.6s ease forwards';
                }
            });
        }, { threshold: 0.1 });

        portfolioItems.forEach(item => {
            observer.observe(item);
        });