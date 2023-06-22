import api from '@/config/axios'

export const usePostService = () => {
  async function fetchPosts(page) {
    return await api.get(`api/posts?page=${page}`)
  }

  async function fetchMoreComments(postId) {
    return await api.get(`api/posts/${postId}/comments`)
  }

  return {
    fetchPosts,
    fetchMoreComments,
  }
}
