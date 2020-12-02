import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import App from '../App'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Builder Template',
    component: App
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router