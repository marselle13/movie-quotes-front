<template>
  <auth-card :wrapper="true" notification>
    <template #icon>
      <SuccessCheck />
    </template>
    <template #title> {{ successTitle }}</template>
    <div class="flex flex-col justify-center items-center text-white text-center mt-8 space-y-10">
      <p>{{ successInfo }}</p>
      <a
        class="bg-[#E31221] hover:bg-[#CC0E10] focus:bg-[#B80D0F] disabled:bg-[#EC4C57] w-full py-2 text-white rounded font-medium text-sm md:text-base text-center"
        :href="redirect"
        v-if="successAnchor"
      >
        {{ successButton }}
      </a>
      <base-button link :to="redirect" class="w-48 md:w-full py-2" v-else>
        {{ successButton }}</base-button
      >
    </div>
  </auth-card>
</template>
<script setup>
import SuccessCheck from '@/components/icons/SuccessCheck.vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const redirectToEmail = 'https://mail.google.com/'

const successTitle = ref('')
const successInfo = ref('')
const successButton = ref('')
const successAnchor = ref(true)
const redirect = ref(null)

function successMessage() {
  switch (route.params.message) {
    case 'registration':
      setValues({
        anchor: true,
        title: t('thank_you'),
        info: t('check_email'),
        button: t('go_email'),
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
        anchor: true,
        title: t('recover_title'),
        info: t('recover_info'),
        button: t('go_email'),
        link: false,
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
  successTitle.value = values.title
  successInfo.value = values.info
  successButton.value = values.button
  successAnchor.value = values.anchor
  redirect.value = values.redirect
}

onBeforeMount(() => {
  const message = successMessage()
  if (!message) {
    router.replace('/not-found')
  }
})
</script>
