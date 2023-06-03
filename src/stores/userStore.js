import { defineStore } from 'pinia'
import api from '@/config/axios'

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: {
      name: '',
      email: '',
      password: '',
    },
  }),
  getters: {
    userData: (state) => state.user,
  },
  actions: {
    async registerUser(values) {
      const { name, email, password, confirmation } = values
      const response = await api.post('api/register', {
        name,
        email,
        password,
        password_confirmation: confirmation,
      })
      return response.status
    },
    async authorizationWithGoogle() {
      const response = await api.get('api/auth/google/redirect')
      window.location.href = response.data.redirect_url
    },
    async verifyEmail(query) {
      const { uuid, hash, expires } = query
      await api.get(`api/email/confirmation`, { params: { uuid, hash, expires } })
    },
    async resendLink(uuid) {
      await api.post('api/resend-link', { uuid })
    },
    async loginUser(values) {
      const { username_email, password, code } = values
      await api.get('sanctum/csrf-cookie')
      if (username_email) {
        await api.post('api/login', { username_email, password })
      } else if (code) {
        await api.get('api/auth/google/callback', { params: { code } })
      }
      const response = await api.get('api/user')
      return response.data
    },
    async resetPassword(values) {
      const { email } = values
      await api.post('api/reset-password', { email })
    },
    async checkResetPasswordUrl(query) {
      const { uuid, hash } = query
      return await api.get('api/update-password', { params: { uuid, hash } })
    },
    async updatePassword(values, query) {
      const { uuid, hash } = query
      const { password, confirmation } = values
      await api.patch('api/update-password', {
        password,
        password_confirmation: confirmation,
        uuid,
        hash,
      })
    },
  },
})
