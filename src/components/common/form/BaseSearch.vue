<template>
  <div class="md:hidden block">
    <SearchIcon @click="openSearch = true" />
    <transition name="slide">
      <div class="bg-[#12101A] fixed w-full left-0 top-0 z-20" v-show="openSearch">
        <div class="flex items-center p-5 gap-4 border-b border-b-[#EFEFEF4D] border-opacity-30">
          <back-icon @click="openSearch = false" />
          <input
            name="search"
            class="text-white bg-transparent w-full p-2 outline-none placeholder-white"
            type="text"
            :placeholder="t('search_by')"
            v-model="searchValue"
            @input="inputHandler"
            autocomplete="off"
          />
        </div>
        <div class="px-16 py-6 space-y-6">
          <slot></slot>
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
    @click="emit('search', true)"
    :class="{
      'w-full border-b border-[#EFEFEF]': isOpen,
      'w-[200px]': !isOpen,
    }"
  >
    <SearchIcon class="absolute" />
    <input
      :placeholder="placeholder"
      :class="{ 'cursor-pointer': !isOpen }"
      class="w-full placeholder-light-silver bg-transparent outline-none text-white px-8"
      v-model="searchValue"
      @input="inputHandler"
    />
  </div>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 w-full h-full bg-transparent z-10"
    @click="emit('search', false)"
  ></div>
</template>
<script setup>
import BackIcon from '@/components/icons/BackIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  isOpen: { type: Boolean, required: false, default: false },
  placeholder: { type: String, required: false },
  modelValue: { type: String, required: true },
})

const emit = defineEmits(['search', 'update:modelValue'])

const { t } = useI18n()
const openSearch = ref(false)
const searchValue = ref(props.modelValue)

function inputHandler(event) {
  emit('update:modelValue', event.target.value)
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
