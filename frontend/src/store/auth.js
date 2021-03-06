import {router} from "@/main";

export default {
  mutations: {
    LOGIN(state, payload) {
      state.auth.accessToken = payload.access_token;
      state.auth.refreshToken = payload.refresh_token;
    },
    SET_ACCESS_TOKEN(state, token) {
      state.auth.accessToken = token;
    },
    SET_REFRESH_TOKEN(state, token) {
      state.auth.refreshToken = token;
    },
    CLEAR_TOKENS(state) {
      state.auth.accessToken = null;
      state.auth.refreshToken = null;
    },
    GO_TO_DEFAULT_ROUTE_AFTER_AUTH() {
      router.push("/time-tracker");
    }
  },
  actions: {
    registerUser({commit}, payload) {
      this._vm.$api.post("/api/auth/register", payload).then(res => {
        commit("LOGIN", res.data.payload);
        commit("SET_CURRENT_USER", res.data.user);
        commit("GO_TO_DEFAULT_ROUTE_AFTER_AUTH");
        this._vm.$notify({text: "You registered successfully!", type: "success"});
      });
    },
    loginUser({commit}, payload) {
      this._vm.$api.post("/api/auth/login", payload).then(res => {
        commit("LOGIN", res.data.payload);
        commit("SET_CURRENT_USER", res.data.user);
        commit("GO_TO_DEFAULT_ROUTE_AFTER_AUTH");
        this._vm.$notify({text: "You are now logged!", type: "success"});
      });
    },
    logout({commit}) {
      commit("CLEAR_TOKENS");
      commit("CLEAR_CURRENT_USER");
      router.push("/login");
    }
  },
  getters: {
    isLogged: state => {
      const refreshToken = state.auth.refreshToken;
      return refreshToken && refreshToken.length > 0;
    },
  },
};