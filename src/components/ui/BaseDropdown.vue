<template>
  <div class="relative">
    <button class="w-full" type="button" @click="dropdownButton">
      <slot name="dropdownButton"></slot>
    </button>
    <ul
      v-if="dropdown"
      class="z-10 bg-[#24222F] rounded-[10px] absolute py-2 text-sm text-white cursor-pointer"
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
</script>
