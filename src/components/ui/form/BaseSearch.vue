<template>
  <div v-if="type === 'small'">
    <SearchIcon class="md:hidden block" @click="openSearch = true" />
    <transition name="slide">
      <div class="bg-[#12101A] fixed w-full left-0 top-0 z-20 md:hidden" v-show="openSearch">
        <div class="flex items-center p-5 gap-4 border-b border-b-[#EFEFEF4D] border-opacity-30">
          <back-icon @click="emit('search')" />
          <input
            name="search"
            class="text-white bg-transparent w-full p-2 outline-none placeholder-white"
            type="text"
            :placeholder="t('search_by')"
            v-model="searchValue"
            autocomplete="off"
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
  <div
    class="hidden md:flex transition-all border-opacity-30 duration-1000 ease-out items-center bg-transparent gap-4 relative z-20"
    @click="searchHandler(true)"
    :class="{
      'w-full border-b border-[#EFEFEF]': isOpen,
      'w-[200px]': !isOpen,
    }"
    v-else-if="type === 'big'"
  >
    <SearchIcon class="absolute" />
    <input
      :placeholder="[isOpen ? t('search_full') : t('search_by')]"
      :class="{ 'cursor-pointer': !isOpen }"
      class="w-full placeholder-[#CED4DA] bg-transparent outline-none text-white px-8"
      v-model="searchValue"
    />
  </div>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 w-full h-full bg-transparent z-10"
    @click="searchHandler(false)"
  ></div>
</template>
<script setup>
import BackIcon from '@/components/icons/BackIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { ref, watch } from 'vue'
import { usePostStore } from '@/stores/postStore'
import { useI18n } from 'vue-i18n'

defineProps({
  type: { type: String, required: true },
  isOpen: { type: Boolean, required: false, default: false },
})

const emit = defineEmits(['search'])

const postStore = usePostStore()
const { t } = useI18n()
const openSearch = ref(false)
const searchValue = ref('')

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

function searchHandler(value) {
  console.log(value)
  emit('search', value)
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
