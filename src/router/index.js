import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import Admin from '../views/Admin.vue'
// import User from '../views/User.vue'
import Details from '../views/Details.vue'
import UserProfileView from '../views/userProfileView.vue'
import TestView from '../views/testView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // {
  //   path: '/admin',
  //   name: 'Admin',
  //   component: Admin
  // },
  // {
  //   path: '/user',
  //   name: 'User',
  //   component: User
  // },
  {
    path: '/detaljiknjige/:naziv',
    name: 'Detalji',
    component: Details
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfileView
  },
  {
    path: '/test',
    name: 'Test',
    component: TestView
  }
  

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
