<template>
  <div class="quiz-questions">
    <quiz-questions-steps :current="currentStep" :total="totalItems" />
    <div class="quiz__float-bar quiz-questions__bar">
      <transition name="t-fade" mode="out-in">
        <quiz-question
          class="flex-1"
          :key="activeQuestion.id"
          v-bind="activeQuestion"
          v-model="answers[activeQuestion.id]"
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
import { saveAnswer } from "../../api/quiz-routes";
export default {
  components: { QuizQuestionsSteps, QuizQuestion },
  props: {
    totalItems: Number,
    value: Object,
    item: {
      type: Object,
      default: () => ({}),
    },
    sessionId: String,
  },
  data() {
    return {
      activeIdx: 0,
      questions: [this.item],
      answers: {},
    };
  },
  created() {
    this.$eventBus.$emit("bg", this.activeQuestion.imageBack);
  },
  computed: {
    activeQuestion() {
      return this.questions[this.activeIdx] || {};
    },
    currentStep() {
      return this.activeIdx + 1;
    },
  },
  methods: {
    goBack() {
      if (this.activeIdx < 1) return;
      this.activeIdx--;
      this.$eventBus.$emit("bg", this.activeQuestion.imageBack);
    },
    async nextStep() {
      await this.saveQuestion();

      if (this.activeIdx + 1 >= this.totalItems) return;
      this.activeIdx++;
      this.$eventBus.$emit("bg", this.activeQuestion.imageBack);
    },
    async saveQuestion() {
      const answers = this.answers[this.activeQuestion.id];
      const nextQuestion = await saveAnswer({
        sessionId: this.sessionId,
        questionId: this.activeQuestion.id,
        answers,
      });
      const newQuestions = this.questions.slice(0, this.activeIdx + 1);
      if (nextQuestion.type === "process") {
        this.$emit("submit", nextQuestion);
        return;
      }
      const newAnswers = {};
      Object.keys(this.answers).forEach((key) => {
        if (newQuestions.findIndex((q) => q.id === key) < 0) return;
        newAnswers[key] = this.answers[key];
      });
      this.answers = newAnswers;
      newQuestions.push(nextQuestion);
      this.questions = newQuestions;
    },
  },
};
</script>

<style lang="postcss">
.quiz-questions {
  @apply z-50 absolute left-[90px] top-[100px] bottom-0
    pt-[40px] pr-[40px] flex flex-col md:top-[220px] md:left-0 md:right-0 md:pr-0
    sm:top-[0]  sm:max-h-[calc(95vh-60px)];
  &__bar {
    @apply w-[800px] min-h-[400px] max-h-[750px] flex flex-col flex-1 md:w-full sm:max-h-full;
  }
}
</style>
