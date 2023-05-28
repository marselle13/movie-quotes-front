<template>
  <auth-card :wrapper="true">
    <template #icon><ExpiredIcon /></template>
    <template #title> Link expired! </template>
    <div
      class="flex flex-col justify-center items-center md:w-[385px] text-white text-center mt-8 space-y-10"
    >
      <p>Login link has expired, because you haven’t used it</p>
      <BaseButton class="w-full py-2" @click="resendLinkButton">Request another link</BaseButton>
    </div>
  </auth-card>
</template>
<script setup>
import AuthCard from '@/components/ui/AuthCard.vue'
import ExpiredIcon from '@/components/icons/ExpiredIcon.vue'
import BaseButton from '@/components/ui/form/BaseButton.vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const error = ref(false)

async function resendLinkButton() {
  try {
    error.value = false
    await userStore.resendLink(route.params.uuid)
  } catch (err) {
    error.value = true
    console.error(err)
  }
  if (!error.value) {
    router.push({ name: 'success-registration' })
  }
}
</script>
