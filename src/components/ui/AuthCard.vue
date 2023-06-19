<template>
  <section>
    <div
      class="fixed top-0 left-0 h-full w-full bg-[#222030] md:bg-transparent md:backdrop-blur-sm background"
      @click="closeModal"
    ></div>
    <div class="grid justify-items-center h-auto">
      <div
        class="md:bg-[#222030] fixed md:rounded-lg z-10 px-8 md:px-28 md:py-12 md:top-26 w-full md:h-auto overflow-hidden"
        :class="{
          'wrapper pt-20 pb-24 px-2 w-10/12 before:absolute before:w-full before:h-full before:top-0  before:left-0 before:opacity-30 before:backdrop-blur-xl before:rotate-180 rounded-lg before:-z-10':
            wrapper,
          'md:w-[600px]': notification,
          'md:w-[650px]': !notification,
        }"
      >
        <div class="text-center space-y-4 flex flex-col items-center">
          <slot name="icon"></slot>
          <h3 class="text-2xl md:text-3xl text-white text-center"><slot name="title"></slot></h3>
          <p class="text-[#6C757D]"><slot name="info"></slot></p>
        </div>
        <slot></slot>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useRouter } from 'vue-router'

defineProps({
  wrapper: { type: Boolean, required: false, default: false },
  notification: { type: Boolean, required: false, default: false },
})
const router = useRouter()
function closeModal() {
  router.replace({ name: 'landing' })
}
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
