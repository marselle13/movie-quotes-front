<template>
  <auth-card :wrapper="true">
    <template #icon><SandCheck /></template>
    <template #title> Thank You!</template>
    <div
      class="flex flex-col justify-center items-center md:w-[385px] text-white text-center mt-8 space-y-10"
    >
      <p>Please check your email and follow the instructions to activate your account.</p>
      <BaseButton class="w-48 md:w-full py-2">Go to my email</BaseButton>
    </div>
  </auth-card>
</template>
<script setup>
import AuthCard from '@/components/ui/AuthCard.vue'
import SandCheck from '@/components/icons/SandCheck.vue'
import BaseButton from '@/components/ui/form/BaseButton.vue'
</script>
