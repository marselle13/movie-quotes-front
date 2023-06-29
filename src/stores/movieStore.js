import { defineStore } from 'pinia'
import { useMovieService } from '@/services/MovieService'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    userMovies: [],
    movieList: [],
    genres: [],
  }),
  getters: {
    getUserMovies: (state) => state.userMovies,
    getMovieList: (state) => state.movieList,
    getGenres: (state) => state.genres,
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
    async storeUserMovies() {
      try {
        const movieService = useMovieService()
        const response = await movieService.fetchUserMovies()
        this.userMovies = response.data
      } catch (err) {
        throw new Error('Cannot Fetch user movies')
      }
    },
    async storeGenres() {
      try {
        const movieService = useMovieService()
        const response = await movieService.fetchGenres()
        this.genres = response.data
      } catch (err) {
        throw new Error('Cannot Fetch genres')
      }
    },
  },
})
