<template>
  <div class="quiz-question-list">
    <div class="quiz-question-list__actions" v-if="controls">
      <a-badge
        :isButton="true"
        class="quiz-question-list__actions-item group"
        @click.prevent="chooseAll"
        >Выбрать все районы
        <svgCheckmark
          width="15"
          class="
            text-red
            group-hover:text-white
            flex-shrink-0
            transfrom
            -translate-y-0.5
            transition-all
          "
      /></a-badge>
      <a-badge
        :isButton="true"
        :active="true"
        class="quiz-question-list__actions-item"
        @click.prevent="resetChoice"
        v-if="value.length > 0"
        >Очистить выбор
        <svgCross width="20" />
      </a-badge>
    </div>
    <custom-scrollbar class="quiz-question-list__content">
      <quiz-questions-list-item
        v-for="(item, idx) in items"
        :key="idx"
        :title="item.value"
        :value="value.includes(item.id)"
        @input="toggleActive(item.id)"
      />
    </custom-scrollbar>
  </div>
</template>

<script>
import ABadge from "../ABadge.vue";
import CustomScrollbar from "../CustomScrollbar.vue";
import QuizQuestionsListItem from "./QuizQuestionsListItem.vue";
import svgCheckmark from "@/assets/icons/checkmark.svg?inline";
import svgCross from "@/assets/icons/cross.svg?inline";
export default {
  components: {
    QuizQuestionsListItem,
    CustomScrollbar,
    ABadge,
    svgCheckmark,
    svgCross,
  },
  props: {
    controls: Boolean,
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
    resetChoice() {
      this.$emit("input", []);
    },
    chooseAll() {
      const newValue = [];
      this.items.map((item) => {
        newValue.push(item.id);
      });
      this.$emit("input", newValue);
    },
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
  @apply flex flex-col items-stretch justify-start max-h-full;
  &__content {
    @apply overflow-hidden flex-1 pr-[100px] sm:pr-[50px] ml-[-20px];
  }
  .ps__rail-y {
    @apply mt-[1.5rem] sm:mt-0;
  }
  &__actions {
    @apply flex items-center space-x-2.5 mb-6 sm:flex-col sm:items-start sm:space-x-0 sm:space-y-2.5;
  }
}
</style>
