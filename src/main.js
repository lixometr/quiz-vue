import Vue from "vue";
import App from "./App.vue";
import PerfectScrollbar from "vue2-perfect-scrollbar";
import VueMask from "v-mask";
import VueCookies from "vue-cookies";
import "vue2-animate/dist/vue2-animate.min.css";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
import "@/assets/css/tailwind.css";

import "@/assets/css/styles.css";
Vue.config.productionTip = false;
Vue.use(PerfectScrollbar);
Vue.use(VueMask);
Vue.use(VueCookies);

Vue.prototype.$eventBus = new Vue();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
