<template>
  <section class="grid justify-items-center content-center h-screen gap-8 text-center">
    <ForbiddenIcon />
    <h1 class="text-2xl md:text-5xl text-white">{{ t('no_pass') }}</h1>
    <p class="text-base md:text-2xl text-white">{{ t('no_permission') }}</p>
    <base-button link :to="{ name: route.query.page }" class="w-36 py-2">{{
      t('return_home')
    }}</base-button>
  </section>
</template>
<script setup>
import ForbiddenIcon from '@/components/icons/ForbiddenIcon.vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const route = useRoute()
const { t } = useI18n()
</script>
