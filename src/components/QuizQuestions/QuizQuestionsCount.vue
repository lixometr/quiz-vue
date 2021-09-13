<template>
  <div class="quiz-questions-count">
    <div class="quiz-questions-count__content" v-html="count"></div>
  </div>
</template>

<script>
export default {
  props: {
    count: String,
  },
};
</script>

<style lang="postcss">
.quiz-questions-count {
  @apply relative z-10 -top-7 rounded-br-[30px] rounded-bl-[30px] px-8 pt-10 pb-2 bg-cardBg 
    md:rounded-tr-none md:rounded-br-none
    sm:rounded-tl-none;
  box-shadow: 0px 4px 57px rgba(0, 0, 0, 0.25);
  &__content {
    @apply text-lg sm:text-xs font-normal;
    span {
      @apply block font-bold text-[2.75rem] text-red mt-3 sm:text-[1.25rem] sm:mt-2;
    }
  }
}
</style>
