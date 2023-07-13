import api from '@/config/axios'

export const useNotificationService = () => {
  async function fetchPostNotifications() {
    return await api.get(`api/notifications`)
  }

  async function updateNotificationStatus(notificationId = null) {
    return await api.patch(`api/notifications/${notificationId ?? ''}`)
  }

  return {
    fetchPostNotifications,
    updateNotificationStatus,
  }
}
