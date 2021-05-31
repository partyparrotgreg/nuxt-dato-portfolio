<template>
  <div class="prose 2xl:prose-xl mx-auto px-8 sm:px-16 mb-8">
    <pre><code :class="className">{{ slice.code }}</code></pre>
  </div>
</template>

<script>
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

export default {
  name: 'slice-code',
  props: ['slice'],
  mounted() {
    Prism.highlightAll()
  },
  computed: {
    className() {
      return `language-${this.slice.language}`
    }
  }
}
</script>

<style></style>
