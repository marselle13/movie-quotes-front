<template>
  <section class="flex mt-8 mx-4 lg:mx-16">
    <aside
      v-show="navigation || isDesktop"
      class="p-11 lg:p-0 z-30 flex-shrink-0 max-w-[400px] w-11/12 h-screen fixed left-0 bg-[#11101A] lg:bg-transparent lg:static top-0 backdrop-blur-2xl lg:backdrop-blur-0"
    >
      <div class="flex items-center gap-6">
        <img :src="ProfilePicture" alt="profile" />
        <div>
          <h4 class="text-white">Nino Tabagari</h4>
          <router-link to="#" class="text-xs text-[#CED4DA]">Edit your profile</router-link>
        </div>
      </div>
      <div class="pt-10 space-y-10">
        <router-link to="#">
          <div class="flex items-center text-white gap-10">
            <FeedIcon />
            <p>News Feed</p>
          </div>
        </router-link>
        <router-link to="#" class="flex items-center text-white gap-10">
          <MoviesIcon />
          <p>List of movies</p>
        </router-link>
      </div>
    </aside>
    <main :class="width" @click="navigationHandler">
      <slot></slot>
    </main>
  </section>
</template>
<script setup>
import ProfilePicture from '@/assets/Ellipse 1.png'
import MoviesIcon from '@/components/icons/MoviesIcon.vue'
import FeedIcon from '@/components/icons/FeedIcon.vue'
import { onMounted, ref } from 'vue'
defineProps({
  width: { type: String, required: false },
  navigation: { type: Boolean, required: false },
})
const emit = defineEmits(['close-navigation'])

const isDesktop = ref(false)
function checkWidth() {
  isDesktop.value = window.innerWidth >= 1024
}

function navigationHandler() {
  emit('close-navigation', false)
}

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
})
</script>
