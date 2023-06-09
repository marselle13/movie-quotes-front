<template>
  <main-card class="p-6 mt-6 mb-10">
    <ThePost />
    <CommentContainer />
    <CommentInput />
  </main-card>
</template>
<script setup>
import MainCard from '@/components/ui/MainCard.vue'
import CommentContainer from '@/components/layout/post/CommentContainer.vue'
import ThePost from '@/components/layout/post/ThePost.vue'
import CommentInput from '@/components/layout/post/CommentInput.vue'
</script>
