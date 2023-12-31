import api from '@/config/axios'
export const useAuthService = () => {
  async function registerUser(values) {
    const { name, email, password, confirmation } = values
    return await api.post('api/register', {
      name,
      email,
      password,
      password_confirmation: confirmation,
    })
  }
  async function loginUser(values) {
    const { username_email, password, code, remember } = values
    await api.get('sanctum/csrf-cookie')
    if (username_email) {
      return await api.post('api/login', { username_email, password, remember })
    } else if (code) {
      return await api.get('api/auth/google/callback', { params: { code } })
    }
  }
  async function logoutUser() {
    return await api.get('api/logout')
  }
  async function authorizationWithGoogle() {
    return await api.get('api/auth/google/redirect')
  }

  async function userData() {
    return await api.get('api/user')
  }

  return {
    registerUser,
    loginUser,
    logoutUser,
    authorizationWithGoogle,
    userData,
  }
}
