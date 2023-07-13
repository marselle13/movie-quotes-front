<template>
  <new-container
    :quoteId="postStore.getPosts.id"
    :title="edit ? t('edit_quote') : t('view_quote')"
    @close="emit('close')"
    @edit="emit('edit')"
    :edit="edit"
  >
    <section class="mt-6 space-y-6">
      <ThePost
        :edit="edit"
        :post-id="postStore.getPosts.id"
        :quote="postStore.getPosts.quote"
        :likes-length="postStore.getPosts.length.likes"
        :comments-length="postStore.getPosts.length.comments"
        :thumbnail="postStore.getPosts.thumbnail"
        :likes="postStore.getPosts.likes"
        :load="load"
        @close="emit('close')"
      />
      <CommentSection
        :post-id="postStore.getPosts.id"
        :comments="load ? postStore.getPosts.comments : postStore.getPosts.comments.slice(0, 2)"
        :comments-length="postStore.getPosts.length.comments"
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

const emit = defineEmits(['close', 'edit'])

const postStore = usePostStore()
const { t } = useI18n()

const load = ref(false)
</script>
