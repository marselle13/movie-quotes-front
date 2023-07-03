<template>
  <new-container :title="title" @close="emit('close')">
    <Form @submit="onSubmit" class="space-y-6 mt-7">
      <base-input
        label="Movie name"
        id="nameEng"
        :placeholder="title === t('new_movie') ? 'Movie name' : ''"
        mode="flat"
        lang="Eng"
        rules="required"
        :edit="title !== t('new_movie')"
        v-model="movieForm.nameEng"
        :error="error.nameEng"
        @update-prop="error.nameEng = ''"
        autocomplete="off"
      />
      <base-input
        label="ფილმის სახელი"
        id="nameGeo"
        :placeholder="title === t('new_movie') ? 'ფილმის სახელი' : ''"
        mode="flat"
        lang="Geo"
        rules="required"
        :edit="title !== t('new_movie')"
        v-model="movieForm.nameGeo"
        :error="error.nameGeo"
        @update-prop="error.nameGeo = ''"
        autocomplete="off"
      />
      <Field name="genres" v-slot="{ handleChange }" rules="required" v-model="movieForm.genresId">
        <base-dropdown
          button-width="w-full border border-[#6C757D]  py-2 px-4 rounded text-left"
          @isOpen="dropDownHandler"
        >
          <template #dropdownButton>
            <div class="flex justify-between items-center">
              <h5 v-if="genres.length === 0" class="text-[#6C757D]">{{ t('genres') }}</h5>
              <ul v-else class="inline-flex gap-2 overflow-x-auto scrollbar-hide">
                <li
                  :key="genre.id"
                  v-for="genre in genres"
                  class="flex items-center bg-[#6C757D] rounded-sm px-1 whitespace-nowrap relative z-50"
                >
                  <h4 class="text-white">{{ genre.name?.[locale] }}</h4>
                  <CloseIcon class="w-5 h-5" @click="deleteGenre(genre.id, handleChange)" />
                </li>
              </ul>
              <LanguageDropdownIcon />
              <error-message
                name="genres"
                class="absolute text-[#DC3545] -bottom-4 left-0 text-[9px] md:text-[10px]"
              ></error-message>
            </div>
          </template>
          <template #dropdown>
            <li v-if="error.genre" class="px-4">{{ error.genre }}</li>
            <li
              class="px-4 py-1 hover:bg-gray-900"
              v-for="genre in movieStore.getGenres"
              :key="genre.id"
              @click="selectGenre(genre.id, genre.name, handleChange)"
            >
              {{ genre.name[locale] }}
            </li>
          </template>
        </base-dropdown>
      </Field>
      <base-input
        label="წელი/year"
        v-model="movieForm.year"
        id="year"
        :placeholder="title === t('new_movie') ? 'წელი/year' : ''"
        :edit="title !== t('new_movie')"
        mode="flat"
        rules="required|integer"
        autocomplete="off"
      />
      <base-input
        label="Director"
        v-model="movieForm.directorEng"
        id="directorEng"
        :placeholder="title === t('new_movie') ? 'Director' : ''"
        :edit="title !== t('new_movie')"
        mode="flat"
        lang="Eng"
        rules="required"
        autocomplete="off"
      />
      <base-input
        label="რეჟისორი"
        v-model="movieForm.directorGeo"
        id="directorGeo"
        :placeholder="title === t('new_movie') ? 'რეჟისორი' : ''"
        :edit="title !== t('new_movie')"
        mode="flat"
        lang="Geo"
        rules="required"
        autocomplete="off"
      />
      <base-textarea
        label="Description"
        v-model="movieForm.descriptionEng"
        id="descriptionEng"
        :placeholder="title === t('new_movie') ? 'Movie Description' : ''"
        :edit="title !== t('new_movie')"
        lang="Eng"
        rules="required"
      />
      <base-textarea
        label="ფილმის აღწერა"
        v-model="movieForm.descriptionEng"
        id="descriptionGeo"
        :placeholder="title === t('new_movie') ? 'ფილმის აღწერა' : ''"
        :edit="title !== t('new_movie')"
        lang="Geo"
        rules="required"
      />
      <base-upload
        :uploaded-image="movieForm.image"
        id="image"
        :rules="title === t('new_movie') ? 'required|image' : ''"
      />
      <base-button class="w-full py-2">Add Movie</base-button>
    </Form>
  </new-container>
</template>
<script setup>
import NewContainer from '@/components/layout/NewContainer.vue'
import BaseInput from '@/components/ui/form/BaseInput.vue'
import { useI18n } from 'vue-i18n'
import { Form, Field, ErrorMessage } from 'vee-validate'
import BaseTextarea from '@/components/ui/form/BaseTextarea.vue'
import BaseUpload from '@/components/ui/form/BaseUpload.vue'
import BaseButton from '@/components/ui/form/BaseButton.vue'
import BaseDropdown from '@/components/ui/form/BaseDropdown.vue'
import LanguageDropdownIcon from '@/components/icons/DropdownIcon.vue'
import { useMovieStore } from '@/stores/movieStore'
import { reactive } from 'vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

const props = defineProps({
  title: { type: String, required: true },
  movie: { type: Object, required: false },
})

const emit = defineEmits(['close'])
const movieStore = useMovieStore()
const { t, locale } = useI18n()
const viteBaseUrl = import.meta.env.VITE_BASE_URL

const movieForm = reactive({
  nameEng: props.movie?.name.en || '',
  nameGeo: props.movie?.name.ka || '',
  genresId: props.movie?.genres.map((genre) => genre.id) || [],
  year: props.movie?.year || '',
  directorEng: props.movie?.director.en || '',
  directorGeo: props.movie?.director.ka || '',
  descriptionEng: props.movie?.description.en || '',
  descriptionGeo: props.movie?.description.ka || '',
  image: props.movie?.image ? `${viteBaseUrl}storage/${props.movie?.image}` : '',
})

const genres = reactive(props.movie?.genres.length ? props.movie.genres.map((genre) => genre) : [])
const error = reactive({ genre: '', nameEng: '', nameGeo: '' })

function selectGenre(genreId, genreName, handleChange) {
  const genreExists = genres.some((genre) => genre.id === genreId)
  if (!genreExists) {
    genres.push({ id: genreId, name: genreName })
    handleChange(genres.map((genre) => genre.id))
  }
}
function deleteGenre(genreId, handleChange) {
  const index = genres.findIndex((genre) => genre.id === genreId)
  genres.splice(index, 1)
  handleChange([...genres])
}

async function onSubmit(values, { resetForm }) {
  try {
    if (props.movie?.id) {
      await movieStore.editMovieDescription(values, props.movie.id)
    } else {
      await movieStore.addNewMovie(values)
      resetForm()
    }
    emit('close')
  } catch (err) {
    console.error(err)
    error.nameEng = err.response?.data?.errors?.['name.en']?.[0]
    error.nameGeo = err.response?.data?.errors?.['name.ka']?.[0]
  }
}

async function dropDownHandler(isOpen) {
  if (isOpen && movieStore.getMovieList.length === 0) {
    try {
      await movieStore.storeGenres()
    } catch (err) {
      error.genre = err.message
    }
  }
}
</script>
