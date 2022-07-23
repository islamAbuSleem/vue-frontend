import { createRouter, createWebHistory } from 'vue-router'
import buildingsView from '../views/buildingsView.vue'

const routes = [
  {
    path: '/',
    name: 'buildingsView',
    component: buildingsView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
