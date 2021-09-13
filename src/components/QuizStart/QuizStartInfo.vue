<template>
  <div class="quiz-start-info" v-html="text"></div>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>

<style lang="postcss">
.quiz-start-info {
  @apply absolute left-[630px] top-[130px] bg-cardBg text-lg rounded-[30px]
    py-5 px-6 z-40 w-[180px] 
    md:left-[480px] md:top-[10px] md:py-3 
    sm:left-auto sm:right-0 sm:top-0 sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-none
    sm:text-sm sm:py-2 sm:px-5 sm:w-[110px] sm:leading-[1.1];
  box-shadow: 0px 4px 57px rgba(0, 0, 0, 0.25);
  span {
    @apply text-red font-bold text-[42px] block mt-3 mb-1
    sm:text-[24px] sm:mt-0 sm:mb-0;
  }
}
</style>
