import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'
import RegisterPage from '@/pages/authorization/RegisterPage.vue'
import LoginPage from '@/pages/authorization/LoginPage.vue'
import ResendLinkPage from '@/pages/notification/ResendLinkPage.vue'
import ForgetPassword from '@/pages/password/ForgetPassword.vue'
import SuccessPage from '@/pages/notification/SuccessPage.vue'
import NotFound from '@/pages/NotFound.vue'
import ResetPassword from '@/pages/password/ResetPassword.vue'
import ForbiddenPage from '@/pages/ForbiddenPage.vue'

const NewsFeed = () => import('@/pages/NewsFeedPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'landing',
      path: '/',
      component: LandingPage,
      meta: { user: 'guest' },
      children: [
        { name: 'register', path: '/register', component: RegisterPage },
        { name: 'login', path: '/login', component: LoginPage },
        { name: 'success-message', path: '/success/:message', component: SuccessPage },
        { name: 'resend-link', path: '/resend-link/:uuid', component: ResendLinkPage },
        { name: 'forget-password', path: '/forget-password', component: ForgetPassword },
        { name: 'update-password', path: '/update-password/', component: ResetPassword },
      ],
    },
    {
      name: 'news-feed',
      path: '/feed',
      component: NewsFeed,
      meta: { user: 'auth' },
    },
    { name: 'forbidden', path: '/forbidden', component: ForbiddenPage },
    { name: 'not-found', path: '/:notFound(.*)', component: NotFound },
  ],
})

export default router
