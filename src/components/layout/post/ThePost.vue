<template>
  <section class="border-b pb-5 lg:pb-7 border-[#efefef4d]">
    <div class="flex items-center gap-4 text-white">
      <img :src="ProfilePicture" alt="profile" class="w-10 h-10 md:w-12 md:h-12" />
      <h5>Maia Nakashidze</h5>
    </div>
    <div class="flex gap-2 mt-4">
      <h3 class="text-white">
        “Follow your dream.” <span class="text-[#DDCCAA]">Bill Eliot</span> (2000)
      </h3>
    </div>
    <div class="my-4 lg:my-6">
      <img :src="MovieImage" alt="movie" />
    </div>
    <div class="flex gap-6">
      <div class="flex gap-3">
        <p class="text-white">0</p>
        <CommentIcon />
      </div>
      <div class="flex gap-3">
        <p class="text-white">0</p>
        <LikeIcon />
      </div>
    </div>
  </section>
</template>
<script setup>
import ProfilePicture from '@/assets/Ellipse 1.png'
import MovieImage from '@/assets/Rectangle 8.png'
import LikeIcon from '@/components/icons/LikeIcon.vue'
import CommentIcon from '@/components/icons/CommenetIcon.vue'
</script>
