<template>
  <TheHeader :background="false" />
  <section class="grid text-center content-center justify-items-center py-64 space-y-6">
    <h1 class="text-6xl leading-[90px] text-[#DDCCAA]">
      Find any quote in <br />
      millions of movie lines
    </h1>
    <base-button class="w-32 py-2" :animation="true">Get started</base-button>
  </section>
  <quotes-container :image="interstellarImage">
    <template #quote>You have to leave something behind to go forward</template>
    <template #movie> Interstellar, 2014 </template>
  </quotes-container>
  <quotes-container :image="tanenbaumImage" backdrop="backdrop-half">
    <template #quote>
      I think we’re just gonna have to be secretly in love with each other and leave it
      that</template
    >
    <template #movie>The Royal Tanenbaum,2001 </template>
  </quotes-container>
  <quotes-container :image="lotrImage">
    <template #quote> Death Is Just Another Path, One That We All Must Take. </template>
    <template #movie>The Lord of the Rings,2001 </template>
  </quotes-container>
</template>

<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import interstellarImage from '@/assets/interstellar.png'
import tanenbaumImage from '@/assets/tanenbaum.png'
import lotrImage from '@/assets/lotr.png'
import QuotesContainer from '@/components/layout/QuotesContainer.vue'
</script>
