<template>
  <header class="flex justify-between items-center py-4 px-16" :class="[headerBackground]">
    <p class="text-[#DDCCAA] uppercase">{{ t('movie_quotes') }}</p>
    <div class="flex items-center gap-4">
      <base-dropdown>
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
      <base-button class="w-32 py-2">{{ t('sign_up') }}</base-button>
      <base-button class="w-32 py-2" mode="flat">{{ t('log_in') }}</base-button>
    </div>
  </header>
</template>
<script setup>
import LanguageDropdown from '@/components/icons/LanguageDropdown.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

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
}
</script>
