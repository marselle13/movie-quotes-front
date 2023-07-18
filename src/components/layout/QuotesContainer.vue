<template>
  <div
    class="quote-container relative bg-no-repeat bg-cover h-[27rem] lg:h-[67.5rem]"
    :class="[fixed ? 'lg:bg-fixed bg-scroll' : 'bg-scroll', position]"
  >
    <div
      class="z-10 md:pl-32 pl-6 absolute top-0 xl:w-[69rem] md:w-[44rem] w-[20rem] grid grid-cols-12 content-center h-full gap-4"
    >
      <div class="border-t-2 border-white my-4 md:my-10"></div>
      <div class="col-span-11">
        <h2 class="flex text-white text-xl lg:text-5xl lg:leading-[4.5rem] font-bold">
          “<slot name="quote"></slot>”
        </h2>
        <p class="text-[#D9D9D9] text-base lg:text-3xl font-bold"><slot name="movie"></slot></p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  backdrop: { type: String, required: false, default: 'backdrop-full' },
  fixed: { type: Boolean, required: false, default: false },
  position: { type: String, required: false, default: 'bg-center' },
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
