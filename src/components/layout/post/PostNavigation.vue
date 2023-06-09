<template>
  <div
    v-if="search"
    class="fixed top-0 left-0 w-full h-full bg-transparent z-30"
    @click="search = false"
  ></div>
  <section class="inline-flex md:flex gap-4 flex-shrink-0 mx-4 lg:mx-0">
    <button
      class="transition-all duration-500 ease-out rounded-lg bg-transparent md:bg-[#24222F] p-3 text-start text-white flex gap-4 whitespace-nowrap"
      :class="{ 'w-full': !search, 'w-[240px]': search }"
    >
      <WriteQuoteIcon class="w-23" /> Write new quote
    </button>
    <div
      class="hidden md:flex transition-all duration-1000 ease-out items-center bg-transparent gap-4 relative z-40"
      @click="search = true"
      :class="{ 'w-full': search, 'w-[200px]': !search }"
    >
      <SearchIcon class="absolute" />
      <input
        placeholder="search by"
        :class="{ 'cursor-pointer': !search }"
        class="w-full placeholder-[#CED4DA] bg-transparent outline-none text-white px-8"
      />
    </div>
  </section>
</template>
<script setup>
import WriteQuoteIcon from '@/components/icons/WriteQuoteIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { ref } from 'vue'

const search = ref(false)
</script>
