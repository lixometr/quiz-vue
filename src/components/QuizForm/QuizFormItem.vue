<template>
  <div class="quiz-form-item">
    <h2 class="mb-[40px] sm:mb-[30px]">
      {{ h1 }}
    </h2>
    <!-- <div class="sm:mx-[-20px] flex-1"> -->
    <!-- <div class="flex items-center mb-[50px] sm:mb-[30px]" v-if="false">
        <img
          :src="icon"
          alt="icon"
          class="w-[60px] sm:w-[50px] mr-[15px] sm:mr-[12px]"
          v-if="icon"
        />
        <div class="max-w-[280px] text-[20px] sm:text-[14px] font-bold">
          {{ h2 }}
        </div>
      </div> -->
    <form
      class="flex-1 sm:mx-[-20px] flex flex-col items-stretch justify-start"
      @submit.prevent="onSubmit"
    >
      <input
        type="text"
        v-model="value"
        class="quiz-form__input mt-8"
        :placeholder="placeholder"
      />
      <div
        class="mt-2 text-[14px] font-medium sm:text-[12px] sm:pl-[18px]"
        v-if="false"
      >
        {{ hint }}
      </div>
      <a-button color="white" class="mt-auto">{{ button }}</a-button>
      <div class="mt-1 text-[16px] sm:text-[14px]" v-if="false">
        {{ errorMessage }}
      </div>
    </form>
    <!-- </div> -->
  </div>
</template>

<script>
import AButton from "../AButton.vue";
export default {
  inheritAttrs: false,
  components: { AButton },
  props: {
    h1: String,
    h2: String,
    hint: String,
    placeholder: String,
    icon: String,
    button: String,
  },
  data: () => ({
    value: "",
    errorMessage: "",
  }),
  methods: {
    onSubmit() {
      this.$emit("submit", this.value);
    },
  },
  watch: {},
};
</script>

<style lang="postcss">
.quiz-form-item {
  @apply flex-1 flex flex-col items-stretch justify-start;
  .quiz-form__input {
    @apply text-2xl text-buttonText placeholder-buttonText placeholder-shown:font-light sm:text-lg;
  }
}
</style>
