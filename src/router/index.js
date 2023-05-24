import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ name: 'landing', path: '/', component: LandingPage }],
})

export default router
