<template>
  <router-view></router-view>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMovieStore } from '@/stores/movie'

const router = useRouter()
const userStore = useUserStore()
const movieStore = useMovieStore()

router.beforeResolve(async (to) => {
  const { authUser } = userStore
  if (authUser === null) {
    await userStore.data()
  }
  const updateAuth = userStore.authUser

  if (updateAuth && to.meta.user === 'guest') {
    return { name: 'forbidden', query: { page: 'news-feed' } }
  }

  if (!updateAuth && to.meta.user === 'auth') {
    return { name: 'forbidden', query: { page: 'landing' } }
  }

  if (to.name === 'movie-description') {
    try {
      await movieStore.showMovie(to.params.movie)
    } catch (err) {
      if (err.response.status === 404) {
        return { path: 'not-found' }
      } else {
        return { name: 'forbidden', query: { page: 'movie-list' } }
      }
    }
  }
})
</script>
