<template>
  <page-section>
    <bit-heading
      :title="slice.title"
      :callout="slice.callout"
      :description="slice.description"
      class="mb-16"
    ></bit-heading>
    <list-experiences></list-experiences>
  </page-section>
</template>

<script>
export default {
  props: ["slice"]
};
</script>

<style></style>
