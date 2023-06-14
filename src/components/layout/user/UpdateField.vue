<template>
  <div class="hidden md:flex gap-9" v-if="nameHandler.edit">
    <base-input
      id="new_name"
      label="New Name"
      class="w-full"
      v-model="nameHandler.value"
      :value="nameHandler.value"
      :error="error.name"
      rules="required|min:3|max:15|alpha_num"
      placeholder="Enter new username"
      @update-prop="error.name = ''"
    ></base-input>
  </div>
</template>
<script setup>
import BaseInput from '@/components/ui/form/BaseInput.vue'
import MainCard from '@/components/ui/MainCard.vue'
import BaseButton from '@/components/ui/form/BaseButton.vue'
</script>
