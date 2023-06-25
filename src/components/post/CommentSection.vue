<template>
  <section
    class="flex flex-col text-white gap-3 border-b pt-4 pb-6 md:pt-6 border-[#efefef4d] py-3"
  >
    <div class="flex-shrink-0 row-span-2 flex items-center gap-4">
      <div
        class="flex justify-center bg-[#D9D9D9] w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full"
      >
        <img :src="avatar" alt="profile" class="object-cover" />
      </div>
      <h5>{{ name }}</h5>
    </div>
    <div class="lg:pl-16">
      <p>
        {{ comment }}
      </p>
    </div>
  </section>
</template>
<script setup>
const props = defineProps({
  comment: { type: String, required: true },
  avatar: { type: String, required: true },
  name: { type: String, required: true },
})

const avatar = `${import.meta.env.VITE_BASE_URL}${
  props.avatar.includes('default') ? '' : 'storage/'
}${props.avatar}`
</script>
