<template>
  <base-dropdown
    dropdown-width="absolute -left-[12rem] -top-[13rem] lg:left-0 lg:top-6 w-[14rem] flex flex-col items-start space-y-8 py-8 px-10"
  >
    <template #dropdownButton>
      <QuoteIcon />
    </template>
    <template #dropdown>
      <ul class="cursor-pointer space-y-8">
        <li class="flex gap-2 hover:opacity-80" @click="emit('view-quote', quoteId, false)">
          <ViewPostIcon />
          <p>{{ t('view_quote') }}</p>
        </li>
        <li class="flex gap-2 hover:opacity-80" @click="emit('edit-quote', quoteId, true)">
          <EditIcon />
          <p>{{ t('edit') }}</p>
        </li>
        <li class="flex gap-2 hover:opacity-80" @click="deleteQuote(quoteId, movieId)">
          <DeleteIcon />
          <p>{{ t('delete') }}</p>
        </li>
      </ul>
    </template>
  </base-dropdown>
</template>
<script setup>
import EditIcon from '@/components/icons/EditIcon.vue'
import QuoteIcon from '@/components/icons/quoteIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import ViewPostIcon from '@/components/icons/ViewPostIcon.vue'
import { useMovieStore } from '@/stores/movie'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['view-quote', 'edit-quote'])

defineProps({
  quoteId: { type: Number, required: true },
  movieId: { type: Number, required: true },
})

const { t } = useI18n()

async function deleteQuote(quoteId, movieId) {
  try {
    await useMovieStore().removeQuoteFromMovie(quoteId, movieId)
  } catch (err) {
    console.error(err)
  }
}
</script>
