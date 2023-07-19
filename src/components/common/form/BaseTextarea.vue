<template>
  <div class="flex flex-col md:flex-row relative border border-steel-gray pt-1 gap-2">
    <Field :name="id" v-model="textareaValue" :rules="rules" v-slot="{ field }">
      <label
        :for="id"
        v-if="edit && label"
        class="inline-flex self-start whitespace-nowrap text-steel-gray pl-4"
        >{{ label }}:</label
      >
      <textarea
        @input="textareaHandler"
        v-bind="field"
        :placeholder="placeholder"
        v-model="textareaValue"
        :style="{ minHeight: disabled ? '40px' : '80px' }"
        :disabled="disabled"
        :class="[lang ? 'pl-4 pr-16 lg:pr-24' : 'px-4']"
        class="italic text-white w-full bg-transparent rounded outline-none placeholder-steel-gray disabled:resize-none"
      ></textarea>
      <h6 v-if="lang" class="capitalize absolute right-3 top-2 text-steel-gray">{{ lang }}</h6>
      <ErrorMessage
        :name="id"
        class="absolute text-[9px] text-error-red md:text-[10px] -bottom-5 left-0"
      ></ErrorMessage>
      <p class="absolute text-xs -bottom-5 left-0 text-error-red" v-if="error">{{ error }}</p>
    </Field>
  </div>
</template>
<script setup>
import { Field, ErrorMessage, configure } from 'vee-validate'
import { ref, watch } from 'vue'

const props = defineProps({
  label: { type: String, required: false },
  id: { type: String, required: true },
  placeholder: { type: String, required: false },
  lang: { type: String, required: false },
  rules: { type: String, required: false },
  error: { type: String, required: false, default: '' },
  modelValue: { type: String, required: false },
  edit: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
})

const emit = defineEmits(['update-error', 'update:modelValue'])

const textareaValue = ref(props.modelValue)

configure({ validateOnInput: true })

function textareaHandler(event) {
  emit('update:modelValue', event.target.value)
}

watch(textareaValue, () => {
  emit('update-error')
})
</script>
