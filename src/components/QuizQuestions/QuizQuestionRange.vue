<template>
  <div class="quiz-question-range">
    <div class="quiz-question-range__presets">
      <a-badge
        class="quiz-question-range__preset"
        href="javascript:void(0)"
        @click.prevent="choosePreset(item)"
        v-for="(item, idx) in presets"
        :key="idx"
        >{{ item }} млн</a-badge
      >
      <!-- <svgCross @click="> -->
    </div>
    <div class="quiz-question-range__content">
      <div class="quiz-question-range__value">
        <span class="text-red"> {{ normValue }}</span>
        <svgRuble class="ml-1 text-black" width="15" />
      </div>
      <div>
        <VueSlider
          v-model="valueModel"
          :max="limit"
          :min="minValue"
          :dotSize="27"
          :tooltip="'none'"
          :contained="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import svgRuble from "@/assets/icons/ruble.svg?inline";
import ABadge from "../ABadge.vue";
// import svgCross from "@/assets/icons/cross.svg?inline";
export default {
  components: {
    VueSlider,
    svgRuble,
    ABadge,
    // svgCross
  },
  inheritAttrs: false,
  props: {
    presets: {
      type: Array,
      default: () => [],
    },
    value: [Number],
    limit: [Number],
    start: [Number, String],
    defaultValue: [Number, String],
    minValue: [Number],
  },
  created() {
    if (this.defaultValue && !this.value) {
      this.$emit("input", parseInt(this.defaultValue));
    }
  },
  methods: {
    choosePreset(preset) {
      this.$emit("input", preset * 1000000);
    },
  },
  computed: {
    valueModel: {
      get() {
        return this.value || parseInt(this.minValue) || 0;
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
  @apply pt-[40px];
  &__content {
    @apply w-[420px]  sm:w-full h-full sm:flex sm:flex-col sm:justify-center sm:items-stretch;
  }
  &__value {
    @apply font-bold text-[24px] py-[15px] px-[30px] rounded-[30px] bg-[#F3F3F3] text-left mb-[15px] mx-[10px] 
    flex items-center justify-start;
  }
  &__preset {
    @apply text-xs mr-1 mb-1;
  }
  &__presets {
    @apply flex items-center flex-wrap mb-4 mx-[10px];
  }
  .vue-slider {
    .vue-slider-process {
      @apply bg-red rounded-[10px];
    }
    .vue-slider-dot-handle {
      @apply border-none rounded-[10px] bg-red shadow-none outline-none filter hover:brightness-75;
      transition: filter theme("transitionDuration.200");
    }
    .vue-slider-rail {
      @apply bg-[#E9E9E9] rounded-[10px];
    }
  }
}
</style>
