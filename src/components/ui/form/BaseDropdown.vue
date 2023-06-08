<template>
  <div
    v-if="dropdown"
    class="fixed top-0 left-0 w-full h-full bg-transparent z-10"
    @click="close"
  ></div>
  <div class="relative" :class="{ 'hidden md:block': hidden }">
    <button class="relative w-[60px]" type="button" @click="dropdownButton">
      <slot name="dropdownButton"></slot>
    </button>
    <ul
      v-if="dropdown"
      @click="close"
      class="z-10 bg-[#24222F] rounded-[10px] absolute py-2 text-sm text-white cursor-pointer -left-12 top-12"
    >
      <slot name="dropdown"></slot>
    </ul>
  </div>
</template>
<script setup>
defineProps({ hidden: { type: Boolean, required: false } })
import { ref } from 'vue'
const dropdown = ref(false)

function dropdownButton() {
  dropdown.value = !dropdown.value
}
function close() {
  dropdown.value = false
}
</script>
