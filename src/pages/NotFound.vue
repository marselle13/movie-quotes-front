<template>
  <section class="grid justify-items-center content-center h-screen gap-8 text-center">
    <NotFoundIcon />
    <h1 class="text-2xl md:text-5xl text-white">Whoops!</h1>
    <p class="text-base md:text-2xl text-white">We can't see the page you are looking for</p>
    <base-button
      link
      :to="{ name: useUserStore().isAuth ? 'news-feed' : 'landing' }"
      class="w-36 py-2"
      >Return Home</base-button
    >
  </section>
</template>
<script setup>
import NotFoundIcon from '@/components/icons/NotFoundIcon.vue'
import { useUserStore } from '@/stores/userStore'
</script>
