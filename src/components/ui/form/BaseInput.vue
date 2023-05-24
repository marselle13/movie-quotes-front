<template>
  <div class="flex flex-col gap-2">
    <label for="name" class="text-white capitalize"
      >{{ label }}<span class="text-[#E31221]" v-if="label">*</span></label
    >
    <input
      :id="id"
      :placeholder="placeholder"
      class="text-[#212529] placeholder:text-[#6C757D] rounded px-3 py-2 w-full bg-[#CED4DA] border border-[#CED4DA] outline-none focus:shadow-[0px_0px_0px_4px] focus:shadow-[#0d6efd3b] disabled:text-[#6C757D] disabled:text-opacity-30 disabled:bg-[#E9ECEF]"
    />
  </div>
</template>
<script setup>
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, required: false },
})
</script>
