<template>
  <section class="grid justify-items-center content-center h-screen gap-8 text-center">
    <ForbiddenIcon />
    <h1 class="text-2xl md:text-5xl text-white">You shall not pass!</h1>
    <p class="text-base md:text-2xl text-white">
      Sorry, but you don’t have permission to access this page
    </p>
    <base-button link :to="{ name: route.query.page }" class="w-36 py-2">Return Home</base-button>
  </section>
</template>
<script setup>
import ForbiddenIcon from '@/components/icons/ForbiddenIcon.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
