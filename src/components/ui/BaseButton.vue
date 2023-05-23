<template>
  <button
    class="text-white rounded font-medium text-sm md:text-base"
    :class="[buttonStyle, buttonAnimation]"
  >
    <slot></slot>
  </button>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, required: false },
  animation: { type: Boolean, required: false, default: false },
})

const buttonStyle = computed(() => {
  return props.mode === 'flat'
    ? 'bg-transparent border border-white hover:opacity-80 '
    : 'bg-[#E31221] hover:bg-[#CC0E10] focus:bg-[#B80D0F] disabled:bg-[#EC4C57]'
})

const buttonAnimation = computed(() => {
  return (
    props.animation && 'transition ease-out delay-150 hover:ring hover:ring-[#F07C84] duration-300'
  )
})
</script>
