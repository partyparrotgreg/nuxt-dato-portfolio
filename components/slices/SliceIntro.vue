<template>
  <div>
    <page-section>
      <div class="lg:flex lg:flex-row lg:space-x-24">
        <div class="w-full lg:w-4/12">
          <bit-heading
            class="mb-8"
            :title="slice.title"
            :callout="slice.callout"
            :description="slice.description"
          ></bit-heading>
        </div>
        <div class="w-full lg:w-8/12">
          <div
            class="-mx-4 sm:-mx-8 rounded-2xl aspect-w-5 aspect-h-3 overflow-hidden"
          >
            <img
              :src="slice.image.responsiveImage.url"
              :srcset="slice.image.responsiveImage.srcSet"
              class="object-cover"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </page-section>
  </div>
</template>

<script>
export default {
  props: ["slice"]
};
</script>

<style></style>
