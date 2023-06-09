<template>
  <section class="flex mt-6 gap-3 md:gap-6 items-center justify-start">
    <div class="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
      <img :src="ProfilePicture" alt="profile" />
    </div>
    <base-input placeholder="Write a comment" id="comment" class="w-full" dark></base-input>
  </section>
</template>
<script setup>
import ProfilePicture from '@/assets/Ellipse 1.png'
import BaseInput from '@/components/ui/form/BaseInput.vue'
</script>
