<template>
  <new-container :title="title" @close="emit('close')">
    <Form @submit="onSubmit" class="flex flex-col mt-10 gap-6">
      <div
        class="flex items-center gap-7 bg-black rounded md:rounded-none md:bg-transparent px-2 py-4 md:px-0 md:py-0"
        v-if="movie"
      >
        <Field name="movieId" v-slot="{ field }" :value="movie.id">
          <input type="hidden" v-bind="field" />
          <div class="flex rounded-2xl overflow-hidden w-[18rem] h-[8rem] md:h-[9rem] min-w-[4rem]">
            <img
              :src="`${viteBaseUrl}storage/${movie.image}`"
              alt="image"
              class="object-cover object-center w-full"
            />
          </div>
          <div class="md:space-y-5 space-y-2">
            <h5 class="md:text-2xl text-[#DDCCAA] font-medium text-xs">
              {{ movie.name[locale] }}
            </h5>
            <div class="flex flex-col-reverse md:flex-col gap-2 md:gap-5">
              <ul class="inline-flex flex-wrap gap-2">
                <li
                  class="bg-[#6C757D] text-white rounded py-1 px-3 flex-wrap text-xs md:text-lg"
                  v-for="genre in movie.genres"
                  :key="genre.id"
                >
                  {{ genre.name[locale] }}
                </li>
              </ul>
              <h6 class="md:text-lg text-white text-xs">
                <span class="text-[#CED4DA]">Director:</span> {{ movie.director[locale] }}
              </h6>
            </div>
          </div>
        </Field>
      </div>
      <div class="flex flex-col gap-6 md:block md:space-y-6">
        <base-textarea
          rules="required|eng_chars"
          id="quoteEng"
          language="Eng"
          placeholder="Start create new quote"
          :error="error.en"
          @update-error="error.en = ''"
          class="order-2"
          :class="{ 'order-1': movie }"
        />
        <base-textarea
          rules="required|geo_chars"
          id="quoteGeo"
          language="ქარ"
          placeholder="ახალი ციტატა"
          :error="error.ka"
          @update-error="error.ka = ''"
          class="order-3"
          :class="{ 'order-2': movie }"
        />
        <base-upload
          id="image"
          rules="required|image"
          :resetImage="resetImage"
          @show-image="resetImage = false"
          class="order-1"
          :class="{ 'order-3': movie }"
        />
      </div>

      <Field
        name="movieId"
        rules="required"
        v-slot="{ handleChange }"
        class="relative"
        v-if="!movie"
      >
        <base-dropdown
          buttonWidth="w-full h-full"
          button-background
          dropdown-background
          dropdown-width="left-0 top-20 max-h-[6rem] w-full overflow-y-auto"
        >
          <template #dropdownButton
            ><div class="flex items-center justify-between text-white text-left">
              <div class="flex justify-center items-end gap-4">
                <MoviesIcon />
                <h4>{{ selectedMovie[locale] || t('choose_movie') }}</h4>
                <error-message
                  name="movieId"
                  class="absolute -left-6 -bottom-12 text-[9px] text-[#DC3545] md:text-[10px]"
                ></error-message>
              </div>
              <LanguageDropdownIcon />
            </div>
          </template>
          <template #dropdown>
            <ul class="cursor-pointer">
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
            </ul>
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
import { onBeforeMount, onBeforeUnmount, reactive, ref } from 'vue'
import { useMovieStore } from '@/stores/movie'
import { useI18n } from 'vue-i18n'
import { usePostStore } from '@/stores/post'

defineProps({ title: { type: String, required: true }, movie: { type: Object, required: false } })

const { t, locale } = useI18n()
const emit = defineEmits(['close'])
const movieStore = useMovieStore()
const postStore = usePostStore()
const viteBaseUrl = import.meta.env.VITE_BASE_URL

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

async function dropDownHandler() {
  try {
    await movieStore.storeMovieList()
  } catch (err) {
    error.select = err.message
  }
}

onBeforeMount(() => {
  localStorage.setItem('modal', 'quote')
  dropDownHandler()
})

onBeforeUnmount(() => {
  localStorage.removeItem('modal')
})
</script>
