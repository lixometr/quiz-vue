<template>
  <div class="quiz-loading-bar">
    <div class="text-[30px] font-medium mb-2">{{ progress }}%</div>
    <div class="quiz-loading-bar__progress">
      <div
        class="quiz-loading-bar__progress-active"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
    <div class="text-[20px] font-medium mt-4">Подождите немного</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.interval = setInterval(() => {
        if (this.progress >= 100) {
          clearInterval(this.interval);
          this.done();
          return;
        }
        this.progress++;
      }, 40);
    },
    done() {
      this.$emit("submit");
    },
  },
};
</script>

<style lang="postcss">
.quiz-loading-bar {
  &__progress {
    @apply h-[70px] w-full rounded-[30px] relative bg-[#C4C4C4] overflow-hidden sm:h-[35px];

    &-active {
      @apply absolute h-full rounded-[30px] bg-white;
    }
  }
}
</style>
