import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import userStore from "./user";
import authStore from "./auth";
import workingTimeStore from "./workingTime";

Vue.use(Vuex);

const vueLocalStorage = new VuexPersist({
  storage: window.localStorage,
  reducer: (state) => ({
    currentUser: {
      role: state.currentUser.role,
      id: state.currentUser.id,
      name: state.currentUser.name,
      email: state.currentUser.email,
    },
    auth: state.auth,
  })
});

export default new Vuex.Store({
  plugins: [vueLocalStorage.plugin],
  state: {
    currentUser: {
      role: null,
      id: null,
      name: null,
      email: null,
      workingTimes: null,
      teams: []
    },
    auth: {
      accessToken: null,
      refreshToken: null,
    },
    workingTimesFormated: [],
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
