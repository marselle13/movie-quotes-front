<template>
  <main-card class="p-6 mt-6 mb-10">
    <ThePost
      :post-id="postId"
      :name="user.name"
      :avatar="user.avatar"
      :quote="quote"
      :movie-name="movie.name[locale]"
      :movie-year="movie.year"
      :thumbnail="thumbnail"
      :comments-length="commentsLength"
      :likes-length="likesLength"
      :likes="likes"
    />
    <CommentSection
      :post-id="postId"
      :comments="comments"
      :comments-length="commentsLength"
      @loaded="emit('loaded')"
    />
  </main-card>
</template>
<script setup>
import MainCard from '@/components/common/MainCard.vue'
import CommentSection from '@/components/post/CommentSection.vue'
import ThePost from '@/components/post/ThePost.vue'
import { useI18n } from 'vue-i18n'

defineProps({
  postId: { type: Number, required: true },
  quote: { type: String, required: true },
  thumbnail: { type: String, required: true },
  user: { type: Object, required: true },
  movie: { type: Object, required: true },
  comments: { type: Object, required: true },
  commentsLength: { type: Number, required: true },
  likesLength: { type: Number, required: true },
  likes: { type: Object, required: true },
})
const emit = defineEmits(['loaded'])

const { locale } = useI18n()
</script>
