<template>
  <section
    class="flex flex-col text-white gap-3 border-b pt-4 pb-6 md:pt-6 border-[#efefef4d] py-3"
  >
    <div class="flex-shrink-0 row-span-2 flex items-center gap-4">
      <img :src="ProfilePicture" alt="profile" class="w-10 h-10 md:w-12 md:h-12" />
      <h5>Nini Baldadze</h5>
    </div>
    <div class="lg:pl-16">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel massa
        facilisis consequat elit morbi convallis convallis. Volutpat vitae et nisl et. Adipiscing
        enim integer mi leo nisl. Arcu vitae mauris odio eget.
      </p>
    </div>
  </section>
</template>
<script setup>
import ProfilePicture from '@/assets/Ellipse 1.png'
</script>
