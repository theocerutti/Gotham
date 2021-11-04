export default {
  mutations: {
    SET_CURRENT_USER(state, payload) {
      state.currentUser.name = payload.username;
      state.currentUser.email = payload.email;
      state.currentUser.id = payload.id;
      state.currentUser.role = payload.role;
    },
    CLEAR_CURRENT_USER(state) {
      state.currentUser = {
        role: null,
        id: null,
        name: null,
        email: null,
        workingTimes: [],
      };
    }
  },
  actions: {
    updateUser({commit}, payload) {
      this._vm.$api.put("/api/users/" + this.state.userId, payload)
        .then((response) => {
          commit("SET_CURRENT_USER", response);
        });
    },
    deleteUser({commit}) {
      this._vm.$api.delete("/api/users/")
        .then((response) => {
          commit("CLEAR_CURRENT_USER", response);
        });
    },
  },
  getters: {},
};