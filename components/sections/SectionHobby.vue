<template>
  <div class="section-hobby p-8 sm:p-16 2xl:p-32">
    <div class="md:flex md:flex-col md:space-y-24">
      <div class="max-w-prose">
        <small class="opacity-50">{{ slice.callout }}</small>
        <h2 class="text-xl sm:text-3xl font-semibold -mx-1 mb-2">
          {{ slice.title }}
        </h2>
        <div v-html="slice.description"></div>
      </div>
      <div>
        <div
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr"
        >
          <div v-for="image in slice.images" :key="image.id">
            <figure class="image rounded-xl overflow-hidden">
              <datocms-image :data="image.responsiveImage" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['slice']
}
</script>

<style></style>
