<template>
  <header
    class="p-0 bg-white sm:bg-transparent sm:p-8 2xl:p-16 hover:bg-white fixed bottom-0 sm:bottom-auto sm:top-0 w-full transition-all duration-300 ease-in-out"
    style="z-index: 999;"
  >
    <nav class="flex flex-row justify-between font-medium w-full">
      <h2 class="hidden sm:inline">Grzegorz Hadala</h2>
      <div
        class="space-x-0 sm:space-x-4 flex justify-between sm:justify-end sm:items-end sm:text-right flex-grow sm:flex-shrink sm:inline"
      >
        <nuxt-link
          class="p-4 sm:p-0 flex-grow sm:flex-shrink text-center sm:text-left"
          to="/"
          >Projects</nuxt-link
        >
        <nuxt-link
          class="p-4 sm:p-0 flex-grow sm:flex-shrink text-center sm:text-left"
          to="/blog"
          >Blog</nuxt-link
        >
        <nuxt-link
          class="p-4 sm:p-0 flex-grow sm:flex-shrink text-center sm:text-left"
          to="/about"
          >About</nuxt-link
        >
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'app-header'
}
</script>

<style></style>
