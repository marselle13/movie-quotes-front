<template>
  <Field :name="id" :rules="rules" v-slot="{ handleChange }">
    <div
      class="relative flex justify-between lg:justify-start items-center border rounded bg-transparent text-white lg:gap-2 py-6"
      @dragenter.prevent="activeDrop = true"
      @dragleave.prevent="activeDrop = false"
      @dragover.prevent="activeDrop = true"
      @drop.prevent="uploadImage($event, handleChange)"
      :class="[activeDrop ? 'border-green-500' : 'border-[#6C757D]']"
    >
      <div
        class="flex justify-center bg-[#D9D9D9] max-w-80 h-40 ml-4 w-full"
        v-if="(imageHandler || uploadedImage) && !resetImage"
      >
        <img :src="imageHandler || uploadedImage" alt="image" class="object-cover" />
      </div>
      <div class="relative w-full px-4">
        <div
          class="flex justify-between lg:justify-start items-center gap-2"
          :class="{ 'flex-col space-y-4': imageHandler || uploadedImage }"
        >
          <p
            v-if="imageHandler || uploadedImage"
            class="uppercase text-[#DDCCAA] text-xs md:text-base"
          >
            {{ t('replace_photo') }}
          </p>
          <div class="flex justify-between items-center gap-2">
            <CameraIcon
              class="md:block lg:block"
              :class="{ hidden: imageHandler || uploadedImage }"
            />
            <p class="hidden md:block lg:hidden">
              {{ t('upload') }}
            </p>
            <p class="lg:block hidden">{{ t('drag_drop') }}</p>
          </div>
          <div>
            <input
              id="image"
              type="file"
              class="sr-only"
              @input="uploadImage($event, handleChange)"
            />
            <label for="image" class="bg-[#9747ff7a] text-white p-2 cursor-pointer flex-shrink-0">{{
              t('choose_file')
            }}</label>
          </div>
        </div>
      </div>
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
  modelValue: { type: String, required: false },
  resetImage: { type: Boolean, required: false },
  uploadedImage: { type: String, required: false },
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
