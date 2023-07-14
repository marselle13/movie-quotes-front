<template>
  <footer
    class="py-2.5 px-8 bg-gradient-from-r from-0% from-[#181623] via-51% via-[#191725] to-98% to-[#0d0b14]"
  >
    <h4 class="text-[#DDCCAA] text-[8px] md:text-base">
      © 2022 {{ t('movie_quotes') }}. {{ t('all_rights') }}.
    </h4>
  </footer>
</template>
<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
