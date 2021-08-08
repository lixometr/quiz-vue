<template>
  <div class="quiz-question">
    <div class="quiz-question__title-row" :class="{ back: showBack }">
      <div class="cursor-pointer" @click="goBack" v-if="showBack">
        <svgBack width="35" />
      </div>
      <h4 class="quiz-question__title">{{ title }}</h4>
    </div>
    <div class="quiz-question__content">
      <component
        :is="questionComponent"
        v-model="valueModel"
        v-bind="$attrs"
        :items="items"
        :limit="limit"
      />
    </div>
    <div class="flex justify-center">
      <a-button color="red" @click="next" :disabled="!isValid">Далее</a-button>
    </div>
  </div>
</template>

<script>
import svgBack from "@/assets/icons/arrow_left.svg?inline";
import AButton from "../AButton.vue";
import QuizQuestionList from "./QuizQuestionList.vue";
import QuizQuestionRange from "./QuizQuestionRange.vue";
import CustomScrollbar from "../CustomScrollbar.vue";
export default {
  components: {
    svgBack,
    AButton,
    QuizQuestionList,
    QuizQuestionRange,
    CustomScrollbar,
  },
  inheritAttrs: false,
  props: {
    title: String,
    items: {
      type: Array,
      default: () => [],
    },
    limit: [Number, String],
    type: String,
    showBack: Boolean,
    imageBack: String,
    value: [Number, Array],
  },
  created() {
    // this.$eventBus.$emit("bg", this.imageBack);
  },
  computed: {
    questionComponent() {
      const components = {
        rangeSlider: QuizQuestionRange,
        listBox: QuizQuestionList,
      };
      return components[this.type];
    },
    valueModel: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    isValid() {
      if (Array.isArray(this.value)) {
        return this.value.length > 0;
      } else {
        return typeof this.value === "number";
      }
    },
  },
  methods: {
    goBack() {
      this.$emit("back");
    },
    next() {
      this.$emit("next");
    },
  },
};
</script>

<style lang="postcss">
.quiz-question {
  @apply h-full max-h-full flex flex-col items-stretch min-h-0 pl-[80px] pr-[50px]
    sm:pl-[22px] sm:pr-[12px];
  &__title {
    @apply text-[30px] text-red font-bold max-w-[400px] md:max-w-[350px] sm:text-[18px] sm:max-w-[150px];
  }
  &__title-row {
    @apply flex items-start  text-red;
    &.back {
      @apply space-x-[30px] ml-[-80px]  pl-[20px] sm:ml-0 sm:pl-0 sm:space-x-[15px] sm:pr-[110px];
    }
    svg {
      @apply sm:w-[25px];
    }
  }
  &__content {
    @apply flex-1 min-h-0 mt-[40px] mb-[60px];
  }
}
</style>
