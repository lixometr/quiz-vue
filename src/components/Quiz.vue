<template>
  <div
    class="quiz"
    :class="state"
    :style="`--main-color: ${mainColor}; --second-color: ${secondColor}; --card-bg-color: ${questionBackColor}; --button-text-color: ${buttonTextColor}`"
  >
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <div
        class="quiz__bg"
        :style="{ backgroundImage: `url(${bgImage})` }"
        :key="bgImage"
      ></div>
    </transition>
    <div
      class="quiz__content"
      :style="{ backgroundImage: `url(${bgContent})` }"
    >
      <transition
        mode="out-in"
        enter-active-class="flipInX"
        leave-active-class="flipOutX"
        @afterEnter="isEnter = true"
      >
        <quiz-start
          v-if="state === 'start' || state === 'questions'"
          v-bind="initialData.titles"
          :button="initialData.button"
          @submit="nextStep"
        />
        <quiz-loading
          v-else-if="state === 'loading'"
          @submit="nextStep"
          v-bind="loadingData"
        />
        <quiz-form
          v-else-if="state === 'form'"
          @submit="sendForm"
          v-bind="formData"
        />
        <quiz-results-content
          v-else-if="state === 'results'"
          v-bind="resultsData"
        />
      </transition>
    </div>
    <transition name="t-fade">
      <quiz-questions
        v-model="answers"
        v-if="state === 'questions'"
        :sessionId="sessionId"
        :item="firstQuestion"
        @submit="submitQuestions"
        :totalItems="questionsCount"
      />
    </transition>
    <quiz-results v-if="state === 'results'" v-bind="resultsData" />
    <transition name="t-fade">
      <quiz-form-image
        v-if="state === 'form' && isEnter"
        :imageBottom="formData.images.imageBottom"
      />
    </transition>
    <quiz-info
      :logo="initialData.images.logo"
      :tagline="initialData.titles.tagline"
      v-if="state !== 'results'"
    />
    <transition name="t-fade" mode="out-in">
      <quiz-questions-info v-if="state === 'questions' && isEnter" />
    </transition>
    <quiz-filters
      v-if="state === 'form' && isEnter"
      v-bind="filter"
      v-model="filtersData"
      @input="onChangeFiltersData"
    />
    <transition name="t-fade">
      <quiz-start-info
        v-if="state === 'start'"
        :text="initialData.titles.count"
      />
    </transition>
  </div>
</template>

<script>
import QuizForm from "./QuizForm/QuizForm.vue";
import QuizFormImage from "./QuizFormImage.vue";
import QuizInfo from "./QuizInfo.vue";
import QuizLoading from "./QuizLoading.vue";
import QuizQuestions from "./QuizQuestions/QuizQuestions.vue";
import QuizResults from "./QuizResults/QuizResults.vue";
import QuizResultsContent from "./QuizResults/QuizResultsContent.vue";
import QuizStart from "./QuizStart/QuizStart.vue";
import {
  getInitialData,
  completeQuiz,
  getFormData,
  sendFilters,
} from "@/api/quiz-routes";
import QuizQuestionsInfo from "./QuizQuestions/QuizQuestionsInfo.vue";
import QuizFilters from "./QuizFilters/QuizFilters.vue";
import QuizStartInfo from "./QuizStart/QuizStartInfo.vue";
export default {
  components: {
    QuizStart,
    QuizLoading,
    QuizQuestions,
    QuizResults,
    QuizForm,
    QuizResultsContent,
    QuizInfo,
    QuizFormImage,
    QuizQuestionsInfo,
    QuizFilters,
    QuizStartInfo,
  },
  data() {
    return {
      initialData: {
        colors: {},
        images: {},
        titles: {},
      },
      filtersData: {},
      formData: {
        images: {},
        screens: [
          {
            h1: "hey",
            button: "Go",
            type: "phone",
          },
          {
            h1: "Name",
            button: "Yup",
          },
        ],
      },
      filter: {
        title: "Изменить параметры подбора",
        filters: [
          {
            title: "стоимость",
            id: "price",
            presets: [2, 3, 5, 7],
            minValue: 2638100,
            limit: 4638100,
            value: 3638100,
            type: "rangeSlider",
          },
          {
            title: "комнатность",
            type: "buttons",
            id: "other",
            items: [
              { id: 0, value: "Студии", selected: false },
              { id: 1, value: "1-комнатные квартиры", selected: true },
            ],
            available: [0, 1], // show options with these id only. Other options must be hidden.
          },
          {
            title: "Районы",
            type: "listBox",

            id: "rooms",
            controls: true, // If enable show "select all" and "clear" button
            items: [
              { id: 0, value: "Юбилейный", selected: false },
              { id: 1, value: "Черемушки", selected: true },
              { id: 2, value: "sads", selected: true },
              { id: 3, value: "Черемуsadsaшки", selected: false },
              { id: 4, value: "Юбилеasdйный", selected: false },
              { id: 5, value: "Черемушки", selected: false },
            ],
            available: [0, 1, 2, 3, 4, 5], // show options with these id only. Other options must be hidden.
          },
        ],
      },
      resultsData: {},
      bgImage: "",
      answers: {},
      loadingData: {},
      questions: [],
      isEnter: false,
      stateIdx: 0,
      stateOrder: ["start", "questions", "loading", "form", "results"],
    };
  },
  computed: {
    questionsCount() {
      return this.initialData.questionsCount;
    },
    firstQuestion() {
      return this.initialData.question;
    },
    mainColor() {
      return this.initialData.colors.main1;
    },
    secondColor() {
      return this.initialData.colors.main2;
    },
    questionBackColor() {
      return this.initialData.colors.questionBack;
    },
    buttonTextColor() {
      return this.initialData.colors.buttonText;
    },
    bgContent() {
      return this.initialData.images.back2;
    },
    state() {
      return this.stateOrder[this.stateIdx];
    },
    sessionId() {
      return this.initialData.sessionId;
    },
  },
  created() {
    this.fetchInitial();
    this.$eventBus.$on("bg", (newBg) => {
      this.bgImage = newBg;
    });
  },
  methods: {
    onChangeFiltersData() {
      this.sendFilters();
    },
    async sendFilters() {
      const filters = Object.keys(this.filtersData).map((filterId) => ({
        id: filterId,
        values: this.filtersData[filterId],
      }));
      const newFilters = await sendFilters({
        sessionId: this.sessionId,
        filters,
      });
      const receivedFilters = newFilters.filters;
      this.filter.filters.map((filter) => {
        const updatedFilters = receivedFilters[filter.id];
        if (!updatedFilters) return;
        filter.available = updatedFilters;
      });
    },
    setFilters(filter) {
      filter.filters.forEach((filterItem) => {
        if (!filterItem.items) return;
        filterItem.items.forEach((item) => {
          if (!item.selected) return;
          if (!this.filtersData[filterItem.id]) {
            this.$set(this.filtersData, filterItem.id, []);
          }
          const newValue = [...this.filtersData[filterItem.id], item.id];
          this.$set(this.filtersData, filterItem.id, newValue);
        });
      });
      this.filter = filter;
    },
    async submitQuestions(loadingData) {
      try {
        this.loadingData = loadingData;
        this.formData = await getFormData({ sessionId: this.sessionId });
        this.setFilters(this.formData.screens[0].filter);
        this.bgImage = this.formData.images.imageBack;
        this.nextStep();
      } catch (err) {
        console.log(err);
      }
    },
    async sendForm({ phone, name }) {
      try {
        const normPhone = phone.replace(/[()\s-]/g, "");
        this.resultsData = await completeQuiz({
          phone: normPhone,
          name,
          sessionId: this.sessionId,
        });
        if (typeof gtag === "function")
          // eslint-disable-next-line no-undef
          gtag("event", this.initialData.targets.google[0], {
            event_category: this.initialData.targets.google[1],
            event_label: this.initialData.targets.google[2],
          });

        if (
          typeof ym === "function" &&
          this.initialData.targets.yandex.yMetrikaId
        )
          // eslint-disable-next-line no-undef
          ym(
            this.initialData.targets.yandex.yMetrikaId,
            "reachGoal",
            this.initialData.targets.yandex.yandexTarget,
            {}
          );
        this.nextStep();
        this.bgImage = this.resultsData.imageBack;
      } catch (err) {
        console.log(err);
      }
    },
    nextStep() {
      if (this.stateIdx < this.stateOrder.length - 1) {
        this.isEnter = false;

        this.stateIdx++;
      }
    },
    async fetchInitial() {
      try {
        const data = await getInitialData();
        this.initialData = data;
        this.bgImage = data.images.back1;
        //console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="postcss">
.quiz {
  @apply w-full min-h-screen relative pt-[60px] pb-[60px] flex flex-col md:pt-[60px] sm:pt-[60px];
  .quiz-info {
    @apply sm:invisible;
  }
  h1,
  h2 {
    @apply text-[35px] font-extrabold leading-[1.2] md:text-[30px] sm:text-[20px] sm:leading-tight;
  }
  &__bg {
    @apply z-10 absolute top-0 left-0 right-0 bottom-0 bg-center bg-no-repeat bg-cover;
    &::before {
      content: "";
      @apply absolute top-0 left-0 right-0 bottom-0 opacity-60;
      background: linear-gradient(180deg, #5b698b 0%, #000000 100%);
    }
  }
  &__content {
    @apply mb-auto relative overflow-hidden z-30
            w-[690px] pt-[100px] pl-[140px] pb-[80px] pr-[90px] bg-red rounded-tr-[30px] rounded-br-[30px]
            bg-cover bg-center bg-no-repeat
            flex flex-col
            md:pl-[120px] md:pt-[80px] md:pb-[70px]
            md:flex-none md:mb-auto md:w-[640px] 
            sm:w-full sm:pt-[30px] sm:px-[45px] sm:pb-[40px];
    box-shadow: 0px 4px 47px #000000;
    background-blend-mode: hard-light;
    @screen md {
      box-shadow: none;
    }
    > div {
      @apply flex-1;
    }
  }
  &__float-bar {
    @apply z-30 rounded-[30px] bg-cardBg
      pt-[50px] pb-[50px] sm:pt-[25px] sm:pb-[25px];
    box-shadow: 0px 4px 57px rgba(0, 0, 0, 0.25);
  }
  &.results {
    @apply md:pt-[70px] sm:pt-0;
  }
  &.results & {
    &__content {
      @apply pt-[60px] pr-[50px] pl-[60px] sm:mt-0 sm:rounded-tr-none
      sm:pt-[30px] sm:px-[30px];
      h1,
      h2 {
        @apply sm:text-[20px];
      }
    }
  }
}
.t-content-enter,
.t-content-leave-to {
  @apply transform translate-x-full opacity-0;
}
.t-content-enter-active,
.t-content-leave-active {
  @apply transition-all duration-500;
}
</style>
