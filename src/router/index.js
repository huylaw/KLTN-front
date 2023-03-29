import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/admin/home.vue'),
    meta: {
      requiresAuth: true,
      layout: 'admin',
      role: 0
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.getRole == 0){
        next();
      }else{
        next({name: 'NotFound'})
      }
    }
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('../views/admin/member.vue'),
    meta: {
      requiresAuth: true,
      layout: 'admin',
      role: 0,
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.getRole == 0){
        next();
      }else{
        next({name: 'NotFound'})
      }
    }
  },
  {
    path: '/genealogy',
    name: 'genealogy',
    component: () => import('../views/admin/genealogy.vue'),
    meta: {
      requiresAuth: true,
      layout: 'all',
    },
  },
  {
    path: '/statistical',
    name: 'statistical',
    component: () => import('../views/general/statistical.vue'),
    meta: {
      requiresAuth: true,
      layout: 'member',
      role: 1,
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.getRole == 1){
        next();
      }else{
        next({name: 'NotFound'})
      }
    }
  },
  {
    path: '/profile',
    component: () => import('../views/general/profile.vue'),
    meta: {
      requiresAuth: true,
      layout: 'all',
    }
  },
  {
    path: '/bank',
    name: 'bank',
    component: () => import('../views/admin/bank.vue'),
    meta: {
      requiresAuth: true,
      layout: 'admin',
      role: 0,
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.getRole == 0){
        next();
      }else{
        next({name: 'NotFound'})
      }
    }
  },
  {
    path: '/event',
    name: 'event',
    component: () => import('../views/admin/event.vue'),
    meta: {
      requiresAuth: true,
      layout: 'admin',
      role: 0,
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.getRole == 0){
        next();
      }else{
        next({name: 'NotFound'})
      }
    }
  },
  {
    path: '/feedback',
    name: 'feadback',
    component: () => import('../views/admin/feedback.vue'),
    meta: {
      requiresAuth: true,
      layout: 'admin',
      role: 0,
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.getRole == 0){
        next();
      }else{
        next({name: 'NotFound'})
      }
    }
  },
  {
    path: '/member-home',
    name: 'home-member',
    component: () => import('../views/member/home.vue'),
    meta: {
      requiresAuth: true,
      layout: 'member',
      role: 1
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.getRole == 1){
        next();
      }else{
        next({name: 'NotFound'})
      }
    }
  },
  {
    path: '/list-member',
    name: 'list-member',
    component: () => import('../views/member/listmember.vue'),
    meta: {
      requiresAuth: true,
      layout: 'member',
      role: 1,
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.getRole == 1){
        next();
      }else{
        next({name: 'NotFound'})
      }
    }
  },
  {
    path: '/member-events',
    name: 'member-events',
    component: () => import('../views/member/event.vue'),
    meta: {
      requiresAuth: true,
      layout: 'member',
      role: 1,
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.getRole == 1){
        next();
      }else{
        next({name: 'NotFound'})
      }
    }
  },
  {
    path: '/member-feedback',
    name: 'member-feedback',
    component: () => import('../views/member/feedback.vue'),
    meta: {
      requiresAuth: true,
      layout: 'member',
      role: 1,
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.getRole == 1){
        next();
      }else{
        next({name: 'NotFound'})
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/login.vue'),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/register.vue'),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/change-pass',
    name: 'change-pass',
    component: () => import('../views/auth/changePass.vue'),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/page/error.vue'),
    meta: {
      layout: 'all',
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/404',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.layout && to.meta.layout == 'member'){
    store.commit('setLayout', 'member');
  }else if( to.meta && to.meta.layout && to.meta.layout == 'admin'){
    store.commit('setLayout', 'admin');
  }else if( to.meta && to.meta.layout && to.meta.layout == 'auth'){
    store.commit('setLayout', 'auth');
  }else if( to.meta && to.meta.layout && to.meta.layout == 'all'){
    if(localStorage.role == 0){
      store.commit('setLayout', 'admin');
    }else if(localStorage.role == 1){
      store.commit('setLayout', 'member');
    }
  }

  // if(to.meta && to.meta.role && to.meta.role != store.getters.getRole){
  //   next({name: 'NotFound'});
  // }

  if(to.meta && to.meta.requiresAuth && !localStorage.token){
    next({name: 'login'})
  }
  next(true);
});

export default router
