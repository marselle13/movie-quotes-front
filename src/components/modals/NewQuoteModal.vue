<template>
  <new-container :title="t('new_quote')" @close="emit('close')">
    <Form @submit="onSubmit" class="flex flex-col mt-10 gap-6">
      <base-textarea
        rules="required"
        id="quoteEng"
        language="Eng"
        placeholder="Start create new quote"
        :error="error.en"
        @update-error="error.en = ''"
      />
      <base-textarea
        rules="required"
        id="quoteGeo"
        language="ქარ"
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
        <base-dropdown background buttonWidth="w-full h-full" @isOpen="dropDownHandler">
          <template #dropdownButton
            ><div class="flex items-center justify-between text-white text-left">
              <div class="flex justify-center items-end gap-4">
                <MoviesIcon />
                <h4>{{ selectedMovie[locale] || t('choose_movie') }}</h4>
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
            <li class="p-4" v-if="movieStore.getMovieList.length === 0 && !error.select">
              {{ t('no_movies') }}
            </li>
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
      <base-button class="w-full p-2 order-5">{{ t('post') }}</base-button>
    </Form>
  </new-container>
</template>
<script setup>
import NewContainer from '@/components/layout/NewContainer.vue'
import LanguageDropdownIcon from '@/components/icons/DropdownIcon.vue'
import MoviesIcon from '@/components/icons/MoviesIcon.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { reactive, ref } from 'vue'
import { useMovieStore } from '@/stores/movieStore'
import { useI18n } from 'vue-i18n'
import { usePostStore } from '@/stores/postStore'

const { t, locale } = useI18n()
const emit = defineEmits(['close'])
const movieStore = useMovieStore()
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
