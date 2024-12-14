class Slider {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.container = wrapper.querySelector('.slider-container');
        this.slider = wrapper.querySelector('.slider');
        this.slides = wrapper.querySelectorAll('.slide');
        this.dots = wrapper.parentElement.querySelector('.dots').querySelectorAll('.dot');
        this.index = 1;

        this.init();
    }

    init() {
        this.showSlide(this.index);

        // Кнопки навигации
        this.wrapper.querySelector('.prev').addEventListener('click', () => this.moveSlide(-1));
        this.wrapper.querySelector('.next').addEventListener('click', () => this.moveSlide(1));

        // Точки
        this.dots.forEach((dot, i) => {
            dot.addEventListener('click', () => this.currentSlide(i + 1));
        });
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





// let lastScrollPosition = 0;
// let isScrolling = false;

// document.addEventListener('scroll', () => {
//     if (isScrolling) return;

//     const currentScrollPosition = window.scrollY;
//     const scrollingDown = currentScrollPosition > lastScrollPosition; // Проверяем направление
//     lastScrollPosition = currentScrollPosition;

//     const titleBoxes = document.querySelectorAll('.titleBox');
//     const viewportHeight = window.innerHeight;

//     titleBoxes.forEach((titleBox) => {
//         const rect = titleBox.getBoundingClientRect();
//         const elementCenter = rect.top + rect.height / 2;
//         const viewportCenter = viewportHeight / 2;
//         const viewportUpper = viewportHeight * 0.3; // Верхние 30% экрана

//         // Проверяем условия в зависимости от направления скролла
//         if (
//             !titleBox.classList.contains('scrolled') &&
//             (
//                 (scrollingDown && Math.abs(viewportCenter - elementCenter) < 10) || 
//                 (!scrollingDown && rect.top < viewportUpper) // Для скролла вверх, элемент должен быть в верхних 30%
//             )
//         ) {
//             isScrolling = true;

//             // Убираем флаг у прошлого элемента, если он был
//             const lastScrolledElement = document.querySelector('.titleBox.scrolled');
//             if (lastScrolledElement) {
//                 lastScrolledElement.classList.remove('scrolled');
//             }

//             // Добавляем флаг текущему элементу
//             titleBox.classList.add('scrolled');

//             window.scrollTo({
//                 top: window.scrollY + rect.top - 68,
//                 behavior: 'smooth'
//             });

//             setTimeout(() => {
//                 isScrolling = false;
//             }, 500); // Время завершения плавного скролла
//         }
//     });
// });

