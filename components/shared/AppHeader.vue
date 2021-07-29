<template>
  <header
    class="p-0 bg-white sm:bg-transparent px-0 sm:px-6 lg:px-12 hover:bg-white fixed left-0 right-0 bottom-0 sm:top-0 w-full sm:h-20 flex align-middle justify-center items-center transition-none"
    style="z-index: 999;"
  >
    <nav class="flex flex-row justify-between font-medium w-full">
      <h2 class="hidden sm:inline">Grzegorz Hadala – Product Designer</h2>
      <div
        class="space-x-0 sm:space-x-4 flex justify-between sm:justify-end sm:items-end sm:text-right flex-grow sm:flex-shrink sm:inline"
      >
        <nuxt-link
          class="py-4 text-sm sm:text-base sm:p-0 flex-grow sm:flex-shrink text-center sm:text-left"
          to="/"
          >Projects</nuxt-link
        >
        <!-- <nuxt-link
          class="py-4 text-sm sm:text-base sm:p-0 flex-grow sm:flex-shrink text-center sm:text-left"
          to="/braindump"
          >Braindump</nuxt-link
        > -->
        <nuxt-link
          class="py-4 text-sm sm:text-base sm:p-0 flex-grow sm:flex-shrink text-center sm:text-left"
          to="/blog"
          >Blog</nuxt-link
        >
        <nuxt-link
          class="py-4 text-sm sm:text-base sm:p-0 flex-grow sm:flex-shrink text-center sm:text-left"
          to="/about"
          >About</nuxt-link
        >
      </div>
    </nav>
  </header>
</template>

<script>
const OFFSET = 80
export default {
  name: 'app-header',
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0
    }
  },
  methods: {
    onScroll() {
      if (window.pageYOffset < 0) {
        return
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) {
        return
      }
      this.showNavbar = window.pageYOffset < this.lastScrollPosition
      this.lastScrollPosition = window.pageYOffset
    }
  },
  mounted() {
    this.lastScrollPosition = window.pageYOffset
    window.addEventListener('scroll', this.onScroll)
    const viewportMeta = document.createElement('meta')
    viewportMeta.name = 'viewport'
    viewportMeta.content = 'width=device-width, initial-scale=1'
    document.head.appendChild(viewportMeta)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style></style>
