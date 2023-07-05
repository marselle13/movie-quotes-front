<template>
  <teleport to="body" :disabled="disabled">
    <div
      v-show="dropdown"
      class="fixed top-0 left-0 w-full h-full z-10"
      @click="dropdown = false"
    ></div>
  </teleport>
  <div class="relative" :class="{ 'hidden md:block': hidden, 'bg-[#000000] p-6': background }">
    <button class="relative" type="button" @click="dropdownButton" :class="buttonWidth">
      <slot name="dropdownButton"></slot>
    </button>
    <ul
      v-show="dropdown"
      @click="dropdown = false"
      class="z-10 bg-[#24222F] rounded-[10px] absolute py-2 text-sm text-white cursor-pointer"
      :class="[
        dropdownWidth,
        {
          'w-full bg-black max-h-[100px] overflow-y-auto top-20 left-0 scrollbar-hide rounded-none':
            background,
        },
      ]"
    >
      <slot name="dropdown"></slot>
    </ul>
    <div v-show="dropdown" class="fixed top-0 left-0 w-full h-full" @click="dropdown = false"></div>
  </div>
</template>
<script setup>
const props = defineProps({
  disabled: { type: Boolean, required: false, default: true },
  delete: { type: Boolean, required: false, default: false },
  hidden: { type: Boolean, required: false },
  background: { type: Boolean, required: false, default: false },
  buttonWidth: { type: String, required: false },
  dropdownWidth: { type: String, required: false, default: 'w-full' },
})
import { ref } from 'vue'
const dropdown = ref(false)
const emit = defineEmits(['isOpen'])

function dropdownButton() {
  if (!props.delete) {
    dropdown.value = !dropdown.value
    emit('isOpen', dropdown)
  }
}
</script>
