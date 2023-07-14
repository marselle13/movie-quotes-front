<template>
  <auth-card :wrapper="true" :notification="true" class="relative top-12 md:top-20">
    <template #icon><ExpiredIcon /></template>
    <template #title> {{ t('link_expired') }}</template>
    <div class="flex flex-col justify-center items-center text-white text-center mt-8 space-y-10">
      <p>{{ t('expired_info') }}</p>
      <BaseButton class="w-full py-2" @click="resendLinkButton">{{ t('another_link') }}</BaseButton>
    </div>
  </auth-card>
</template>
<script setup>
import AuthCard from '@/components/common/AuthCard.vue'
import ExpiredIcon from '@/components/icons/ExpiredIcon.vue'
import BaseButton from '@/components/common/form/BaseButton.vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useEmailService } from '@/services/emailService'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const emailService = useEmailService()

async function resendLinkButton() {
  try {
    await emailService.resendLink(route.params.uuid)
    await router.push({ name: 'success-message', params: { message: 'verification' } })
  } catch (err) {
    //error
  }
}
</script>
