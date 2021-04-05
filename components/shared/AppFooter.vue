<template>
  <footer class="p-8 sm:p-16 bg-primary text-white mt-24">
    <div class="prose text-white">
      <h2>Say hello!</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum ab magni
        rerum odit? Fugit ea eius, soluta rerum id ut quam in dolorem quidem
        cupiditate excepturi eaque! Distinctio, molestiae magnam!
      </p>
      <a href="https://linkedin.com"></a>
    </div>
    <div class="mt-8">
      <small
        >Design, code, and copy by Grzegorz Hadala. <br />
        Copyright © {{ getYear }} Grzegorz Hadala, All assets, arworks, and
        screenshots are copyright of their respective owners.</small
      >
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer',
  computed: {
    getYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style></style>
