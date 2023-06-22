<template>
  <section class="flex mt-8 lg:mx-16">
    <transition name="slide">
      <aside
        v-show="navigation || isDesktop"
        class="inline-flex flex-col p-11 lg:p-0 z-30 flex-shrink-0 max-w-[400px] w-11/12 h-screen fixed left-0 bg-[#11101A] lg:bg-transparent lg:static top-0 backdrop-blur-2xl lg:backdrop-blur-0"
      >
        <div class="inline-flex items-center gap-6">
          <div
            class="flex justify-center bg-[#D9D9D9] w-16 h-16 rounded-full overflow-hidden"
            :class="activeClass"
          >
            <img :src="userStore.userData.avatar" alt="profile" class="object-cover" />
          </div>

          <div>
            <h4 class="text-white">{{ userStore.userData.name }}</h4>
            <router-link :to="{ name: 'profile' }" class="text-xs text-[#CED4DA]">{{
              t('edit_profile')
            }}</router-link>
          </div>
        </div>
        <nav class="block pt-10">
          <ul class="space-y-10">
            <li>
              <router-link :to="{ name: 'news-feed' }" class="inline-flex">
                <div class="flex items-center text-white gap-10">
                  <FeedIcon :name="route.name" />
                  <p>{{ t('news_feed') }}</p>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="#" class="inline-flex">
                <div class="flex items-center text-white gap-10">
                  <MoviesIcon />
                  <p>{{ t('movies_list') }}</p>
                </div>
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>
    </transition>
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
import { useI18n } from 'vue-i18n'

defineProps({
  width: { type: String, required: false },
  navigation: { type: Boolean, required: false },
})

const emit = defineEmits(['close-navigation'])
const route = useRoute()
const userStore = useUserStore()
const { t } = useI18n()

const isDesktop = ref(false)
function checkWidth() {
  isDesktop.value = window.innerWidth >= 1024
}
const activeClass = computed(() => {
  return route.name === 'profile' && ' border-2 border-[#E31221]'
})

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
})
</script>
<style scoped>
@media (max-width: 1028px) {
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  .slide-enter-to {
    transform: translateX(0%);
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(-100%);
  }
}
</style>
