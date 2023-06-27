<template>
  <section class="flex mt-6 gap-3 md:gap-6 items-center justify-start">
    <div
      class="w-10 h-10 md:w-12 md:h-12 flex justify-center flex-shrink-0 bg-[#D9D9D9] rounded-full overflow-hidden"
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
import { useUserStore } from '@/stores/userStore'
import { usePostStore } from '@/stores/postStore'
import { useI18n } from 'vue-i18n'
import { Form } from 'vee-validate'

const props = defineProps({
  postId: { type: Number, required: true },
  loaded: { type: Boolean, required: true },
})

const userStore = useUserStore()
const postStore = usePostStore()
const { t } = useI18n()

async function onSubmit(values, { resetForm }) {
  const { comment } = values
  if (comment) {
    try {
      await postStore.newComment(props.postId, comment, props.loaded)
      resetForm()
    } catch (err) {
      //Err
    }
  }
}
</script>
