<template>
  <section :class="{ 'pb-7 lg:pb-7 border-b border-[#efefef4d]': movieName }">
    <div class="flex items-center gap-4 text-white">
      <div
        class="flex justify-center bg-[#D9D9D9] w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden"
        v-if="name && avatar"
      >
        <img :src="avatar" alt="profile" class="object-cover" />
      </div>
      <h5>{{ name }}</h5>
    </div>
    <Form @submit="onSubmit">
      <div class="flex gap-2 mt-4" v-if="movieName && movieYear">
        <h3 class="text-white">
          “{{ quote }}” <span class="text-[#DDCCAA]">{{ movieName }}</span> {{ movieYear }}
        </h3>
      </div>
      <div v-else class="space-y-6">
        <base-textarea
          id="quoteEng"
          v-model="quoteEng"
          rules="required"
          :disabled="!edit"
          mode="flat"
          lang="Eng"
        />
        <base-textarea
          id="quoteGeo"
          v-model="quoteGeo"
          rules="required"
          :disabled="!edit"
          mode="flat"
          lang="ქარ"
        />
      </div>
      <Field name="image" v-slot="{ handleChange }" :rules="imageHandler ? 'required|image' : ''">
        <div class="relative">
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
                class="cursor-pointer bg-gradient-to-r from-[#181623] from-5% via-[#191725] via-50% to-[#0D0B14] to-[95%] text-white bg-red-500 flex flex-col items-center w-full px-4 pb-4 pt-6 rounded-2xl bg-linear-gradient opacity-80"
              >
                <CameraIcon />{{ t('change_photo') }}</label
              >
            </div>
          </div>
          <ErrorMessage
            name="image"
            class="absolute -bottom-4 text-[9px] text-[#DC3545] md:text-[10px]"
          ></ErrorMessage>
        </div>
      </Field>
      <div class="flex gap-6" v-if="!edit">
        <div class="flex gap-3">
          <p class="text-white w-[1.4rem]">{{ commentsLength }}</p>
          <CommentIcon />
        </div>
        <div class="flex gap-3">
          <p class="text-white w-[0.7rem]">{{ likesLength }}</p>
          <LikeIcon :like-style="likeButtonStyle" :post-id="postId" @click="reactOnPost(postId)" />
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
import { usePostStore } from '@/stores/postStore'
import { computed, onBeforeUnmount, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useI18n } from 'vue-i18n'

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

const likeButtonStyle = computed(() => {
  const post = postStore.getPosts.find((post) => props.postId === post.id) || postStore.getPost
  const index = post.likes.findIndex((like) => like.user.id === userStore.userData.id)
  return index !== -1 ? 'red' : 'white'
})

function uploadNewImage(event, handleChange) {
  const image = event.target.files[0]
  if (image.size > 2000000 || !image.type.includes('image')) return
  handleChange(image)
  imageHandler.value = URL.createObjectURL(image)
}

async function onSubmit(values) {
  try {
    await postStore.editPost(values, props.postId)
    emit('close')
  } catch (err) {
    //Err
  }
}

async function reactOnPost(postId) {
  try {
    await postStore.postReaction(postId)
  } catch (err) {
    //Error
  }
}

onBeforeUnmount(() => {
  postStore.commentSection(props.postId)
})
</script>
