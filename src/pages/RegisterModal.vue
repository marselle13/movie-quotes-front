<template>
  <auth-card>
    <template #title> Create an account </template>
    <template #info> Start your journey!</template>
    <Form @submit="onSubmit" class="w-[450px] mt-5 space-y-4">
      <base-input
        id="name"
        label="name"
        placeholder="At least 3 & max.15 lower case characters"
        rules="required|min:3|max:15|alpha_num"
      ></base-input>
      <base-input
        type="email"
        id="email"
        label="email"
        placeholder="Enter your email"
        rules="required|email"
      ></base-input>
      <base-input
        id="password"
        label="password"
        placeholder="At least 8 & max.15 lower case characters"
        rules="required|min:8|max:15|alpha_num"
        ref="password"
      ></base-input>
      <base-input
        id="confirmation"
        label="confirm password"
        placeholder="Confirm password"
        rules="required|confirmed:@password"
      ></base-input>
      <div class="pt-4 space-y-4 text-center">
        <base-button class="w-full py-2">Get started</base-button>
        <base-button mode="flat" class="w-full py-2">
          <div class="flex items-center justify-center gap-2">
            <google-icon /> Sign up with Google
          </div>
        </base-button>
        <p class="text-[#6C757D]">
          Already have an account?<router-link class="ml-1 text-[#0D6EFD] underline" to="/login"
            >Log in</router-link
          >
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

const userStore = useUserStore()

function onSubmit(values) {
  userStore.registerUser(values)
}
</script>
