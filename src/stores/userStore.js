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
      const { name, email, password, confirmation, code } = values
      if (email) {
        const response = await api.post('api/register', {
          name,
          email,
          password,
          password_confirmation: confirmation,
        })
        return response.status
      }
      if (code) {
        return await api.get('api/auth/google/register', { params: { code } })
      }
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
      const { username_email, password } = values
      await api.get('sanctum/csrf-cookie')
      await api.post('api/login', {
        username_email,
        password,
      })
      const response = await api.get('api/user')
      return response.data
    },
  },
})
