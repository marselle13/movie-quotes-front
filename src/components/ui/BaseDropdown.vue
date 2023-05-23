<template>
  <div v-if="dropdown" class="backdrop" @click="close"></div>
  <div class="relative">
    <button class="w-full" type="button" @click="dropdownButton">
      <slot name="dropdownButton"></slot>
    </button>
    <ul
      v-if="dropdown"
      @click="close"
      class="z-10 bg-[#24222F] rounded-[10px] absolute py-2 text-sm text-white cursor-pointer -left-12 top-8"
    >
      <slot name="dropdown"></slot>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const dropdown = ref(false)

function dropdownButton() {
  dropdown.value = !dropdown.value
}
function close() {
  dropdown.value = false
}
</script>
<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: transparent;
  z-index: 10;
}
</style>
