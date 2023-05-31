<template>
  <auth-card :wrapper="true">
    <template #icon><ExpiredIcon /></template>
    <template #title> {{ t('link_expired') }}</template>
    <div
      class="flex flex-col justify-center items-center md:w-[385px] text-white text-center mt-8 space-y-10"
    >
      <p>{{ t('expired_info') }}</p>
      <BaseButton class="w-full py-2" @click="resendLinkButton">{{ t('another_link') }}</BaseButton>
    </div>
  </auth-card>
</template>
<script setup>
import AuthCard from '@/components/ui/AuthCard.vue'
import ExpiredIcon from '@/components/icons/ExpiredIcon.vue'
import BaseButton from '@/components/ui/form/BaseButton.vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()
const error = ref(false)

async function resendLinkButton() {
  try {
    error.value = false
    await userStore.resendLink(route.params.uuid)
  } catch (err) {
    error.value = true
  }
  if (!error.value) {
    await router.push({ name: 'success-registration' })
  }
}
</script>
