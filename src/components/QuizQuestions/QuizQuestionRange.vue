<template>
  <div class="quiz-question-range">
    <div class="quiz-question-range__value">
      <span class="text-red"> {{ normValue }}</span> ₽
    </div>
    <div>
      <VueSlider
        v-model="valueModel"
        :max="parseInt(limit)"
        :min="0"
        :dotSize="27"
        :tooltip="'none'"
        :contained="true"
      />
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  components: { VueSlider },
  inheritAttrs: false,
  props: {
    value: [Number],
    limit: [Number, String],
    defaultValue: [Number, String],
  },
  created() {
    if (this.defaultValue) {
      this.$emit("input", parseInt(this.defaultValue));
    }
  },
  computed: {
    valueModel: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    normValue() {
      function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
      return numberWithSpaces(this.value || 0);
    },
  },
};
</script>

<style lang="postcss">
.quiz-question-range {
  @apply w-[350px] pt-[40px] sm:w-full h-full sm:flex sm:flex-col sm:justify-center sm:items-stretch;
  &__value {
    @apply font-bold text-[24px] py-[15px] px-[30px] rounded-[30px] bg-[#F3F3F3]  text-center mb-[15px] mx-[10px];
  }
  .vue-slider {
    .vue-slider-process {
      @apply bg-red rounded-[10px];
    }
    .vue-slider-dot-handle {
      @apply border-none rounded-[10px] bg-red shadow-none outline-none hover:bg-red-dark transition-colors;
    }
    .vue-slider-rail {
      @apply bg-[#E9E9E9] rounded-[10px];
    }
  }
}
</style>
