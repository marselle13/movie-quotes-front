<template>
  <teleport to="body">
    <transition
      name="new-quote"
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <QuoteModal :title="t('new_quote')" v-if="addQuote" @close="addQuote = false" />
    </transition>
  </teleport>
  <section class="inline-flex md:flex gap-4 flex-shrink-0 mx-4 lg:mx-0 relative">
    <button
      class="transition-all duration-500 ease-out rounded-lg bg-transparent md:bg-[#24222F] p-3 text-start text-white flex gap-4 whitespace-nowrap"
      :class="{ 'w-full': !search, 'w-[240px]': search }"
      @click="addQuote = true"
    >
      <WriteQuoteIcon class="w-23" /> {{ t('new_quote') }}
    </button>
    <BaseSearch type="big" :is-open="search" @search="searchHandler" />
  </section>
</template>
<script setup>
import WriteQuoteIcon from '@/components/icons/WriteQuoteIcon.vue'
import QuoteModal from '@/components/modals/QuoteModal.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseSearch from '@/components/ui/form/BaseSearch.vue'

const { t } = useI18n()
const addQuote = ref(false)
const search = ref(false)

function searchHandler(isOpen) {
  console.log(isOpen)
  search.value = isOpen
}
</script>
