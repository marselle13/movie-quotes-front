<template>
  <Field :name="id" :rules="rules" v-slot="{ handleChange }">
    <div
      class="relative flex justify-between lg:justify-start items-center border rounded bg-transparent text-white gap-8 lg:gap-2 py-6"
      @dragenter.prevent="activeDrop = true"
      @dragleave.prevent="activeDrop = false"
      @dragover.prevent="activeDrop = true"
      @drop.prevent="uploadImage($event, handleChange)"
      :class="[activeDrop ? 'border-green-500' : 'border-[#6C757D]']"
    >
      <div
        class="flex justify-center bg-[#D9D9D9] w-80 h-40 ml-4"
        v-if="imageHandler && !resetImage"
      >
        <img :src="imageHandler" alt="image" class="object-cover" />
      </div>
      <div class="flex items-center gap-2 ml-4" v-else>
        <CameraIcon />
        <p class="sm:block lg:hidden hidden">{{ t('upload') }}</p>
        <p class="hidden lg:block">{{ t('drag_drop') }}</p>
      </div>
      <input id="image" type="file" class="sr-only" @input="uploadImage($event, handleChange)" />
      <label for="image" class="bg-[#9747ff7a] text-white p-2 cursor-pointer flex-shrink-0 mr-4">{{
        t('choose_file')
      }}</label>
      <ErrorMessage
        :name="id"
        class="absolute -bottom-4 text-[#DC3545] text-[9px] md:text-[10px]"
      ></ErrorMessage>
    </div>
  </Field>
</template>
<script setup>
import CameraIcon from '@/components/icons/CameraIcon.vue'
import { Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  id: { type: String, require: true },
  rules: { type: String, required: false },
  resetImage: { type: Boolean, required: false },
})

const { t } = useI18n()
const imageHandler = ref('')
const activeDrop = ref(false)

const emit = defineEmits(['show-image'])
function uploadImage(event, handleChange) {
  activeDrop.value = false
  const image = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0]
  if (image.size > 2000000 || !image.type.includes('image')) return
  handleChange(image)
  imageHandler.value = URL.createObjectURL(image)
  emit('show-image')
}
</script>
