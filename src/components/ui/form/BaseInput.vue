<template>
  <div class="flex flex-col gap-2">
    <label for="name" class="text-white capitalize" :class="{ 'sr-only': !label }"
      >{{ label }}<span class="text-[#E31221]" v-if="label">*</span></label
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
          :class="[borderStyle, inputStyle, placeholderStyle]"
          :disabled="disabled"
        />
        <div class="absolute right-3 top-3">
          <valid-icon
            v-if="!error && meta.valid && meta.validated && type !== 'password' && rules"
          />
          <invalid-icon
            v-else-if="error || (!meta.valid && meta.validated && type !== 'password' && rules)"
          />
          <password-icon v-else-if="type === 'password'" class="mt-0.5" @click="showPassword" />
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
import { Field, ErrorMessage, configure, useField } from 'vee-validate'
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
  dark: { type: Boolean, required: false, default: false },
  modelValue: { type: String, required: false },
  value: { type: String, required: false },
  edit: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
})

configure({ validateOnInput: true })

const inputValue = ref('')
const isPasswordVisible = ref(false)
const { meta } = useField(props.id)

const emit = defineEmits(['update-prop', 'update:modelValue'])

const borderStyle = computed(() => {
  if (!props.error && meta.validated && meta.valid && props.rules) {
    return 'border-[#198754]'
  } else if (props.error || (meta.validated && !meta.valid && props.rules)) {
    return 'border-[#DC3545]'
  }
  return 'border-white'
})

const inputStyle = computed(() => {
  return props.dark
    ? 'py-3 px-4 md:px-7 placeholder-[#CED4DA] bg-[#24222F] bg-opacity-60 outline-none text-white rounded-lg'
    : 'pl-3 pr-10 py-2 text-[#212529]  placeholder-[#6C757D] disabled:place rounded  bg-[#CED4DA] border-2 outline-none focus:shadow-[0px_0px_0px_4px] focus:shadow-[#0d6efd3b] disabled:bg-[#E9ECEF] '
})

const placeholderStyle = computed(() => {
  return props.edit ? 'disabled:placeholder-[#6C757D]' : 'disabled:placeholder-[#212529]'
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
