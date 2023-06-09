<template>
  <header class="flex justify-between items-center py-4 lg:px-16 px-4" :class="[headerBackground]">
    <div class="flex items-center">
      <p class="text-[#DDCCAA] uppercase hidden lg:block">{{ t('movie_quotes') }}</p>
      <BurgerIcon v-if="background" class="lg:hidden" @click="emit('open-navigation', true)" />
    </div>
    <div class="flex items-center gap-4 md:gap-10">
      <div v-if="route.meta.user === 'auth'" class="flex items-center gap-5">
        <SearchIcon class="md:hidden block" />
        <base-dropdown>
          <template #dropdownButton>
            <NotificationIcon />
            <div class="w-6 h-6 absolute bg-red-500 top-0 rounded-full right-[20px] text-white">
              3
            </div>
          </template>
        </base-dropdown>
      </div>
      <base-dropdown :hidden="true">
        <template #dropdownButton>
          <div class="flex gap-2.5 items-center">
            <p class="text-white">{{ showLanguage }}</p>
            <LanguageDropdown />
          </div>
        </template>
        <template #dropdown>
          <li @click="changeLanguage('en')">
            <p class="block px-4 py-2 hover:opacity-80">{{ t('english') }}</p>
          </li>
          <li @click="changeLanguage('ka')">
            <p class="block px-4 py-2 hover:opacity-80">{{ t('georgian') }}</p>
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
        <base-button mode="flat" class="w-32 py-2">Log out</base-button>
      </div>
    </div>
  </header>
</template>
<script setup>
import LanguageDropdown from '@/components/icons/LanguageDropdownIcon.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@vee-validate/i18n'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/ui/form/BaseButton.vue'
import BaseDropdown from '@/components/ui/form/BaseDropdown.vue'
import NotificationIcon from '@/components/icons/NotificationIcon.vue'
import BurgerIcon from '@/components/icons/BurgerIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'

const { t, locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const emit = defineEmits(['open-navigation'])

const props = defineProps({
  background: { type: Boolean, required: false, default: true },
})

const headerBackground = computed(() =>
  props.background ? 'backdrop-blur-xl bg-white bg-opacity-5' : 'bg-transparent',
)

const showLanguage = computed(() => {
  return locale.value === 'en' ? 'Eng' : 'Geo'
})

function changeLanguage(value) {
  localStorage.setItem('locale', value)
  locale.value = value
  document.documentElement.lang = value
  setLocale(value)
}
</script>
