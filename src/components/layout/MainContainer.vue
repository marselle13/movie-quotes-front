<template>
  <section class="flex mt-8 lg:mx-16">
    <aside
      v-show="navigation || isDesktop"
      class="inline-flex flex-col p-11 lg:p-0 z-30 flex-shrink-0 max-w-[400px] w-11/12 h-screen fixed left-0 bg-[#11101A] lg:bg-transparent lg:static top-0 backdrop-blur-2xl lg:backdrop-blur-0"
    >
      <div class="inline-flex items-center gap-6">
        <img
          :src="userStore.userData.avatar"
          alt="profile"
          class="rounded-full w-[60px] h-[60px]"
          :class="activeClass"
        />
        <div>
          <h4 class="text-white">{{ userStore.userData.name }}</h4>
          <router-link :to="{ name: 'profile' }" class="text-xs text-[#CED4DA]"
            >Edit your profile</router-link
          >
        </div>
      </div>
      <div class="inline-flex flex-col pt-10 space-y-10">
        <router-link :to="{ name: 'news-feed' }">
          <div class="flex items-center text-white gap-10">
            <FeedIcon :name="route.name" />
            <p>News Feed</p>
          </div>
        </router-link>
        <router-link to="#">
          <div class="flex items-center text-white gap-10">
            <MoviesIcon />
            <p>List of movies</p>
          </div>
        </router-link>
      </div>
    </aside>
    <main :class="width" @click="emit('close-navigation', false)">
      <slot></slot>
    </main>
  </section>
</template>
<script setup>
import MoviesIcon from '@/components/icons/MoviesIcon.vue'
import FeedIcon from '@/components/icons/FeedIcon.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

defineProps({
  width: { type: String, required: false },
  navigation: { type: Boolean, required: false },
})

const emit = defineEmits(['close-navigation'])
const route = useRoute()
const userStore = useUserStore()

const isDesktop = ref(false)
function checkWidth() {
  isDesktop.value = window.innerWidth >= 1024
}
const activeClass = computed(() => {
  return route.name === 'profile' && ' border-4 border-[#E31221]'
})

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
})
</script>
