<template>
  <custom-scrollbar class="quiz-question-list">
    <quiz-questions-list-item
      v-for="(item, idx) in items"
      :key="idx"
      :title="item.value"
      :value="value.includes(item.id)"
      @input="toggleActive(item.id)"
    />
  </custom-scrollbar>
</template>

<script>
import CustomScrollbar from "../CustomScrollbar.vue";
import QuizQuestionsListItem from "./QuizQuestionsListItem.vue";
export default {
  components: { QuizQuestionsListItem, CustomScrollbar },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  inheritAttrs: false,
  methods: {
    toggleActive(id) {
      let newValue = [...this.value];
      if (this.value.includes(id)) {
        newValue = newValue.filter((curId) => curId !== id);
      } else {
        newValue.push(id);
      }

      this.$emit("input", newValue);
    },
  },
};
</script>

<style lang="postcss">
.quiz-question-list {
  @apply overflow-hidden max-h-full ml-[-20px] pr-[90px] sm:pr-[50px];
}
</style>
