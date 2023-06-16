import axios from 'axios'

axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
})
api.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = localStorage.getItem('locale')
  return config
})

export default api
