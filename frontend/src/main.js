import Vue from "vue";
import App from "./App.vue";
import Notifications from "vue-notification";
import "./registerServiceWorker";
import store from "./store";
import vuetify from "./plugins/vuetify";
import createRouter from "@/router";
import {api} from "@/config-api";

Vue.config.productionTip = false;
Vue.prototype.$api = api;

export const router = createRouter(store);

// notif plugin
Vue.use(Notifications);

const app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

export default app;