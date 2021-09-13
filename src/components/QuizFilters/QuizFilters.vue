<template>
  <div class="quiz-filters-wrapper" v-if="showFilters">
    <transition name="t-fade">
      <div
        class="quiz-filters-button"
        @click="open"
        v-if="!isOpen && filtersLoaded"
      >
        {{ title }} <svgArrowLeft width="72" class="mt-2" />
      </div>
    </transition>
    <transition name="t-fade">
      <div class="quiz-filters" :class="{ open: isOpen }" v-if="filtersLoaded">
        <div class="quiz-filters__title" @click="clickTitle">
          {{ title }}
          <span class="quiz-filters__title-action">
            <svgCross
              class="quiz-filters__title-close"
              width="25"
              @click.stop="close"
              v-if="isOpen"
            />
            <svgArrowTop
              v-else
              width="10"
              class="quiz-filters__title-arrow"
              @click.stop="open"
            />
          </span>
        </div>
        <div class="quiz-filters__items">
          <div
            class="quiz-filters__item"
            v-for="(filter, idx) in items"
            :key="idx"
          >
            <component
              :is="filter.component"
              v-bind="{ ...filter, ...filter.props }"
              :value="value[filter.id]"
              @input="onFilterChange(filter.id, $event)"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import QuizFiltersButtonsVue from "./QuizFiltersButtons.vue";
import QuizFiltersListVue from "./QuizFiltersList.vue";
import QuizFiltersRangeVue from "./QuizFiltersRange.vue";
import svgCross from "@/assets/icons/cross.svg?inline";
import svgArrowTop from "@/assets/icons/arrow_top.svg?inline";
import svgArrowLeft from "@/assets/icons/arrow_left_long.svg?inline";
export default {
  components: { svgCross, svgArrowTop, svgArrowLeft },
  props: {
    title: String,
    filters: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    isOpen: false,
    showFilters: true,
    filtersLoaded: false,
  }),
  created() {
    this.$eventBus.$on("changeFilters", (value) => {
      this.showFilters = value;
    });
    if (!window.matchMedia("(max-width: 1350px)").matches) {
      this.isOpen = true;
    }
  },
  mounted() {
    this.filtersLoaded = true;
  },
  computed: {
    items() {
      const components = {
        buttons: QuizFiltersButtonsVue,
        rangeSlider: QuizFiltersRangeVue,
        listBox: QuizFiltersListVue,
      };
      return this.filters.map((filter) => {
        const component = components[filter.type];
        let props = {};
        if (filter.type === "rangeSlider") {
          props = {
            defaultValue: filter.value,
          };
        }
        return { ...filter, component, props };
      });
    },
  },
  methods: {
    clickTitle() {
      if (!window.matchMedia("(max-width: 650px)").matches || this.isOpen)
        return;
      this.open();
    },
    close() {
      this.isOpen = false;
    },
    open() {
      this.isOpen = true;
    },
    onFilterChange(filterId, newValue) {
      const newFilters = { ...this.value, [filterId]: newValue };
      this.$emit("input", newFilters);
    },
  },
};
</script>

<style lang="postcss">
.quiz-filters {
  @apply w-[490px] bg-cardBg rounded-[44px] py-9 px-[3.25rem]
  absolute left-[600px] top-[150px] z-[50] transform transition-all overflow-auto max-h-full
  lg:fixed lg:top-auto lg:left-auto lg:right-0 lg:bottom-0 lg:rounded-tr-none lg:rounded-br-none
  lg:translate-x-full 
  sm:translate-x-0 sm:left-0 sm:w-full sm:rounded-tr-[30px] sm:rounded-tl-[30px] sm:rounded-bl-none sm:top-4 sm:py-3 sm:px-6
   sm:block sm:translate-y-full  sm:bottom-10;
  box-shadow: 0px 4px 57px rgba(0, 0, 0, 0.25);

  &-button {
    @apply absolute right-0 top-[300px] sm:hidden lg:block hidden z-50 bg-cardBg text-buttonText rounded-[30px]
      rounded-tr-none rounded-br-none px-8 py-5 leading-tight cursor-pointer
      w-[200px] font-bold text-xl;
    box-shadow: 0px 4px 57px rgba(0, 0, 0, 0.25);
  }
  &__title {
    @apply font-bold text-xl mb-6 flex justify-between items-center sm:text-sm sm:mb-5;
    &-action {
      @apply text-red;
    }
    &-close {
      @apply md:inline-block cursor-pointer;
    }
    &-arrow {
      @apply hidden sm:inline-block;
    }
  }
  &-item {
    &__title {
      @apply font-bold text-sm mb-2;
    }
  }
  &__items {
    @apply space-y-7;
  }
  &.open {
    @apply translate-x-0 sm:translate-y-0  sm:bottom-0;
  }
}
</style>
