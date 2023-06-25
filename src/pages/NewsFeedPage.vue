<template>
  <TheHeader @open-navigation="navigationHandler" />
  <MainContainer
    width="md:w-[940px] md:mx-auto lg:mx-0 w-full relative"
    :navigation="navigation"
    @close-navigation="navigationHandler"
  >
    <PostNavigation />
    <div class="grid justify-items-center content-center w-full mt-20" v-if="isLoading">
      <div
        style="border-top-color: transparent"
        class="w-24 h-24 border-4 border-blue-400 border-solid rounded-full animate-spin"
      ></div>
    </div>
    <div v-else-if="!isLoading">
      <PostSection
        v-for="post in postStore.getPosts"
        :post-id="post.id"
        :key="post.id"
        :quote="post.quote[locale]"
        :thumbnail="post.thumbnail"
        :user="post.user"
        :movie="post.movie"
        :comments="post.comments"
        :comments-length="post.length.comments"
        :likes-length="post.length.likes"
      ></PostSection>
    </div>
    <div class="grid justify-items-center mt-20">
      <h1 class="text-white" v-if="error">{{ error }}</h1>
      <h1 class="text-white" v-else-if="!isLoading && postStore.getPosts.length === 0">
        No Posts to Fetch
      </h1>
    </div>
  </MainContainer>
</template>
<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import PostNavigation from '@/components/post/PostNavigation.vue'
import PostSection from '@/components/post/PostSection.vue'
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import { usePostStore } from '@/stores/postStore'
import { useI18n } from 'vue-i18n'

const postStore = usePostStore()
const { locale } = useI18n()
const navigation = ref(false)
const isLoading = ref(false)
const error = ref('')
function navigationHandler(value) {
  navigation.value = value
}

async function handleScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement
  const bottomOffset = 1000
  if (scrollTop + clientHeight + bottomOffset >= scrollHeight && !error.value) {
    await postStore.showMorePosts()
  }
}

onBeforeMount(async () => {
  if (postStore.getPosts.length === 0) {
    try {
      isLoading.value = true
      await postStore.showPosts()
      isLoading.value = false
    } catch (err) {
      isLoading.value = false
      error.value = err.message
    }
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
