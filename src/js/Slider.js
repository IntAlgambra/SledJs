import SliderStack from './SliderStack';

export default class Slider {
  constructor(options) {
    const {
      perView, interval, breakpoints, controls,
    } = options;
    this.perView = perView;
    if (breakpoints) {
      Object.keys(breakpoints).sort((a, b) => b - a).forEach((width) => {
        if (window.innerWidth <= width) {
          this.perView = breakpoints[width];
        }
      });
    }

    // getting slider container
    this._sliderContainer = document.querySelector('.slider-container');
    // slider container aquiring all available width
    this._sliderWidth = this._sliderContainer.clientWidth;
    // getting slider
    this._slider = document.querySelector('.slider');
    // getting array of all slides
    this._slides = Array.from(document.querySelectorAll('.slide'));
    // calculating every slide withs based on slides per view
    this._slideWidth = Math.round(this._sliderWidth / this.perView);
    // setting slides width
    this._slides.forEach((item) => {
      item.style.width = `${this._slideWidth}px`;
    });
    // setting slider height based on maximum content height
    this._maxHeight = this._slides.reduce((acc, item) => {
      if (item.clientHeight > acc.clientHeight) {
        return item;
      }
      return acc;
    }).clientHeight;
    // setting up slides height
    this._slides.forEach((item) => {
      item.style.height = `${this._maxHeight}px`;
    });
    // setting current counter, direction and total slides count
    this._totalSlides = this._slides.length;
    this._current_direction = 'forward';
    this.stack = new SliderStack(this._totalSlides, this.perView);
    // set interval (if provided)
    if (interval) {
      setInterval(() => {
        this.nextSlide();
      }, interval);
    }
    // set controls (if provided)
    if (controls) {
      document.querySelectorAll('.slide-btn').forEach((item) => item.remove());
      this._nextBtn = document.querySelector(controls.next);
      this._prevBtn = document.querySelector(controls.prev);
    } else {
      // getting button
      this._nextBtn = document.querySelector('#slide-next-btn');
      this._nextBtn.style.right = '20px';
      this._nextBtn.style.top = `${(this._maxHeight - this._nextBtn.clientHeight) / 2}px`;
      this._prevBtn = document.querySelector('#slide-prev-btn');
      this._prevBtn.style.left = '20px';
      this._prevBtn.style.top = `${(this._maxHeight - this._prevBtn.clientHeight) / 2}px`;
    }
  }

  nextSlide() {
    this._direction = 'forward';
    this._slider.style.transition = 'transform 0.4s ease-in-out';
    this._slider.style.transform = `translateX(-${this._slideWidth * 2}px)`;
    this.stack.next();
  }

  prevSlide() {
    this._direction = 'backward';
    this._slider.style.transition = 'transform 0.4s ease-in-out';
    this._slider.style.transform = 'translateX(0px)';
    this.stack.prev();
  }

  mount() {
    this._slider.innerHTML = '';
    this.stack.getCurrent().forEach((index) => {
      this._slider.appendChild(this._slides[index]);
    });
    // translating to first slide
    this._slider.style.transform = `translateX(-${this._slideWidth}px)`;
    // adding handler to transition (and this is main logic)
    this._slider.addEventListener('transitionend', () => {
      this._slider.innerHTML = '';
      this.stack.getCurrent().forEach((index) => {
        this._slider.appendChild(this._slides[index].cloneNode(true));
      });
      this._slider.style.transition = 'unset';
      this._slider.style.transform = `translateX(-${this._slideWidth}px)`;
    });
    // adding handlers to buttons
    this._nextBtn.addEventListener('click', () => {
      this.nextSlide.apply(this);
    });
    this._prevBtn.addEventListener('click', () => {
      this.prevSlide.apply(this);
    });
  }
}
