<template>
  <div class="quiz-questions">
    <quiz-questions-steps :current="currentStep" :total="totalSteps" />
    <div class="quiz__float-bar quiz-questions__bar">
      <transition name="t-fade" mode="out-in">
        <quiz-question
          class="flex-1"
          :key="activeQuestion.id"
          :value="value[activeQuestion.id]"
          @input="onQuestionInput"
          v-bind="activeQuestion"
          :defaultValue="activeQuestion.value"
          @back="goBack"
          @next="nextStep"
          :showBack="activeIdx > 0"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import QuizQuestion from "./QuizQuestion.vue";
import QuizQuestionsSteps from "./QuizQuestionsSteps.vue";
export default {
  components: { QuizQuestionsSteps, QuizQuestion },
  props: {
    value: Object,
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeIdx: 0,
    };
  },
  created() {
    this.$eventBus.$emit("bg", this.activeQuestion.imageBack);
  },
  computed: {
    activeQuestion() {
      return this.items[this.activeIdx] || {};
    },
    currentStep() {
      return this.activeIdx + 1;
    },
    totalSteps() {
      return this.items.length;
    },
  },
  methods: {
    onQuestionInput(val) {
      const newVal = { ...this.value, [this.activeQuestion.id]: val };
      this.$emit("input", newVal);
    },
    goBack() {
      if (this.activeIdx < 1) return;
      this.activeIdx--;
      this.$eventBus.$emit("bg", this.activeQuestion.imageBack);
    },
    nextStep() {
      if (this.activeIdx + 1 >= this.totalSteps) {
        this.$emit("submit");
        return;
      }
      this.activeIdx++;
      this.$eventBus.$emit("bg", this.activeQuestion.imageBack);
    },
  },
};
</script>

<style lang="postcss">
.quiz-questions {
  @apply z-50 absolute left-[90px] top-[100px] bottom-0
    pt-[40px] pr-[40px] flex flex-col md:top-[220px] md:left-0 md:right-0 md:pr-0
    sm:top-[0];
  &__bar {
    @apply w-[800px] min-h-[400px] max-h-[750px] flex flex-col flex-1 md:w-full sm:max-h-full;
  }
}
</style>
