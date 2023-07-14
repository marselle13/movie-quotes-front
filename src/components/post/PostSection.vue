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
      :load="load"
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
import { onBeforeUnmount, onMounted } from 'vue'
import { usePostStore } from '@/stores/postStore'

const props = defineProps({
  postId: { type: Number, required: true },
  quote: { type: String, required: true },
  thumbnail: { type: String, required: true },
  user: { type: Object, required: true },
  movie: { type: Object, required: true },
  comments: { type: Object, required: true },
  commentsLength: { type: Number, required: true },
  likesLength: { type: Number, required: true },
  likes: { type: Object, required: true },
  load: { type: Boolean, required: false },
})
const emit = defineEmits(['loaded'])

const { locale } = useI18n()
const postStore = usePostStore()

onMounted(() => {
  window.Echo.channel('comments').listen('CommentSent', (data) => {
    if (props.postId !== data.comment.quoteId) return
    postStore.newComment(data.comment.quoteId, data.comment, props.load)
  })
  window.Echo.channel('reactions').listen('ReactPost', (data) => {
    if (props.postId !== data.reaction.quoteId) return
    postStore.postReaction(data.reaction)
  })
})

onBeforeUnmount(() => {
  window.Echo.leaveChannel('comments')
  window.Echo.leaveChannel('reactions')
})
</script>
