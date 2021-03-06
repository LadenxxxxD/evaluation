import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      // keepAlive: true
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home/Home.vue')
  },
  {
    path: '/article/write',
    name: 'WriteArticle',
    component: () => import(/* webpackChunkName: "article" */ '@/views/Article/Write.vue')
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import(/* webpackChunkName: "article" */ '@/views/Article/Article.vue')
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import(/* webpackChunkName: "guide" */ '@/views/Guide/Guide.vue')
  },
  {
    path: '/guide/test',
    name: 'guideTest',
    component: () => import(/* webpackChunkName: "guideTest" */ '@/views/Guide/Test.vue')
  },
  {
    path: '/evaluation',
    name: 'evalution',
    component: () => import(/* webpackChunkName: "evalution" */ '@/views/Evaluation/Evaluation.vue')
  },
  {
    path: '/evaluation/details/:id',
    name: 'details',
    component: () => import(/* webpackChunkName: "details" */ '@/views/Evaluation/Details.vue')
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import(/* webpackChunkName: "rank" */ '@/views/Rank/Rank.vue')
  },
  {
    path: '/user',
    name: 'UserInfo',
    component: () => import(/* webpackChunkName: "userinfo" */ '@/views/Home/User.vue')
  },
  {
    path: '/admin',
    name: 'UserInfo',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin/Admin.vue')
  },
  {
    path: '/admin/audit',
    name: 'UserInfo',
    component: () => import(/* webpackChunkName: "audit" */ '@/views/Admin/Audit.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      noHeader: true,
      // keepAlive: true
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
