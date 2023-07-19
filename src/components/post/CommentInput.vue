<template>
  <section class="flex mt-6 gap-3 md:gap-6 items-center justify-start">
    <div
      class="w-10 h-10 md:w-12 md:h-12 flex justify-center flex-shrink-0 bg-light-gray rounded-full overflow-hidden"
    >
      <img :src="userStore.userData.avatar" alt="profile" class="object-cover" />
    </div>
    <Form @submit="onSubmit" class="w-full">
      <base-input
        :placeholder="t('write_comment')"
        id="comment"
        class="w-full"
        mode="dark"
        autocomplete="off"
      ></base-input>
    </Form>
  </section>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { Form } from 'vee-validate'
import { usePostService } from '@/services/postService'

const props = defineProps({
  postId: { type: Number, required: true },
})

const userStore = useUserStore()
const postService = usePostService()
const { t } = useI18n()

async function onSubmit(values, { resetForm }) {
  const { comment } = values
  if (comment) {
    try {
      await postService.addNewComment(props.postId, comment)
      resetForm()
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
