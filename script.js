// =====================================
// PROFESSIONAL BUSINESS WEBSITE SCRIPT
// =====================================

// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const backToTopBtn = document.getElementById('backToTop');
const faqQuestions = document.querySelectorAll('.faq-question');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// =====================================
// MOBILE MENU FUNCTIONALITY
// =====================================

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        mobileMenuBtn?.classList.remove('active');
    }
});

// =====================================
// NAVBAR SCROLL EFFECT
// =====================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    }
});

// =====================================
// BACK TO TOP BUTTON
// =====================================

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =====================================
// FAQ ACCORDION FUNCTIONALITY
// =====================================

if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = question.classList.contains('active');
            const answer = faqItem.querySelector('.faq-answer');

            // Close all other items
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.parentElement.querySelector('.faq-answer').classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
}

// =====================================
// FORM HANDLING
// =====================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: contactForm.querySelector('#name').value,
            email: contactForm.querySelector('#email').value,
            phone: contactForm.querySelector('#phone').value,
            company: contactForm.querySelector('#company').value,
            message: contactForm.querySelector('#message').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Simulate form submission
        console.log('Form submitted:', formData);
        showNotification('Thank you! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;

        if (!email) {
            showNotification('Please enter your email', 'error');
            return;
        }

        console.log('Newsletter subscription:', email);
        showNotification('Successfully subscribed to our newsletter!', 'success');
        newsletterForm.reset();
    });
}

// =====================================
// NOTIFICATION SYSTEM
// =====================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// =====================================
// SCROLL ANIMATIONS (AOS-like)
// =====================================

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        const aos = element.getAttribute('data-aos');
        const delay = element.getAttribute('data-aos-delay') || '0';
        
        if (aos === 'fade-up') {
            element.style.transform = 'translateY(30px)';
        } else if (aos === 'fade-left') {
            element.style.transform = 'translateX(-30px)';
        } else if (aos === 'fade-right') {
            element.style.transform = 'translateX(30px)';
        } else if (aos === 'zoom-in') {
            element.style.transform = 'scale(0.95)';
        }

        if (delay) {
            element.style.transitionDelay = `${delay}ms`;
        }

        observer.observe(element);
    });
}

// =====================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =====================================

function setupSmoothScroll() {
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
}

// =====================================
// COUNTER ANIMATION
// =====================================

function animateCounters() {
    const statItems = document.querySelectorAll('.stat-number');
    let alreadyAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !alreadyAnimated) {
                alreadyAnimated = true;
                statItems.forEach(item => {
                    animateNumber(item);
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateNumber(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlusThousand = target.includes('+') || target.includes('M');
    
    let finalValue = parseInt(target);
    let duration = 2000;
    let startValue = 0;
    let startTime = Date.now();

    if (isPercentage) {
        finalValue = 99;
    }

    const update = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(startValue + (finalValue - startValue) * progress);
        
        let displayValue = current.toString();
        if (isPlusThousand) {
            displayValue = current + '+';
        }
        if (isPercentage) {
            displayValue = current + '%';
        }
        
        element.textContent = displayValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    };

    requestAnimationFrame(update);
}

// =====================================
// PERFORMANCE OPTIMIZATION - LAZY LOADING
// =====================================

function setupLazyLoading() {
    const imageObserverOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, imageObserverOptions);

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =====================================
// INITIALIZATION
// =====================================

document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    setupSmoothScroll();
    animateCounters();
    setupLazyLoading();
    console.log('✨ Website initialized successfully');
});

// =====================================
// ADD ANIMATION STYLES
// =====================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// =====================================
// PERFORMANCE MONITORING
// =====================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('📊 Page Load Time:', pageLoadTime + 'ms');
    });
}

// =====================================
// SERVICE WORKER REGISTRATION (PWA)
// =====================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('✓ Service Worker ready for PWA support');
    });
}