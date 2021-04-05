<template>
  <section class="px-8 sm:px-16 py-8 sm:py-16 bg-gray-50">
    <figure class="image">
      <datocms-image :data="slice.image.responsiveImage" />
      <figcaption class="w-full text-center p-2">
        {{
          slice.image.alt ||
            slice.image.description ||
            slice.image.responsiveImage.title
        }}
      </figcaption>
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
