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
      try {
        const response = await useMovieService().fetchMoviesList()
        this.movieList = response.data
      } catch (err) {
        throw new Error('Cannot Fetch movies')
      }
    },
    async storeUserMovies() {
      try {
        const response = await useMovieService().fetchUserMovies()
        this.userMovies = response.data
      } catch (err) {
        throw new Error('Cannot Fetch user movies')
      }
    },
    async storeGenres() {
      try {
        const response = await useMovieService().fetchGenres()
        this.genres = response.data
      } catch (err) {
        throw new Error('Cannot Fetch genres')
      }
    },
    async addNewMovie(values) {
      const response = await useMovieService().createNewMovie(values)
      this.userMovies = [response.data.newMovie, ...this.userMovies]
    },
  },
})
