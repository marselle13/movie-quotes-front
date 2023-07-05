<template>
  <div class="flex justify-center relative z-40">
    <div
      class="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-0% from-[#181623] via-[#191725] via-50% to-[#0D0B14] to-[95%] opacity-70 z-1 backdrop-blur-sm"
      @click="emit('close')"
    ></div>
    <main-card
      class="w-full fixed top-0 lg:top-20 max-w-[940px] h-screen lg:max-h-[768px] overflow-y-auto scrollbar-hide"
    >
      <div
        class="flex items-center justify-between border-b border-[#EFEFEF] border-opacity-30 p-8"
      >
        <div class="flex items-center" v-if="quoteId">
          <button @click="emit('edit-quote')" v-if="!edit">
            <EditIcon />
          </button>
          <div class="h-4 border border-[#6C757D] mx-4" v-if="!edit"></div>
          <button @click="remove(quoteId)">
            <DeleteIcon />
          </button>
        </div>
        <div class="w-full flex flex-col items-center">
          <h3 class="text-white">{{ title }}</h3>
        </div>
        <button @click="emit('close')">
          <close-icon class="self-end" />
        </button>
      </div>
      <section class="p-8">
        <div class="flex gap-4 items-center">
          <div class="flex w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden">
            <img :src="userStore.userData.avatar" alt="avatar" class="object-cover" />
          </div>
          <h5 class="text-white">{{ userStore.userData.name }}</h5>
        </div>
        <slot></slot>
      </section>
    </main-card>
  </div>
</template>
<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { useUserStore } from '@/stores/userStore'
import EditIcon from '@/components/icons/EditIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import { useMovieStore } from '@/stores/movieStore'

defineProps({
  quoteId: { type: Number, required: false },
  title: { type: String, required: true },
  edit: { type: Boolean, required: false },
})

const emit = defineEmits(['close', 'edit-quote'])

const userStore = useUserStore()
const movieStore = useMovieStore()

async function remove(quoteId) {
  try {
    await useMovieStore().removeQuoteFromMovie(quoteId, movieStore.getMovieDescription.id)
    emit('close')
  } catch (err) {
    //Err
  }
}
</script>
