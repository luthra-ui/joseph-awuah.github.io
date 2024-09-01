// Smooth Scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});

// Persist Dark Mode State
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
    }
});

// Typed Text Animation
const typedText = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');

const textArray = ['Global Innovator','AI Enthusiast', 'Public Speaker', 'SDG Enthusiast', 'Socio-Tech Founder','Inspirer','CSR Expert'];
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 200);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typedText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 100);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, 200);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(type, 1000);
});

// Animated Progress Bars
const skillBars = document.querySelectorAll('.skill-level');
window.addEventListener('scroll', () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            bar.style.width = bar.getAttribute('style').match(/width:\s*\d+%/)[0];
        }
    });
});

// Testimonial Slider
const slider = document.querySelector('.testimonial-slider');
const slides = document.querySelectorAll('.testimonial-slide');
let currentSlide = 0;
const slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Filter Projects
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.classList.add('fadeIn');
            } else {
                card.style.display = 'none';
            }
        });

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Startups Carousel
const carousel = document.querySelector('.carousel');
const leftControl = document.querySelector('.carousel-control.left');
const rightControl = document.querySelector('.carousel-control.right');

rightControl.addEventListener('click', () => {
    carousel.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

leftControl.addEventListener('click', () => {
    carousel.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

// Persistent State for Carousel
let scrollPosition = 0;

rightControl.addEventListener('click', () => {
    scrollPosition += 300;
    carousel.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
    localStorage.setItem('scrollPosition', scrollPosition);
});

leftControl.addEventListener('click', () => {
    scrollPosition -= 300;
    carousel.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
    localStorage.setItem('scrollPosition', scrollPosition);
});

// Restore Scroll Position on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
        carousel.scrollTo({
            left: parseInt(savedScrollPosition, 10),
            behavior: 'smooth'
        });
    }
});

// Load Startups from JSON
const startupsContainer = document.getElementById('startups-container');

fetch('data/startups.json')
    .then(response => response.json())
    .then(startups => {
        startups.forEach(startup => {
            const startupCard = document.createElement('div');
            startupCard.classList.add('carousel-item');

            startupCard.innerHTML = `
                <img src="images/startup${startup.id}.jpg" alt="Startup ${startup.name}">
                <h3>${startup.name}</h3>
                <p>${startup.description}</p>
                <p><strong>Founded:</strong> ${startup.yearFounded}</p>
            `;

            startupsContainer.appendChild(startupCard);
        });
    });
// Scroll to Top Button
const scrollToTopButton = document.getElementById('scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
