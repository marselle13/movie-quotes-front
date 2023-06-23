import api from '@/config/axios'

export const usePostService = () => {
  async function fetchPosts(page) {
    return await api.get(`api/quotes?page=${page}`)
  }

  async function fetchMoreComments(postId) {
    return await api.get(`api/posts/${postId}/comments`)
  }

  async function addNewQuote(values) {
    const { quoteEng, quoteGeo, image, movieId } = values
    const formData = new FormData()
    formData.append('quote[en]', quoteEng)
    formData.append('quote[ka]', quoteGeo)
    formData.append('movie_id', movieId)
    formData.append('thumbnail', image)

    return await api.post('api/quotes', formData)
  }

  return {
    fetchPosts,
    fetchMoreComments,
    addNewQuote,
  }
}
