<template>
  <TheHeader @open-navigation="navigationHandler" />
  <MainContainer
    width="md:max-w-[940px] md:mx-auto lg:mx-0"
    :navigation="navigation"
    @close-navigation="navigationHandler"
  >
    <PostNavigation />
    <PostContainer />
  </MainContainer>
</template>
<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import PostContainer from '@/components/layout/post/PostContainer.vue'
import PostNavigation from '@/components/layout/post/PostNavigation.vue'
import { ref } from 'vue'

const navigation = ref(false)
function navigationHandler(value) {
  navigation.value = value
}
</script>
