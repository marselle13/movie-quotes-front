<template>
  <auth-card :wrapper="true">
    <template #icon>
      <SuccessCheck />
    </template>
    <template #title> Thank You!</template>
    <div
      class="flex flex-col justify-center items-center md:w-[385px] text-white text-center mt-8 space-y-10"
    >
      <p>Your account has been activated.</p>
      <base-button :link="true" :to="{ name: 'login' }" class="w-48 md:w-full py-2"
        >Go to my news feed</base-button
      >
    </div>
  </auth-card>
</template>
<script setup>
import SuccessCheck from '@/components/icons/SuccessCheck.vue'
</script>
