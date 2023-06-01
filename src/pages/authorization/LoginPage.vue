<template>
  <auth-card>
    <template #title> Log in to your account</template>
    <template #info> Welcome back! Please enter your details.</template>
    <Form @submit="onSubmit" class="md:w-[450px] mt-5 space-y-4">
      <base-input
        id="username_email"
        :label="t('email')"
        :placeholder="t('enter_email')"
        rules="required|min:3"
        :error="!!error"
      ></base-input>
      <base-input
        type="password"
        id="password"
        :label="t('password')"
        :placeholder="t('enter_password')"
        rules="required"
        :error="error"
        @update-prop="updateError"
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
          <label for="remember" class="text-white">Remember me</label>
        </div>
        <div>
          <router-link class="ml-1 text-[#0D6EFD] underline" to="#"> Forget Password </router-link>
        </div>
      </div>
      <div class="space-y-4 text-center">
        <base-button class="w-full py-2">Sign in</base-button>
        <base-button type="button" mode="flat" class="w-full py-2">
          <div class="flex items-center justify-center gap-2">
            <GoogleIcon /> Sign in with Google
          </div>
        </base-button>
        <p class="text-[#6C757D]">
          Already have an account?<router-link
            class="ml-1 text-[#0D6EFD] underline"
            :to="{ name: 'register' }"
            >Sign up</router-link
          >
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

const { t } = useI18n()
const userStore = useUserStore()
const router = useRouter()
const error = ref('')

async function onSubmit(values) {
  try {
    error.value = ''
    await userStore.loginUser(values)
  } catch (err) {
    if (err.response.status) {
      error.value = t('wrong_credentials')
    }
  }
  if (!error.value) {
    await router.push({ name: 'landing' })
  }
}
function updateError() {
  error.value = ''
}
</script>
