<template>
  <div class="subpixel-antialiased">
    <app-header></app-header>
    <nuxt />
  </div>
</template>

<script>
import AppHeader from '~/components/shared/AppHeader'

export default {
  components: {
    AppHeader
  }
}
</script>

<style></style>
