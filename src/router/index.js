import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Details from '../views/Details.vue'
import UserProfileView from '../views/userProfileView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/detaljipredstave/:naziv',
    name: 'Detalji',
    component: Details
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfileView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
