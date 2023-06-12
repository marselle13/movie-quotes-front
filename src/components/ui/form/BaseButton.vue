<template>
  <button
    class="text-white rounded font-medium text-sm md:text-base"
    :class="[buttonStyle, buttonAnimation]"
    v-if="!link"
  >
    <slot></slot>
  </button>
  <router-link
    class="text-white rounded font-medium text-sm md:text-base text-center"
    v-else
    :to="to"
    :class="[buttonStyle, buttonAnimation]"
    ><slot></slot
  ></router-link>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, required: false },
  animation: { type: Boolean, required: false, default: false },
  link: {
    type: Boolean,
    required: false,
    default: false,
  },
  to: {
    type: Object,
    required: false,
  },
})

const buttonStyle = computed(() => {
  switch (props.mode) {
    case 'flat':
      return 'bg-transparent border border-white hover:opacity-80'
    case 'transparent':
      return 'bg-transparent'
    default:
      return 'bg-[#E31221] hover:bg-[#CC0E10] focus:bg-[#B80D0F] disabled:bg-[#EC4C57]'
  }
})

const buttonAnimation = computed(() => {
  return (
    props.animation && 'transition ease-out delay-150 hover:ring hover:ring-[#F07C84] duration-300'
  )
})
</script>
