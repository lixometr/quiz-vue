<template>
  <div class="quiz-filters-range quiz-filters-item">
    <div class="quiz-filters-item__title">
      {{ title }}
    </div>
    <div class="quiz-filters-range__presets">
      <a-badge
        class="quiz-filters-range__preset"
        href="javascript:void(0)"
        @click.prevent="choosePreset(item)"
        v-for="(item, idx) in presets"
        :key="idx"
        >{{ item }} млн</a-badge
      >
    </div>
    <div class="quiz-filters-range__content">
      <div class="quiz-filters-range__value">
        <span class="text-red"> {{ normValue }}</span>
        <svgRuble width="10" class="ml-1 text-black" />
      </div>
      <div class="quiz-filters-range__slider">
        <VueSlider
          v-model="cValue"
          @drag-end="onSliderChange"
          :max="limit"
          :min="minValue"
          :dotSize="20"
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
    defaultValue: [Number, String],
    minValue: [Number],
    title: String,
  },
  data() {
    return {
      cValue: this.value || parseInt(this.minValue) || 0,
    };
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
    onSliderChange() {
      this.$emit("input", this.cValue);
    },
  },
  computed: {
    normValue() {
      function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
      return numberWithSpaces(this.cValue || 0);
    },
  },
  watch: {
    value() {
      this.cValue = this.value;
    },
  },
};
</script>

<style lang="postcss">
.quiz-filters-range {
  @apply sm:w-full sm:flex sm:flex-col sm:justify-center sm:items-stretch;
  &__value {
    @apply font-bold text-sm py-1.5 px-4 rounded-[30px] bg-[#F3F3F3] text-left 
    flex items-center justify-start w-[140px];
  }
  &__preset {
    @apply text-xs mr-1 mb-1;
  }
  &__presets {
    @apply flex items-center mb-2.5 flex-wrap;
  }

  &__content {
    @apply flex items-center w-full;
  }
  &__slider {
    @apply flex-1;
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
