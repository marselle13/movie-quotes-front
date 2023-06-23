<template>
  <Field :name="id" :rules="rules" v-slot="{ handleChange }">
    <div
      class="relative flex justify-between lg:justify-start items-center border border-[#6C757D] rounded bg-transparent text-white gap-8 py-6"
    >
      <div
        class="flex justify-center bg-[#D9D9D9] w-80 h-40 ml-4"
        v-if="imageHandler && !resetImage"
      >
        <img :src="imageHandler" alt="image" class="object-cover" />
      </div>
      <div class="flex items-center gap-2 mx-4" v-else>
        <CameraIcon />
        <p class="sm:block lg:hidden hidden">Upload image</p>
        <p class="hidden lg:block">Drag & drop your image here or</p>
      </div>
      <input id="image" type="file" class="sr-only" @input="uploadImage($event, handleChange)" />
      <label for="image" class="bg-[#9747ff7a] text-white p-2 cursor-pointer flex-shrink-0 mr-4"
        >Choose File</label
      >
      <ErrorMessage :name="id" class="absolute text-xs -bottom-5 text-[#DC3545]"></ErrorMessage>
    </div>
  </Field>
</template>
<script setup>
import CameraIcon from '@/components/icons/CameraIcon.vue'
import { Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'

defineProps({
  id: { type: String, require: true },
  rules: { type: String, required: false },
  resetImage: { type: Boolean, required: false },
})

const imageHandler = ref('')

const emit = defineEmits(['show-image'])

function uploadImage(event, handleChange) {
  const image = event.target.files[0]
  handleChange(image)
  imageHandler.value = URL.createObjectURL(image)
  emit('show-image')
}
</script>
