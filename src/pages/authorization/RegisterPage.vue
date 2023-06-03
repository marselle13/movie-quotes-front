<template>
  <auth-card class="-mt-12 md:mt-0">
    <template #title> {{ t('create_account') }} </template>
    <template #info> {{ t('start_journey') }}</template>
    <Form @submit="onSubmit" class="mt-5 space-y-4">
      <base-input
        id="name"
        :label="t('name')"
        :placeholder="t('enter_name')"
        :error="error.name"
        rules="required|min:3|max:15|alpha_num"
        @update-prop="updateError"
      ></base-input>
      <base-input
        type="email"
        id="email"
        :label="t('email')"
        :placeholder="t('enter_email')"
        rules="required|email"
        :error="error.email"
        @update-prop="updateError"
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
          }}<router-link class="ml-1 text-[#0D6EFD] underline" :to="{ name: 'login' }">{{
            t('log_in')
          }}</router-link>
        </p>
      </div>
    </Form>
  </auth-card>
</template>
<script setup>
import AuthCard from '@/components/ui/AuthCard.vue'
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import { Form } from 'vee-validate'
import { useUserStore } from '@/stores/userStore'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const userStore = useUserStore()
const router = useRouter()
const error = reactive({
  email: '',
  name: '',
})

async function onSubmit(values) {
  try {
    error.value = ''
    const response = await userStore.registerUser(values)
    if (response === 201) {
      await router.push({ name: 'success-message', params: { message: 'registration' } })
    }
  } catch (err) {
    if (err.response.data.errors?.email) {
      error.email = t('already_taken_email')
    }
    if (err.response.data.errors?.name) {
      error.name = t('already_taken_name')
    }
  }
}
async function signUpWithGoogle() {
  await userStore.authorizationWithGoogle()
}
function updateError() {
  error.email = ''
  error.name = ''
}
</script>
