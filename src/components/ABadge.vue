<template>
  <a
    class="app-badge"
    :class="{ button: isButton, active }"
    href="javascript:void(0)"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    isButton: Boolean,
    active: Boolean,
  },
};
</script>

<style lang="postcss">
.app-badge {
  @apply px-2.5 py-1 flex items-center text-center justify-center filter text-buttonText bg-[#E9E9E9] rounded-xl
  hover:bg-red hover:text-cardBg transition-all text-sm sm:text-xs ;
  svg {
    @apply ml-1;
  }
  &.active {
    @apply bg-red text-cardBg hover:brightness-75;
  }
  &.active.button {
  }
}
</style>
