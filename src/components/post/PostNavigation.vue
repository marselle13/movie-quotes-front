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
      :class="{ 'w-full': !search, 'w-[15rem]': search }"
      @click="addQuote = true"
    >
      <WriteQuoteIcon class="w-23" /> {{ t('new_quote') }}
    </button>
    <teleport to="#search" :disabled="isDesktop">
      <BaseSearch
        v-model="searchValue"
        :is-open="search"
        @search="searchHandler"
        :placeholder="search ? t('search_full') : t('search_by')"
      >
        <p class="text-[#EFEFEF99] text-opacity-60">
          {{ t('search_movie') }}
        </p>
        <p class="text-[#EFEFEF99] text-opacity-60">
          {{ t('search_quote') }}
        </p>
      </BaseSearch>
    </teleport>
  </section>
</template>
<script setup>
import WriteQuoteIcon from '@/components/icons/WriteQuoteIcon.vue'
import QuoteModal from '@/components/modals/QuoteModal.vue'
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseSearch from '@/components/common/form/BaseSearch.vue'
import { usePostStore } from '@/stores/post'

const postStore = usePostStore()
const { t } = useI18n()
const isDesktop = ref(false)
const addQuote = ref(false)
const search = ref(false)
const searchValue = ref('')

function searchHandler(isOpen) {
  search.value = isOpen
}

function checkWidth() {
  isDesktop.value = window.innerWidth >= 768
}

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

onBeforeMount(() => {
  if (localStorage.getItem('modal') === 'quote') {
    addQuote.value = true
  }
})

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
})
</script>
