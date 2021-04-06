<template>
  <div
    class="bg-primary section-process p-8 2xl:p-32 sm:p-16 text-primary-light"
  >
    <div class="max-w-prose">
      <small class="opacity-50">{{ slice.callout }}</small>
      <h2 class="text-xl sm:text-3xl font-semibold -mx-1 mb-2 text-white">
        {{ slice.title }}
      </h2>
      <div v-html="slice.description"></div>
    </div>
    <svg
      class="w-full h-auto my-16 stroke-current"
      width="1250"
      height="386"
      viewBox="0 0 1250 386"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 385L313 1L625 385L937 1L1249 385"
        vector-effect="non-scaling-stroke"
      />
      <path
        d="M103 220L189.5 110L276 220L362.5 110L449 220"
        vector-effect="non-scaling-stroke"
      />
      <path
        d="M723 220L809.5 110L896 220L982.5 110L1069 220"
        vector-effect="non-scaling-stroke"
      />
      <path
        d="M456 68L473.25 46L490.5 68L507.75 46L525 68"
        vector-effect="non-scaling-stroke"
      />
      <path
        d="M540 122L549.5 110L559 122L568.5 110L578 122"
        vector-effect="non-scaling-stroke"
      />
    </svg>
    <div class="list-techniques grid md:grid-cols-2 xl:grid-cols-4 gap-12">
      <div
        class="flex flex-col space-y-4"
        role="list-item"
        v-for="technique in techniques"
        :key="technique.id"
      >
        <h3 class="text-lg font-medium text-white">
          {{ technique.name }}
        </h3>
        <div class="flex-grow text-xs" v-html="technique.description"></div>
        <ul class="divide-y divide-white divide-opacity-25 text-xs">
          <li class="py-2" v-for="tool in technique.tools" :key="tool.id">
            {{ tool.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'section-process',
  props: ['slice', 'techniques']
}
</script>

<style></style>
