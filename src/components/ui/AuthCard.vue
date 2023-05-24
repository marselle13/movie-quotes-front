<template>
  <div class="fixed top-0 left-0 h-full w-full bg-transparent backdrop-blur-sm"></div>
  <div class="grid justify-items-center">
    <div class="bg-[#222030] rounded fixed z-10 px-28 py-12">
      <div class="text-center space-y-3">
        <h3 class="text-3xl text-white text-center"><slot name="title"></slot></h3>
        <p class="text-[#6C757D]"><slot name="info"></slot></p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
