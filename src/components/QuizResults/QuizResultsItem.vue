<template>
  <a :href="href" target="_blank" class="quiz-results-item group">
    <div
      class="quiz-results-item__image"
      :style="{ backgroundImage: `url(${image})` }"
    ></div>
    <div class="quiz-results-item__title">
      <div>
        {{ title }}
      </div>
      <svgArrowRight width="35" />
    </div>
    <div class="quiz-results-item__desc">
      {{ text }}
    </div>
  </a>
</template>

<script>
import svgArrowRight from "@/assets/icons/arrow_right.svg?inline";
export default {
  components: { svgArrowRight },
  props: {
    image: String,
    title: String,
    href: String,
    text: String,
  },
};
</script>

<style lang="postcss">
.quiz-results-item {
  &__image {
    @apply pb-[105%] w-full bg-center bg-cover bg-no-repeat rounded-[44px];
  }
  &__title {
    @apply group-hover:brightness-75 filter text-red text-[26px] font-extrabold flex items-center mt-[10px];
    svg {
      @apply ml-2;
    }
  }
  &__desc {
    @apply text-[20px] font-medium mt-1;
  }
}
</style>
