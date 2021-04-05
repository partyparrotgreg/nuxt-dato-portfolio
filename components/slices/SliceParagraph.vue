<template>
  <section><div class="prose mx-auto" v-html="slice.content"></div></section>
</template>

<script>
export default {
  name: 'slice-paragraph',
  props: ['slice']
}
</script>

<style></style>
