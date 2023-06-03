<template>
  <auth-card>
    <template #title>Forgot password?</template>
    <template #info>
      Enter the email and we’ll send an email with instructions to reset your password</template
    >
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
      <base-button class="w-full py-2">Send instructions</base-button>
      <div class="flex justify-center">
        <router-link :to="{ name: 'login' }" class="text-[#6C757D] inline-flex items-center gap-3"
          ><BackIcon />Back to log in</router-link
        >
      </div>
    </Form>
  </auth-card>
</template>
<script setup>
import AuthCard from '@/components/ui/AuthCard.vue'
import { Form } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import BackIcon from '@/components/icons/BackIcon.vue'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const userStore = useUserStore()
const router = useRouter()
const error = ref('')
async function onSubmit(values) {
  try {
    await userStore.resetPassword(values)
  } catch (err) {
    if (err.response.data.errors.email[0] === 'not verified') {
      error.value = t('not_verified')
    } else {
      error.value = t('email_invalid')
    }
  }
  if (!error.value) {
    await router.push({
      name: 'success-message',
      params: {
        message: 'recover',
      },
    })
  }
}
function updateError() {
  error.value = ''
}
</script>
