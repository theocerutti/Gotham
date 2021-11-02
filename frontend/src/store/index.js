import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      workingTimes: [],
    },
    users: [],
    clock: {},
    userName: "",
    userEmail: "",
    userId: null
  },
  mutations: {
    SET_USER(state, payload) {
      console.log("SET_USER mutation payl: ", payload);
      state.userName = payload.data.username;
      state.userEmail = payload.data.email;
      state.userId = payload.data.id;
    },
    SET_ALL_USERS(state, payload) {
      state.users = payload.data;
    },
    DELETE_USER(state, payload) {
      console.log("PAYLOAD DELETE USER ", payload);
      state.userName = "";
      state.userEmail = "";
      state.userId = null;
    },
    SET_CLOCK(state, payload) {
      console.log("CLOCK mutation payload : ", payload);
      state.clock = payload.data.data;
    },
    SET_WORKINGTIME(state, payload) {
      state.currentUser.workingTimes = [...state.workingTimes, payload.data.data];
    },
    SET_WORKINGTIMES(state, payload) {
      state.currentUser.workingTimes = payload.data.data;
    }
  },
  actions: {

    // USER DISPATCHES

    setUser({commit}, payload) {
      console.log("action set user", payload);
      Axios
        .post("http://localhost:4000/api/users", payload)
        .then((response) => {
          commit("SET_USER", response);
        });
    },
    updateUser({commit}, payload) {
      Axios
        .put("http://localhost:4000/api/users/" + this.state.userId, payload)
        .then((response) => {
          commit("SET_USER", response);
        });
    },
    deleteUser({commit}) {
      Axios
        .delete("http://localhost:4000/api/users/" + this.state.userId)
        .then((response) => {
          commit("DELETE_USER", response);
        });
    },
    async getUserById({commit}, payload) {
      console.log("GET USER");
      await Axios
        .get("http://localhost:4000/api/users/" + payload)
        .then((response) => {
          commit("SET_USER", response);
        });
    },

    getAllUsers({commit}) {
      Axios
        .get("http://localhost:4000/api/users")
        .then((response) => {
          commit("SET_ALL_USERS", response);
        });
    },

    // CLOCK DISSET_ALL_USERSPATCHES 

    createClock({commit}, payload) {
      payload["userID"] = this.state.userId;

      Axios
        .post("http://localhost:4000/api/clocks", payload)
        .then((response) => {
          commit("SET_CLOCK", response);
        });
    },
    async getClockByUserId({commit}) {
      await Axios
        .get("http://localhost:4000/api/clocks/user/" + this.state.userId)
        .then((response) => {
          commit("SET_CLOCK", response);
        });
    },

    getClock() {
      Axios
        .get("http://localhost:4000/api/clocks")
        .then((response) => {
          console.log("getclockresp", response);
          // commit('SET_CLOCK', response.da)
        });
    },

    // WORKING TIMES DISPATCHES

    createWorkingTime({commit}, payload) {

      payload.working_time["user_id"] = this.state.userId;

      Axios
        .post("http://localhost:4000/api/workingtimes", payload)
        .then((response) => {
          commit("SET_WORKINGTIME", response);
        });
    },
    getWorkingTimesById({commit}) {
      Axios
        .get("http://localhost:4000/api/workingtimes/user/" + this.state.userId)
        .then((response) => {
          commit("SET_WORKINGTIMES", response);
        });
    }
  },
  getters: {
    getCurrentUserWorkingTimes: state => {
      return state.currentUser.workingTimes;
    },
    getterAllUserInfos: state => {
      return {
        username: state.userName,
        email: state.userEmail,
        id: state.userId
      };
    },
    getterUserClock: state => {
      return state.clock;
    },
    getterAllUsers: state => {
      return state.users;
    }
  },
  modules: {}
});
