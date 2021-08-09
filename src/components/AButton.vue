<template>
  <button
    class="app-button"
    :class="[color]"
    :disabled="disabled"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "white",
    },
  },
};
</script>

<style lang="postcss">
.app-button {
  @apply w-[400px] h-[70px] text-center outline-none rounded-[30px]
        text-[24px] font-bold leading-[70px] transition-all sm:h-[60px] sm:text-[14px] sm:leading-[60px] sm:w-full filter hover:brightness-75;

  &.red {
    @apply bg-red text-buttonText;
  }
  &.white {
    @apply bg-second text-buttonText;
    &:not(disabled) {
      @apply hover:shadow-none;
    }
    &[disabled] {
      &:hover {
        box-shadow: 0px 4px 57px rgba(0, 0, 0, 0.25);
      }
    }
  }
  &[disabled] {
    @apply opacity-60 cursor-default;
    &:hover {
      @apply brightness-100;
    }
  }
}
</style>
