import { defineStore } from 'pinia'
import { useMovieService } from '@/services/MovieService'
import { usePostStore } from '@/stores/postStore'
import { usePostService } from '@/services/postService'

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
      this.userMovies = this.updateUserMovies(this.userMovies, movieId)
      this.movieList = this.updateUserMovies(this.movieList, movieId)
      usePostStore().updatePosts(movieId)
      this.movieDescription = []
    },
    async removeQuoteFromUserMovie(quoteId, movieId) {
      await usePostService().deleteQuote(quoteId)
      const movie = this.userMovies.find((movie) => movie.id === movieId)
      if (movie) {
        movie.quotesLength--
      }
      this.movieDescription.quotes = this.movieDescription.quotes.filter(
        (quote) => quote.id !== quoteId,
      )
      usePostStore().removeQuoteFromPosts(quoteId)
    },
    updateUserMovies(array, movieId) {
      return array.filter((movie) => movie.id !== movieId)
    },
    updateQuoteAmount(movieId) {
      if (this.userMovies.length) {
        const movie = this.userMovies.find((movie) => movie.id === movieId)
        movie.quotesLength++
      }
    },
    updateMovieQuote(newQuote) {
      if (this.movieDescription.id) {
        this.movieDescription.quotes = [newQuote, ...this.movieDescription.quotes]
      }
    },
  },
})
