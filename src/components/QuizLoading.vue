<template>
  <div class="quiz-loading">
    <h2>Подбираются варианты</h2>
    <quiz-loading-bar class="mt-auto" @submit="$emit('submit')" />
  </div>
</template>

<script>
import QuizLoadingBar from "./QuizLoading/QuizLoadingBar.vue";
export default {
  props: {
    title: String,
    imageBack: String,
  },
  created() {
    this.$eventBus.$emit("bg", this.imageBack);
  },
  components: { QuizLoadingBar },
};
</script>

<style lang="postcss">
.quiz-loading {
  @apply text-white flex flex-col;
}
</style>
