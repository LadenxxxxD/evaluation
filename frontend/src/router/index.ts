import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/daogou',
    name: 'Daogou',
    component: () => import(/* webpackChunkName: "daogou" */ '../views/Daogou.vue')
  },
  {
    path: '/ceping',
    name: 'Ceping',
    component: () => import(/* webpackChunkName: "ceping" */ '../views/Ceping.vue')
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import(/* webpackChunkName: "rank" */ '../views/Rank.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      noHeader: true,
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
