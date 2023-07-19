<template>
  <section
    v-for="comment in comments"
    :key="comment.id"
    class="flex flex-col text-white gap-3 border-b pt-4 pb-6 md:pt-6 border-[#efefef4d] py-3"
  >
    <div class="flex-shrink-0 row-span-2 flex items-center gap-4">
      <div
        class="flex justify-center bg-[#D9D9D9] w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full"
      >
        <img
          :src="`${viteBaseUrl}${comment.user.avatar.includes('default') ? '' : 'storage/'}${
            comment.user.avatar
          }`"
          alt="profile"
          class="object-cover"
        />
      </div>
      <h5>{{ comment.user.name }}</h5>
    </div>
    <div class="lg:pl-16">
      <p>
        {{ comment.text }}
      </p>
    </div>
  </section>
  <base-button
    v-if="!loaded && commentsLength > 2"
    mode="flat"
    class="w-full py-2 mt-6"
    @click="moreComments(postId)"
    >{{ t('load_more') }}</base-button
  >
  <CommentInput :post-id="postId" />
</template>
<script setup>
import { usePostStore } from '@/stores/post'
import { ref } from 'vue'
import CommentInput from '@/components/post/CommentInput.vue'
import { useI18n } from 'vue-i18n'

defineProps({
  postId: { type: Number, required: true },
  comments: { type: Object, required: true },
  commentsLength: { type: Number, required: true },
})

const emit = defineEmits(['loaded'])

const viteBaseUrl = import.meta.env.VITE_BASE_URL

const loaded = ref(false)

const { t } = useI18n()
const postStore = usePostStore()

async function moreComments(postId) {
  try {
    await postStore.loadMoreComments(postId)
    loaded.value = true
    emit('loaded')
  } catch (err) {
    console.error(err)
  }
}
</script>
