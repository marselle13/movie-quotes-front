<template>
  <section>
    <div
      class="fixed top-0 left-0 h-full w-full bg-[#222030] md:bg-transparent md:backdrop-blur-sm background"
    >
      <div class="grid justify-items-center h-auto px-8">
        <div
          class="md:bg-[#222030] md:rounded-lg fixed z-10 px-8 md:px-28 py-16 md:py-12 top-20 md:top-32 h-full w-full md:h-auto md:w-auto overflow-y-auto"
          :class="wrapperStyle"
        >
          <div class="text-center space-y-4 flex flex-col items-center">
            <slot name="icon"></slot>
            <h3 class="text-2xl md:text-3xl text-white text-center"><slot name="title"></slot></h3>
            <p class="text-[#6C757D]"><slot name="info"></slot></p>
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({ wrapper: { type: Boolean, required: false, default: false } })

const wrapperStyle = computed(() => {
  return (
    props.wrapper &&
    'wrapper relative pt-20 pb-24 px-2 before:absolute before:w-full before:h-full before:top-0  before:left-0 before:opacity-30 before:backdrop-blur-xl before:rotate-180 rounded-lg before:-z-10'
  )
})
</script>
<style scoped>
@media (max-width: 767px) {
  .background {
    background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
  }

  .wrapper::before {
    background: linear-gradient(
      112.94deg,
      rgba(239, 239, 239, 0.3) -1.81%,
      rgba(239, 239, 239, 0.00514528) 102.5%
    );
  }
}
</style>
