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
    const { username_email, password, code } = values
    await api.get('sanctum/csrf-cookie')
    if (username_email) {
      await api.post('api/login', { username_email, password })
    } else if (code) {
      await api.get('api/auth/google/callback', { params: { code } })
    }
    return await api.get('api/user')
  }
  async function authorizationWithGoogle() {
    return await api.get('api/auth/google/redirect')
  }

  return {
    registerUser,
    loginUser,
    authorizationWithGoogle,
  }
}
