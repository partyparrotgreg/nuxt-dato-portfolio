<template>
  <footer class="p-8 sm:p-16 bg-primary text-white space-y-16">
    <div class="text-white ">
      <div>
        <h2>{{ footer.callout }}</h2>
        <div v-html="footer.title" class="text-2xl font-medium"></div>
      </div>
      <div class="space-x-4 mt-8">
        <a
          v-for="link in footer.socialMedia"
          :key="link.id"
          :href="link.url"
          class="hover:text-black"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
    <div class="text-xs font-light opacity-75 space-y-2">
      <p>Made with Vue.js &amp; DatoCMS</p>
      <p>
        Copyright © {{ getYear }} Grzegorz Hadala, All assets, artworks, and
        screenshots are copyright of their respective owners.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer',
  props: ['footer'],
  computed: {
    getYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style></style>
