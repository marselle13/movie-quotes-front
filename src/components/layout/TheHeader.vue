<template>
  <header class="flex justify-between items-center py-4 px-16" :class="[headerBackground]">
    <p class="text-[#DDCCAA] uppercase">Movie Quotes</p>
    <div class="flex items-center gap-4">
      <base-dropdown>
        <template #dropdownButton>
          <div class="flex gap-2.5 items-center">
            <p class="text-white">Eng</p>
            <LanguageDropdown />
          </div>
        </template>
        <template #dropdown>
          <li>
            <p class="block px-4 py-2 hover:opacity-80">English</p>
          </li>
          <li>
            <p class="block px-4 py-2 hover:opacity-80">Georgian</p>
          </li>
        </template>
      </base-dropdown>
      <base-button class="w-32 py-2">Sign up</base-button>
      <base-button class="w-32 py-2" mode="flat">Log in</base-button>
    </div>
  </header>
</template>
<script setup>
import LanguageDropdown from '@/components/icons/LanguageDropdown.vue'
import { computed } from 'vue'
const props = defineProps({
  background: { type: Boolean, required: false, default: true },
})

const headerBackground = computed(() =>
  props.background ? 'backdrop-blur-xl bg-white bg-opacity-5' : 'bg-transparent',
)
</script>
