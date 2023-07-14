<template>
  <auth-card :wrapper="true" notification class="relative top-20">
    <template #icon> <SuccessCheck v-if="success.icon" /> <SendCheck v-else /> </template>
    <template #title> {{ success.title }}</template>
    <div class="flex flex-col justify-center items-center text-white text-center mt-8 space-y-10">
      <p>{{ success.info }}</p>
      <a
        class="bg-[#E31221] hover:bg-[#CC0E10] focus:bg-[#B80D0F] disabled:bg-[#EC4C57] w-full py-2 text-white rounded font-medium text-sm md:text-base text-center"
        :href="success.redirect"
        v-if="success.anchor"
      >
        {{ success.button }}
      </a>
      <base-button link :to="success.redirect" class="w-48 md:w-full py-2" v-else>
        {{ success.button }}</base-button
      >
    </div>
  </auth-card>
</template>
<script setup>
import SuccessCheck from '@/components/icons/SuccessCheck.vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, reactive } from 'vue'
import SendCheck from '@/components/icons/SendCheck.vue'
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const redirectToEmail = 'https://mail.google.com/'

const success = reactive({
  title: '',
  info: '',
  button: '',
  anchor: true,
  icon: true,
  redirect: null,
})
function successMessage() {
  switch (route.params.message) {
    case 'verification':
      setValues({
        title: t('thank_you'),
        info: t('check_email'),
        button: t('go_email'),
        icon: false,
        redirect: redirectToEmail,
      })
      return true
    case 'verify':
      setValues({
        anchor: false,
        title: t('thank_you'),
        info: t('activated'),
        button: t('log_in'),
        redirect: { name: 'login' },
      })
      return true
    case 'recover':
      setValues({
        title: t('recover_title'),
        info: t('recover_password'),
        button: t('go_email'),
        icon: false,
        redirect: redirectToEmail,
      })
      return true
    case 'update':
      setValues({
        anchor: false,
        title: t('update_title'),
        info: t('update_info'),
        button: t('log_in'),
        redirect: { name: 'login' },
      })
      return true
    default:
      return false
  }
}
function setValues(values) {
  const { title, info, button, anchor = true, icon = true, redirect } = values
  success.title = title
  success.info = info
  success.button = button
  success.anchor = anchor
  success.icon = icon
  success.redirect = redirect
}

onBeforeMount(() => {
  const message = successMessage()
  if (!message) {
    router.replace('/not-found')
  }
})
</script>
