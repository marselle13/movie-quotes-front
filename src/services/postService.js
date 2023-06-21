import api from '@/config/axios'

export const usePostService = () => {
  async function fetchPosts(page) {
    return await api.get(`api/posts?page=${page}`)
  }

  return {
    fetchPosts,
  }
}
