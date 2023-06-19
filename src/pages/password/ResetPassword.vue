<template>
  <auth-card>
    <template #title>{{ t('create_password') }}</template>
    <template #info> {{ t('create_info') }}</template>
    <Form @submit="onSubmit" class="mt-5 space-y-4">
      <base-input
        type="password"
        id="password"
        :label="t('password')"
        :placeholder="t('enter_password')"
        rules="required|min:8|max:15|alpha_num"
        ref="password"
        :error="!!error"
        @update-prop="error = ''"
      ></base-input>
      <base-input
        type="password"
        id="confirmation"
        :label="t('confirm_password')"
        :placeholder="t('confirm_password')"
        rules="required|confirmed:@password"
        :error="error"
        @update-prop="error = ''"
      ></base-input>
      <base-button class="w-full py-2">{{ t('reset_password') }}</base-button>
      <div class="flex justify-center pt-6">
        <router-link :to="{ name: 'login' }" class="text-[#6C757D] inline-flex items-center gap-3"
          ><BackIcon />{{ t('back_login') }}</router-link
        >
      </div>
    </Form>
  </auth-card>
</template>
<script setup>
import AuthCard from '@/components/ui/AuthCard.vue'
import { Form } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/ui/form/BaseButton.vue'
import BackIcon from '@/components/icons/BackIcon.vue'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePasswordService } from '@/services/passwordService'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const passwordService = usePasswordService()
const error = ref('')

async function onSubmit(values) {
  try {
    await passwordService.updatePassword(values, route.query)
    await router.push({ name: 'success-message', params: { message: 'update' } })
  } catch (err) {
    error.value = err.response?.data.errors.password?.[0]
  }
}

onBeforeMount(async () => {
  const { uuid, token } = route.query
  if (uuid && token) {
    try {
      await passwordService.checkResetPasswordUrl(route.query)
    } catch (err) {
      await router.replace({ name: 'landing' })
    }
  }
})
</script>
