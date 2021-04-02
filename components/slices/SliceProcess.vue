<template>
  <page-section class="bg-gray-100">
    <bit-heading
      :callout="slice.callout"
      :title="slice.title"
      :description="slice.description"
    ></bit-heading>
    <svg
      class="w-full h-auto my-16 stroke-current text-primary"
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
    <list-techniques></list-techniques>
  </page-section>
</template>

<script>
export default {
  data() {
    return {
      callout: "Bleble",
      title: "Some title",
      description: "<p>Lol</p>"
    };
  },
  props: ["slice"]
};
</script>

<style></style>
