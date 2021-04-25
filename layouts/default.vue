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

<style>
.home-enter-active,
.home-leave-active {
  transition: all 700ms ease;
  transform: translateY(0) scale(1);
}
.home-enter,
.home-leave-active {
  opacity: 0;
  transform: translateY(1%) scale(1.05);
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.delay {
  animation-delay: calc(attr(data-count) * 150ms);
}
.appear {
  animation-name: appear;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  animation-duration: 250ms;
}
</style>
