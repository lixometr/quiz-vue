<template>
  <div class="quiz-start">
    <h1>{{ h1 }}</h1>
    <div class="quiz-start__h2" v-html="h2" v-if="h2"></div>
    <div class="quiz-start__subtitles">
      <div
        class="quiz-start__subtitle"
        v-html="subTitle"
        v-for="(subTitle, idx) in h3"
        :key="idx"
      ></div>
    </div>
    <a-button class="quiz-start__btn" @click="start">{{ button }}</a-button>
  </div>
</template>

<script>
import AButton from "./AButton.vue";
export default {
  components: { AButton },
  props: {
    h1: String,
    h2: String,
    h3: Array,
    
    button: String,
  },
  inheritAttrs: false,
  data() {
    return {};
  },

  methods: {
    start() {
      this.$emit("submit");
    },
  },
};
</script>

<style lang="postcss">
.quiz-start {
  @apply text-white;
  h1 {
    @apply mb-[50px] sm:mb-[40px];
  }
  &__h2 {
    @apply text-[30px] mb-[15px] font-extrabold md:text-[24px] sm:text-[18px] sm:mb-[20px];
  }
  &__subtitle {
    @apply text-[20px] font-medium sm:text-[14px] flex-1;
  }
  &__subtitles {
    @apply flex items-center justify-start space-x-[40px]  leading-normal sm:space-x-[10px];
  }
  &__btn {
    @apply mt-[40px];
  }
}
</style>
