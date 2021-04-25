<template>
  <section class="px-8 sm:px-16 py-8 sm:py-16 bg-gray-50">
    <figure class="image relative">
      <datocms-image :data="slice.image.responsiveImage" />
      <figcaption
        class="max-w-prose text-sm text-center mx-auto sticky bottom-0 bg-gray-50 py-2 px-4 bg-opacity-80"
        v-html="slice.description"
        v-if="slice.description"
      ></figcaption>
    </figure>
  </section>
</template>

<script>
export default {
  name: 'slice-screenshot',
  props: ['slice']
}
</script>

<style></style>
