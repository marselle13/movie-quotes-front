<template>
  <section class="flex mt-6 gap-3 md:gap-6 items-center justify-start">
    <div
      class="w-10 h-10 md:w-12 md:h-12 flex justify-center flex-shrink-0 bg-[#D9D9D9] rounded-full overflow-hidden"
    >
      <img :src="userStore.userData.avatar" alt="profile" class="object-cover" />
    </div>
    <base-input
      :placeholder="t('write_comment')"
      id="comment"
      class="w-full"
      mode="dark"
    ></base-input>
  </section>
</template>
<script setup>
import { useUserStore } from '@/stores/userStore'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const { t } = useI18n()
</script>
