import { defineStore } from 'pinia'
import { useAuthService } from '@/services/authService'
export const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: {
      name: '',
      email: '',
    },
    isAuth: false,
  }),
  getters: {
    userData: (state) => state.user,
    authUser: (state) => state.isAuth,
  },
  actions: {
    async login(values) {
      const authService = useAuthService()
      await authService.loginUser(values)
      return this.data()
    },
    async data() {
      const authService = useAuthService()
      const response = await authService.userData()
      const { name, email } = response.data
      this.user = {
        name,
        email,
      }
      this.isAuth = true
    },
  },
})
