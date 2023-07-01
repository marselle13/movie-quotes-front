<template>
  <new-container :title="t('new_movie')" @close="emit('close')">
    <Form @submit="onSubmit" class="space-y-6 mt-7">
      <base-input
        id="nameEng"
        placeholder="Movie name"
        mode="flat"
        lang="Eng"
        rules="required"
        :error="error.nameEng"
        @update-prop="error.nameEng = ''"
      />
      <base-input
        id="nameGeo"
        placeholder="ფილმის სახელი"
        mode="flat"
        lang="Geo"
        rules="required"
        :error="error.nameGeo"
        @update-prop="error.nameGeo = ''"
      />
      <Field name="genres" v-slot="{ handleChange }" rules="required">
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
                  <h4 class="text-white">{{ genre.name[locale] }}</h4>
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
      <base-input id="year" placeholder="წელი/year" mode="flat" rules="required|integer" />
      <base-input id="directorEng" placeholder="Director" mode="flat" lang="Eng" rules="required" />
      <base-input id="directorGeo" placeholder="რეჟისორი" mode="flat" lang="Geo" rules="required" />
      <base-textarea
        id="descriptionEng"
        placeholder="Movie Description"
        lang="Eng"
        rules="required"
      />
      <base-textarea id="descriptionGeo" placeholder="ფილმის აღწერა" lang="Geo" rules="required" />
      <base-upload id="image" rules="required|image" />
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

const emit = defineEmits(['close'])
const movieStore = useMovieStore()
const { t, locale } = useI18n()

const error = reactive({ genre: '', nameEng: '', nameGeo: '' })
const genres = reactive([])

function selectGenre(genreId, genreName, handleChange) {
  const genreExists = genres.some((genre) => genre.id === genreId)
  if (!genreExists) {
    genres.unshift({ id: genreId, name: genreName })
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
    await movieStore.addNewMovie(values)
    emit('close')
    resetForm()
  } catch (err) {
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
