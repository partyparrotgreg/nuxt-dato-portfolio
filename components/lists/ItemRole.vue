<template>
  <div class="experience-role">
    <p class="text-lg font-light text-primary">{{ role.role }}</p>
    <div class="text-sm mt-2">
      <a
        :href="role.company.url"
        v-if="role.company.url != null"
        target="_blank"
        class="font-medium"
        >{{ role.company.name }}</a
      >
      <span v-else class="font-medium">{{ role.company.name }}</span>
      <span class="opacity-25"> / </span> {{ role.city }}
      <span class="opacity-25"> / </span>{{ role.from | formatDate }}
      <span v-if="role.to != null">&mdash; {{ role.to | formatDate }}</span>
      <span v-else>&nbsp;(Current)</span>
    </div>
    <div class="text-xs mt-4">
      <div
        v-if="role.description"
        v-html="role.description"
        class="prose-xs"
      ></div>
      <div
        v-if="role.projects && role.projects.length > 0"
        class="mt-4 space-y-2"
      >
        <p class="opacity-50">Projects:</p>
        <ul class="space-y-4">
          <li v-for="project in role.projects" :key="project.slug">
            <nuxt-link :to="`/projects/${project.slug}`">{{
              project.name
            }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-role',
  props: ['role']
}
</script>

<style></style>
