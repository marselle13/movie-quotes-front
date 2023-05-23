<template>
  <section :class="backdrop">
    <div class="relative -z-10" v-if="image">
      <img :src="image" alt="image" class="w-full" />
      <div class="absolute top-0 left-40 w-[1000px] grid grid-cols-12 content-center h-full gap-4">
        <div class="border-t-2 border-white my-10"></div>
        <div class="col-span-11">
          <h2 class="text-white text-5xl flex leading-[75px]">“<slot name="quote"></slot>”</h2>
          <p class="text-[#D9D9D9] text-3xl"><slot name="movie"></slot></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  image: { type: String, required: true },
  backdrop: { type: String, required: false, default: 'backdrop-full' },
})
</script>
<style scoped>
.backdrop-full {
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%);
  width: 100%;
  height: 100%;
}

.backdrop-half {
  background: linear-gradient(
    180deg,
    rgba(17, 16, 26, 0.95) 0%,
    rgba(8, 8, 13, 0.13) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  width: 100%;
  height: 100%;
}
</style>
