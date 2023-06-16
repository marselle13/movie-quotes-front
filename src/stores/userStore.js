import { defineStore } from 'pinia'
import { useAuthService } from '@/services/authService'
export const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: {
      avatar: '',
      name: '',
      email: '',
      google: null,
    },
    isAuth: null,
  }),
  getters: {
    userData: (state) => state.user,
    authUser: (state) => state.isAuth,
  },
  actions: {
    async login(values) {
      const authService = useAuthService()
      await authService.loginUser(values)
      await this.data()
    },
    async logout() {
      const authService = useAuthService()
      await authService.logoutUser()
      await this.data()
    },
    async data() {
      try {
        const authService = useAuthService()
        const response = await authService.userData()
        const { name, email, avatar, registeredWithGoogle } = response.data

        const avatarPath = avatar.includes('default') ? avatar : `storage/${avatar}`

        this.user = {
          avatar: `${import.meta.env.VITE_BASE_URL}${avatarPath}`,
          name,
          email,
          google: !!registeredWithGoogle,
        }
        this.isAuth = true
      } catch (err) {
        this.isAuth = false
      }
    },
    async updateProfile(values) {
      const { name, email, avatar } = values
      if (name) {
        this.user.name = name
      } else if (email) {
        this.user.email = email
      } else if (avatar) {
        this.user.avatar = `${import.meta.env.VITE_BASE_URL}storage/${avatar}`
      }
    },
  },
})
