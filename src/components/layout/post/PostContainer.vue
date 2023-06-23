<template>
  <main-card class="p-6 mt-6 mb-10">
    <ThePost
      :name="user.name"
      :avatar="user.avatar"
      :quote="quote"
      :movie-name="movie.name[locale]"
      :movie-year="movie.year"
      :thumbnail="thumbnail"
      :comments-length="commentsLength"
      :likes-length="likesLength"
    />
    <CommentContainer
      v-for="comment in comments"
      :key="comment.id"
      :name="comment.user.name"
      :avatar="comment.user.avatar"
      :comment="comment.text"
    />
    <base-button
      v-if="!loaded && commentsLength > 2"
      mode="flat"
      class="w-full py-2 mt-6"
      @click="moreComments(postId)"
      >Load more</base-button
    >
    <CommentInput />
  </main-card>
</template>
<script setup>
import MainCard from '@/components/ui/MainCard.vue'
import CommentContainer from '@/components/layout/post/CommentContainer.vue'
import ThePost from '@/components/layout/post/ThePost.vue'
import CommentInput from '@/components/layout/post/CommentInput.vue'
import { useI18n } from 'vue-i18n'
import { usePostStore } from '@/stores/postStore'
import { ref } from 'vue'

const postStore = usePostStore()
const loaded = ref(false)

defineProps({
  postId: { type: Number, required: true },
  quote: { type: String, required: true },
  thumbnail: { type: String, required: true },
  user: { type: Object, required: true },
  movie: { type: Object, required: true },
  comments: { type: Object, required: true },
  commentsLength: { type: Number, required: true },
  likesLength: { type: Number, required: true },
})

const { locale } = useI18n()

async function moreComments(postId) {
  try {
    await postStore.loadMoreComments(postId)
    loaded.value = true
  } catch (err) {
    //Err
  }
}
</script>
