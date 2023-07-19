<template>
  <div class="flex flex-col gap-2">
    <label
      v-if="mode !== 'flat'"
      :for="id"
      class="text-white capitalize"
      :class="{ 'sr-only': disabled }"
      >{{ label }}<span class="text-rose-red" v-if="label && !disabled">*</span></label
    >
    <div
      class="relative"
      :class="[mode === 'flat' ? 'border border-gray-500 flex items-center w-full pl-4 gap-2' : '']"
    >
      <Field :name="id" :rules="rules" v-slot="{ field, meta }" v-model="inputValue">
        <label
          :for="id"
          v-if="edit && label && mode === 'flat'"
          class="whitespace-nowrap text-steel-gray"
          >{{ label }}:</label
        >
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
              'border-error-red':
                (mode !== 'flat' && error) ||
                (meta.validated && !meta.valid && props.rules && mode !== 'flat'),
              'border-[#198754]':
                !error && meta.validated && meta.valid && props.rules && mode !== 'flat',
            },
            inputStyle,
            placeholderStyle,
          ]"
          :disabled="disabled"
          :autocomplete="autocomplete"
        />
        <div class="absolute right-3 top-0 h-full flex items-center">
          <h4 v-if="mode === 'flat' && lang" class="text-steel-gray">{{ lang }}</h4>
          <valid-icon
            v-if="
              !error &&
              meta.valid &&
              meta.validated &&
              rules &&
              type !== 'password' &&
              mode !== 'flat'
            "
          />
          <password-icon v-else-if="type === 'password'" class="mt-0.5" @click="showPassword" />
          <invalid-icon
            v-else-if="
              (mode !== 'flat' && error) ||
              (!meta.valid && meta.validated && rules && type !== 'password' && mode !== 'flat')
            "
          />
        </div>
        <div class="absolute w-full" v-if="rules">
          <ErrorMessage
            :name="id"
            class="absolute text-[9px] top-1 text-error-red md:text-[10px]"
            :class="{ '-left-4 top-6': mode === 'flat' }"
          ></ErrorMessage>
          <p
            class="absolute text-[11px] top-1 text-error-red"
            v-if="error && meta.valid && typeof error === 'string'"
            :class="{ '-left-4 top-6': mode === 'flat' }"
          >
            {{ error }}
          </p>
        </div>
      </Field>
    </div>
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
  autocomplete: { type: String, required: false, default: 'on' },
  type: { type: String, required: false, default: 'text' },
  rules: { type: String, required: false },
  error: { type: [String, Boolean], required: false },
  mode: { type: String, required: false, default: 'default' },
  modelValue: { type: [String, Number], required: false },
  value: { type: String, required: false },
  edit: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  lang: { type: String, required: false },
})

configure({ validateOnInput: true })

const inputValue = ref(props.modelValue || '')
const isPasswordVisible = ref(false)

const emit = defineEmits(['update-prop', 'update:modelValue'])

const inputStyle = computed(() => {
  switch (props.mode) {
    case 'flat':
      return 'py-2 pr-14 bg-transparent  text-white before:w-full outline-none rounded placeholder:text-steel-gray disabled:italic disabled:placeholder-white'
    case 'dark':
      return 'py-3 px-4 md:px-7 placeholder-light-silver bg-midnight-gray bg-opacity-60 outline-none text-white rounded-lg'
    default:
      return 'pl-3 pr-10 py-2 text-dark-gray  placeholder-steel-gray rounded  bg-light-silver border-2 outline-none focus:shadow-[0px_0px_0px_4px] focus:shadow-[#0d6efd3b] disabled:bg-transparent md:disabled:bg-[#E9ECEF] disabled:border-none disabled:placeholder-white disabled:px-0 md:disabled:px-3 disabled:py-0 disabled:py-2 md:disabled:py-2'
  }
})

const placeholderStyle = computed(() => {
  return props.edit ? ' md:disabled:placeholder-steel-gray' : ' md:disabled:placeholder-dark-gray'
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
