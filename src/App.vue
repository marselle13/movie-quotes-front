<template>
  <router-view></router-view>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

router.beforeResolve(async (to) => {
  const { authUser } = userStore
  if (authUser === null) {
    await userStore.data()
  }
  const updateAuth = userStore.authUser

  if (updateAuth && to.meta.user === 'guest') {
    return { name: 'forbidden', query: { page: 'news-feed' } }
  }

  if (!updateAuth && to.meta.user === 'auth') {
    return { name: 'forbidden', query: { page: 'landing' } }
  }
})
</script>
