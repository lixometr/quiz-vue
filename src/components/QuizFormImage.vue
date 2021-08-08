<template>
  <div class="quiz-form-image">
    <div
      class="quiz-form-image__item"
      :style="{ backgroundImage: `url(${imageBottom})` }"
    ></div>
    <div class="quiz-form-image__item"></div>
    <div class="quiz-form-image__item"></div>
    <div class="quiz-form-image__item"></div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    imageBottom: String,
  },
};
</script>

<style lang="postcss">
.quiz-form-image {
  @apply absolute right-[80px] bottom-0 z-10 flex w-[550px] xl:right-[60px] lg:hidden;
  &__item {
    @apply h-[140px] rounded-tr-[44px] rounded-tl-[44px] bg-white
        bg-center bg-cover bg-no-repeat  flex-shrink-0 
        absolute left-0 bottom-0;
    box-shadow: 0px 4px 57px rgba(0, 0, 0, 0.25);
    &:nth-child(1) {
      @apply ml-0 z-50 w-[40%];
    }
    &:nth-child(2) {
      @apply opacity-80 z-40 w-[60%];
    }
    &:nth-child(3) {
      @apply opacity-50 z-30 w-[80%];
    }

    &:nth-child(4) {
      @apply opacity-50 z-10 w-[100%];
    }
  }
}
</style>
