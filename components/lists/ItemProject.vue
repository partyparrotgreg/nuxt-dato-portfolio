<template>
  <article>
    <nuxt-link
      class="w-full lg:w-1/2 flex sm:justify-center sm:align-middle sm:items-center "
      :to="`/projects/${project.slug}`"
    >
      <figure
        class="rounded-2xl overflow-hidden hover:scale-105 transform transition-all ease-out duration-500 hover:shadow-xl project-cover"
      >
        <datocms-image :data="project.cover.responsiveImage" />
      </figure>
    </nuxt-link>
    <div class="w-full lg:w-1/2 flex justify-center align-middle items-center">
      <div class="object-center lg:w-3/5 space-y-2 flex-col">
        <nuxt-link :to="`/projects/${project.slug}`">
          <small v-if="project.role" class="opacity-70"
            >{{ project.year }} <span class="opacity-25"> / </span
            >{{ project.role.company.name }}</small
          >
          <small v-else class="opacity-70">{{ project.year }}</small>
          <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold -ml-1">
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

<style lang="scss"></style>
