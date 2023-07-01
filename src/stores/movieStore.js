import { defineStore } from 'pinia'
import { useMovieService } from '@/services/MovieService'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    userMovies: [],
    movieDescription: [],
    movieList: [],
    genres: [],
  }),
  getters: {
    getUserMovies: (state) => state.userMovies,
    getMovieDescription: (state) => state.movieDescription,
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
    async showMovie(movie) {
      const response = await useMovieService().fetchMovieDescription(movie)
      this.movieDescription = response.data
    },
    async removeMovie(movieId) {
      await useMovieService().deleteMovie(movieId)
      this.updateUserMovies(this.userMovies, movieId)
      this.updateUserMovies(this.movieList, movieId)
      this.movieDescription = []
    },
    updateUserMovies(array, movieId) {
      if (array.length > 0) {
        const index = array.findIndex((movie) => movie.id === movieId)
        array.splice(index, 1)
      }
    },

    updateQuoteAmount(movieId) {
      if (this.userMovies.length) {
        const movie = this.userMovies.find((movie) => movie.id === movieId)
        movie.quotesLength++
      }
    },
  },
})
