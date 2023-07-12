import { defineStore } from 'pinia'
import { usePostService } from '@/services/postService'
import { useMovieStore } from '@/stores/movieStore'

export const usePostStore = defineStore('PostStore', {
  state: () => ({
    posts: [],
    search: null,
    currentPage: 1,
    isFetching: false,
    hasMoreData: true,
  }),
  getters: {
    getPosts: (state) => state.posts,
    getSearch: (state) => state.search,
  },
  actions: {
    async showPosts() {
      try {
        this.currentPage = 1
        this.hasMoreData = true
        this.search = null
        const response = await usePostService().fetchPosts(this.currentPage)
        this.posts = response.data
      } catch (err) {
        throw new Error('Cannot Fetch Data')
      }
    },
    async showMorePosts(search = null) {
      if (this.isFetching || !this.hasMoreData) {
        return
      }

      this.isFetching = true

      try {
        const response = await usePostService().fetchPosts((this.currentPage += 1), search)
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
      const response = await usePostService().createOrUpdateQuote(values)
      if (Array.isArray(this.posts)) {
        this.posts = [response.data.newQuote, ...this.posts]
      }
      useMovieStore().updateQuoteAmount(values.movieId)
      useMovieStore().addNewMovieQuote(response.data.newQuote)
    },
    async loadMoreComments(postId) {
      try {
        const response = await usePostService().fetchMoreComments(postId)
        this.commentSection(postId, response.data)
      } catch (err) {
        throw new Error('cannot load Comments')
      }
    },
    async newComment(postId, comment, loaded) {
      const post = Array.isArray(this.posts)
        ? this.posts.find((post) => postId === post.id)
        : this.posts

      loaded ? post.comments.push(comment) : post.comments.unshift(comment)

      post.length.comments++
    },
    postReaction(reactData) {
      const post = Array.isArray(this.posts)
        ? this.posts.find((post) => post.id === reactData.quoteId)
        : this.posts
      const likedPost = post.likes.find((like) => like.id === reactData.id)
      if (likedPost) {
        post.likes = post.likes.filter((like) => like !== likedPost)
        post.length.likes--
      } else {
        post.likes.push(reactData)
        post.length.likes++
      }
    },
    async showPost(quoteId) {
      const response = await usePostService().viewPost(quoteId)
      this.posts = response.data
    },
    async editPost(values, quoteId) {
      const response = await usePostService().createOrUpdateQuote(values, quoteId)
      this.posts.quote = response.data.updatedQuote.quote
      this.posts.thumbnail = response.data.updatedQuote.thumbnail
      useMovieStore().updateMovieQuote(quoteId, response.data.updatedQuote)
    },
    async searchPosts(search) {
      this.search = search
      this.currentPage = 1
      const response = await usePostService().fetchPosts(this.currentPage, search)
      this.posts = response.data
    },
    commentSection(postId, data) {
      const post = Array.isArray(this.posts)
        ? this.posts.find((post) => postId === post.id)
        : this.posts
      post.comments = data
      post.comments.reverse()
    },
  },
})
