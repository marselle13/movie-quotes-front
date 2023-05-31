<template>
  <auth-card :wrapper="true">
    <template #icon><SandCheck /></template>
    <template #title> {{ t('thank_you') }}</template>
    <div
      class="flex flex-col justify-center items-center md:w-[385px] text-white text-center mt-8 space-y-10"
    >
      <p>{{ t('check_email') }}</p>
      <a
        :href="redirectToEmail"
        class="w-48 md:w-full py-2 text-white rounded font-medium text-sm md:text-base text-center bg-[#E31221] hover:bg-[#CC0E10] focus:bg-[#B80D0F] disabled:bg-[#EC4C57]"
        >{{ t('go_email') }}</a
      >
    </div>
  </auth-card>
</template>
<script setup>
import AuthCard from '@/components/ui/AuthCard.vue'
import SandCheck from '@/components/icons/SendCheck.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const redirectToEmail = 'https://mail.google.com/'
</script>
