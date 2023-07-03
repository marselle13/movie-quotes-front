<template>
  <new-container
    :quoteId="postStore.getPost.id"
    :title="edit ? t('edit_quote') : t('view_quote')"
    @close="emit('close')"
    @edit-quote="emit('edit')"
    :edit="edit"
  >
    <section class="mt-6 space-y-6">
      <ThePost
        :edit="edit"
        :post-id="postStore.getPost.id"
        :quote="postStore.getPost.quote"
        :likes-length="postStore.getPost.length.likes"
        :comments-length="postStore.getPost.length.comments"
        :thumbnail="postStore.getPost.thumbnail"
      />
      <CommentSection
        :post-id="postStore.getPost.id"
        :comments="load ? postStore.getPost.comments : postStore.getPost.comments.slice(0, 2)"
        :comments-length="postStore.getPost.length.comments"
        @loaded="load = true"
        v-if="!edit"
      />
    </section>
  </new-container>
</template>
<script setup>
import NewContainer from '@/components/layout/NewContainer.vue'
import { usePostStore } from '@/stores/postStore'
import ThePost from '@/components/post/ThePost.vue'
import CommentSection from '@/components/post/CommentSection.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({ edit: { type: Boolean, required: true } })

const emit = defineEmits(['close', 'loaded', 'edit'])

const postStore = usePostStore()
const { t } = useI18n()

const load = ref(false)
</script>
