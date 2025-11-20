// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Sign Up Form Validation
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));

        // Validate Full Name
        if (fullname.length < 3) {
            showError('fullname-error', 'Full name must be at least 3 characters');
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Phone
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            showError('phone-error', 'Please enter a valid 10-digit phone number');
            isValid = false;
        }

        // Validate Password
        if (password.length < 6) {
            showError('password-error', 'Password must be at least 6 characters');
            isValid = false;
        }

        // Validate Confirm Password
        if (password !== confirmPassword) {
            showError('confirm-password-error', 'Passwords do not match');
            isValid = false;
        }

        if (isValid) {
            showSuccessMessage('Account created successfully! Redirecting...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });
}

// Sign In Form Validation
const signinForm = document.getElementById('signinForm');
if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const loginEmail = document.getElementById('login-email').value.trim();
        const loginPassword = document.getElementById('login-password').value;
        
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));

        // Validate Email or Phone
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        
        if (!emailRegex.test(loginEmail) && !phoneRegex.test(loginEmail)) {
            showError('login-email-error', 'Please enter a valid email or 10-digit phone number');
            isValid = false;
        }

        // Validate Password
        if (loginPassword.length < 6) {
            showError('login-password-error', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (isValid) {
            showSuccessMessage('Signed in successfully! Redirecting...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });
}

// Helper function to show error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Helper function to show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00a699;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Smooth scroll for navigation links
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

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .feature-item, .offer-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});