import {router} from "@/main";

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
      const userToUpdate = state.allUsers.find(el => el.id === payload.data.id);
      userToUpdate.role = payload.data.role;
    },
    DELETE_ONE_USER(state, payload) {
      state.allUsers = state.allUsers.filter(u => u.email !== payload.data.email);
    },
    SET_USER_TEAMS(state, payload) {
      state.currentUser.teams = payload.data;
    },
    SET_NEW_TEAM(state, payload) {
      state.currentUser.teams = [...state.currentUser.teams, payload.data];
    },
    ADD_USER_TO_TEAM(state, payload) {
      const team = state.currentUser.teams.find(el => el.id === payload.data.id);
      team.users = payload.data.users;
    },
    REMOVE_USER_FROM_TEAM(state, payload) {
      const team = state.currentUser.teams.find(el => el.id === payload.data.id);
      team.users = payload.data.users;
    },
    DELETE_TEAM(state, payload) {
      const index = state.currentUser.teams.findIndex(function (t) {
        return t.name === payload.data.name;
      });

      if (index !== -1)
        state.currentUser.teams.splice(index, 1);
    }
  },
  actions: {
    getAllUsers({commit}) {
      this._vm.$api.get("/api/users/all")
        .then((response) => {
          commit("SET_ALL_USERS", response);
        });
    },
    updateUser({commit}, payload) {
      this._vm.$api.put("/api/users", payload)
        .then((response) => {
          commit("SET_CURRENT_USER", response.data);
          this._vm.$notify({text: "User updated!", type: "success"});
        });
    },
    deleteUser({commit}) {
      this._vm.$api.delete("/api/users")
        .then(() => {
          commit("CLEAR_CURRENT_USER");
          this._vm.$notify({text: "User deleted!", type: "success"});
        });
    },
    promoteUser({commit}, payload) {
      this._vm.$api.post("/api/users/promote/" + payload)
        .then((response) => {
          commit("UPDATE_USER_ROLE", response);
          this._vm.$notify({text: "User promoted!", type: "success"});
        });
    },
    deleteUserById({commit}, payload) {
      this._vm.$api.delete("/api/users/" + payload)
        .then((response) => {
          commit("DELETE_ONE_USER", response);
          this._vm.$notify({text: "User deleted!", type: "success"});
        });
    },
    getMyTeams({commit}, payload) {
      this._vm.$api.get("/api/team")
        .then((response) => {
          commit("SET_USER_TEAMS", response);
        });
    },
    createNewTeam({commit}, payload) {
      this._vm.$api.post("/api/team", {
        userIds: [this.getters.currentUser.id],
        name: payload
      }).then((response) => {
        commit("SET_NEW_TEAM", response);
        this._vm.$notify({text: "Team created!", type: "success"});
      });
    },
    addUserToTeam({commit}, payload) {
      this._vm.$api.post("/api/team/" + payload.teamId + "/" + payload.userId)
        .then((response) => {
          commit("ADD_USER_TO_TEAM", response);
          this._vm.$notify({text: "User added to the team!", type: "success"});
        });
    },
    removeUserFromTeam({commit}, payload) {
      this._vm.$api.delete("/api/team/" + payload.teamId + "/" + payload.userId)
        .then((response) => {
          commit("REMOVE_USER_FROM_TEAM", response);
          this._vm.$notify({text: "User removed from the team!", type: "success"});
        });
    },
    deleteMe({commit}) {
      this._vm.$api.delete("/api/users")
        .then(() => {
          commit("CLEAR_CURRENT_USER");
          this._vm.$notify({text: "You have deleted your own account :(", type: "success"});
          router.push("/login");
        });
    },
    deleteTeam({commit}, payload) {
      this._vm.$api.delete("/api/team/" + payload)
        .then((response) => {
          commit("DELETE_TEAM", response);
          this._vm.$notify({text: "Team deleted!", type: "success"});
        });
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