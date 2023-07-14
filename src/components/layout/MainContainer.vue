<template>
  <TheHeader @open-navigation="navigationHandler" />
  <section class="flex mt-8 lg:mx-16">
    <div
      class="fixed left-0 top-0 w-full h-full z-50"
      @click="navigation = false"
      v-if="navigation"
    ></div>
    <transition name="slide">
      <aside
        v-show="navigation || isDesktop"
        class="z-50 lg:z-auto lg:sticky lg:top-24 inline-flex flex-col p-11 lg:p-0 flex-shrink-0 max-w-[400px] w-11/12 h-screen fixed left-0 bg-[#11101A] lg:bg-transparent top-0 backdrop-blur-2xl lg:backdrop-blur-0"
      >
        <div class="inline-flex items-center gap-6 relative">
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
              <router-link :to="{ name: 'movie-list' }" class="inline-flex">
                <div class="flex items-center text-white gap-10">
                  <MoviesIcon :name="route.name" />
                  <p>{{ t('movies_list') }}</p>
                </div>
              </router-link>
            </li>
            <li class="md:hidden flex items-center gap-8">
              <base-dropdown button-width="w-[4rem]" dropdown-width="w-[6.5rem] top-10">
                <template #dropdownButton>
                  <div class="flex gap-2.5 items-center">
                    <p class="text-white">{{ locale === 'en' ? 'Eng' : 'Geo' }}</p>
                    <LanguageDropdown />
                  </div>
                </template>
                <template #dropdown>
                  <ul class="cursor-pointer py-2">
                    <li>
                      <p class="px-4 py-2 hover:opacity-80" @click="changeLanguage('en')">
                        {{ t('english') }}
                      </p>
                    </li>
                    <li>
                      <p class="px-4 py-2 hover:opacity-80" @click="changeLanguage('ka')">
                        {{ t('georgian') }}
                      </p>
                    </li>
                  </ul>
                </template>
              </base-dropdown>
              <base-button mode="flat" class="w-32 py-2" @click="logout">{{
                t('log_out')
              }}</base-button>
            </li>
          </ul>
        </nav>
      </aside>
    </transition>
    <main :class="width">
      <slot></slot>
    </main>
  </section>
</template>
<script setup>
import MoviesIcon from '@/components/icons/MoviesIcon.vue'
import FeedIcon from '@/components/icons/FeedIcon.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useI18n } from 'vue-i18n'
import TheHeader from '@/components/TheHeader.vue'
import LanguageDropdown from '@/components/icons/DropdownIcon.vue'
import { setLocale } from '@vee-validate/i18n'

defineProps({
  width: { type: String, required: false },
})

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { t, locale } = useI18n()

const navigation = ref(false)
const isDesktop = ref(false)

function navigationHandler(value) {
  navigation.value = value
}
function checkWidth() {
  isDesktop.value = window.innerWidth >= 1024
}
const activeClass = computed(() => {
  return route.name === 'profile' && ' border-2 border-[#E31221]'
})

async function logout() {
  try {
    await userStore.logout()
    await router.replace({ name: 'landing' })
  } catch (err) {
    //Error
  }
}

function changeLanguage(value) {
  localStorage.setItem('locale', value)
  locale.value = value
  document.documentElement.lang = value
  setLocale(value)
}

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
