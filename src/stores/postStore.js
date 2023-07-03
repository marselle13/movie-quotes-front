import { defineStore } from 'pinia'
import { usePostService } from '@/services/postService'
import { useMovieStore } from '@/stores/movieStore'
import { useUserStore } from '@/stores/userStore'

export const usePostStore = defineStore('PostStore', {
  state: () => ({
    posts: [],
    post: [],
    currentPage: 1,
    isFetching: false,
    hasMoreData: true,
  }),
  getters: {
    getPosts: (state) => state.posts,
    getPost: (state) => state.post,
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
      const response = await usePostService().createOrUpdateQuote(values)
      if (this.posts.length) {
        this.posts = [response.data.newQuote, ...this.posts]
      }
      useMovieStore().updateQuoteAmount(values.movieId)
      useMovieStore().addNewMovieQuote(response.data.newQuote)
    },
    async loadMoreComments(postId) {
      const response = await usePostService().fetchMoreComments(postId)
      this.commentSection(postId, response.data)
    },
    async newComment(postId, comment, loaded) {
      const response = await usePostService().addNewComment(postId, comment)
      const post = this.posts.find((post) => post.id === postId) || this.post
      loaded
        ? post.comments.push(response.data.newComment)
        : post.comments.unshift(response.data.newComment)

      post.length.comments++
    },
    async postReaction(postId) {
      const post = this.posts.find((post) => post.id === postId) || this.post
      const likedPost = post.likes.find((like) => like.user.id === useUserStore().userData.id)
      if (likedPost) {
        await usePostService().unlikePost(postId)
        post.likes = post.likes.filter((like) => like !== likedPost)
        post.length.likes--
      } else {
        const response = await usePostService().likePost(postId)
        const newLike = response.data.like
        post.likes.push(newLike)
        post.length.likes++
      }
    },
    async showPost(quoteId) {
      const post = this.posts.find((post) => post.id === quoteId)
      if (!post) {
        const response = await usePostService().viewPost(quoteId)
        this.post = response.data
        return
      }
      this.post = post
    },
    async editPost(values, quoteId) {
      const response = await usePostService().createOrUpdateQuote(values, quoteId)
      this.post.quote = response.data.updatedQuote.quote
      this.post.thumbnail = response.data.updatedQuote.thumbnail
      useMovieStore().updateMovieQuote(quoteId, response.data.updatedQuote)
    },
    commentSection(postId, data = null) {
      const post = this.posts.find((post) => postId === post.id) || this.post
      if (data) {
        post.comments = data
      }
      post.comments.reverse()
    },
    removeQuoteFromPosts(quoteId) {
      this.posts = this.posts.filter((post) => post.id !== quoteId)
    },
    deletePostsWithMovies(movieId) {
      this.posts = this.posts.filter((post) => post.movie.id !== movieId)
    },
  },
})
