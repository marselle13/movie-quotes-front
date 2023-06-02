<template>
  <auth-card>
    <template #title>Forgot password?</template>
    <template #info>
      Enter the email and we’ll send an email with instructions to reset your password</template
    >
    <Form class="mt-5 space-y-4">
      <base-input
        type="email"
        id="email"
        :label="t('email')"
        :placeholder="t('enter_email')"
        rules="required|email"
      ></base-input>
      <base-button class="w-full py-2">Send instructions</base-button>
      <div>
        <router-link
          :to="{ name: 'login' }"
          class="text-[#6C757D] flex items-center justify-center gap-3"
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

const { t } = useI18n()
</script>
