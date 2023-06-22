<template>
  <div class="flex flex-col gap-2">
    <label for="name" class="text-white capitalize" :class="{ 'sr-only': !label }"
      >{{ label }}<span class="text-[#E31221]" v-if="label && !disabled">*</span></label
    >
    <Field :name="id" :rules="rules" v-slot="{ field, meta }" v-model="inputValue">
      <div class="relative">
        <input
          :type="type === 'password' && isPasswordVisible ? 'text' : type"
          :id="id"
          v-bind="field"
          :placeholder="placeholder"
          class="w-full"
          @input="inputHandler"
          :value="value || inputValue"
          :class="[
            {
              'border-[#DC3545]': error || (meta.validated && !meta.valid && props.rules),
              'border-[#198754]': !error && meta.validated && meta.valid && props.rules,
            },
            inputStyle,
            placeholderStyle,
          ]"
          :disabled="disabled"
        />
        <div class="absolute right-3 tp-3">
          <valid-icon
            v-if="!error && meta.valid && meta.validated && rules && type !== 'password'"
          />
          <password-icon v-else-if="type === 'password'" class="mt-0.5" @click="showPassword" />
          <invalid-icon
            v-else-if="error || (!meta.valid && meta.validated && rules && type !== 'password')"
          />
        </div>
      </div>
      <div class="relative" v-if="rules">
        <ErrorMessage
          :name="id"
          class="absolute text-[9px] -top-1 text-[#DC3545] md:text-[10px]"
        ></ErrorMessage>
        <p
          class="absolute text-[11px] -top-1 text-[#DC3545]"
          v-if="error && meta.valid && typeof error === 'string'"
        >
          {{ error }}
        </p>
      </div>
    </Field>
  </div>
</template>
<script setup>
import { Field, ErrorMessage, configure } from 'vee-validate'
import ValidIcon from '@/components/icons/ValidIcon.vue'
import InvalidIcon from '@/components/icons/InvalidIcon.vue'
import { computed, ref, watch } from 'vue'
import PasswordIcon from '@/components/icons/PasswordIcon.vue'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  type: { type: String, required: false, default: 'text' },
  rules: { type: String, required: false },
  error: { type: [String, Boolean], required: false },
  mode: { type: String, required: false, default: 'default' },
  modelValue: { type: String, required: false },
  value: { type: String, required: false },
  edit: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
})

configure({ validateOnInput: true })

const inputValue = ref('')
const isPasswordVisible = ref(false)

const emit = defineEmits(['update-prop', 'update:modelValue'])

const inputStyle = computed(() => {
  switch (props.mode) {
    case 'flat':
      return 'py-2 pl-4 pr-14 bg-transparent border border-[#6C757D] text-white before:w-full outline-none'
    case 'dark':
      return 'py-3 px-4 md:px-7 placeholder-[#CED4DA] bg-[#24222F] bg-opacity-60 outline-none text-white rounded-lg'
    default:
      return 'pl-3 pr-10 py-2 text-[#212529]  placeholder-[#6C757D] rounded  bg-[#CED4DA] border-2 outline-none focus:shadow-[0px_0px_0px_4px] focus:shadow-[#0d6efd3b] disabled:bg-transparent md:disabled:bg-[#E9ECEF] disabled:border-none disabled:placeholder-white disabled:px-0 md:disabled:px-3 disabled:py-0 disabled:pb-4 md:disabled:py-2'
  }
})

const placeholderStyle = computed(() => {
  return props.edit ? ' md:disabled:placeholder-[#6C757D]' : ' md:disabled:placeholder-[#212529]'
})

function showPassword() {
  isPasswordVisible.value = !isPasswordVisible.value
}

function inputHandler(event) {
  emit('update:modelValue', event.target.value)
}

watch(inputValue, () => {
  emit('update-prop')
})
</script>
