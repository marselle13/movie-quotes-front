<template>
  <div class="flex justify-center">
    <div
      class="fixed top-0 left-0 h-full w-full z-10 bg-gradient-to-r from-[#181623] from-0% via-[#191725] via-50% to-[#0d0b14] to-95% opacity-70 backdrop-blur-[2px]"
      @click="emit('close')"
    ></div>
    <div
      class="rounded bg-[#D1E7DD] border border-[#BADBCC] p-4 flex items-center justify-between absolute z-20 w-11/12 lg:max-w-[30rem] top-32 lg:w-full"
    >
      <div class="flex gap-2">
        <SuccessUpdateIcon />
        <h4 class="text-[#0F5132]">{{ text }}</h4>
      </div>
      <button @click="emit('close')">
        <CloseIcon />
      </button>
    </div>
  </div>
</template>
<script setup>
import SuccessUpdateIcon from '@/components/icons/SuccessUpdateIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

defineProps({ text: { type: String, required: true } })

const emit = defineEmits(['close'])
</script>
