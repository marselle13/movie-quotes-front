import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'
import RegisterPage from '@/pages/authorization/RegisterPage.vue'
import SuccessRegistrationPage from '@/pages/notification/SuccessRegistrationPage.vue'
import SuccessVerifyPage from '@/pages/notification/SuccessVerifyPage.vue'
import LoginPage from '@/pages/authorization/LoginPage.vue'
import ResendLinkPage from '@/pages/notification/ResendLinkPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'landing',
      path: '/',
      component: LandingPage,
      children: [
        { name: 'register', path: '/register', component: RegisterPage },
        { name: 'login', path: '/login', component: LoginPage },
        {
          name: 'success-registration',
          path: '/success-registration',
          component: SuccessRegistrationPage,
        },
        { name: 'success-verified', path: '/success-verify', component: SuccessVerifyPage },
        { name: 'resend-link', path: '/resend-link/:uuid', component: ResendLinkPage },
      ],
    },
  ],
})

export default router
