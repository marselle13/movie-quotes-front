<template>
  <section class="block md:hidden">
    <div
      class="backdrop fixed top-0 left-0 w-full h-full -z-10 mx-auto"
      @click="emit('close-modal')"
    ></div>
    <div
      class="fixed confirm text-white text-center top-40 left-6 z-30 w-11/12 mx-auto before:absolute before:w-full before:h-full before:top-0 before:left-0 before:opacity-30 before:backdrop-blur-2xl before:rotate-180 before:rounded-lg before:-z-10"
    >
      <div class="pt-16 pb-12 px-10 border-b border-[#ced4da80]">
        <h4>{{ info }}</h4>
      </div>
      <div class="flex justify-between w-full p-8">
        <base-button mode="transparent" type="button" @click="emit('close-modal')">{{
          t('cancel')
        }}</base-button>
        <base-button class="p-2" @click="emit('confirm')">{{ t('confirm') }}</base-button>
      </div>
    </div>
  </section>
</template>
<script setup>
import BaseButton from '@/components/ui/form/BaseButton.vue'
import { useI18n } from 'vue-i18n'

defineProps({ info: { type: String, required: true } })
const { t } = useI18n()
const emit = defineEmits(['close-modal', 'confirm'])
</script>
<style scoped>
.backdrop {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
  opacity: 0.7;
}
.confirm:before {
  background: linear-gradient(
    112.94deg,
    rgba(239, 239, 239, 0.3) -1.81%,
    rgba(239, 239, 239, 0.00514528) 102.5%,
    rgba(1, 1, 1, 0.00260417) 102.51%,
    rgba(239, 239, 239, 0.05) 102.52%
  );
}
</style>
