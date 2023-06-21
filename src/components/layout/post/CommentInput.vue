<template>
  <section class="flex mt-6 gap-3 md:gap-6 items-center justify-start">
    <div
      class="w-10 h-10 md:w-12 md:h-12 flex justify-center flex-shrink-0 bg-[#D9D9D9] rounded-full overflow-hidden"
    >
      <img :src="userStore.userData.avatar" alt="profile" class="object-contain" />
    </div>
    <base-input placeholder="Write a comment" id="comment" class="w-full" dark></base-input>
  </section>
</template>
<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>
