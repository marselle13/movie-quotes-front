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
        :error="error.nameEng"
        @update-prop="error.nameEng = ''"
        autocomplete="off"
        v-model="nameEng.value"
      />
      <base-input
        label="ფილმის სახელი"
        id="nameGeo"
        :placeholder="title === t('new_movie') ? 'ფილმის სახელი' : ''"
        mode="flat"
        lang="ქარ"
        rules="required"
        :edit="title !== t('new_movie')"
        :error="error.nameGeo"
        @update-prop="error.nameGeo = ''"
        autocomplete="off"
        v-model="nameGeo.value"
      />
      <Field name="genres" v-slot="{ handleChange }" rules="required" v-model="genresId.value">
        <base-dropdown
          :delete="deleted"
          button-width="w-full border border-[#6C757D]  py-2 px-4 rounded text-left"
        >
          <template #dropdownButton>
            <div class="flex justify-between items-center">
              <h5 v-if="genres.length === 0" class="text-[#6C757D]">{{ t('genres') }}</h5>
              <ul v-else class="inline-flex gap-2 overflow-x-auto scrollbar-hide">
                <li
                  :key="genre.id"
                  v-for="genre in genres"
                  class="flex items-center bg-[#6C757D] rounded-sm px-1 whitespace-nowrap relative"
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
        id="year"
        :placeholder="title === t('new_movie') ? 'წელი/year' : ''"
        :edit="title !== t('new_movie')"
        mode="flat"
        rules="required|valid_year"
        autocomplete="off"
        v-model="year.value"
      />
      <base-input
        label="Director"
        id="directorEng"
        :placeholder="title === t('new_movie') ? 'Director' : ''"
        :edit="title !== t('new_movie')"
        mode="flat"
        lang="Eng"
        rules="required"
        autocomplete="off"
        v-model="directorEng.value"
      />
      <base-input
        label="რეჟისორი"
        id="directorGeo"
        :placeholder="title === t('new_movie') ? 'რეჟისორი' : ''"
        :edit="title !== t('new_movie')"
        mode="flat"
        lang="ქარ"
        rules="required"
        autocomplete="off"
        v-model="directorGeo.value"
      />
      <base-textarea
        label="Description"
        id="descriptionEng"
        :placeholder="title === t('new_movie') ? 'Movie Description' : ''"
        :edit="title !== t('new_movie')"
        lang="Eng"
        rules="required"
        v-model="descriptionEng.value"
      />
      <base-textarea
        label="ფილმის აღწერა"
        id="descriptionGeo"
        :placeholder="title === t('new_movie') ? 'ფილმის აღწერა' : ''"
        :edit="title !== t('new_movie')"
        lang="ქარ"
        rules="required"
        v-model="descriptionGeo.value"
      />
      <base-upload
        :uploaded-image="image.value"
        id="image"
        :rules="title === t('new_movie') ? 'required|image' : ''"
      />
      <base-button class="w-full py-2">Add Movie</base-button>
    </Form>
  </new-container>
</template>
<script setup>
import NewContainer from '@/components/layout/NewContainer.vue'
import BaseInput from '@/components/common/form/BaseInput.vue'
import { useI18n } from 'vue-i18n'
import { Form, Field, ErrorMessage } from 'vee-validate'
import BaseTextarea from '@/components/common/form/BaseTextarea.vue'
import BaseButton from '@/components/common/form/BaseButton.vue'
import BaseDropdown from '@/components/common/form/BaseDropdown.vue'
import LanguageDropdownIcon from '@/components/icons/DropdownIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { useMovieStore } from '@/stores/movieStore'
import { onBeforeMount, reactive, ref } from 'vue'
import { useForm } from 'vee-validate'

const props = defineProps({
  title: { type: String, required: true },
  movie: { type: Object, required: false },
})

const emit = defineEmits(['close'])
const movieStore = useMovieStore()
const { t, locale } = useI18n()
const viteBaseUrl = import.meta.env.VITE_BASE_URL
const { setValues, defineInputBinds } = useForm()

setValues({
  nameEng: props.movie?.name.en || '',
  nameGeo: props.movie?.name.en || '',
  genresId: props.movie?.genres.map((genre) => genre.id) || [],
  year: props.movie?.year || '',
  directorEng: props.movie?.director.en || '',
  directorGeo: props.movie?.director.ka || '',
  descriptionEng: props.movie?.description.en || '',
  descriptionGeo: props.movie?.description.ka || '',
  image: props.movie?.image ? `${viteBaseUrl}storage/${props.movie?.image}` : '',
})

const nameEng = defineInputBinds('nameEng')
const nameGeo = defineInputBinds('nameGeo')
const genresId = defineInputBinds('genresId')
const year = defineInputBinds('year')
const directorEng = defineInputBinds('directorEng')
const directorGeo = defineInputBinds('directorGeo')
const descriptionEng = defineInputBinds('descriptionEng')
const descriptionGeo = defineInputBinds('descriptionGeo')
const image = defineInputBinds('image')

const genres = ref(props.movie?.genres.length ? props.movie.genres.map((genre) => genre) : [])
const error = reactive({ genre: '', nameEng: '', nameGeo: '' })
const deleted = ref(false)

function selectGenre(genreId, genreName, handleChange) {
  const genreExists = genres.value.some((genre) => genre.id === genreId)
  if (!genreExists) {
    genres.value.push({ id: genreId, name: genreName })
    handleChange(genres.value.map((genre) => genre.id))
  }
}
function deleteGenre(genreId, handleChange) {
  deleted.value = true
  genres.value = genres.value.filter((genre) => genre.id !== genreId)
  handleChange(genres.value.map((genre) => genre.id))
  setTimeout(() => (deleted.value = false), 100)
}

async function onSubmit(values, { resetForm }) {
  try {
    if (props.movie?.id) {
      await movieStore.editMovie(values, props.movie.id)
    } else {
      await movieStore.addNewMovie(values)
      resetForm()
    }
    emit('close')
  } catch (err) {
    error.nameEng = err.response?.data?.errors?.['name.en']?.[0]
    error.nameGeo = err.response?.data?.errors?.['name.ka']?.[0]
  }
}

async function dropDownHandler() {
  try {
    await movieStore.storeGenres()
  } catch (err) {
    error.genre = err.message
  }
}

onBeforeMount(() => {
  dropDownHandler()
})
</script>
