import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import userStore from "./user";
import authStore from "./auth";
import workingTimeStore from "./workingTime";

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
      workingTimes: null,
      teams: []
    },
    workingTimesFormated: [],
    auth: {
      loginToken: "",
    },
    allUsers: [],
  },
  mutations: {
    ...userStore.mutations,
    ...authStore.mutations,
    ...workingTimeStore.mutations,
  },
  actions: {
    ...userStore.actions,
    ...authStore.actions,
    ...workingTimeStore.actions,
  },
  getters: {
    ...userStore.getters,
    ...authStore.getters,
    ...workingTimeStore.getters,
  },
  modules: {}
});
