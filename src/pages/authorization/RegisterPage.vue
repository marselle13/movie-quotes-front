<template>
  <auth-card>
    <template #title> {{ t('create_account') }} </template>
    <template #info> {{ t('start_journey') }}</template>
    <Form @submit="onSubmit" class="md:w-[450px] mt-5 space-y-4">
      <base-input
        id="name"
        :label="t('name')"
        :placeholder="t('enter_name')"
        rules="required|min:3|max:15|alpha_num"
      ></base-input>
      <base-input
        type="email"
        id="email"
        :label="t('email')"
        :placeholder="t('enter_email')"
        rules="required|email"
        :error="error"
      ></base-input>
      <base-input
        type="password"
        id="password"
        :label="t('password')"
        :placeholder="t('enter_password')"
        rules="required|min:8|max:15|alpha_num"
        ref="password"
      ></base-input>
      <base-input
        type="password"
        id="confirmation"
        :label="t('confirm_password')"
        :placeholder="t('confirm_password')"
        rules="required|confirmed:@password"
      ></base-input>
      <div class="pt-4 space-y-4 text-center">
        <base-button class="w-full py-2">{{ t('get_started') }}</base-button>
        <base-button type="button" @click="signUpWithGoogle" mode="flat" class="w-full py-2">
          <div class="flex items-center justify-center gap-2">
            <google-icon /> {{ t('sign_up_google') }}
          </div>
        </base-button>
        <p class="text-[#6C757D]">
          {{ t('have_account')
          }}<router-link class="ml-1 text-[#0D6EFD] underline" to="#">{{
            t('log_in')
          }}</router-link>
        </p>
      </div>
    </Form>
  </auth-card>
</template>
<script setup>
import AuthCard from '@/components/ui/AuthCard.vue'
import BaseInput from '@/components/ui/form/BaseInput.vue'
import BaseButton from '@/components/ui/form/BaseButton.vue'
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import { Form } from 'vee-validate'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const userStore = useUserStore()
const router = useRouter()
const error = ref('')

async function onSubmit(values) {
  try {
    error.value = ''
    const response = await userStore.registerUser(values)
    if (response === 201) {
      await router.push({ name: 'success-registration' })
    }
  } catch (err) {
    if (err.response.data.errors?.email) {
      error.value = t('already_taken')
      setTimeout(() => {
        error.value = ''
      }, 4000)
    }
  }
}
async function signUpWithGoogle() {
  await userStore.authorizationWithGoogle()
}
</script>