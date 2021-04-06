<template>
  <section class="px-8 sm:px-16 py-8 sm:py-16 bg-gray-50">
    <figure class="image">
      <datocms-image :data="slice.image.responsiveImage" />
      <figcaption
        class="max-w-prose text-center p-2 mx-auto"
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
