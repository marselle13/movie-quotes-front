import { defineStore } from 'pinia'
import { usePostService } from '@/services/postService'

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
      const postService = usePostService()
      try {
        const response = await postService.fetchPosts(this.currentPage)
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
        const postService = usePostService()
        const response = await postService.fetchPosts((this.currentPage += 1))
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
      const postService = usePostService()
      const response = await postService.addNewQuote(values)
      this.posts = [response.data.newQuote, ...this.posts]
    },
    async loadMoreComments(postId) {
      const postService = usePostService()
      const response = await postService.fetchMoreComments(postId)
      const post = this.posts.find((post) => postId === post.id)
      post.comments = response.data
    },
  },
})
