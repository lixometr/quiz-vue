<template>
  <div class="quiz-form">
    <transition name="t-fade" mode="out-in">
      <component
        :key="screen"
        :is="activeScreen.component"
        v-bind="activeScreen.data"
        @submit="onItemSubmit"
      />
    </transition>
  </div>
</template>

<script>
import QuizFormItem from "./QuizFormItem.vue";
import QuizFormPhone from "./QuizFormPhone.vue";
import QuizFilters from "../QuizFilters/QuizFilters.vue";
export default {
  components: { QuizFormPhone, QuizFormItem, QuizFilters },
  inheritAttrs: false,
  props: {
    screens: Array,
  },
  data() {
    return {
      screen: 0,
      values: [],
    };
  },
  computed: {
    formComponents() {
      return this.screens.map((screen) => {
        const component =
          screen.type === "phone" ? "quiz-form-phone" : "quiz-form-item";
        return {
          component,
          data: screen,
        };
      });
    },
    activeScreen() {
      return this.formComponents[this.screen] || {};
    },
  },
  methods: {
    goNext() {
      if (this.screen >= this.screens.length - 1) {
        this.$emit("submit", {
          phone: this.values[0],
          name: this.values[1],
        });
      } else {
        this.screen++;
      }
    },
    onItemSubmit(value) {
      this.$set(this.values, this.screen, value);
      this.goNext();
    },
  },
  watch: {
    screen() {
      if (this.screen > 0) {
        this.$eventBus.$emit("changeFilters", false);
      } else {
        this.$eventBus.$emit("changeFilters", true);
      }
    },
  },
};
</script>

<style lang="postcss">
.quiz-form {
  @apply text-second min-h-[480px] flex flex-col items-stretch justify-start;
  &__input {
    @apply bg-second rounded-[30px] py-[20px] px-[25px] text-red outline-none border-none
      w-[400px] font-medium text-[30px] leading-none placeholder-red
      sm:w-full sm:text-[24px] sm:h-[60px];
  }
}
</style>
