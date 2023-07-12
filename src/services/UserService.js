import api from '@/config/axios'

export const useUserService = () => {
  async function updateUserData(values) {
    const { new_name, new_avatar, new_email, new_password, confirm_new } = values
    const formData = new FormData()
    const fields = {
      name: new_name,
      email: new_email,
      avatar: new_avatar,
      password: new_password,
      password_confirmation: confirm_new,
    }
    for (const [key, value] of Object.entries(fields)) {
      if (value) {
        formData.append(key, value)
      }
    }
    return await api.post('api/update-user', formData)
  }

  async function fetchPostNotifications() {
    return await api.get(`api/notifications`)
  }

  async function updateNotificationStatus(notificationId = null) {
    return await api.patch(`api/notifications/${notificationId ?? ''}`)
  }

  return {
    updateUserData,
    fetchPostNotifications,
    updateNotificationStatus,
  }
}
