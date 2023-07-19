<template>
  <div
    class="w-full backdrop-blur-2xl lg:rounded-2xl z-20"
    :class="profile ? 'bg-midnight-gray md:bg-[#11101A]' : 'bg-[#11101A]'"
  >
    <slot></slot>
  </div>
</template>
<script setup>
defineProps({ profile: { type: Boolean, required: false, default: false } })
</script>
