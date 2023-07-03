<template>
  <MainContainer width="w-full mx-10 lg:mx-0">
    <teleport to="body">
      <transition
        name="new-quote"
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <MovieModal :title="t('new_movie')" v-if="addMovie" @close="addMovie = false" />
      </transition>
    </teleport>
    <div class="flex justify-between gap-4">
      <h2 class="text-white text-base md:text-2xl">
        {{ t('movie_list', { amount: movieStore.getUserMovies.length }) }}
      </h2>
      <base-button
        @click="addMovie = true"
        class="self-start flex py-2 px-4 items-center gap-2 whitespace-nowrap"
        ><MovieAddIcon />{{ t('new_movie') }}</base-button
      >
    </div>
    <LoadingSpinner v-if="isLoading" />
    <section class="grid 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-x-12 gap-y-14 my-14" v-else>
      <div class="space-y-4" v-for="movie in movieStore.getUserMovies" :key="movie.id">
        <div
          @click="router.push({ name: 'movie-description', params: { movie: movie.id } })"
          class="rounded-xl overflow-hidden h-[18rem] md:h-[23rem] cursor-pointer"
        >
          <img
            alt="movie"
            :src="`${viteBaseUrl}storage/${movie.image}`"
            class="object-cover h-full w-full"
          />
        </div>
        <h4 class="text-white text-2xl break-words">{{ movie.name[locale] }}</h4>
        <p class="text-white flex items-center gap-3">{{ movie.quotesLength }} <QuoteIcon /></p>
      </div>
    </section>
  </MainContainer>
</template>
<script setup>
import MainContainer from '@/components/layout/MainContainer.vue'
import MovieAddIcon from '@/components/icons/MovieAddIcon.vue'
import QuoteIcon from '@/components/icons/QuoteIcon.vue'
import MovieModal from '@/components/modals/MovieModal.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMovieStore } from '@/stores/movieStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const movieStore = useMovieStore()
const { t, locale } = useI18n()
const viteBaseUrl = import.meta.env.VITE_BASE_URL

const isLoading = ref(false)
const addMovie = ref(false)
const error = ref('')

onBeforeMount(async () => {
  try {
    if (movieStore.getUserMovies.length === 0) {
      isLoading.value = true
      await movieStore.storeUserMovies()
      isLoading.value = false
    }
  } catch (err) {
    isLoading.value = false
    error.value = err.message
  }
})
</script>
