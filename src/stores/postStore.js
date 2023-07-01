import { defineStore } from 'pinia'
import { usePostService } from '@/services/postService'
import { useMovieStore } from '@/stores/movieStore'

export const usePostStore = defineStore('PostStore', {
  state: () => ({
    posts: [],
    currentPage: 1,
    isFetching: false,
    hasMoreData: true,
  }),
  getters: {
    getPosts: (state) => state.posts,
  },
  actions: {
    async showPosts() {
      try {
        const response = await usePostService().fetchPosts(this.currentPage)
        this.posts = response.data
      } catch (err) {
        throw new Error('Cannot Fetch Data')
      }
    },
    async showMorePosts() {
      if (this.isFetching || !this.hasMoreData) {
        return
      }

      this.isFetching = true

      try {
        const response = await usePostService().fetchPosts((this.currentPage += 1))
        const newPosts = response.data

        this.posts = [...this.posts, ...newPosts]
        this.currentPage += 1
        this.hasMoreData = newPosts.length > 0
      } catch (err) {
        throw new Error('Cannot Fetch More Data')
      } finally {
        this.isFetching = false
      }
    },
    async addQuote(values) {
      const response = await usePostService().createNewQuote(values)
      this.posts = [response.data.newQuote, ...this.posts]
      useMovieStore().updateQuoteAmount(values.movieId)
    },
    async loadMoreComments(postId) {
      const response = await usePostService().fetchMoreComments(postId)
      this.commentSection(postId, response.data)
    },
    async newComment(postId, comment, loaded) {
      const response = await usePostService().addNewComment(postId, comment)
      const post = this.posts.find((post) => post.id === postId)
      loaded
        ? post.comments.push(response.data.newComment)
        : post.comments.unshift(response.data.newComment)

      post.length.comments++
    },
    async postReaction(postId) {
      const post = this.posts.find((post) => post.id === postId)
      const likedPost = post.likes.findIndex((like) => like.user.id === userStore.userData.id)
      if (likedPost !== -1) {
        await usePostService().unlikePost(postId)
        post.likes.splice(likedPost, 1)
        post.length.likes--
      } else {
        const response = await usePostService().likePost(postId)
        const newLike = response.data.like
        post.likes.push(newLike)
        post.length.likes++
      }
    },
    removeQuoteFromPosts(quoteId) {
      this.posts = this.posts.filter((post) => post.id === quoteId)
    },
    commentSection(postId, data = null) {
      const post = this.posts.find((post) => postId === post.id)
      if (data) {
        post.comments = data
      }
      post.comments.reverse()
    },
    updatePosts(movieId) {
      this.posts = this.posts.filter((post) => post.movie.id !== movieId)
    },
  },
})
