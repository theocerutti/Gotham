import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import userStore from "./user";
import authStore from "./auth";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    currentUser: {
      role: null,
      id: null,
      name: null,
      email: null,
      workingTimes: [],
    },
    auth: {
      loginToken: "",
    },
  },
  mutations: {
    ...userStore.mutations,
    ...authStore.mutations,
  },
  actions: {
    ...userStore.actions,
    ...authStore.actions,
  },
  getters: {
    ...userStore.getters,
    ...authStore.getters,
  },
  modules: {}
});
