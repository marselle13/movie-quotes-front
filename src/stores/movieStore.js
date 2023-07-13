import { defineStore } from 'pinia'
import { useMovieService } from '@/services/MovieService'
import { usePostService } from '@/services/postService'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    userMovies: [],
    searchedMovies: [],
    currentMovie: [],
    movieList: [],
    genres: [],
  }),
  getters: {
    getUserMovies: (state) => state.userMovies,
    getSearchedMovies: (state) => state.searchedMovies,
    getCurrentMovie: (state) => state.currentMovie,
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
    searchMovies(search, locale) {
      this.searchedMovies = this.userMovies.filter((movie) => movie.name[locale].includes(search))
    },
    async addNewMovie(values) {
      const response = await useMovieService().createOrUpdateMovie(values)
      this.userMovies = [response.data.newMovie, ...this.userMovies]
    },
    async showMovie(movie) {
      const response = await useMovieService().fetchMovieDescription(movie)
      this.currentMovie = response.data
    },
    async removeMovie(movieId) {
      await useMovieService().deleteMovie(movieId)
      this.userMovies = this.userMovies.filter((movie) => movie.id !== movieId)
      this.currentMovie = []
    },
    async removeQuoteFromMovie(quoteId, movieId) {
      await usePostService().deleteQuote(quoteId)
      const movie = this.userMovies.find((movie) => movie.id === movieId)
      if (movie) {
        movie.quotesLength--
      }
      this.currentMovie.quotes = this.currentMovie.quotes.filter((quote) => quote.id !== quoteId)
    },
    async editMovie(values, movieId) {
      const response = await useMovieService().createOrUpdateMovie(values, movieId)
      this.currentMovie = response.data.updatedMovieDescription
      if (this.userMovies.length) {
        const index = this.userMovies.findIndex((movie) => movie.id === movieId)
        this.userMovies[index] = response.data.updatedUserMovie
      }
    },
    updateQuoteAmount(movieId) {
      if (this.userMovies.length) {
        const movie = this.userMovies.find((movie) => movie.id === movieId)
        movie.quotesLength++
      }
    },
    updateAmount(data, type) {
      const quote = this.currentMovie.quotes.find((quote) => quote.id === data.quoteId)
      if (type === 'comments') {
        quote.length[type]++
      } else {
        const likedPost = quote.likes.find((like) => like.user.id === data.user.id)
        if (likedPost) {
          quote.likes = quote.likes.filter((like) => like !== likedPost)
          quote.length[type]--
        } else {
          quote.likes.push(data)
          quote.length[type]++
        }
      }
    },
    updateMovieQuote(quoteId, updatedQuote) {
      const index = this.currentMovie.quotes.findIndex((quote) => quote.id === quoteId)
      this.currentMovie.quotes[index] = updatedQuote
    },
    addNewMovieQuote(newQuote) {
      if (this.currentMovie.id) {
        this.currentMovie.quotes = [newQuote, ...this.currentMovie.quotes]
      }
    },
  },
})
