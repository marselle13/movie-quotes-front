import { defineStore } from 'pinia'
import { useAuthService } from '@/services/authService'
export const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: {
      name: '',
      email: '',
    },
  }),
  getters: {
    userData: (state) => state.user,
  },
  actions: {
    async loginData(values) {
      const authService = useAuthService()
      const response = await authService.loginUser(values)
      const { name, email } = response.data
      this.user = {
        name,
        email,
      }
    },
  },
})
