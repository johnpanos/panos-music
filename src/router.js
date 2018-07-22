import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Albums from './views/Albums.vue';
import Songs from './views/Songs.vue';
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
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.path === '/albums' || to.path === '/songs') {
    store.state.authorized ? next() : next('/');
  } else {
    next();
  }
});

export default router;
