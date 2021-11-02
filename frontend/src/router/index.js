import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Account from '../views/Account.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: Account
  },
  {
    path: '/departure',
    name: 'Departure',
    component: () => import('../views/Departure.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  { 
    path: '/register',
    name: Register,
    component: Register
  },

  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
