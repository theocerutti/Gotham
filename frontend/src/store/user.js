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
        workingTimes: null,
        teams: []
      };
    },
    SET_ALL_USERS(state, payload) {
      state.allUsers = payload.data;
    },
    UPDATE_USER_ROLE(state, payload) {
      console.log("UPDATE USER ROLE ", payload)
      var userToUpdate = state.allUsers.find(el => el.id === payload.data.id)
      userToUpdate.role = payload.data.role
    },
    DELETE_ONE_USER(state, payload) {
      console.log("DELETE ONE USER ", payload)
      state.allUsers = state.allUsers.filter(u => u.email !== payload.data.email)
    },
    SET_USER_TEAMS(state, payload) {
      console.log("GET MY teams :", payload)
      state.currentUser.teams = payload.data;
    },
    SET_NEW_TEAM(state, payload) {
      console.log("SET NEW team : ", payload)
      state.currentUser.teams = [...state.currentUser.teams, payload.data]
    },
    ADD_USER_TO_TEAM(state, payload) {
      var team = state.currentUser.teams.find(el => el.id === payload.data.id)
      team.users = payload.data.users;
    },
    REMOVE_USER_FROM_TEAM(state, payload) {
      var team = state.currentUser.teams.find(el => el.id === payload.data.id)
      team.users = payload.data.users;
    },
    DELETE_TEAM(state, payload) {
      console.log("payload", payload)
    }
  },
  actions: {
    getAllUsers({ commit }) {
      this._vm.$api.get("/api/users/all")
        .then((response) => {
          commit("SET_ALL_USERS", response);
        })
    },
    updateUser({commit}, payload) {
      this._vm.$api.put("/api/users", payload)
        .then((response) => {
          commit("SET_CURRENT_USER", response);
        });
    },
    deleteUser({commit}) {
      this._vm.$api.delete("/api/users")
        .then((response) => {
          commit("CLEAR_CURRENT_USER", response);
        });
    },
    promoteUser({ commit }, payload) {
      this._vm.$api.post("/api/users/promote/" + payload)
        .then((response) => {
          commit("UPDATE_USER_ROLE", response);
        })
    },
    deleteUserById({ commit }, payload) {
      this._vm.$api.delete("/api/users/" + payload)
        .then((response) => {
          commit("DELETE_ONE_USER", response)
        })
    },
    getMyTeams({ commit }, payload) {
      this._vm.$api.get("/api/team")
      .then((response) => {
        commit("SET_USER_TEAMS", response)
      })
    },
    createNewTeam({ commit }, payload) {
      this._vm.$api.post("/api/team", {
        userIds: [this.getters.currentUser.id],
        name: payload
      })
      .then((response) => {
        commit("SET_NEW_TEAM", response)
      })
    },
    addUserToTeam({ commit }, payload) {
      this._vm.$api.post("/api/team/" + payload.teamId + "/" + payload.userId)
      .then((response) => {
        commit("ADD_USER_TO_TEAM", response)
      })
    },
    removeUserFromTeam({ commit }, payload) {
      this._vm.$api.delete("/api/team/" + payload.teamId + "/" + payload.userId)
      .then((response) => {
        commit("REMOVE_USER_FROM_TEAM", response)
      })
    },
    deleteMe({ commit }, payload) {
      this._vm.$api.delete("/api/users")
      .then((response) => {
        console.log(response),
        commit("CLEAR_CURRENT_USER")
      })
    },
    deleteTeam({ commit }, payload) {
      this._vm.$api.delete("/api/team/", payload)
      .then((response) => {
        commit("DELETE_TEAM", response)
      })
    }
  },
  getters: {
    getCurrentUser: state => {
      return state.currentUser;
    }
  },
  getters: {
    currentUser: state => {
      return state.currentUser;
    },
    getMyTeams: state => {
      return state.currentUser.teams;
    },
    getAllUsers: state => {
      return state.allUsers;
    },
  },
};