<template>
  <div class="quiz-questions-info" v-if="content">
    <div class="quiz-questions-info-content" v-if="showContent">
      <svgCross
        class="quiz-questions-info-content__cross"
        @click="closeContent"
      />
      <div v-html="content"></div>
    </div>
    <div class="quiz-questions-info-button" @click="openContent">
      <svgInfo />
    </div>
  </div>
</template>

<script>
import svgInfo from "@/assets/icons/info.svg?inline";
import svgCross from "@/assets/icons/cross.svg?inline";
export default {
  components: { svgInfo, svgCross },
  data: () => ({
    content: "",
    showContent: true,
  }),

  mounted() {
    this.$eventBus.$on("questionsInfo", (content) => {
      this.content = content;
    });
  },
  methods: {
    closeContent() {
      this.showContent = false;
    },
    openContent() {
      this.showContent = true;
    },
    async checkLink() {
      await this.$nextTick();
      const link = document.querySelector(".quiz-questions-info-content a");
      if (!link) return;
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const questionId = link.getAttribute("href");
        this.$eventBus.$emit("goToQuestion", questionId);
      });
    },
  },
  watch: {
    content() {
      this.checkLink();
    },
  },
};
</script>

<style lang="postcss">
.quiz-questions-info {
  @apply absolute bottom-5 right-5 z-50 flex flex-col items-end 
        md:top-3 md:left-5 md:bottom-auto md:right-auto md:items-start
        sm:top-auto sm:bottom-0 sm:left-auto sm:right-0 sm:items-end;
  &-button {
    @apply h-[75px] w-[70px] bg-red rounded-[30px] flex items-center justify-center
        md:order-1
        sm:rounded-br-none sm:rounded-tr-none sm:rounded-bl-none sm:order-2
        sm:h-[65px] sm:w-[60px];
    svg {
      @apply sm:w-9;
    }
  }
  &-content {
    @apply relative w-[270px] bg-cardBg py-6 px-7 text-base rounded-[30px] mr-8 mb-3
        md:order-2 md:ml-5 md:mb-0 md:mt-3 
        sm:order-1 sm:text-xs sm:px-[1.375rem] sm:py-4 sm:w-[210px] sm:ml-0 sm:mr-3 sm:mb-1 sm:leading-normal;
    box-shadow: 0px 4px 57px rgba(0, 0, 0, 0.25);

    &::before {
      content: "";
      @apply w-10 h-10 absolute bottom-2.5 right-10 transform translate-y-full bg-no-repeat bg-contain
        md:rotate-180 md:bottom-auto md:top-2.5 md:-translate-y-full md:left-10 md:right-auto
        sm:rotate-0 sm:translate-y-full sm:bottom-2.5 sm:top-auto sm:left-auto sm:right-10;
      background-image: url(~@/assets/icons/arrow_down.svg);
    }
    &__cross {
      @apply sm:block hidden text-red w-5 absolute top-4 right-2.5;
    }
    a {
      @apply bg-red text-cardBg rounded-[30px] px-3 py-1 whitespace-nowrap;
      box-shadow: 3px 4px 7px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
