<template>
  <div class="quiz-form-phone">
    <h2 class="mb-[40px] sm:mb-[30px]">
      {{ h1 }}
    </h2>
    <div class="sm:mx-[-20px]">
      <div class="flex items-center mb-[50px] sm:mb-[30px]">
        <img
          :src="icon"
          alt="icon"
          class="w-[60px] sm:w-[50px] mr-[15px] sm:mr-[12px]"
          v-if="icon"
        />
        <div class="max-w-[280px] text-[20px] sm:text-[14px] font-bold">
          {{ h2 }}
        </div>
      </div>
      <form @submit.prevent="onSubmit">
        <input
          type="text"
          v-model="phone"
          class="quiz-form__input"
          v-mask="'+7(###) ###-##-##'"
          placeholder="+7 (       ) ___ - __ - __ "
        />
        <div class="mt-2 text-[14px] font-medium sm:text-[12px] sm:pl-[18px]">
          {{ hint }}
        </div>
        <a-button color="white" class="mt-[40px] sm:mt-[35px]">{{
          button
        }}</a-button>
        <div class="mt-1 text-[16px] sm:text-[14px]">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import AButton from "../AButton.vue";

export default {
  components: { AButton },
  props: {
    h1: String,
    h2: String,
    hint: String,
    icon: String,
    button: String,
  },
  data: () => ({
    phone: "",
    errorMessage: "",
  }),
  methods: {
    onSubmit() {
      if (!this.validate()) {
        this.errorMessage = "Вы ввели неправильный номер телефона";
        return;
      }
      this.$emit("submit", this.phone);
    },
    validate() {
      const results = this.phone.match(/\d/g);
      return results?.length === 11;
    },
  },
  watch: {
    phone() {
      this.errorMessage = "";
    },
  },
};
</script>

<style lang="postcss"></style>
