<template>
  <div class="quiz-filters-item quiz-filters-buttons">
    <div class="quiz-filters-item__title quiz-filters-buttons__title">
      {{ title }}
    </div>
    <div class="quiz-filters-buttons__content">
      <a-badge
        class="quiz-filters-buttons__item"
        v-for="(item, idx) in normItems"
        :key="idx"
        :active="value.includes(item.id)"
        @click.prevent="toggleActive(item.id)"
      >
        {{ item.value }}</a-badge
      >
      <a-badge
        :isButton="true"
        class="quiz-filters-buttons__reset quiz-filters-buttons__item"
        @click.prevent="resetChoice"
        :active="true"
      >
        Очистить <svgCross width="20"
      /></a-badge>
    </div>
  </div>
</template>

<script>
import ABadge from "../ABadge.vue";
import svgCross from "@/assets/icons/cross.svg?inline";
export default {
  components: {
    ABadge,
    svgCross,
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
.quiz-filters-buttons {
  &__title {
    @apply flex justify-between items-center;
  }
  &__actions {
    @apply flex items-center space-x-2.5 sm:flex-col sm:items-start sm:space-x-0 sm:space-y-2.5;
    &-item {
      @apply text-xs font-normal;
    }
  }
  &__content {
    @apply flex flex-wrap;
  }
  &__item {
    @apply mr-2 mb-2;
  }

}
</style>
