<template>
  <section class="border-b pb-5 lg:pb-7 border-[#efefef4d]">
    <div class="flex items-center gap-4 text-white">
      <div
        class="flex justify-center bg-[#D9D9D9] w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden"
        v-if="name"
      >
        <img :src="avatar" alt="profile" class="object-cover" />
      </div>
      <h5>{{ name }}</h5>
    </div>
    <div class="flex gap-2 mt-4" v-if="movieName">
      <h3 class="text-white">
        “{{ quote }}” <span class="text-[#DDCCAA]">{{ movieName }}</span> {{ movieYear }}
      </h3>
    </div>
    <div class="my-4 lg:my-6 flex justify-center">
      <img :src="thumbnail" alt="movie" />
    </div>
    <div class="flex gap-6">
      <div class="flex gap-3">
        <p class="text-white">{{ commentsLength }}</p>
        <CommentIcon />
      </div>
      <div class="flex gap-3 flex-shrink-0">
        <p class="text-white w-[10px]">{{ likesLength }}</p>
        <LikeIcon :like-style="likeButtonStyle" :post-id="postId" @click="reactOnPost(postId)" />
      </div>
    </div>
  </section>
</template>
<script setup>
import LikeIcon from '@/components/icons/LikeIcon.vue'
import CommentIcon from '@/components/icons/CommenetIcon.vue'
import { usePostStore } from '@/stores/postStore'
import { computed, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/stores/userStore'

const props = defineProps({
  postId: { type: Number, required: true },
  name: { type: String, required: false },
  avatar: { type: String, required: false },
  thumbnail: { type: String, required: true },
  quote: { type: String, required: false },
  movieName: { type: String, required: false },
  movieYear: { type: Number, required: false },
  commentsLength: { type: Number, required: true },
  likesLength: { type: Number, required: true },
})

const postStore = usePostStore()
const userStore = useUserStore()

const thumbnail = `${import.meta.env.VITE_BASE_URL}storage/${props.thumbnail}`

const avatar = `${import.meta.env.VITE_BASE_URL}${
  props.avatar?.includes('default') ? '' : 'storage/'
}${props.avatar}`

const likeButtonStyle = computed(() => {
  const post = postStore.getPosts.find((post) => props.postId === post.id) || postStore.getPost
  const index = post.likes.findIndex((like) => like.user.id === userStore.userData.id)
  return index !== -1 ? 'red' : 'white'
})

async function reactOnPost(postId) {
  try {
    await postStore.postReaction(postId)
  } catch (err) {
    console.error(err)
    //Error
  }
}

onBeforeUnmount(() => {
  postStore.commentSection(props.postId)
})
</script>
