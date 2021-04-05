<template>
  <div class="prose mx-auto" v-html="slice.content"></div>
</template>

<script>
export default {
  name: 'slice-paragraph',
  props: ['slice']
}
</script>

<style></style>
