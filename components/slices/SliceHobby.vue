<template>
  <page-section>
    <div class="md:flex md:flex-col md:space-y-24">
      <div class="w-full">
        <bit-heading
          class="mb-8"
          :title="slice.title"
          :callout="slice.callout"
          :description="slice.description"
        ></bit-heading>
      </div>
      <div class="w-full">
        <div
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr"
        >
          <div
            class="rounded-2xl aspect-w-1 aspect-h-1 overflow-hidden"
            v-for="image in slice.images"
            :key="image.id"
          >
            <img
              :src="image.responsiveImage.src"
              :srcSet="image.responsiveImage.srcSet"
              class="object-cover"
              draggable="false"
              :width="image.responsiveImage.width"
              :height="image.responsiveImage.height"
              :alt="image.responsiveImage.alt"
              :title="image.responsiveImage.title"
            />
          </div>
        </div>
      </div>
    </div>
  </page-section>
</template>

<script>
export default {
  props: ["slice"],
  data() {
    return {};
  }
};
</script>

<style></style>
