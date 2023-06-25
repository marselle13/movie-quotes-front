<template>
  <div class="flex justify-center lg:mr-10 relative z-40">
    <div
      class="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-0% from-[#181623] via-[#191725] via-50% to-[#0D0B14] to-[95%] opacity-70 z-1 backdrop-blur-sm"
      @click="emit('close')"
    ></div>
    <main-card
      class="w-full fixed top-0 lg:top-20 max-w-[940px] h-screen lg:max-h-[768px] overflow-y-auto scrollbar-hide"
    >
      <div class="flex items-center justify-center border-b border-[#EFEFEF] border-opacity-30 p-8">
        <div class="w-full flex flex-col items-center">
          <h3 class="text-white">Write New Quote</h3>
        </div>
        <button @click="emit('close')">
          <close-icon class="self-end" />
        </button>
      </div>
      <section class="p-8">
        <div class="flex gap-4 items-center">
          <div class="flex w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden">
            <img :src="userStore.userData.avatar" alt="avatar" class="object-cover" />
          </div>
          <h5 class="text-white">{{ userStore.userData.name }}</h5>
        </div>
        <Form @submit="onSubmit" class="flex flex-col mt-10 gap-6">
          <base-textarea
            rules="required"
            id="quoteEng"
            type="Eng"
            placeholder="Start create new quote"
            :error="error.en"
            @update-error="error.en = ''"
          />
          <base-textarea
            rules="required"
            id="quoteGeo"
            type="ქარ"
            placeholder="ახალი ციტატა"
            :error="error.ka"
            @update-error="error.ka = ''"
          />
          <base-upload
            id="image"
            rules="required|image"
            :resetImage="resetImage"
            @show-image="resetImage = false"
          />
          <Field name="movieId" rules="required" v-slot="{ handleChange }" class="relative">
            <base-dropdown background width="w-full h-full" @isOpen="dropDownHandler">
              <template #dropdownButton
                ><div class="flex items-center justify-between text-white text-left">
                  <div class="flex justify-center items-end gap-4">
                    <MoviesIcon />
                    <h4>{{ selectedMovie[locale] || 'Choose movie' }}</h4>
                    <error-message
                      name="movieId"
                      class="absolute text-xs text-[#DC3545] -left-6 -bottom-12"
                    ></error-message>
                  </div>
                  <LanguageDropdownIcon />
                </div>
              </template>
              <template #dropdown>
                <li class="p-4" v-if="error.select">{{ error.select }}</li>
                <li class="p-4" v-if="movieStore.getMovieList.length === 0">No Movies to Show</li>
                <li
                  v-else
                  class="p-4 hover:bg-gray-900"
                  v-for="movies in movieStore.getMovieList"
                  :key="movies.id"
                  @click="selectMovie(movies.id, movies.name, handleChange)"
                >
                  <p>{{ movies.name[locale] }} ({{ movies.year }})</p>
                </li>
              </template>
            </base-dropdown>
          </Field>
          <base-button class="w-full p-2 order-5">post</base-button>
        </Form>
      </section>
    </main-card>
  </div>
</template>
<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue'
import LanguageDropdownIcon from '@/components/icons/DropdownIcon.vue'
import MoviesIcon from '@/components/icons/MoviesIcon.vue'
import { useUserStore } from '@/stores/userStore'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { reactive, ref } from 'vue'
import { useMovieStore } from '@/stores/movieStore'
import { useI18n } from 'vue-i18n'
import { usePostStore } from '@/stores/postStore'

const { locale } = useI18n()
const emit = defineEmits(['close'])
const movieStore = useMovieStore()
const userStore = useUserStore()
const postStore = usePostStore()

const error = reactive({
  en: '',
  ka: '',
  select: '',
})
const resetImage = ref(false)
const selectedMovie = ref({})

async function onSubmit(values, { resetForm }) {
  try {
    await postStore.addQuote(values)
    await emit('close')
    resetForm()
  } catch (err) {
    error.en = err.response?.data?.errors?.['quote.en']?.[0]
    error.ka = err.response?.data?.errors?.['quote.ka']?.[0]
  }
}

function selectMovie(movieId, movieName, handleChange) {
  selectedMovie.value = movieName
  handleChange(movieId)
}

async function dropDownHandler(isOpen) {
  if (isOpen && movieStore.getMovieList.length === 0) {
    try {
      await movieStore.storeMovieList()
    } catch (err) {
      error.select = err.message
    }
  }
}
</script>
