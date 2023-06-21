<template>
  <main-card class="p-6 mt-6 mb-10">
    <ThePost
      :username="username"
      :avatar="avatar"
      :quote="quote"
      :movie="movie"
      :movieYear="movieYear"
      :thumbnail="thumbnail"
    />
    <CommentContainer />
    <CommentInput />
  </main-card>
</template>
<script setup>
import MainCard from '@/components/ui/MainCard.vue'
import CommentContainer from '@/components/layout/post/CommentContainer.vue'
import ThePost from '@/components/layout/post/ThePost.vue'
import CommentInput from '@/components/layout/post/CommentInput.vue'

defineProps({
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  thumbnail: { type: String, required: true },
  quote: { type: String, required: true },
  movie: { type: String, required: true },
  movieYear: { type: Number, required: true },
})
</script>
