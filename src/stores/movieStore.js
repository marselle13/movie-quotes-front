import { defineStore } from 'pinia'
import { useMovieService } from '@/services/MovieService'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movieList: [],
  }),
  getters: {
    getMovieList: (state) => state.movieList,
  },
  actions: {
    async storeMovieList() {
      const movieService = useMovieService()
      try {
        const response = await movieService.fetchMoviesList()
        this.movieList = response.data
      } catch (err) {
        throw new Error('Cannot Fetch movies')
      }
    },
  },
})
