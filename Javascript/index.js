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

    // contact form java script code

    // Form Validation and Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = form.querySelector('.btn-primary');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Phone validation regex (10 digits)
    const phoneRegex = /^[0-9]{10}$/;

    // Add error message elements
    function createErrorElement(inputElement) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-text';
        inputElement.parentNode.appendChild(errorDiv);
    }

    // Create error elements for all inputs
    [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
        if (input && !input.parentNode.querySelector('.error-text')) {
            createErrorElement(input);
        }
    });

    // Validate individual field
    function validateField(input, validationFn, errorMessage) {
        const errorElement = input.parentNode.querySelector('.error-text');
        
        if (!validationFn(input.value.trim())) {
            input.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
            return false;
        } else {
            input.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
            }
            return true;
        }
    }

    // Real-time validation on blur
    nameInput.addEventListener('blur', function() {
        validateField(this, val => val.length >= 2, 'Name must be at least 2 characters');
    });

    emailInput.addEventListener('blur', function() {
        validateField(this, val => emailRegex.test(val), 'Please enter a valid email address');
    });

    phoneInput.addEventListener('blur', function() {
        validateField(this, val => phoneRegex.test(val), 'Phone number must be exactly 10 digits');
    });

    subjectInput.addEventListener('blur', function() {
        validateField(this, val => val.length >= 3, 'Subject must be at least 3 characters');
    });

    messageInput.addEventListener('blur', function() {
        validateField(this, val => val.length >= 10, 'Message must be at least 10 characters');
    });

    // Remove error on input
    [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = this.parentNode.querySelector('.error-text');
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateField(nameInput, val => val.length >= 2, 'Name must be at least 2 characters');
        const isEmailValid = validateField(emailInput, val => emailRegex.test(val), 'Please enter a valid email address');
        const isPhoneValid = validateField(phoneInput, val => phoneRegex.test(val), 'Phone number must be exactly 10 digits');
        const isSubjectValid = validateField(subjectInput, val => val.length >= 3, 'Subject must be at least 3 characters');
        const isMessageValid = validateField(messageInput, val => val.length >= 10, 'Message must be at least 10 characters');

        // Check if all validations passed
        if (!isNameValid || !isEmailValid || !isPhoneValid || !isSubjectValid || !isMessageValid) {
            showMessage('Please correct the errors in the form', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending...';

        try {
            // Submit form data
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showMessage('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
                
                // Remove any lingering error states
                [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
                    input.classList.remove('error');
                });
            } else {
                showMessage('Oops! Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Send Message';
        }
    });

    // Show success/error message
    function showMessage(message, type) {
        // Remove existing message if any
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        form.appendChild(messageDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => messageDiv.remove(), 500);
        }, 5000);
    }

    // Add fade out animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
});