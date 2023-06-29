<template>
  <MainContainer width="w-full">
    <div class="flex justify-between gap-4">
      <h2 class="text-white text-base md:text-2xl">
        {{ t('movie_description') }}
      </h2>
    </div>
    <section class="flex mt-8 gap-5">
      <div class="max-w-[50rem] w-full">
        <div class="flex justify-center bg-[#11101A] rounded-2xl overflow-hidden h-[27rem]">
          <img
            :src="`${viteBaseUrl}storage/${movieDescription.image}`"
            alt="image"
            class="object-cover w-full"
          />
        </div>
        <div class="mt-10 mb-14">
          <h5 class="text-white text-2xl">Quotes (total {{ movieDescription.quotes.length }})</h5>
        </div>
        <main-card v-for="quote in movieDescription.quotes" class="py-6 px-8" :key="quote.id">
          <div class="flex items-center pb-6 border-b border-[#EFEFEF33]">
            <div class="rounded-sm h-[8.75rem] w-[14rem]">
              <img
                :src="`${viteBaseUrl}storage/${quote.thumbnail}`"
                alt="thumbnail"
                class="h-full object-cover"
              />
            </div>
            <p class="text-[#CED4DA] italic">"{{ quote.quote[locale] }}"</p>
          </div>
          <div class="flex pt-6 gap-6">
            <div class="flex gap-4">
              <h5 class="text-white">{{ quote.length.comments }}</h5>
              <CommenetIcon />
            </div>

            <div class="flex gap-4">
              <h5 class="text-white">{{ quote.length.likes }}</h5>
              <LikeIcon />
            </div>
          </div>
        </main-card>
      </div>
      <div class="space-y-6">
        <h2 class="text-[#DDCCAA] text-2xl font-medium">
          {{ movieDescription.name[locale] }}
          <span>({{ movieDescription.year }})</span>
        </h2>
        <ul class="inline-flex">
          <li
            v-for="genre in movieDescription.genres"
            :key="genre.id"
            class="bg-[#6C757D] px-2 py-1 rounded"
          >
            <h4 class="text-white font-bold text-lg">{{ genre.name[locale] }}</h4>
          </li>
        </ul>
        <h4 class="text-lg text-white font-medium">
          <span class="text-[#CED4DA] font-bold">Director: </span
          >{{ movieDescription.director[locale] }}
        </h4>
        <p class="text-lg text-[#CED4DA]">{{ movieDescription.description[locale] }}</p>
      </div>
    </section>
  </MainContainer>
</template>
<script setup>
import MainContainer from '@/components/layout/MainContainer.vue'
import { useI18n } from 'vue-i18n'
import { useMovieStore } from '@/stores/movieStore'
import MainCard from '@/components/ui/MainCard.vue'
import CommenetIcon from '@/components/icons/CommenetIcon.vue'
import LikeIcon from '@/components/icons/LikeIcon.vue'

const { t, locale } = useI18n()
const movieStore = useMovieStore()
const movieDescription = movieStore.getMovieDescription
const viteBaseUrl = import.meta.env.VITE_BASE_URL
</script>
