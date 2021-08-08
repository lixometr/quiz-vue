<template>
  <perfect-scrollbar
    class="custom-scrollbar"
    :options="{
      minScrollbarLength: 80,
      maxScrollbarLength: 100,
      wheelSpeed: 0.8,
      wheelPropagation: true,
    }"
  >
    <slot />
  </perfect-scrollbar>
</template>

<script>
export default {};
</script>

<style lang="postcss">
.custom-scrollbar {
  @apply pr-[40px];
  .ps {
    &__rail-y {
      @apply w-[2px] rounded-[10px] bg-[#F3F3F3] mr-[10px] opacity-100 right-[8px] mb-3 !important;
    }
    &__thumb-y {
      @apply bg-red hover:bg-red-dark opacity-100 w-[14px] transform translate-x-[8px]
        sm:w-[9px] sm:translate-x-[5px] !important;
      box-shadow: 3px 4px 7px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
