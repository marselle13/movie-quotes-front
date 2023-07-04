<template>
  <header
    class="sticky top-0 flex justify-between items-center py-4 lg:px-16 px-4 z-40"
    :class="[headerBackground]"
  >
    <div class="flex items-center">
      <p class="text-[#DDCCAA] uppercase" :class="[headerIcon]">
        {{ t('movie_quotes') }}
      </p>
      <BurgerIcon v-if="background" class="lg:hidden" @click="emit('open-navigation', true)" />
    </div>
    <div class="flex items-center gap-4 md:gap-10">
      <div v-if="route.meta.user === 'auth'" class="flex items-center gap-5">
        <div>
          <SearchIcon
            class="md:hidden block"
            v-if="route.name === 'news-feed'"
            @click="openSearch = true"
          />
          <transition name="slide">
            <div class="bg-[#12101A] fixed w-full left-0 top-0 z-20 md:hidden" v-show="openSearch">
              <div
                class="flex items-center p-5 gap-4 border-b border-b-[#EFEFEF4D] border-opacity-30"
              >
                <back-icon @click="openSearch = false" />
                <input
                  name="search"
                  class="text-white bg-transparent w-full p-2 outline-none placeholder-white"
                  type="text"
                  :placeholder="t('search_by')"
                  v-model="searchValue"
                />
              </div>
              <div class="px-16 py-6 space-y-6">
                <p class="text-[#EFEFEF99] text-opacity-60">{{ t('search_movie') }}</p>
                <p class="text-[#EFEFEF99] text-opacity-60">{{ t('search_quote') }}</p>
              </div>
            </div>
          </transition>
          <teleport to="body">
            <div
              class="fixed left-0 top-0 w-full h-full z-10"
              v-if="openSearch"
              @click="openSearch = false"
            ></div>
          </teleport>
        </div>
        <base-dropdown button-width="w-[3.75rem]">
          <template #dropdownButton>
            <NotificationIcon />
            <div class="w-6 h-6 absolute bg-red-500 top-0 rounded-full right-[20px] text-white">
              3
            </div>
          </template>
        </base-dropdown>
      </div>
      <base-dropdown :hidden="true" dropdown-width="w-[6.5rem] top-10" :disabled="false">
        <template #dropdownButton>
          <div class="flex gap-2.5 items-center">
            <p class="text-white">{{ showLanguage }}</p>
            <LanguageDropdown />
          </div>
        </template>
        <template #dropdown>
          <li @click="changeLanguage('en')">
            <p class="px-4 py-2 hover:opacity-80">{{ t('english') }}</p>
          </li>
          <li @click="changeLanguage('ka')">
            <p class="px-4 py-2 hover:opacity-80">{{ t('georgian') }}</p>
          </li>
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
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@vee-validate/i18n'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/ui/form/BaseButton.vue'
import BaseDropdown from '@/components/ui/form/BaseDropdown.vue'
import NotificationIcon from '@/components/icons/NotificationIcon.vue'
import BurgerIcon from '@/components/icons/BurgerIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { useUserStore } from '@/stores/userStore'
import BackIcon from '@/components/icons/BackIcon.vue'
import { usePostStore } from '@/stores/postStore'

const props = defineProps({
  background: { type: Boolean, required: false, default: true },
})
const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const emit = defineEmits(['open-navigation'])
const userStore = useUserStore()
const postStore = usePostStore()
const openSearch = ref(false)
const searchValue = ref('')

const headerBackground = computed(() =>
  props.background ? 'backdrop-blur-xl bg-white bg-opacity-5' : 'bg-transparent',
)

const headerIcon = computed(() => {
  return route.name === 'landing' ? 'block' : 'hidden lg:block'
})

const showLanguage = computed(() => {
  return locale.value === 'en' ? 'Eng' : 'Geo'
})

let searchTimeout
let showTimeout

watch(searchValue, async (newValue) => {
  clearTimeout(searchTimeout)
  clearTimeout(showTimeout)
  if (newValue.length > 2) {
    searchTimeout = setTimeout(async () => {
      try {
        await postStore.searchPosts(newValue.toLowerCase().trim())
      } catch (err) {
        //Err
      }
    }, 500)
  } else {
    showTimeout = setTimeout(async () => {
      try {
        await postStore.showPosts()
      } catch (err) {
        //Err
      }
    }, 500)
  }
})

function changeLanguage(value) {
  localStorage.setItem('locale', value)
  locale.value = value
  document.documentElement.lang = value
  setLocale(value)
}

async function logout() {
  try {
    await userStore.logout()
    await router.replace({ name: 'landing' })
  } catch (err) {
    //Error
  }
}
</script>
<style scoped>
@media (max-width: 1028px) {
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  .slide-enter-to {
    transform: translateY(0%);
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateY(-100%);
  }
}
</style>
