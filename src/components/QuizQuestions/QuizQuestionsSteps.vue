<template>
  <div class="quiz-questions-steps">
    <div class="quiz-questions-steps__current">
      <span>{{ current }}</span>
      <span>шаг</span>
    </div>
    <div class="quiz-questions-steps__total">
      из {{ total }}-{{ totalText }}
    </div>
  </div>
</template>

<script>
import { wordSclon } from "@/utils/helpers/wordSclon";
export default {
  props: {
    total: Number,
    current: Number,
  },
  computed: {
    totalText() {
      return wordSclon(this.total, ["го", "х", "ти"]);
    },
  },
};
</script>

<style lang="postcss">
.quiz-questions-steps {
  @apply absolute top-0 right-0 z-40 rounded-[30px] px-[40px] py-[30px] bg-white 
    md:rounded-tr-none md:rounded-br-none
    sm:rounded-tl-none sm:py-[25px] sm:px-[25px];
  box-shadow: 0px 4px 57px rgba(0, 0, 0, 0.25);
  &__current {
    @apply text-[30px] font-medium text-black leading-none sm:text-[20px];
    > span {
      &:first-child {
        @apply text-red  font-extralight text-[80px] mr-1 sm:text-[40px];
      }
    }
  }
  &__total {
    @apply text-[18px] font-medium text-red leading-none -mt-2 sm:mt-0;
  }
}
</style>
