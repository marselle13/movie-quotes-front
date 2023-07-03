import api from '@/config/axios'

export const usePostService = () => {
  async function fetchPosts(page) {
    return await api.get(`api/quotes?page=${page}`)
  }

  async function fetchMoreComments(postId) {
    return await api.get(`api/comments/${postId}`)
  }

  async function createOrUpdateQuote(values, quoteId = null) {
    const { quoteEng, quoteGeo, image, movieId } = values
    const formData = new FormData()
    formData.append('quote[en]', quoteEng)
    formData.append('quote[ka]', quoteGeo)
    if (movieId) {
      formData.append('movie_id', movieId)
    }
    if (image) {
      formData.append('thumbnail', image)
    }

    return await api.post(`api/quotes/${quoteId ? quoteId : ''}`, formData)
  }

  async function addNewComment(postId, comment) {
    return await api.post(`api/comments/${postId}`, { text: comment })
  }

  async function likePost(postId) {
    return await api.post(`api/likes/${postId}`)
  }
  async function unlikePost(postId) {
    return await api.delete(`api/likes/${postId}`)
  }

  async function deleteQuote(quoteId) {
    return await api.delete(`api/quotes/${quoteId}`)
  }

  async function viewPost(quoteId) {
    return await api.get(`api/quotes/${quoteId}`)
  }

  return {
    fetchPosts,
    fetchMoreComments,
    createOrUpdateQuote,
    addNewComment,
    likePost,
    unlikePost,
    deleteQuote,
    viewPost,
  }
}
