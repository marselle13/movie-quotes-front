<template>
  <div class="block rounded border border-[#ced4da33] p-6 my-9">
    <p class="text-white">Passwords should contain:</p>
    <ul class="text-white list-disc px-4">
      <li class="text-sm" :class="!correctLength ? 'text-[#9C9A9A]' : 'text-green-500'">
        <span :class="!correctLength ? 'text-[#9C9A9A]' : 'text-white'">8 or more characters</span>
      </li>
      <li
        class="text-sm"
        :class="correctLength && correctCharacters ? 'text-green-500' : 'text-[#9C9A9A]'"
      >
        <span :class="correctLength && correctCharacters ? 'text-white' : 'text-[#9C9A9A]'">
          15 lowercase character</span
        >
      </li>
    </ul>
  </div>
</template>
<script setup>
defineProps({
  correctLength: { type: Boolean, required: true },
  correctCharacters: { type: Boolean, required: true },
})
</script>
