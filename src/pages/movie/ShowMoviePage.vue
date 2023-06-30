<template>
  <MainContainer width="w-full mb-10">
    <div class="lg:flex justify-between gap-4 hidden">
      <h2 class="text-white text-2xl">
        {{ t('movie_description') }}
      </h2>
    </div>
    <section class="flex flex-col lg:mt-8 w-full gap-4">
      <div class="flex 2xl:flex-row flex-col gap-6 2xl:h-[27rem] w-full h-full px-9 lg:px-0">
        <div
          class="lg:max-w-[50rem] bg-[#11101A] rounded-2xl overflow-hidden h-[18rem] md:h-[27rem] w-full"
        >
          <img
            :src="`${viteBaseUrl}storage/${movieDescription.image}`"
            alt="image"
            class="object-cover w-full object-center h-full"
          />
        </div>
        <div class="lg:max-w-[34rem] space-y-6 w-full">
          <div class="inline-flex flex-col md:flex-row w-full gap-6 justify-between items-start">
            <h2 class="w-full text-[#DDCCAA] text-2xl font-medium break-words">
              {{ movieDescription.name[locale] }}
              <span>({{ movieDescription.year }})</span>
            </h2>
            <div class="flex items-center bg-[#24222F] rounded-xl py-2 px-7">
              <button><EditIcon /></button>
              <div class="h-4 border border-[#6C757D] mx-6"></div>
              <button @click="deleteMovie(movieDescription.id)"><DeleteIcon /></button>
            </div>
          </div>
          <ul class="inline-flex flex-wrap gap-2 w-full">
            <li
              v-for="genre in movieDescription.genres"
              :key="genre.id"
              class="text-center bg-[#6C757D] px-2 py-1 rounded"
            >
              <h4 class="text-white font-bold text-lg">{{ genre.name[locale] }}</h4>
            </li>
          </ul>
          <h4 class="text-lg text-white font-medium">
            <span class="text-[#CED4DA] font-bold">Director: </span
            >{{ movieDescription.director[locale] }}
          </h4>
          <p class="text-lg text-[#CED4DA] break-words">
            {{ movieDescription.description[locale] }}
          </p>
        </div>
      </div>
      <div class="flex flex-col lg:max-w-[50rem] space-y-10 w-full">
        <div
          class="flex lg:flex-row flex-col-reverse lg:items-center mt-8 lg:mt-10 mb-4 px-9 lg:px-0"
        >
          <h5 class="text-white text-2xl">Quotes (total {{ movieDescription.quotes?.length }})</h5>
          <div class="lg:h-7 border border-[#6C757D] lg:mx-4 my-10 lg:my-0"></div>
          <base-button class="w-40 lg:w-auto flex items-center px-4 py-2 gap-2"
            ><movie-add-icon /> Add Quote</base-button
          >
        </div>
        <main-card v-for="quote in movieDescription.quotes" class="py-6 px-8" :key="quote.id">
          <div
            class="flex flex-col md:flex-row md:items-center pb-6 border-b border-[#EFEFEF33] gap-8"
          >
            <div class="rounded-sm h-[8.75rem] md:w-[14rem] w-full">
              <img
                :src="`${viteBaseUrl}storage/${quote.thumbnail}`"
                alt="thumbnail"
                class="h-full object-cover w-full object-center"
              />
            </div>
            <p class="text-[#CED4DA] italic text-2xl">"{{ quote.quote[locale] }}"</p>
          </div>
          <div class="flex pt-6 gap-6">
            <div class="flex gap-4">
              <h5 class="text-white">{{ quote.length.comments }}</h5>
              <CommentIcon />
            </div>
            <div class="flex gap-4">
              <h5 class="text-white">{{ quote.length.likes }}</h5>
              <LikeIcon />
            </div>
          </div>
        </main-card>
      </div>
    </section>
  </MainContainer>
</template>
<script setup>
import MainContainer from '@/components/layout/MainContainer.vue'
import MainCard from '@/components/ui/MainCard.vue'
import CommentIcon from '@/components/icons/CommenetIcon.vue'
import LikeIcon from '@/components/icons/LikeIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import BaseButton from '@/components/ui/form/BaseButton.vue'
import MovieAddIcon from '@/components/icons/MovieAddIcon.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMovieStore } from '@/stores/movieStore'

const router = useRouter()
const { t, locale } = useI18n()
const movieStore = useMovieStore()
const movieDescription = movieStore.getMovieDescription
const viteBaseUrl = import.meta.env.VITE_BASE_URL

async function deleteMovie(movieId) {
  try {
    await movieStore.removeMovie(movieId)
    await router.replace({ name: 'movie-list' })
  } catch (err) {
    //Err
  }
}
</script>
