<template>
  <header
    class="flex justify-between items-center py-4 lg:px-16 px-4 z-40"
    :class="[headerBackground, route.meta.user !== 'guest' ? 'sticky top-0' : '']"
  >
    <div class="flex items-center">
      <p class="text-[#DDCCAA] uppercase" :class="[headerIcon]">
        {{ t('movie_quotes') }}
      </p>
      <BurgerIcon v-if="background" class="lg:hidden" @click="emit('open-navigation', true)" />
    </div>
    <div class="flex items-center gap-4 md:gap-10">
      <div v-if="route.meta.user === 'auth'" class="flex items-center gap-5">
        <div id="search"></div>
        <base-dropdown
          button-width="w-[3.75rem]"
          dropdown-width="fixed mb-20 w-full top-20 left-0 lg:w-[58rem]  lg:-right-[15rem] lg:top-16 px-8 py-10  lg:left-auto max-h-[36rem]  lg:max-h-[50rem] overflow-y-auto"
          dropdown-background
          position="static lg:relative"
          @isOpen="dropdownHandler"
        >
          <template #dropdownButton>
            <NotificationIcon />
            <div
              class="w-6 h-6 absolute bg-red-500 top-0 rounded-full right-[20px] text-white text-center"
              v-if="notificationAmount > 0"
            >
              <p>
                {{ notificationAmount }}
              </p>
            </div>
            <TriangleIcon class="absolute top-11 -left-1" v-if="openNotification" />
          </template>
          <template #dropdown>
            <div>
              <div class="flex justify-between items-center gap-4">
                <h5 class="text-lg lg:text-3xl">{{ t('notifications') }}</h5>
                <p
                  class="underline text-white text-sm lg:text-xl cursor-pointer"
                  @click="seenNotifications()"
                >
                  {{ t('all_read') }}
                </p>
              </div>
              <div class="mt-6 space-y-4" v-if="userStore.getNotifications.length">
                <div
                  class="border border-[#6c757d80] rounded p-4 cursor-pointer"
                  v-for="notification in userStore.getNotifications"
                  :key="notification.id"
                  @click="seenNotifications(notification.id)"
                >
                  <div
                    class="flex lg:justify-between lg:items-center flex-col lg:flex-row items-start justify-center"
                  >
                    <div class="flex gap-6 items-center">
                      <div
                        class="flex w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
                        :class="{ 'border-2 border-[#198754]': notification.type === 'new' }"
                      >
                        <img
                          :src="`${viteBaseUrl}${
                            notification.user.avatar.includes('default') ? '' : 'storage/'
                          }${notification.user.avatar}`"
                          alt="user_icon"
                        />
                      </div>
                      <div>
                        <h5 class="lg:text-lg text-[#CED4DA]">{{ notification.user.name }}</h5>
                        <p
                          v-if="notification.message === 'commented'"
                          class="flex items-center gap-3"
                        >
                          <span> <QuoteIcon class="w-6 h-6" /> </span>
                          {{ t('comment') }}
                        </p>
                        <p class="flex items-center gap-3 text-[#CED4DA]" v-else>
                          <span> <HeartIcon class="w-6 h-6" /> </span>
                          {{ t('like') }}
                        </p>
                      </div>
                    </div>
                    <div
                      class="flex flex-row-reverse lg:flex-col w-full lg:w-auto justify-end ml-5 gap-12 lg:ml-0 lg:gap-0"
                    >
                      <h5 class="lg:text-lg text-[#D9D9D9]">{{ notification.created[locale] }}</h5>
                      <div class="relative lg:self-end w-8 lg:w-auto h-6">
                        <h5 class="lg:text-lg text-[#198754]" v-if="notification.type === 'new'">
                          {{ t('new') }}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </base-dropdown>
      </div>
      <base-dropdown
        :hidden="true"
        button-width="w-[4rem]"
        dropdown-width="w-[6.5rem] top-10"
        :disabled="false"
      >
        <template #dropdownButton>
          <div class="flex gap-2.5 items-center">
            <p class="text-white">{{ showLanguage }}</p>
            <LanguageDropdown />
          </div>
        </template>
        <template #dropdown>
          <ul class="cursor-pointer py-2">
            <li @click="changeLanguage('en')">
              <p class="px-4 py-2 hover:opacity-80">{{ t('english') }}</p>
            </li>
            <li @click="changeLanguage('ka')">
              <p class="px-4 py-2 hover:opacity-80">{{ t('georgian') }}</p>
            </li>
          </ul>
        </template>
      </base-dropdown>
      <div
        v-if="route.meta.user === 'guest'"
        class="flex flex-row-reverse md:flex-row items-center gap-2 md:gap-4"
      >
        <base-button
          :link="true"
          :to="{ name: 'register' }"
          class="py-1 md:w-32 md:py-2"
          :class="locale === 'en' ? 'w-20 ' : 'w-22'"
          >{{ t('sign_up') }}</base-button
        >
        <base-button
          :link="true"
          :to="{ name: 'login' }"
          class="w-20 py-1 md:w-32 md:py-2"
          mode="flat"
          >{{ t('log_in') }}</base-button
        >
      </div>
      <div v-else class="hidden md:flex">
        <base-button mode="flat" class="w-32 py-2" @click="logout">{{ t('log_out') }}</base-button>
      </div>
    </div>
  </header>
</template>
<script setup>
import LanguageDropdown from '@/components/icons/DropdownIcon.vue'
import NotificationIcon from '@/components/icons/NotificationIcon.vue'
import BurgerIcon from '@/components/icons/BurgerIcon.vue'
import TriangleIcon from '@/components/icons/TriangleIcon.vue'
import QuoteIcon from '@/components/icons/QuoteIcon.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@vee-validate/i18n'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  background: { type: Boolean, required: false, default: true },
})

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const emit = defineEmits(['open-navigation'])
const userStore = useUserStore()

const viteBaseUrl = import.meta.env.VITE_BASE_URL
const openNotification = ref(false)

const headerBackground = computed(() =>
  props.background ? 'backdrop-blur-xl bg-white bg-opacity-5' : 'bg-transparent',
)

const headerIcon = computed(() => {
  return route.name === 'landing' ? 'block' : 'hidden lg:block'
})

const showLanguage = computed(() => {
  return locale.value === 'en' ? 'Eng' : 'Geo'
})

const notificationAmount = computed(() => {
  return userStore.getNotifications.filter((notification) => notification.type === 'new').length
})

function changeLanguage(value) {
  localStorage.setItem('locale', value)
  locale.value = value
  document.documentElement.lang = value
  setLocale(value)
}

function dropdownHandler(isOpen) {
  openNotification.value = isOpen
}

async function logout() {
  try {
    await userStore.logout()
    await router.replace({ name: 'landing' })
  } catch (err) {
    console.error(err)
  }
}

async function seenNotifications(notificationId = null) {
  try {
    await userStore.updateNotification(notificationId)
  } catch (err) {
    console.error(err)
  }
}

onBeforeMount(async () => {
  if (route.meta.user === 'auth' && userStore.getNotifications.length === 0) {
    try {
      await userStore.userNotifications()
    } catch (err) {
      //Err
    }
  }
})

onMounted(() => {
  window.Echo.private(`notifications.${userStore.userData.id}`).listen(
    'NotificationSent',
    (data) => {
      userStore.newNotification(data.notification)
    },
  )
})

onBeforeUnmount(() => {
  window.Echo.leave(`notifications.${userStore.userData.id}`)
})
</script>
