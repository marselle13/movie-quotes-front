import api from '@/config/axios'

export const usePostService = () => {
  async function fetchPosts(page) {
    return await api.get(`api/quotes?page=${page}`)
  }

  async function fetchMoreComments(postId) {
    return await api.get(`api/comments/${postId}`)
  }

  async function createNewQuote(values) {
    const { quoteEng, quoteGeo, image, movieId } = values
    const formData = new FormData()
    formData.append('quote[en]', quoteEng)
    formData.append('quote[ka]', quoteGeo)
    formData.append('movie_id', movieId)
    formData.append('thumbnail', image)

    return await api.post('api/quotes', formData)
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

  return {
    fetchPosts,
    fetchMoreComments,
    createNewQuote,
    addNewComment,
    likePost,
    unlikePost,
    deleteQuote,
  }
}
