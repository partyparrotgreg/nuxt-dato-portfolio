<template>
  <header
    class="p-4 bg-white sm:bg-transparent sm:p-8 2xl:p-16 hover:bg-white fixed bottom-0 sm:bottom-auto sm:top-0 w-full transition-all duration-300 ease-in-out z-50"
  >
    <nav class="flex flex-row justify-between font-medium">
      <h2>Grzegorz Hadala</h2>
      <div class="space-x-4">
        <nuxt-link to="/">Projects</nuxt-link>
        <nuxt-link to="/about">About</nuxt-link>
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
