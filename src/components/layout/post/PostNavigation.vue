<template>
  <section class="inline-flex md:flex gap-4 flex-shrink-0 mx-4 lg:mx-0 relative">
    <button
      class="transition-all duration-500 ease-out rounded-lg bg-transparent md:bg-[#24222F] p-3 text-start text-white flex gap-4 whitespace-nowrap"
      :class="{ 'w-full': !search, 'w-[240px]': search }"
      @click="addQuote = true"
    >
      <WriteQuoteIcon class="w-23" /> Write new quote
    </button>
    <teleport to="body">
      <transition name="new-quote">
        <NewQuoteModal v-if="addQuote" @close="addQuote = false" />
      </transition>
    </teleport>
    <div
      class="hidden md:flex transition-all border-opacity-30 duration-1000 ease-out items-center bg-transparent gap-4 relative z-10"
      @click="search = true"
      :class="{
        'w-full border-b border-[#EFEFEF]': search,
        'w-[200px]': !search,
      }"
    >
      <SearchIcon class="absolute" />
      <input
        :placeholder="[search ? 'Enter @ to search movies, Enter # to search quotes' : 'search by']"
        :class="{ 'cursor-pointer': !search }"
        class="w-full placeholder-[#CED4DA] bg-transparent outline-none text-white px-8"
      />
    </div>
    <div
      v-if="search"
      class="fixed top-0 left-0 w-full h-full bg-transparent z-1"
      @click="search = false"
    ></div>
  </section>
</template>
<script setup>
import WriteQuoteIcon from '@/components/icons/WriteQuoteIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import NewQuoteModal from '@/components/modals/NewQuoteModal.vue'
import { ref } from 'vue'

const addQuote = ref(false)
const search = ref(false)
</script>
<style scoped>
.new-quote-enter-from,
.new-quote-leave-to {
  opacity: 0;
}

.new-quote-enter-active {
  transition: all 0.3s ease-out;
}

.new-quote-enter-to,
.new-quote-leave-from {
  opacity: 1;
}

.new-quote-leave-active {
  transition: all 0.3s ease-in;
}
</style>
