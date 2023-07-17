<template>
  <new-container
    :quoteId="post.id"
    :title="edit ? t('edit_quote') : t('view_quote')"
    @close="emit('close')"
    @edit="emit('edit')"
    :edit="edit"
  >
    <section class="mt-6 space-y-6">
      <ThePost
        :edit="edit"
        :post-id="post.id"
        :quote="post.quote"
        :likes-length="post.length.likes"
        :comments-length="post.length.comments"
        :thumbnail="post.thumbnail"
        :likes="post.likes"
        :load="load"
        @close="emit('close')"
      />
      <CommentSection
        :post-id="post.id"
        :comments="load ? post.comments : post.comments.slice(0, 2)"
        :comments-length="post.length.comments"
        @loaded="emit('load', true)"
        v-if="!edit"
      />
    </section>
  </new-container>
</template>
<script setup>
import NewContainer from '@/components/layout/NewContainer.vue'
import ThePost from '@/components/post/ThePost.vue'
import CommentSection from '@/components/post/CommentSection.vue'
import { onBeforeUnmount, onMounted, onUpdated } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  edit: { type: Boolean, required: true },
  post: { type: Object, required: true },
  load: { type: Boolean, required: true },
})

const emit = defineEmits(['close', 'edit', 'load'])

const { t } = useI18n()

onMounted(() => {
  localStorage.setItem('modal', `post${props.post.id}`)
})

onUpdated(() => {
  localStorage.setItem('edit', props.edit)
})

onBeforeUnmount(() => {
  localStorage.removeItem('modal')
  localStorage.removeItem('edit')
  emit('load', false)
})
</script>
