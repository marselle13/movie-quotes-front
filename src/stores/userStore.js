import { defineStore } from 'pinia'
import { useAuthService } from '@/services/authService'
import { useUserService } from '@/services/UserService'
import { useNotificationService } from '@/services/NotificationService'
export const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: {
      id: null,
      avatar: '',
      name: '',
      email: '',
      google: null,
    },
    notifications: [],
    isAuth: null,
  }),
  getters: {
    userData: (state) => state.user,
    getNotifications: (state) => state.notifications,
    authUser: (state) => state.isAuth,
  },
  actions: {
    async login(values) {
      await useAuthService().loginUser(values)
      await this.data()
    },
    async logout() {
      await useAuthService().logoutUser()
      this.resetData()
    },
    async data() {
      try {
        const response = await useAuthService().userData()
        const { id, name, email, avatar, registeredWithGoogle } = response.data

        const avatarPath = avatar.includes('default') ? avatar : `storage/${avatar}`

        this.user = {
          id,
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
      const { name, avatar } = values
      this.user.name = name
      this.user.avatar = `${import.meta.env.VITE_BASE_URL}${
        avatar.includes('default') ? '' : 'storage/'
      }${avatar}`
    },
    async userNotifications() {
      try {
        const response = await useNotificationService().fetchPostNotifications()
        this.notifications = response.data
      } catch (err) {
        throw new Error('Cannot fetch notifications')
      }
    },
    async updateNotification(notificationId = null) {
      if (notificationId) {
        const response = await useNotificationService().updateNotificationStatus(notificationId)
        const index = this.notifications.findIndex(
          (notification) => notification.id === notificationId,
        )
        this.notifications[index] = response.data.updatedNotification
      } else {
        await useNotificationService().updateNotificationStatus()
        this.notifications.forEach((notification) => {
          if (notification.type !== 'new') return
          notification.type = 'seen'
        })
      }
    },
    newNotification(notification) {
      this.notifications = [notification, ...this.notifications]
    },
    resetData() {
      this.user.avatar = ''
      this.user.name = ''
      this.user.email = ''
      this.user.google = null
      this.isAuth = false
    },
  },
})
