import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Albums from './views/Albums.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/albums',
      name: 'albums',
      component: Albums
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.path === '/about') {
    // return a Promise that resolves to true or false
    store.state.authorized ? next() : next('/login');
  } else {
    next();
  }
});

export default router;
