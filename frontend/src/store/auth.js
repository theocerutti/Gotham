import {router} from "@/main";

const TOKEN_AUTH_RES_HEADER = "authorization";

export default {
  mutations: {
    LOGIN(state, payload) {
      state.auth.loginToken = payload;
    },
    CLEAR_TOKEN(state) {
      state.auth.loginToken = null;
    }
  },
  actions: {
    registerUser({commit}, payload) {
      this._vm.$api.post("/api/auth/register", payload).then(res => {
        commit("LOGIN", res.headers[TOKEN_AUTH_RES_HEADER]);
        commit("SET_CURRENT_USER", res.data);
        router.push("/time-tracker");
      }).catch(err => this._vm.$notify({text: err.message, type: "error"}));
    },
    loginUser({commit}, payload) {
      this._vm.$api.post("/api/auth/login", payload).then(res => {
        commit("LOGIN", res.headers[TOKEN_AUTH_RES_HEADER]);
        commit("SET_CURRENT_USER", res.data);
        router.push("/time-tracker");
      }).catch(err => this._vm.$notify({text: err.message, type: "error"}));
    },
    logout({commit}) {
      commit("CLEAR_TOKEN");
      commit("CLEAR_CURRENT_USER");
      router.push("/auth");
    }
  },
  getters: {
    isLogged: state => {
      return state.auth.loginToken && state.auth.loginToken.length > 0;
    },
  },
};