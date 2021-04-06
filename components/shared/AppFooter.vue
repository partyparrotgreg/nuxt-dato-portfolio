<template>
  <footer
    class="pt-8 sm:pt-16 px-8 sm:px-16 bg-primary text-white space-y-16 sm:pb-16 pb-24 2xl:p-32"
  >
    <div class="text-white ">
      <div>
        <small class="opacity-50">{{ footer.callout }}</small>
        <div
          v-html="footer.title"
          class="text-xl sm:text-3xl font-semibold -mx-1 mb-2"
        ></div>
      </div>
      <div
        class="flex sm:flex-row flex-col space-y-2 sm:space-y-0 sm:space-x-4 mt-8"
      >
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
        Copyright © {{ getYear }} Grzegorz Hadala. All assets, artworks, and
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
