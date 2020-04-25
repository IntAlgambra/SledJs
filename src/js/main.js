import '../css/style.css';

import Slider from './Slider';

const slider = new Slider({
  perView: 2,
  // interval: 1500,
  breakpoints: {
    1920: 3,
    800: 2,
    480: 1,
  },
  // controls: {
  //   prev: '#prevslide',
  //   next: '#nextslide',
  // },
});

slider.mount();
