<template>
  <new-container :title="t('new_movie')" @close="emit('close')">
    <Form class="space-y-6 mt-7">
      <base-input id="nameEng" placeholder="Movie name" mode="flat" lang="Eng" />
      <base-input id="nameGeo" placeholder="ფილმის სახელი" mode="flat" lang="Geo" />
      <base-dropdown width="w-full border border-[#6C757D]  py-2 px-4 rounded text-left">
        <template #dropdownButton>
          <div class="flex justify-between items-center">
            <h4 class="text-[#6C757D]">Film Genre</h4>
            <LanguageDropdownIcon />
          </div>
        </template>
        <template #dropdown>
          <li class="px-4">hello</li>
        </template>
      </base-dropdown>
      <base-input id="year" placeholder="წელი/year" mode="flat" />
      <base-input id="directorEng" placeholder="Director" mode="flat" lang="Eng" />
      <base-input id="directorGeo" placeholder="რეჟისორი" mode="flat" lang="Geo" />
      <base-textarea id="descriptionEng" placeholder="Movie Description" lang="Eng" />
      <base-textarea id="descriptionGeo" placeholder="ფილმის აღწერა" lang="Geo" />
      <base-upload id="image" />
      <base-button class="w-full py-2">Add Movie</base-button>
    </Form>
  </new-container>
</template>
<script setup>
import NewContainer from '@/components/layout/NewContainer.vue'
import BaseInput from '@/components/ui/form/BaseInput.vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'vee-validate'
import BaseTextarea from '@/components/ui/form/BaseTextarea.vue'
import BaseUpload from '@/components/ui/form/BaseUpload.vue'
import BaseButton from '@/components/ui/form/BaseButton.vue'
import BaseDropdown from '@/components/ui/form/BaseDropdown.vue'
import LanguageDropdownIcon from '@/components/icons/DropdownIcon.vue'

const emit = defineEmits(['close'])

const { t } = useI18n()
</script>
