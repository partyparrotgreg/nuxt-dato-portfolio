<template>
  <footer
    class="pt-8 sm:pt-16 px-8 sm:px-16 bg-black text-white space-y-24 sm:pb-16 pb-24 2xl:p-32"
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
        class="flex sm:flex-row flex-col space-y-2 sm:space-y-0 sm:space-x-8 mt-8"
      >
        <a
          v-for="link in footer.socialMedia"
          :key="link.id"
          :href="link.url"
          target="_blank"
          class="hover:text-primary"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
    <div class="text-xs font-light space-y-2">
      <p>
        Made with <a target="_blank" href="https://nuxtjs.org/">Nuxt.js</a>,
        <a target="_blank" href="https://tailwindcss.com/">TailwindCSS</a> &amp;
        <a target="_blank" href="https://www.datocms.com/">DatoCMS</a>
      </p>
      <p class="opacity-50">
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
