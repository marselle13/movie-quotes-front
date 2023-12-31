<template>
  <section :class="{ 'pb-7 lg:pb-7 border-b border-[#efefef4d]': movieName }">
    <div class="flex items-center gap-4 text-white">
      <div
        class="flex justify-center bg-light-gray w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden"
        v-if="name && avatar"
      >
        <img :src="avatar" alt="profile" class="object-cover" />
      </div>
      <h5>{{ name }}</h5>
    </div>
    <Form @submit="onSubmit">
      <div class="flex gap-2 mt-4" v-if="movieName && movieYear">
        <h3 class="text-white">
          “{{ quote }}” <span class="text-light-gold">{{ movieName }}</span> {{ movieYear }}
        </h3>
      </div>
      <div v-else class="space-y-6">
        <base-textarea
          id="quoteEng"
          v-model="quoteEng"
          rules="required|eng_chars"
          :disabled="!edit"
          mode="flat"
          lang="Eng"
          :error="error.en"
        />
        <base-textarea
          id="quoteGeo"
          v-model="quoteGeo"
          rules="required|geo_chars"
          :disabled="!edit"
          mode="flat"
          lang="ქარ"
          :error="error.ka"
        />
      </div>
      <Field name="image" v-slot="{ handleChange }" :rules="imageHandler ? 'required|image' : ''">
        <div
          class="relative"
          @dragenter.prevent
          @dragleave.prevent
          @dragover.prevent
          @drop.prevent="uploadNewImage($event, handleChange)"
        >
          <div
            class="relative my-6 flex justify-center items-center w-full h-[18rem] md:h-[32rem] rounded-2xl overflow-hidden"
          >
            <img :src="imageHandler || thumbnail" alt="movie" class="object-cover w-full h-full" />
            <div class="absolute" v-if="edit">
              <input
                id="upload"
                type="file"
                class="sr-only"
                @input="uploadNewImage($event, handleChange)"
              />
              <label
                for="upload"
                class="cursor-pointer bg-gradient-to-r from-linear-indigo from-5% via-linear-gray via-50% to-linear-black to-[95%] text-white bg-red-500 flex flex-col items-center w-full px-4 pb-4 pt-6 rounded-2xl bg-linear-gradient opacity-80"
              >
                <CameraIcon />{{ t('change_photo') }}</label
              >
            </div>
          </div>
          <ErrorMessage
            name="image"
            class="absolute -bottom-4 text-[9px] text-error-red md:text-[10px]"
          ></ErrorMessage>
          <p class="absolute -bottom-4 text-[9px] text-error-red md:text-[10px]" v-if="error.image">
            {{ error.image }}
          </p>
        </div>
      </Field>
      <div class="flex gap-6" v-if="!edit">
        <div class="flex gap-3">
          <p class="text-white w-[1.4rem]">{{ commentsLength }}</p>
          <CommentIcon />
        </div>
        <div class="flex gap-3">
          <p class="text-white w-[0.7rem]">{{ likesLength }}</p>
          <LikeIcon
            :like-style="likeButtonStyle"
            :post-id="postId"
            @click="reactOnPost(postId)"
            class="cursor-pointer"
          />
        </div>
      </div>
      <base-button v-else-if="edit" class="w-full py-2">{{ t('edit_quote') }}</base-button>
    </Form>
  </section>
</template>
<script setup>
import LikeIcon from '@/components/icons/LikeIcon.vue'
import CommentIcon from '@/components/icons/CommenetIcon.vue'
import CameraIcon from '@/components/icons/CameraIcon.vue'
import { usePostStore } from '@/stores/post'
import { computed, reactive, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { usePostService } from '@/services/postService'

const props = defineProps({
  postId: { type: Number, required: true },
  name: { type: String, required: false },
  avatar: { type: String, required: false },
  thumbnail: { type: String, required: true },
  quote: { type: [Object, String], required: false },
  movieName: { type: String, required: false },
  movieYear: { type: Number, required: false },
  commentsLength: { type: Number, required: true },
  likesLength: { type: Number, required: true },
  likes: { type: Object, required: true },
  load: { type: Boolean, required: true },
  edit: { type: Boolean, required: false },
})

const emit = defineEmits(['close'])

const postStore = usePostStore()
const userStore = useUserStore()
const { t } = useI18n()

const thumbnail = `${import.meta.env.VITE_BASE_URL}storage/${props.thumbnail}`

const avatar = `${import.meta.env.VITE_BASE_URL}${
  props.avatar?.includes('default') ? '' : 'storage/'
}${props.avatar}`

const quoteEng = ref(props.quote.en)
const quoteGeo = ref(props.quote.ka)
const imageHandler = ref('')
const error = reactive({ en: '', ka: '', image: '' })

const likeButtonStyle = computed(() => {
  const index = props.likes.findIndex((like) => like.user?.id === userStore.userData.id)
  return index !== -1 ? 'red' : 'white'
})

function uploadNewImage(event, handleChange) {
  const image = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0]
  if (image.size > 2000000 || !image.type.includes('image')) {
    error.image = t('image_size')
    return
  }
  error.iamge = ''
  handleChange(image)
  imageHandler.value = URL.createObjectURL(image)
}

async function onSubmit(values) {
  try {
    await postStore.editPost(values, props.postId)
    emit('close')
  } catch (err) {
    error.en = err.response?.data?.errors?.['quote.en']?.[0]
    error.ka = err.response?.data?.errors?.['quote.ka']?.[0]
  }
}

async function reactOnPost(postId) {
  try {
    await usePostService().reactOnPost(postId)
  } catch (err) {
    console.error(err)
  }
}
</script>
