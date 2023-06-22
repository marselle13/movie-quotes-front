<template>
  <div class="flex relative border border-[#6C757D]">
    <textarea
      :placeholder="placeholder"
      style="min-height: 80px"
      class="h-12 italic text-white w-full bg-transparent rounded outline-none pl-3 py-1 pr-16 lg:pr-24 placeholder-[#6C757D]"
    ></textarea>
    <h6 class="capitalize absolute right-4 top-2 text-white">{{ type }}</h6>
  </div>
</template>
<script setup>
defineProps({
  placeholder: { type: String, required: false },
  type: { type: String, required: false },
})
</script>
