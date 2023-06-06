<template>
  <auth-card>
    <template #title>{{ t('forget_password') }}</template>
    <template #info>
      {{ t('forget_info') }}
    </template>
    <Form @submit="onSubmit" class="mt-5 space-y-4">
      <base-input
        type="email"
        id="email"
        :label="t('email')"
        :placeholder="t('enter_email')"
        rules="required|email"
        :error="error"
        @update-prop="updateError"
      ></base-input>
      <base-button class="w-full py-2">{{ t('send_instructions') }}</base-button>
      <div class="flex justify-center">
        <router-link :to="{ name: 'login' }" class="text-[#6C757D] inline-flex items-center gap-3">
          <BackIcon />
          {{ t('back_login') }}</router-link
        >
      </div>
    </Form>
  </auth-card>
</template>
<script setup>
import AuthCard from '@/components/ui/AuthCard.vue'
import BackIcon from '@/components/icons/BackIcon.vue'
import { Form } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePasswordService } from '@/services/passwordService'

const { t } = useI18n()
const passwordService = usePasswordService()
const router = useRouter()
const error = ref('')
async function onSubmit(values) {
  try {
    await passwordService.resetPassword(values)
    await router.push({ name: 'success-message', params: { message: 'recover' } })
  } catch (err) {
    if (err.response.data.errors.email[0] === 'not verified') {
      error.value = t('not_verified')
    } else {
      error.value = t('email_invalid')
    }
  }
}
function updateError() {
  error.value = ''
}
</script>
