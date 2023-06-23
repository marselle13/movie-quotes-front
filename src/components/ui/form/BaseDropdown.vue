<template>
  <div
    v-if="dropdown"
    class="fixed top-0 left-0 w-full h-full bg-transparent z-10"
    @click="dropdown = false"
  ></div>
  <div class="relative" :class="{ 'hidden md:block': hidden, 'bg-[#000000] p-6': background }">
    <button class="relative" :class="width" type="button" @click="dropdownButton">
      <slot name="dropdownButton"></slot>
    </button>
    <ul
      v-if="dropdown"
      @click="dropdown = false"
      class="z-10 bg-[#24222F] rounded-[10px] absolute py-2 text-sm text-white cursor-pointer -left-12 top-12"
      :class="{
        'w-full bg-black max-h-[100px] overflow-y-auto top-20 left-0 scrollbar-hide rounded-none':
          background,
      }"
    >
      <slot name="dropdown"></slot>
    </ul>
  </div>
</template>
<script setup>
defineProps({
  hidden: { type: Boolean, required: false },
  background: { type: Boolean, required: false, default: false },
  width: { type: String, required: false, default: 'w-[60px]' },
})
import { ref } from 'vue'
const dropdown = ref(false)
const emit = defineEmits(['isOpen'])

function dropdownButton() {
  dropdown.value = !dropdown.value
  emit('isOpen', dropdown)
}
</script>
