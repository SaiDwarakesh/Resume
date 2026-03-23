
// Theme Switching Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const sunPaths = document.querySelectorAll('.sun');
const moonPath = document.querySelector('.moon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
        sunPaths.forEach(p => p.style.display = 'none');
        moonPath.style.display = 'block';
    } else {
        sunPaths.forEach(p => p.style.display = 'block');
        moonPath.style.display = 'none';
    }
}

// Initialize theme
// const savedTheme = localStorage.getItem('theme') || 'dark';
// setTheme(savedTheme);

// themeToggle.addEventListener('click', () => {
//     const currentTheme = document.documentElement.getAttribute('data-theme');
//     setTheme(currentTheme === 'dark' ? 'light' : 'dark');
// });

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.getElementById('nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        console.log('fsdfsdfs');
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        // Prevent scroll when menu is open
        document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
    });
}

// Drawer Controls
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawerClose = document.getElementById('drawer-close');
const drawerContent = document.getElementById('drawer-content');

function openDrawer(card) {
    const title = card.querySelector('h3').innerText;
    const description = card.querySelector('.project-details-hidden').innerHTML;
    const tags = card.querySelector('.project-tags').innerHTML;

    drawerContent.innerHTML = `
        <h2>${title}</h2>
        <div class="tags">${tags}</div>
        <div class="description">${description}</div>
    `;

    drawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeDrawer() {
    drawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openDrawer(card));
});

drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

// Scroll reveal animation using Intersection Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('section, .glass-panel').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(el);
});

// Smooth scroll for nav links & Close mobile menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.style.overflow = '';
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic background blob movement
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');

    if (blob1 && blob2) {
        blob1.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
        blob2.style.transform = `translate(${x * -0.05}px, ${y * -0.05}px)`;
    }
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const words = ['Micro-interactions', 'Scalable Systems', 'User Experiences', 'AI Solutions'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typingText) type();
    scrollSpy(); // Initial call
});

// Active Link Highlight (Scroll Spy)
function scrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    // Default to 'about' if at the top
    if (window.scrollY < 100) {
        current = 'about';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', scrollSpy);
