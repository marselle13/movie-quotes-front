import api from '@/config/axios'
export const usePasswordService = () => {
  async function resetPassword(values) {
    const { email } = values
    return await api.post('api/reset-password', { email })
  }
  async function checkResetPasswordUrl(query) {
    const { uuid, token } = query
    return await api.get('api/update-password', { params: { uuid, token } })
  }
  async function updatePassword(values, query) {
    const { uuid, token } = query
    const { password, confirmation } = values
    return await api.patch('api/update-password', {
      password,
      password_confirmation: confirmation,
      uuid,
      token,
    })
  }

  return {
    resetPassword,
    checkResetPasswordUrl,
    updatePassword,
  }
}
