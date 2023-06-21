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
        const response = await postService.fetchPosts(this.currentPage++)
        const newPosts = response.data

        this.posts = [...this.posts, ...newPosts]
        this.currentPage++
        this.hasMoreData = newPosts.length > 0
      } catch (err) {
        //Err
      } finally {
        this.isFetching = false
      }
    },
  },
})
