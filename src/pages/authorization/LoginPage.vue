<template>
  <auth-card>
    <template #title>{{ t('log_in_account') }}</template>
    <template #info> {{ t('log_in_info') }}</template>
    <Form @submit="onSubmit" class="mt-5 space-y-4">
      <base-input
        id="username_email"
        :label="t('email')"
        :placeholder="t('enter_email')"
        rules="required|min:3"
        :error="!!error"
        @update-prop="error = ''"
      ></base-input>
      <base-input
        type="password"
        id="password"
        :label="t('password')"
        :placeholder="t('enter_password')"
        rules="required"
        :error="error"
        @update-prop="error = ''"
      ></base-input>
      <div class="flex justify-between items-center">
        <div class="space-x-2">
          <Field
            name="remember"
            type="checkbox"
            id="remember"
            class="accent-[#E31221]"
            :value="true"
          />
          <label for="remember" class="text-white text-sm md:text-base">{{
            t('remember_me')
          }}</label>
        </div>
        <div>
          <router-link
            class="ml-1 text-[#0D6EFD] underline text-sm md:text-base"
            :to="{ name: 'forget-password' }"
          >
            {{ t('forget_password') }}
          </router-link>
        </div>
      </div>
      <div class="space-y-4 text-center">
        <base-button class="w-full py-2">{{ t('sign_in') }}</base-button>
        <base-button type="button" mode="flat" class="w-full py-2" @click="signInWithGoogle">
          <div class="flex items-center justify-center gap-2">
            <GoogleIcon /> {{ t('sign_in_google') }}
          </div>
        </base-button>
        <p class="text-[#6C757D]">
          {{ t('no_account')
          }}<router-link class="ml-1 text-[#0D6EFD] underline" :to="{ name: 'register' }">{{
            t('sign_up')
          }}</router-link>
        </p>
      </div>
    </Form>
  </auth-card>
</template>
<script setup>
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import { useI18n } from 'vue-i18n'
import { Form, Field } from 'vee-validate'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthService } from '@/services/authService'

const { t } = useI18n()
const userStore = useUserStore()
const authService = useAuthService()

const router = useRouter()
const error = ref('')

async function onSubmit(values) {
  try {
    await userStore.login(values)
    await router.push({ name: 'news-feed' })
  } catch (err) {
    error.value = err.response.data?.errors
  }
}
async function signInWithGoogle() {
  const response = await authService.authorizationWithGoogle()
  window.location.href = response.data.redirect_url
}
</script>
