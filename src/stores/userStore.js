import { defineStore } from 'pinia'
import { useAuthService } from '@/services/authService'
import { useUserService } from '@/services/UserService'
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
        const { name, email, avatar, google } = response.data

        const avatarPath = avatar.includes('default') ? avatar : `storage/${avatar}`

        this.user = {
          avatar: `${import.meta.env.VITE_BASE_URL}${avatarPath}`,
          name,
          email,
          google: !!google,
        }
        this.isAuth = true
      } catch (err) {
        this.isAuth = false
      }
    },
    async updateProfile(values) {
      const userService = useUserService()
      await userService.updateUserData(values)
      const { new_name, new_email, new_avatar } = values
      if (new_name) {
        this.user.name = new_name
      } else if (new_email) {
        this.user.email = new_email
      } else if (new_avatar) {
        this.user.avatar = URL.createObjectURL(new_avatar)
      }
    },
  },
})
