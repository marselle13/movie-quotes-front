<template>
  <Field :name="id" :rules="rules" v-slot="{ field }">
    <div class="flex relative border border-[#6C757D]">
      <textarea
        v-bind="field"
        :placeholder="placeholder"
        v-model="textareaValue"
        style="min-height: 80px"
        class="h-12 italic text-white w-full bg-transparent rounded outline-none pl-3 py-1 pr-16 lg:pr-24 placeholder-[#6C757D]"
      ></textarea>
      <h6 v-if="lang" class="capitalize absolute right-3 top-2 text-[#6C757D]">{{ lang }}</h6>
      <ErrorMessage :name="id" class="absolute text-xs -bottom-5 text-[#DC3545]"></ErrorMessage>
      <p class="absolute text-xs -bottom-5 text-[#DC3545]" v-if="error">{{ error }}</p>
    </div>
  </Field>
</template>
<script setup>
import { Field, ErrorMessage, configure } from 'vee-validate'
import { ref, watch } from 'vue'

defineProps({
  id: { type: String, required: true },
  placeholder: { type: String, required: false },
  lang: { type: String, required: false },
  rules: { type: String, required: false },
  error: { type: String, required: false, default: '' },
})

const emit = defineEmits(['update-error'])

const textareaValue = ref('')

configure({ validateOnInput: true })

watch(textareaValue, () => {
  emit('update-error')
})
</script>
