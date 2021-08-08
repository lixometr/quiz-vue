<template>
  <div
    class="quiz-questions-list-item"
    :class="{ active: value }"
    @click="$emit('input')"
  >
    <div class="quiz-questions-list-item__checkbox">
      <svgCheckmark class="quiz-questions-list-item__checkbox-checkmark" />
    </div>
    <div>{{ title }}</div>
  </div>
</template>

<script>
import svgCheckmark from "@/assets/icons/checkmark.svg?inline";
export default {
  components: { svgCheckmark },
  props: {
    value: Boolean,
    title: String,
  },
};
</script>

<style lang="postcss">
.quiz-questions-list-item {
  @apply py-[14px] px-[22px] rounded-[30px] transition-all hover:bg-[#F3F3F3]
    flex items-center cursor-pointer text-[18px] sm:text-[14px] sm:py-[10px];
  &__checkbox {
    @apply mr-[22px] w-[27px] h-[27px] bg-[#E9E9E9] rounded-[10px] 
    flex items-center justify-center sm:mr-[10px];
    &-checkmark {
      @apply text-red w-[15px] opacity-0 transition-all transform -translate-y-0.5;
    }
  }
  &.active {
    @apply text-red font-bold;
  }
  &.active & {
    &__checkbox-checkmark {
      @apply opacity-100;
    }
  }
}
</style>
