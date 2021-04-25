<template>
  <div
    class="prose 2xl:prose-xl mx-auto px-8 sm:px-16"
    v-html="slice.content"
  ></div>
</template>

<script>
export default {
  name: 'slice-paragraph',
  props: ['slice']
}
</script>

<style></style>
