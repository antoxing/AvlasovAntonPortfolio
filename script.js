class Slider {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.container = wrapper.querySelector('.slider-container');
        this.slider = wrapper.querySelector('.slider');
        this.slides = wrapper.querySelectorAll('.slide');
        this.dots = wrapper.parentElement.querySelector('.dots').querySelectorAll('.dot');
        this.index = 1;

        // Найдем кнопки вне wrapper
        const navWrapper = wrapper.parentElement.querySelector('.navWrapper');
        this.prevButton = navWrapper.querySelector('.prev');
        this.nextButton = navWrapper.querySelector('.next');

        // Инициализируем свайп
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        this.showSlide(this.index);

        // Кнопки навигации
        this.prevButton.addEventListener('click', () => this.moveSlide(-1));
        this.nextButton.addEventListener('click', () => this.moveSlide(1));

        // Точки
        this.dots.forEach((dot, i) => {
            dot.addEventListener('click', () => this.currentSlide(i + 1));
        });

        // События для свайпа
        this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e));
    }

    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }

    handleSwipe() {
        if (this.touchEndX < this.touchStartX) {
            // Свайп влево
            this.moveSlide(1);
        }
        if (this.touchEndX > this.touchStartX) {
            // Свайп вправо
            this.moveSlide(-1);
        }
    }

    moveSlide(n) {
        this.showSlide((this.index += n));
    }

    currentSlide(n) {
        this.showSlide((this.index = n));
    }

    showSlide(n) {
        if (n > this.slides.length) this.index = 1;
        if (n < 1) this.index = this.slides.length;

        let offset = -(this.index - 1) * 100;
        this.slider.style.transform = `translateX(${offset}%)`;

        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[this.index - 1].classList.add('active');
    }
}

// Инициализация всех слайдеров
document.querySelectorAll('.sliderWrapper').forEach(wrapper => {
    new Slider(wrapper);
});







document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopButton = document.getElementById('scrollToTop');

    // Показать/скрыть кнопку при скролле
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'flex';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    // Прокрутка наверх при нажатии
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
