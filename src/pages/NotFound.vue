<template>
  <section class="grid justify-items-center content-center h-screen gap-8 text-center">
    <NotFoundIcon />
    <h1 class="text-2xl md:text-5xl text-white">{{ t('whops') }}</h1>
    <p class="text-base md:text-2xl text-white">{{ t('cannot_find') }}</p>
    <base-button
      link
      :to="{ name: useUserStore().isAuth ? 'news-feed' : 'landing' }"
      class="w-36 py-2"
      >{{ t('return_home') }}</base-button
    >
  </section>
</template>
<script setup>
import NotFoundIcon from '@/components/icons/NotFoundIcon.vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
