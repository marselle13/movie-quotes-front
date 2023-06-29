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

  async function fetchMovieDescription(movie) {
    return await api.get(`api/movies/${movie}`)
  }

  async function createNewMovie(values) {
    const {
      nameEng,
      nameGeo,
      genres,
      year,
      directorEng,
      directorGeo,
      descriptionEng,
      descriptionGeo,
      image,
    } = values
    const formData = new FormData()
    formData.append('name[en]', nameEng)
    formData.append('name[ka]', nameGeo)
    genres.forEach((genre) => {
      formData.append('genres[]', genre)
    })
    formData.append('year', year)
    formData.append('director[en]', directorEng)
    formData.append('director[ka]', directorGeo)
    formData.append('description[en]', descriptionEng)
    formData.append('description[ka]', descriptionGeo)
    formData.append('image', image)

    return await api.post('api/movies', formData)
  }

  return {
    fetchMoviesList,
    fetchUserMovies,
    fetchMovieDescription,
    fetchGenres,
    createNewMovie,
  }
}
