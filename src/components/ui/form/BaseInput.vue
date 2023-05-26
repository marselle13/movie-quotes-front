<template>
  <div class="flex flex-col gap-2">
    <label for="name" class="text-white capitalize"
      >{{ label }}<span class="text-[#E31221]" v-if="label">*</span></label
    >
    <div class="relative">
      <Field :name="id" :rules="rules" v-slot="{ field, meta }">
        <input
          :type="type"
          :id="id"
          v-bind="field"
          v-model="inputValue"
          :placeholder="placeholder"
          class="text-[#212529] placeholder:text-[#6C757D] rounded pl-3 pr-10 py-2 w-full bg-[#CED4DA] border-2 outline-none focus:shadow-[0px_0px_0px_4px] focus:shadow-[#0d6efd3b] disabled:text-[#6C757D] disabled:text-opacity-30 disabled:bg-[#E9ECEF]"
          :class="{
            'border-[#198754]': meta.valid && meta.dirty,
            'border-[#DC3545]': !meta.valid && meta.dirty,
          }"
        />
        <div class="absolute right-3 top-3">
          <valid-icon v-if="meta.valid && meta.dirty" />
          <invalid-icon v-else-if="!meta.valid && meta.dirty" />
        </div>
      </Field>
    </div>
    <div class="relative">
      <ErrorMessage :name="id" class="absolute text-[11px] -top-1 text-[#DC3545]"></ErrorMessage>
    </div>
  </div>
</template>
<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import ValidIcon from '@/components/icons/ValidIcon.vue'
import InvalidIcon from '@/components/icons/InvalidIcon.vue'
import { ref } from 'vue'

const inputValue = ref('')

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, required: false },
  type: { type: String, required: false, default: 'text' },
  rules: { type: String, required: true },
})
</script>
