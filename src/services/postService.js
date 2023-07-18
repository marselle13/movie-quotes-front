import api from '@/config/axios'
import { useUserStore } from '@/stores/user'
import { usePostStore } from '@/stores/post'

export const usePostService = () => {
  async function fetchPosts(page, search = null) {
    if (search) {
      let searchType = `search=${search}`
      if (search.startsWith('#')) {
        searchType = `quote_search=${search.slice(1)}`
      } else if (search.startsWith('@')) {
        searchType = `movie_search=${search.slice(1)}`
      }
      return await api.get(`api/quotes?${searchType}&page=${page}`)
    } else {
      return await api.get(`api/quotes?page=${page}`)
    }
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

  async function reactOnPost(postId) {
    const postStore = usePostStore()
    const userStore = useUserStore()
    const post = Array.isArray(postStore.getPosts)
      ? postStore.getPosts.find((post) => post.id === postId)
      : postStore.getPosts
    const likedPost = post.likes.find((like) => like.user.id === userStore.userData.id)
    if (likedPost) {
      return await api.delete(`api/likes/${postId}`)
    } else {
      return await api.post(`api/likes/${postId}`)
    }
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
    reactOnPost,
    deleteQuote,
    viewPost,
  }
}
