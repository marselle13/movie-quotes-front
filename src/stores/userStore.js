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
    async registerUserWithGoogle() {
      try {
        const response = await api.get('auth/google')
        window.location.href = response.data.redirect_url
      } catch (error) {
        console.error(error)
      }
    },
    async resendLink(uuid) {
      await api.post('resend-link', { uuid })
    },
  },
})
