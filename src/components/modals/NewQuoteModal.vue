<template>
  <div class="flex justify-center lg:mr-10 relative z-40">
    <main-card class="w-full fixed top-0 md:top-20 max-w-[940px] max-h-[768px] overflow-y-auto">
      <div class="flex items-center justify-center border-b border-[#EFEFEF] border-opacity-30 p-8">
        <div class="w-full flex flex-col items-center">
          <h3 class="text-white">Write New Quote</h3>
        </div>
        <button>
          <close-icon class="self-end" @click="emit('close')" />
        </button>
      </div>
      <section class="p-8">
        <div class="flex gap-4 items-center">
          <div class="flex w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden">
            <img :src="userStore.userData.avatar" alt="avatar" class="object-cover" />
          </div>
          <h5 class="text-white">{{ userStore.userData.name }}</h5>
        </div>
        <Form class="flex flex-col mt-10 gap-6">
          <base-textarea type="Eng" placeholder="Start create new quote" class="order-3" />
          <base-textarea type="ქარ" placeholder="ახალი ციტატა" class="order-4" />
          <base-upload class="order-2 lg:order-4" />
          <div class="lg:order-5 order-1">
            <base-dropdown background width="w-full h-full">
              <template #dropdownButton
                ><div class="flex items-center justify-between text-white text-left">
                  <div class="flex justify-center items-end gap-4">
                    <MoviesIcon />
                    <h4>Choose movie</h4>
                  </div>
                  <LanguageDropdownIcon />
                </div>
              </template>
              <template #dropdown>
                <li class="p-4 hover:bg-gray-900">dropdown</li>
              </template>
            </base-dropdown>
          </div>
          <base-button class="w-full p-2 order-5">post</base-button>
        </Form>
      </section>
    </main-card>
  </div>
</template>
<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { useUserStore } from '@/stores/userStore'
import { Form } from 'vee-validate'
import LanguageDropdownIcon from '@/components/icons/DropdownIcon.vue'
import MoviesIcon from '@/components/icons/MoviesIcon.vue'

const userStore = useUserStore()
const emit = defineEmits(['close'])
</script>
<style scoped>
.backdrop {
  background: linear-gradient(225deg, #181623 0.07%, #191725 50.66%, #0d0b14 96.88%);
}
</style>
