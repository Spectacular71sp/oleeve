document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContent = document.querySelector('.nav-content');

    mobileMenuBtn.addEventListener('click', function() {
        navContent.classList.toggle('active');
        const spans = this.querySelectorAll('span');
        spans[0].style.transform = navContent.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = navContent.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navContent.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navContent.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navContent.classList.remove('active');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navContent.classList.remove('active');
            }
        });
    });

    // Impact Numbers Animation
    const impactNumbers = document.querySelectorAll('.impact-number');
    let animated = false;

    function animateNumber(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const step = duration / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, step);
    }

    function checkScroll() {
        if (animated) return;

        const triggerBottom = window.innerHeight * 0.8;

        impactNumbers.forEach(number => {
            const numberTop = number.getBoundingClientRect().top;

            if (numberTop < triggerBottom) {
                const target = parseInt(number.getAttribute('data-target'));
                animateNumber(number, target);
                animated = true;
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load

    // Form Submission
    const applicationForm = document.getElementById('application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Thank you for your application! We will review it and get back to you soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You will receive our updates soon.`);
            this.reset();
        });
    }

    // Update Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear().toString();
    }
});

