document.addEventListener('DOMContentLoaded', function() {
    initLanguageSelector();
    initNewsCarousel(); // Вызываем только здесь
    initEventsCarousel();
    initCountersAnimation();
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
});

// Переключение языка
function initLanguageSelector() {
    const languageButtons = document.querySelectorAll('.language-selector button');
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            languageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            console.log(`Выбран язык: ${this.textContent}`);
        });
    });
}

// Карусель новостей
function initNewsCarousel() {
    const slides = document.querySelectorAll('.news-carousel .carousel-slide');
    const prevButton = document.querySelector('.news-carousel .prev-button');
    const nextButton = document.querySelector('.news-carousel .next-button');
    let currentSlide = 0;

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length; // Цикличность
        slides[currentSlide].classList.add('active');
    }

    // Обработчики событий для кнопок
    prevButton.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextButton.addEventListener('click', () => goToSlide(currentSlide + 1));
}

// Карусель мероприятий
function initEventsCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.event-card');
    const prevButton = document.querySelector('.events-section .prev-button');
    const nextButton = document.querySelector('.events-section .next-button');
    let currentIndex = 0;
    const cardWidth = cards[0].getBoundingClientRect().width + 20;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= cards.length - 3;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 3) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    updateCarousel();
}

// Анимация счётчиков для достижений
function initCountersAnimation() {
    const counters = document.querySelectorAll('.achievement-number');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let current = 0;
                const duration = 2000;
                const increment = target / (duration / 16);

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.round(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target + (target === 3500 || target === 60 ? '+' : target === 80 ? '%' : '');
                    }
                };
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Мобильное меню
function initMobileMenu() {
    const menuButton = document.querySelector('.menu-button');
    const mainNav = document.querySelector('.main-nav');
    menuButton.addEventListener('click', () => {
        mainNav.classList.toggle('mobile-menu-open');
        menuButton.classList.toggle('active');
    });
}

// Плавная прокрутка
function initSmoothScrolling() {
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Анимации при прокрутке
function initScrollEffects() {
    const sections = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}
