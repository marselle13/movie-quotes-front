<template>
  <auth-card :wrapper="true">
    <template #icon>
      <SuccessCheck />
    </template>
    <template #title> {{ t('thank_you') }}</template>
    <div
      class="flex flex-col justify-center items-center md:w-[385px] text-white text-center mt-8 space-y-10"
    >
      <p>{{ t('activated') }}</p>
      <base-button :link="true" :to="{ name: 'login' }" class="w-48 md:w-full py-2">
        {{ t('main_page') }}</base-button
      >
    </div>
  </auth-card>
</template>
<script setup>
import SuccessCheck from '@/components/icons/SuccessCheck.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
