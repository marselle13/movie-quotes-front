<template>
  <div class="flex justify-center md:hidden">
    <div
      class="fixed top-0 left-0 h-full w-full z-10 bg-gradient-to-r from-[#181623] from-0% via-[#191725] via-50% to-[#0d0b14] to-95% opacity-70 backdrop-blur-[2px]"
      @click="emit('close')"
    ></div>
    <div
      class="rounded bg-[#D1E7DD] border border-[#BADBCC] p-4 flex items-center justify-between absolute z-20 w-11/12 top-32"
    >
      <div class="flex gap-2">
        <SuccessUpdateIcon />
        <h4 class="text-[#0F5132]">Changes updated successfully</h4>
      </div>
      <CloseIcon @click="emit('close')" />
    </div>
  </div>
</template>
<script setup>
import SuccessUpdateIcon from '@/components/icons/SuccessUpdateIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

const emit = defineEmits(['close'])
</script>
