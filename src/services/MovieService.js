import api from '@/config/axios'

export const useMovieService = () => {
  async function fetchMoviesList() {
    return await api.get('api/movies/list')
  }

  return {
    fetchMoviesList,
  }
}
