<template>
  <section class="border-b pb-5 lg:pb-7 border-[#efefef4d]">
    <div class="flex items-center gap-4 text-white">
      <div
        class="flex justify-center bg-[#D9D9D9] w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden"
      >
        <img :src="avatar" alt="profile" class="object-contain" />
      </div>
      <h5>{{ username }}</h5>
    </div>
    <div class="flex gap-2 mt-4">
      <h3 class="text-white">
        “{{ quote }}” <span class="text-[#DDCCAA]">{{ movie }}</span> {{ movieYear }}
      </h3>
    </div>
    <div class="my-4 lg:my-6 flex justify-center">
      <img :src="thumbnail" alt="movie" />
    </div>
    <div class="flex gap-6">
      <div class="flex gap-3">
        <p class="text-white">0</p>
        <CommentIcon />
      </div>
      <div class="flex gap-3">
        <p class="text-white">0</p>
        <LikeIcon />
      </div>
    </div>
  </section>
</template>
<script setup>
import LikeIcon from '@/components/icons/LikeIcon.vue'
import CommentIcon from '@/components/icons/CommenetIcon.vue'

const props = defineProps({
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  thumbnail: { type: String, required: true },
  quote: { type: String, required: true },
  movie: { type: String, required: true },
  movieYear: { type: Number, required: true },
})

const avatar = `${import.meta.env.VITE_BASE_URL}${
  props.avatar.includes('default') ? '' : 'storage/'
}${props.avatar}`
</script>
