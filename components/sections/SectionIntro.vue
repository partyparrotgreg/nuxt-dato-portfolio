<template>
  <div class="section-intro p-8 sm:p-16 2xl:p-32">
    <div class="lg:flex lg:flex-row lg:space-x-24">
      <div class="w-full lg:w-1/2">
        <div>
          <small class="opacity-50">{{ slice.callout }}</small>
          <h2 class="text-xl sm:text-3xl font-semibold -mx-1 mb-2">
            {{ slice.title }}
          </h2>
          <div v-html="slice.description" class="prose mb-6 sm:mb-0"></div>
        </div>
      </div>
      <div class="w-full lg:w-1/2">
        <div class="aspect-w-5 aspect-h-3 overflow-hidden">
          <figure class="rounded-2xl overflow-hidden">
            <datocms-image :data="slice.image.responsiveImage" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'section-intro',
  props: ['slice']
}
</script>

<style></style>
