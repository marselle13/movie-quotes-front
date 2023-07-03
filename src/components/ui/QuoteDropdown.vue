<template>
  <base-dropdown
    dropdown-width="absolute -left-[13rem] -top-[12rem] lg:left-0 lg:top-6 w-[14rem] flex flex-col items-start space-y-8 py-8 px-10 "
  >
    <template #dropdownButton>
      <QuoteIcon />
    </template>
    <template #dropdown>
      <li class="flex gap-2 hover:opacity-80" @click="emit('view-quote', quoteId)">
        <ViewPostIcon />
        <p>View Quote</p>
      </li>
      <li class="flex gap-2 hover:opacity-80">
        <EditIcon />
        <p>Edit</p>
      </li>
      <li class="flex gap-2 hover:opacity-80" @click="deleteQuote(quoteId, movieId)">
        <DeleteIcon />
        <p>Delete</p>
      </li>
    </template>
  </base-dropdown>
</template>
<script setup>
import EditIcon from '@/components/icons/EditIcon.vue'
import QuoteIcon from '@/components/icons/quoteIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import ViewPostIcon from '@/components/icons/ViewPostIcon.vue'
import { useMovieStore } from '@/stores/movieStore'

const emit = defineEmits(['view-quote'])

defineProps({
  quoteId: { type: Number, required: true },
  movieId: { type: Number, required: true },
})

async function deleteQuote(quoteId, movieId) {
  try {
    await useMovieStore().removeQuoteFromUserMovie(quoteId, movieId)
  } catch (err) {
    //Err
  }
}
</script>
