<template>
  <div class="quiz-results-content">
    <h2>{{ h1 }}</h2>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    h1: String,
  },
};
</script>

<style lang="postcss">
.quiz-results-content {
  @apply text-white;
}
</style>
