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
      await api.post('register', {
        name,
        email,
        password,
        password_confirmation: confirmation,
      })
    },
    async verifyEmail(query) {
      const { uuid, hash, expires } = query
      await api.get(`email/confirmation`, {
        params: {
          uuid,
          hash,
          expires,
        },
      })
    },
    async authorizationWithGoogle() {
      try {
        const response = await api.get('auth/google/redirect')
        window.location.href = response.data.redirect_url
      } catch (error) {
        console.error(error)
      }
    },
    async callbackFromGoogle(code) {
      await api.get('auth/google/callback', {
        params: {
          code,
        },
      })
    },
    async resendLink(uuid) {
      await api.post('resend-link', { uuid })
    },
  },
})
