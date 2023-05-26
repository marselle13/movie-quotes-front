<template>
  <section>
    <div class="fixed top-0 left-0 h-full w-full bg-transparent backdrop-blur-sm"></div>
    <div class="grid justify-items-center h-full">
      <div
        class="bg-[#222030] md:rounded-lg fixed z-10 px-8 md:px-28 py-16 md:py-12 top-0 md:top-auto h-full w-full md:h-auto md:w-auto overflow-y-auto"
      >
        <div class="text-center space-y-3">
          <h3 class="text-2xl md:text-3xl text-white text-center"><slot name="title"></slot></h3>
          <p class="text-[#6C757D]"><slot name="info"></slot></p>
        </div>
        <slot></slot>
      </div>
    </div>
  </section>
</template>
