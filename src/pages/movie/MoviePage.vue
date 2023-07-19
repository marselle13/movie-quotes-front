<template>
  <MainContainer width="w-full mb-10">
    <teleport to="body">
      <transition
        name="new-quote"
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <QuoteModal
          :title="t('new_quote')"
          v-if="addQuote"
          @close="addQuote = false"
          :movie="movieStore.getCurrentMovie"
        />
        <MovieModal
          :title="t('edit_movie')"
          v-else-if="editMovie"
          @close="editMovie = false"
          :movie="movieStore.getCurrentMovie"
        />
        <PostModal
          :edit="edit"
          :post="postStore.getPosts"
          :load="load"
          v-else-if="viewQuote"
          @close="viewQuote = false"
          @edit="edit = true"
          @load="loadComments"
        />
      </transition>
    </teleport>
    <div class="lg:flex justify-between gap-4 hidden">
      <h2 class="text-white text-2xl">
        {{ t('movie_description') }}
      </h2>
    </div>
    <section class="flex flex-col lg:mt-8 w-full gap-4">
      <div class="flex 2xl:flex-row flex-col gap-6 2xl:h-[27rem] w-full h-full px-9 lg:px-0">
        <div
          class="lg:max-w-[50rem] bg-[#11101A] rounded-2xl overflow-hidden h-[18rem] md:h-[27rem] w-full"
        >
          <img
            :src="`${viteBaseUrl}storage/${movieStore.getCurrentMovie.image}`"
            alt="image"
            class="object-cover w-full object-center h-full"
          />
        </div>
        <div class="lg:max-w-[34rem] space-y-6 w-full">
          <div class="inline-flex flex-col md:flex-row w-full gap-6 justify-between items-start">
            <h2 class="w-full text-light-gold text-2xl font-medium break-all">
              {{ movieStore.getCurrentMovie.name[locale] }}
              <span>({{ movieStore.getCurrentMovie.year }})</span>
            </h2>
            <div class="flex items-center bg-midnight-gray rounded-xl py-2 px-7">
              <button @click="editMovie = true"><EditIcon /></button>
              <div class="h-4 border border-steel-gray mx-6"></div>
              <button @click="deleteMovie(movieStore.getCurrentMovie.id)">
                <DeleteIcon />
              </button>
            </div>
          </div>
          <ul class="inline-flex flex-wrap gap-2 w-full">
            <li
              v-for="genre in movieStore.getCurrentMovie.genres"
              :key="genre.id"
              class="text-center bg-steel-gray px-2 py-1 rounded"
            >
              <h4 class="text-white font-bold text-lg">{{ genre.name[locale] }}</h4>
            </li>
          </ul>
          <h4 class="text-lg text-white font-medium">
            <span class="text-light-silver font-bold">{{ t('director') }}</span
            >{{ movieStore.getCurrentMovie.director[locale] }}
          </h4>
          <p class="text-lg text-light-silver break-words lg:pb-10">
            {{ movieStore.getCurrentMovie.description[locale] }}
          </p>
        </div>
      </div>
      <div class="flex flex-col lg:max-w-[50rem] space-y-10 w-full">
        <div
          class="flex lg:flex-row flex-col-reverse lg:items-center mt-8 lg:mt-10 mb-4 px-9 lg:px-0"
        >
          <h5 class="text-white text-2xl">
            {{ t('quote_total', { amount: movieStore.getCurrentMovie.quotes.length }) }}
          </h5>
          <div class="lg:h-7 border border-steel-gray lg:mx-4 my-10 lg:my-0"></div>
          <base-button
            @click="addQuote = true"
            class="w-40 lg:w-auto flex items-center px-4 py-2 gap-2 md:whitespace-nowrap whitespace-normal"
            ><movie-add-icon />{{ t('add_quote') }}</base-button
          >
        </div>
        <main-card
          v-for="quote in movieStore.getCurrentMovie.quotes"
          class="py-6 px-8"
          :key="quote.id"
        >
          <div class="flex flex-col md:flex-row justify-between pb-6 border-b border-[#EFEFEF33]">
            <div class="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div class="rounded-sm md:w-[14rem] h-[8.75rem] w-full flex-shrink-0">
                <img
                  :src="`${viteBaseUrl}storage/${quote.thumbnail}`"
                  alt="thumbnail"
                  class="h-full object-cover w-full object-center"
                />
              </div>
              <p class="max-w-[400px] text-light-silver italic text-2xl break-words">
                "{{ quote.quote[locale] }}"
              </p>
            </div>
            <PostDropdown
              v-if="isDesktop"
              :quote-id="quote.id"
              :movie-id="movieStore.getCurrentMovie.id"
              @view-quote="postHandler"
              @edit-quote="postHandler"
            />
          </div>
          <div class="flex pt-6 gap-6 justify-between">
            <div class="flex gap-6">
              <div class="flex gap-3">
                <h5 class="text-white w-[1.4rem]">{{ quote.length.comments }}</h5>
                <CommentIcon />
              </div>
              <div class="flex gap-3">
                <h5 class="text-white w-[0.7rem]">{{ quote.length.likes }}</h5>
                <LikeIcon />
              </div>
            </div>
            <PostDropdown
              v-if="!isDesktop"
              :quote-id="quote.id"
              :movie-id="movieStore.getCurrentMovie.id"
              @view-quote="postHandler"
              @edit-quote="postHandler"
            />
          </div>
        </main-card>
      </div>
    </section>
  </MainContainer>
</template>
<script setup>
import MainContainer from '@/components/layout/MainContainer.vue'
import CommentIcon from '@/components/icons/CommenetIcon.vue'
import LikeIcon from '@/components/icons/LikeIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import MovieAddIcon from '@/components/icons/MovieAddIcon.vue'
import QuoteModal from '@/components/modals/QuoteModal.vue'
import MovieModal from '@/components/modals/MovieModal.vue'
import PostDropdown from '@/components/post/PostDropdown.vue'
import PostModal from '@/components/modals/PostModal.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMovieStore } from '@/stores/movie'
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import { usePostStore } from '@/stores/post'

const router = useRouter()
const { t, locale } = useI18n()
const movieStore = useMovieStore()
const postStore = usePostStore()
const viteBaseUrl = import.meta.env.VITE_BASE_URL

const addQuote = ref(false)
const editMovie = ref(false)
const viewQuote = ref(false)
const isDesktop = ref(false)
const load = ref(false)
const edit = ref(false)

async function deleteMovie(movieId) {
  try {
    await movieStore.removeMovie(movieId)
    await router.replace({ name: 'movie-list' })
  } catch (err) {
    console.error(err)
  }
}

async function postHandler(quoteId, editQuote) {
  try {
    await postStore.showPost(quoteId)
    viewQuote.value = true
    edit.value = editQuote
    localStorage.setItem('edit', edit.value)
  } catch (err) {
    console.error(err)
  }
}

function loadComments(isLoaded) {
  load.value = isLoaded
}

function checkWidth() {
  isDesktop.value = window.innerWidth >= 1028
}
onBeforeMount(async () => {
  const post = localStorage.getItem('modal')

  switch (post) {
    case 'quote':
      addQuote.value = true
      break
    case 'movie':
      editMovie.value = true
      break
  }
  if (post?.includes('post')) {
    await postHandler(post.slice(4), localStorage.getItem('edit') === 'true')
  }
})

onMounted(() => {
  window.Echo.channel('comments').listen('CommentSent', (data) => {
    if (postStore.getPosts.id === data.comment.quoteId) {
      postStore.newComment(data.comment.quoteId, data.comment, load.value)
    }
    movieStore.updateAmount(data.comment, 'comments')
  })
  window.Echo.channel('reactions').listen('ReactPost', (data) => {
    if (postStore.getPosts.id === data.reaction.quoteId) {
      postStore.postReaction(data.reaction)
    }
    movieStore.updateAmount(data.reaction, 'likes')
  })

  checkWidth()
  window.addEventListener('resize', checkWidth)
})

onBeforeUnmount(() => {
  window.Echo.leaveChannel('comments')
  window.Echo.leaveChannel('reactions')
})
</script>
