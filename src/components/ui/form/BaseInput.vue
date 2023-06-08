<template>
  <div class="flex flex-col gap-2">
    <label for="name" class="text-white capitalize" :class="{ 'sr-only': !label }"
      >{{ label }}<span class="text-[#E31221]" v-if="label">*</span></label
    >
    <Field :name="id" :rules="rules" v-slot="{ field, meta }">
      <div class="relative">
        <input
          :type="type === 'password' && isPasswordVisible ? 'text' : type"
          :id="id"
          v-bind="field"
          v-model="inputValue"
          :placeholder="placeholder"
          class="w-full"
          :class="{
            'border-[#198754]': !error && meta.valid && meta.dirty && rules,
            'border-[#DC3545]': error || (!meta.valid && meta.dirty && rules),
            'py-3 px-7 placeholder-[#CED4DA] bg-[#24222F] bg-opacity-60 outline-none text-white rounded-lg':
              dark,
            'pl-3 pr-10 py-2 text-[#212529] placeholder:text-[#6C757D] rounded  bg-[#CED4DA] border-2 outline-none focus:shadow-[0px_0px_0px_4px] focus:shadow-[#0d6efd3b] disabled:text-[#6C757D] disabled:text-opacity-30 disabled:bg-[#E9ECEF]':
              !dark,
          }"
        />
        <div class="absolute right-3 top-3" v-if="rules">
          <valid-icon v-if="!error && meta.valid && meta.dirty && type !== 'password'" />
          <invalid-icon v-else-if="error || (!meta.valid && meta.dirty && type !== 'password')" />
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
import { Field, ErrorMessage } from 'vee-validate'
import ValidIcon from '@/components/icons/ValidIcon.vue'
import InvalidIcon from '@/components/icons/InvalidIcon.vue'
import { ref, watch } from 'vue'
import PasswordIcon from '@/components/icons/PasswordIcon.vue'

const inputValue = ref('')
const isPasswordVisible = ref(false)

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  type: { type: String, required: false, default: 'text' },
  rules: { type: String, required: false },
  error: { type: [String, Boolean], required: false },
  dark: { type: Boolean, required: false, default: false },
})

const emit = defineEmits(['update-prop'])

function showPassword() {
  isPasswordVisible.value = !isPasswordVisible.value
}

watch(inputValue, () => {
  emit('update-prop')
})
</script>
