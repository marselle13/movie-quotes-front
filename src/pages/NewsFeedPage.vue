<template>
  <MainContainer width="md:w-[940px] md:mx-auto lg:mx-0 w-full relative">
    <PostNavigation />
    <LoadingSpinner v-if="isLoading" />
    <div v-else-if="!isLoading">
      <PostSection
        v-for="post in postStore.getPosts"
        :post-id="post.id"
        :key="post.id"
        :quote="post.quote[locale]"
        :thumbnail="post.thumbnail"
        :user="post.user"
        :movie="post.movie"
        :comments="load ? post.comments : post.comments.slice(0, 2)"
        :comments-length="post.length.comments"
        :likes-length="post.length.likes"
        :likes="post.likes"
        :load="load"
        @loaded="load = true"
      ></PostSection>
    </div>
    <div class="grid justify-items-center mt-20">
      <h1 class="text-white" v-if="error">{{ error }}</h1>
      <h1 class="text-white" v-else-if="!isLoading && postStore.getPosts.length === 0">
        {{ t('no_post') }}
      </h1>
    </div>
  </MainContainer>
</template>
<script setup>
import MainContainer from '@/components/layout/MainContainer.vue'
import PostNavigation from '@/components/post/PostNavigation.vue'
import PostSection from '@/components/post/PostSection.vue'
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import { usePostStore } from '@/stores/postStore'
import { useI18n } from 'vue-i18n'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const postStore = usePostStore()
const { t, locale } = useI18n()
const isLoading = ref(false)
const load = ref(false)
const error = ref('')

async function handleScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement
  const bottomOffset = 1000
  if (scrollTop + clientHeight + bottomOffset >= scrollHeight && !error.value) {
    await postStore.showMorePosts(postStore.getSearch ?? null)
  }
}

onBeforeMount(async () => {
  try {
    isLoading.value = true
    await postStore.showPosts()
    isLoading.value = false
  } catch (err) {
    isLoading.value = false
    error.value = err.message
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
