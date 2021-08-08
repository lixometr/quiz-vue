<template>
  <div class="quiz-results quiz__float-bar" v-if="buildings.length > 0">
    <custom-scrollbar class="quiz-results__items">
      <div
        class="w-1/3 p-[20px] md:w-1/2 sm:w-full sm:p-0"
        v-for="(item, idx) in buildings"
        :key="idx"
      >
        <quiz-results-item v-bind="item" />
      </div>
    </custom-scrollbar>
  </div>
</template>

<script>
import CustomScrollbar from "../CustomScrollbar.vue";
import QuizResultsItem from "./QuizResultsItem.vue";
export default {
  components: { CustomScrollbar, QuizResultsItem },
  inheritAttrs: false,
  props: {
    buildings: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="postcss">
.quiz-results {
  &.quiz__float-bar {
    @apply z-50 absolute left-[200px] top-[340px] bottom-0
    pt-[40px] pr-[50px] pl-[60px] w-[900px]
      flex flex-col lg:w-[800px] md:w-[680px] md:left-[80px] md:top-[320px]
        sm:top-[140px] sm:left-0 sm:w-full
        sm:pr-[0px] sm:pl-[40px] sm:pt-[40px]
        sm:rounded-br-none sm:rounded-bl-none sm:pb-0;
  }

  &__items {
    @apply flex-1 flex flex-wrap sm:space-y-7 sm:pr-[50px] sm:pb-[20px];
  }
}
</style>
