import api from '@/config/axios'
export const useEmailService = () => {
  async function verifyEmail(query) {
    const { uuid, hash, expires, newEmail: email = null } = query
    return await api.get(`api/email/confirmation`, { params: { uuid, hash, expires, email } })
  }
  async function resendLink(uuid) {
    return await api.post('api/resend-link', { uuid })
  }

  return {
    verifyEmail,
    resendLink,
  }
}
