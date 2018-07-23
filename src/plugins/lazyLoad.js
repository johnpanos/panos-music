import Vue from 'vue';

import lazyLoad from 'vue-lazyload';

Vue.use(lazyLoad, {
  preLoad: 1.3,
  attempt: 1,
  // set observer to true so it only loads on interaction
  observer: true,

  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
});
