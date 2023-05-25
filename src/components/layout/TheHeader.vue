<template>
  <header class="flex justify-between items-center py-4 md:px-16 px-4" :class="[headerBackground]">
    <p class="text-[#DDCCAA] uppercase">{{ t('movie_quotes') }}</p>
    <div class="flex items-center gap-10">
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
      <div class="flex flex-row-reverse md:flex-row items-center gap-2 md:gap-4">
        <base-button
          :link="true"
          to="/register"
          class="py-1 md:w-32 md:py-2"
          :class="locale === 'en' ? 'w-20 ' : 'w-22'"
          >{{ t('sign_up') }}</base-button
        >
        <base-button class="w-20 py-1 md:w-32 md:py-2" mode="flat">{{ t('log_in') }}</base-button>
      </div>
    </div>
  </header>
</template>
<script setup>
import LanguageDropdown from '@/components/icons/LanguageDropdownIcon.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@vee-validate/i18n'

const { t, locale } = useI18n({ useScope: 'global' })

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
