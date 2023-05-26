import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'
import RegisterPage from '@/pages/authorization/RegisterPage.vue'
import ThankYouPage from '@/pages/authorization/ThankYouPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'landing',
      path: '/',
      component: LandingPage,
      children: [
        { name: 'register', path: '/register', component: RegisterPage },
        { name: 'thank-you', path: '/thank-you', component: ThankYouPage },
      ],
    },
  ],
})

export default router
