<template>
  <teleport to="body" :disabled="disabled">
    <div
      v-if="dropdown"
      class="fixed top-0 left-0 w-full h-full z-10"
      @click="dropdownButton"
    ></div>
  </teleport>
  <div :class="[{ 'hidden md:block': hidden, 'bg-[#000000] p-6': buttonBackground }, position]">
    <button class="relative" type="button" @click="dropdownButton" :class="buttonWidth">
      <slot name="dropdownButton"></slot>
    </button>
    <div
      v-if="dropdown"
      @click="dropdownButton"
      class="z-10 bg-[#24222F] rounded-[10px] absolute text-sm text-white"
      :class="[
        dropdownWidth,
        {
          'z-10 bg-black scrollbar-hide rounded-2xl': dropdownBackground,
        },
      ]"
    >
      <slot name="dropdown"></slot>
    </div>
    <div v-if="dropdown" class="fixed top-0 left-0 w-full h-full" @click="dropdownButton"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  disabled: { type: Boolean, required: false, default: false },
  delete: { type: Boolean, required: false, default: false },
  hidden: { type: Boolean, required: false },
  buttonBackground: { type: Boolean, required: false, default: false },
  dropdownBackground: { type: Boolean, required: false, default: false },
  buttonWidth: { type: String, required: false },
  position: { type: String, required: false, default: 'relative' },
  dropdownWidth: { type: String, required: false, default: 'w-full' },
})

import { ref } from 'vue'
const dropdown = ref(false)
const emit = defineEmits(['isOpen'])

function dropdownButton() {
  if (!props.delete) {
    dropdown.value = !dropdown.value
    emit('isOpen', dropdown.value)
  }
}
</script>
