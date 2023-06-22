<template>
  <div
    class="flex justify-between lg:justify-start items-center border border-[#6C757D] rounded bg-transparent text-white gap-2 px-4 py-6"
  >
    <div class="flex items-center gap-2">
      <CameraIcon />
      <p class="sm:block lg:hidden hidden">Upload image</p>
      <p class="hidden lg:block">Drag & drop your image here or</p>
    </div>
    <input id="image" type="file" class="sr-only" />
    <label for="image" class="bg-[#9747ff7a] text-white p-2">Choose File</label>
  </div>
</template>
<script setup>
import CameraIcon from '@/components/icons/CameraIcon.vue'
</script>
