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
        @update-prop="updateError"
      ></base-input>
      <base-input
        type="password"
        id="confirmation"
        :label="t('confirm_password')"
        :placeholder="t('confirm_password')"
        rules="required|confirmed:@password"
        :error="errorMessage"
        @update-prop="updateError"
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
import { useUserStore } from '@/stores/userStore'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const error = ref(true)
const errorMessage = ref('')

async function onSubmit(values) {
  try {
    errorMessage.value = ''
    error.value = false
    await userStore.updatePassword(values, route.query)
  } catch (err) {
    if (err.response.data.errors.password[0] === 'Same Password') {
      errorMessage.value = t('same_password')
    }
    error.value = true
  }
  if (!errorMessage.value) {
    await router.push({ name: 'success-message', params: { message: 'update' } })
  }
}
function updateError() {
  errorMessage.value = ''
}

onBeforeMount(async () => {
  const { uuid, hash } = route.query
  if (uuid && hash) {
    try {
      error.value = false
      await userStore.checkResetPasswordUrl(route.query)
    } catch (err) {
      error.value = true
    }
  }
  if (error.value) {
    await router.replace({ name: 'landing' })
  }
})
</script>
