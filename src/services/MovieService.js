import api from '@/config/axios'

export const useMovieService = () => {
  async function fetchMoviesList() {
    return await api.get('api/movies/list')
  }

  async function fetchUserMovies() {
    return await api.get('api/movies')
  }
  async function fetchGenres() {
    return await api.get('api/genres')
  }
  return {
    fetchMoviesList,
    fetchUserMovies,
    fetchGenres,
  }
}
