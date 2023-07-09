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
    <base-button
      :link="true"
      :to="{ name: 'register' }"
      class="w-28 md:w-32 py-2"
      :animation="true"
      >{{ t('get_started') }}</base-button
    >
  </section>
  <quotes-container
    class="bg-[url('@/assets/interstellar.png')]"
    :fixed="fixed"
    @click="scrollToImage(0)"
  >
    <template #quote>You have to leave something behind to go forward</template>
    <template #movie> Interstellar, 2014 </template>
  </quotes-container>
  <quotes-container
    :fixed="fixed"
    class="bg-[url('@/assets/tanenbaum.png')]"
    backdrop="backdrop-half"
    @click="scrollToImage(1)"
  >
    <template #quote>
      I think we’re just gonna have to be secretly in love with each other and leave it
      that</template
    >
    <template #movie>The Royal Tenenbaums,2001 </template>
  </quotes-container>
  <quotes-container
    :fixed="fixed"
    class="bg-[url('@/assets/lotr.png')]"
    @click="scrollToImage(2)"
    position="bg-right"
  >
    <template #quote>Death Is Just Another Path, One That We All Must Take.</template>
    <template #movie>The Lord of the Rings,2001 </template>
  </quotes-container>
  <TheFooter />
</template>
<script setup>
import TheHeader from '@/components/TheHeader.vue'
import QuotesContainer from '@/components/layout/QuotesContainer.vue'
import TheFooter from '@/components/TheFooter.vue'

import { useI18n } from 'vue-i18n'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmailService } from '@/services/emailService'
import { useUserStore } from '@/stores/userStore'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const emailService = useEmailService()
const userStore = useUserStore()

const fixed = ref(false)
const isDesktop = ref(false)
const isClicked = ref(null)
const imageIndex = ref(null)

function scrollToImage(index) {
  if (!isDesktop.value) return
  isClicked.value = true

  if (fixed.value && index !== 2) {
    index++
  }
  const container = document.querySelectorAll('.quote-container')[index]
  container.scrollIntoView({ behavior: 'smooth' })
  setTimeout(() => {
    imageIndex.value++
  }, 500)
}

function handleScroll() {
  const { scrollTop } = document.documentElement
  if (!isDesktop.value) return

  if (scrollTop > 810 && !isClicked.value) {
    fixed.value = true
  } else if (scrollTop < 810 && !isClicked.value) {
    fixed.value = false
  } else if (scrollTop > 810 && isClicked.value && !imageIndex.value) {
    fixed.value = true
  } else if (scrollTop < 810 && isClicked.value && imageIndex.value > 0) {
    fixed.value = false
    isClicked.value = false
    imageIndex.value = null
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
  registerWithGoogle()
  verifyUser()
  checkWidth()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', checkWidth)
})
</script>
