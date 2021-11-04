<template>
  <div class="section-experience p-8 sm:p-16 2xl:p-32 bg-gray-box">
    <div class="mb-12">
      <small class="opacity-50">{{ slice.callout }}</small>
      <h2 class="text-xl sm:text-3xl font-semibold -mx-1 mb-2">
        {{ slice.title }}
      </h2>
      <div v-html="slice.description"></div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16">
      <item-role
        :role="role"
        v-for="role in experiences"
        :key="role.id"
      ></item-role>
    </div>
  </div>
</template>

<script>
import ItemRole from '~/components/lists/ItemRole'
export default {
  components: { ItemRole },
  props: ['slice', 'experiences']
}
</script>

<style></style>
