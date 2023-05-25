import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'
import RegisterPage from '@/pages/RegisterModal.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'landing',
      path: '/',
      component: LandingPage,
      children: [{ name: 'register', path: '/register', component: RegisterPage }],
    },
  ],
})

export default router
