class Slider {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.container = wrapper.querySelector('.slider-container');
        this.slider = wrapper.querySelector('.slider');
        this.slides = wrapper.querySelectorAll('.slide');
        this.dots = wrapper.parentElement.querySelector('.dots').querySelectorAll('.dot');
        this.index = 1;

        const navWrapper = wrapper.parentElement.querySelector('.navWrapper');
        this.prevButton = navWrapper.querySelector('.prev');
        this.nextButton = navWrapper.querySelector('.next');

        this.init();
    }

    init() {
        this.showSlide(this.index);

        this.prevButton.addEventListener('click', () => this.moveSlide(-1));
        this.nextButton.addEventListener('click', () => this.moveSlide(1));

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

document.querySelectorAll('.sliderWrapper').forEach(wrapper => {
    new Slider(wrapper);
});



document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopButton = document.getElementById('scrollToTop');

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
});



document.addEventListener("DOMContentLoaded", () => {
    const caseElements = document.querySelectorAll(".caseNumber");
  
    caseElements.forEach(element => {
      element.addEventListener("click", () => {
        const offset = 62;
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: elementTop - offset,
          behavior: "smooth"
        });
      });
    });
  });
