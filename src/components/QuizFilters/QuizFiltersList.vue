<template>
  <div class="quiz-filters-item quiz-filters-list">
    <div class="quiz-filters-item__title quiz-filters-list__title">
      <div>
        {{ title }}
      </div>
      <div class="quiz-filters-list__actions" v-if="controls">
        <a-badge
          :isButton="true"
          :active="true"
          class="quiz-filters-list__actions-item"
          @click.prevent="resetChoice"
          v-if="value.length > 0"
          >Очистить
          <svgCross width="20" />
        </a-badge>
        <a-badge
          :isButton="true"
          class="quiz-filters-list__actions-item group"
          @click.prevent="chooseAll"
          >Выбрать все
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
      </div>
    </div>
    <custom-scrollbar class="quiz-filters-list__content">
      <quiz-questions-list-item
        class="quiz-filters-list__item"
        v-for="(item, idx) in normItems"
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
import QuizQuestionsListItem from "../QuizQuestions/QuizQuestionsListItem.vue";
import svgCheckmark from "@/assets/icons/checkmark.svg?inline";
import svgCross from "@/assets/icons/cross.svg?inline";
import CustomScrollbar from "../CustomScrollbar.vue";

export default {
  components: {
    ABadge,
    QuizQuestionsListItem,
    svgCheckmark,
    svgCross,
    CustomScrollbar,
  },
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    controls: Boolean,
    title: String,
    items: {
      type: Array,
      default: () => [],
    },
    available: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    normItems() {
      return this.items.filter((item) => this.available.includes(item.id));
    },
  },
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
.quiz-filters-list {
  &__title {
    @apply flex justify-between items-center xs:flex-col  xs:items-start xs:mb-4;
  }
  &__actions {
    @apply flex items-center space-x-2.5 xs:flex-col xs:items-start xs:space-x-0 xs:space-y-2.5 xs:mt-2;
    &-item {
      @apply text-xs font-normal;
    }
  }
  &__content {
    @apply max-h-[140px] -mx-3;
  }
  &__item {
    @apply px-3 py-1 text-sm;
    .quiz-questions-list-item {
      &__checkbox {
        @apply w-5 h-5 rounded-lg;
        &-checkmark {
          @apply w-3;
        }
      }
    }
  }
}
</style>
