<template>
  <div class="quiz-info">
    <div class="quiz-info__item sm:order-2 sm:mt-2">
      <img :src="logo" alt="" width="190" />
    </div>
    <div class="quiz-info__item" v-html="tagline"></div>
  </div>
</template>

<script>
export default {
  props: {
    logo: String,
    tagline: String,
  },
  inheritAttrs: false,
};
</script>

<style lang="postcss">
.quiz-info {
  @apply relative z-20 pt-[40px] space-x-[60px] pl-[140px] text-white
    flex items-center md:pl-[120px] sm:flex-col sm:items-start sm:pt-[20px]  sm:space-x-0 sm:pl-[45px];
  &__item {
    @apply max-w-[300px] font-bold text-[20px] md:text-[18px] sm:text-[12px];
    b {
      @apply font-extrabold;
    }
    img {
      @apply w-[190px] md:w-[170px]  sm:w-[150px];
    }
  }
}
</style>
