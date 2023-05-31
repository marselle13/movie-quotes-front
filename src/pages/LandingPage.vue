<template>
  <TheHeader :background="false" />
  <router-view></router-view>
  <section
    class="w-[300px] mx-auto md:w-full md:mx-0 md:grid text-center md:content-center md:justify-items-center pt-32 pb-24 md:py-64 space-y-6"
  >
    <h1
      class="text-2xl md:text-6xl md:leading-[90px] text-[#DDCCAA] font-bold"
      :class="locale === 'en' ? 'max-w-[800px]' : 'max-w-[1100px]'"
    >
      {{ t('title') }}
    </h1>
    <base-button class="w-28 md:w-32 py-2" :animation="true">{{ t('get_started') }}</base-button>
  </section>
  <quotes-container :image="interstellarImage">
    <template #quote>You have to leave something behind to go forward</template>
    <template #movie> Interstellar, 2014 </template>
  </quotes-container>
  <quotes-container :image="tanenbaumImage" backdrop="backdrop-half">
    <template #quote>
      I think we’re just gonna have to be secretly in love with each other and leave it
      that</template
    >
    <template #movie>The Royal Tenenbaums,2001 </template>
  </quotes-container>
  <quotes-container :image="lotrImage">
    <template #quote>Death Is Just Another Path, One That We All Must Take.</template>
    <template #movie>The Lord of the Rings,2001 </template>
  </quotes-container>
  <TheFooter />
</template>
<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import interstellarImage from '@/assets/interstellar.png'
import tanenbaumImage from '@/assets/tanenbaum.png'
import lotrImage from '@/assets/lotr.png'
import QuotesContainer from '@/components/layout/QuotesContainer.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

import { useI18n } from 'vue-i18n'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const error = ref(false)
const userStore = useUserStore()

onBeforeMount(async () => {
  if (route.query.code) {
    error.value = false
    const code = route.query.code
    try {
      await userStore.callbackFromGoogle(code)
    } catch (err) {
      error.value = true
    }
    if (error.value) {
      await router.push({ name: 'landing' })
    } else {
      await router.push({ name: 'success-verified' })
    }
  }
  if (route.query.hash) {
    error.value = false
    try {
      await userStore.verifyEmail(route.query)
    } catch (err) {
      error.value = true
    }
    if (error.value) {
      await router.push({
        name: 'resend-link',
        params: {
          uuid: route.query.uuid,
        },
      })
    } else {
      await router.push({ name: 'success-verified' })
    }
  }
})
</script>