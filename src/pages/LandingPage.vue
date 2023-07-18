<template>
  <router-view></router-view>
  <section :class="[hiddenLanding]">
    <TheHeader :background="false" />
    <section
      class="w-[300px] mx-auto md:w-full md:mx-0 md:grid text-center md:content-center md:justify-items-center pt-32 pb-24 md:py-64"
    >
      <h1
        class="text-2xl md:text-6xl md:leading-[90px] text-[#DDCCAA] font-bold mb-6"
        :class="locale === 'en' ? 'max-w-[800px]' : 'max-w-[1100px]'"
      >
        {{ t('title') }}
      </h1>
      <base-button
        :link="true"
        :to="{ name: 'register' }"
        class="w-28 md:w-32 p-2"
        :animation="true"
        >{{ t('get_started') }}</base-button
      >
    </section>
    <quotes-container
      class="bg-[url('@/assets/interstellar.png')]"
      :fixed="fixed"
      @click="scrollToImage(0)"
    >
      <template #quote>{{ t('interstellar_quote') }}</template>
      <template #movie> {{ t('interstellar') }}, 2014 </template>
    </quotes-container>
    <quotes-container
      :fixed="fixed"
      class="bg-[url('@/assets/tanenbaum.png')]"
      backdrop="backdrop-half"
      @click="scrollToImage(1)"
    >
      <template #quote> {{ t('tenenbaums_quote') }}</template>
      <template #movie>{{ t('tenenbaums') }},2001 </template>
    </quotes-container>
    <quotes-container
      :fixed="fixed"
      class="bg-[url('@/assets/lotr.png')]"
      @click="scrollToImage(2)"
      position="bg-right"
    >
      <template #quote>{{ t('lotr_quote') }}</template>
      <template #movie>{{ t('lotr') }},2001 </template>
    </quotes-container>
    <TheFooter />
  </section>
</template>
<script setup>
import TheHeader from '@/components/TheHeader.vue'
import QuotesContainer from '@/components/layout/QuotesContainer.vue'
import TheFooter from '@/components/TheFooter.vue'

import { useI18n } from 'vue-i18n'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmailService } from '@/services/emailService'
import { useUserStore } from '@/stores/user'
import { setLocale } from '@vee-validate/i18n'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const emailService = useEmailService()
const userStore = useUserStore()

const fixed = ref(false)
const isDesktop = ref(false)
const isClicked = ref(false)

const hiddenLanding = computed(() => {
  return route.name !== 'landing' && route.meta.user === 'guest' ? 'hidden md:block' : 'block'
})

function scrollToImage(index) {
  if (!isDesktop.value) return
  isClicked.value = true

  if (fixed.value && index !== 2) {
    index++
  }
  const container = document.querySelectorAll('.quote-container')[index]
  container.scrollIntoView({ behavior: 'smooth' })
}

function handleScroll() {
  const { scrollTop } = document.documentElement
  if (!isDesktop.value) return
  if (isClicked.value && scrollTop > 500) {
    fixed.value = true
  } else if (!isClicked.value && scrollTop > 700) {
    fixed.value = true
  } else if (scrollTop < 700) {
    fixed.value = false
    isClicked.value = false
  }
}
function checkWidth() {
  isDesktop.value = window.innerWidth >= 1028
}

onMounted(() => {})
async function registerWithGoogle() {
  const { code } = route.query
  if (code) {
    const code = route.query.code
    try {
      await userStore.login({ code })
      await router.push({ name: 'news-feed' })
    } catch (err) {
      await router.replace({ name: 'landing' })
    }
  }
}
async function verifyUser() {
  const { hash, uuid } = route.query
  if (uuid && hash && route.name === 'landing') {
    try {
      await emailService.verifyEmail(route.query)
      await router.push({ name: 'success-message', params: { message: 'verify' } })
    } catch (err) {
      if (err.response.status === 404 || err.response.status === 400) {
        await router.push({ name: 'landing' })
      } else if (err.response.status === 410) {
        await router.push({ name: 'resend-link', params: { uuid: route.query.uuid } })
      }
    }
  }
}

onBeforeMount(() => {
  setLocale(localStorage.getItem('locale') ?? 'en')
  registerWithGoogle()
  verifyUser()
  checkWidth()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', checkWidth)
})
</script>
