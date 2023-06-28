<template>
  <TheHeader @open-navigation="navigationHandler" />
  <MainContainer
    width="w-full px-10 lg:px-0"
    :navigation="navigation"
    @close-navigation="navigationHandler"
  >
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
        <NewMovieModal v-if="addMovie" @close="addMovie = false" />
      </transition>
    </teleport>
    <div class="flex justify-between gap-4">
      <h2 class="text-white text-base md:text-2xl">
        {{ t('movie_list', { amount: 25 }) }}
      </h2>
      <base-button
        @click="addMovie = true"
        class="self-start flex py-2 px-4 items-center gap-2 whitespace-nowrap"
        ><MovieAddIcon /> Add Movie</base-button
      >
    </div>
    <section class="grid 2xl:grid-cols-3 lg:grid-cols-2 gap-x-12 gap-y-14 my-14">
      <div class="space-y-4">
        <div class="rounded-xl overflow-hidden h-[18rem] md:h-[23rem]">
          <img alt="movie" :src="Image" class="object-cover h-full w-full" />
        </div>
        <h4 class="text-white text-2xl">Loki Mobius (2021)</h4>
        <p class="text-white flex items-center gap-3">10 <QuoteIcon /></p>
      </div>
    </section>
  </MainContainer>
</template>
<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import Image from '@/assets/interstellar.png'
import MovieAddIcon from '@/components/icons/MovieAddIcon.vue'
import QuoteIcon from '@/components/icons/QuoteIcon.vue'
import NewMovieModal from '@/components/modals/NewMovieModal.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const navigation = ref(false)
const addMovie = ref(false)

function navigationHandler(value) {
  navigation.value = value
}
</script>
