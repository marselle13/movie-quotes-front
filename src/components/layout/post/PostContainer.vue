<template>
  <main-card class="p-6 mt-6 mb-10">
    <ThePost />
    <CommentContainer />
    <section class="flex mt-6 gap-6 items-center justify-start">
      <div class="w-[52px] h-[52px] flex-shrink-0">
        <img :src="ProfilePicture" alt="profile" />
      </div>
      <base-input placeholder="Write a comment" id="comment" class="w-full" dark></base-input>
    </section>
  </main-card>
</template>
<script setup>
import MainCard from '@/components/ui/MainCard.vue'
import CommentContainer from '@/components/layout/post/CommentContainer.vue'
import ThePost from '@/components/layout/post/ThePost.vue'
import ProfilePicture from '@/assets/Ellipse 1.png'
import BaseInput from '@/components/ui/form/BaseInput.vue'
</script>
