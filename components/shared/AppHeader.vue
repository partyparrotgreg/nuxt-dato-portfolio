<template>
  <header
    class="p-8 hover:bg-white fixed top-0 w-full transition-all duration-300 ease-in-out z-50"
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
