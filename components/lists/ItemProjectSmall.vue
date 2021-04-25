<template>
  <article
    class="flex flex-col sm:flex-row sm:space-x-8 px-8 sm:px-12 space-y-4 sm:space-y-0"
  >
    <nuxt-link
      class="w-full lg:w-1/3 flex sm:justify-center sm:align-middle sm:items-center"
      :to="`/projects/${project.slug}`"
    >
      <figure>
        <datocms-image :data="project.cover.responsiveImage" />
      </figure>
    </nuxt-link>
    <div class="w-full lg:w-2/3 flex">
      <div class="space-y-2 flex-col">
        <nuxt-link :to="`/projects/${project.slug}`">
          <small v-if="project.role" class="opacity-70"
            >{{ project.year }} <span class="opacity-25"> / </span
            >{{ project.role.company.name }}</small
          >
          <small v-else class="opacity-70">{{ project.year }}</small>
          <h2 class="text-xl md:text-md lg:text-xl font-semibold -ml-1">
            {{ project.name }}
          </h2>
        </nuxt-link>
        <div v-html="project.blurb" />
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['project']
}
</script>

<style></style>
