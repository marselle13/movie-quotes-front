<template>
  <div class="block rounded border border-[#ced4da33] p-6 mb-9">
    <p class="text-white">{{ t('password_contain') }}</p>
    <ul class="text-white list-disc px-4">
      <li class="text-sm" :class="!correctLength ? 'text-light-slate' : 'text-green-500'">
        <span :class="!correctLength ? 'text-light-slate' : 'text-white'">{{
          t('more_characters')
        }}</span>
      </li>
      <li class="text-sm" :class="correctCharacters ? 'text-green-500' : 'text-light-slate'">
        <span :class="correctCharacters ? 'text-white' : 'text-light-slate'">
          {{ t('lowercase_characters') }}</span
        >
      </li>
    </ul>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  correctLength: { type: Boolean, required: true },
  correctCharacters: { type: Boolean, required: true },
})

const { t } = useI18n()
</script>
