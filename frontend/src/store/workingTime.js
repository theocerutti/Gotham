export default {
  mutations: {
    SET_WORKING_TIMES(state, payload) {
      state.currentUser.workingTimes = payload;
    },
    DELETE_WORKING_TIME(state, workingTimeID) {
      state.currentUser.workingTimes = state.currentUser.workingTimes.filter(wt => wt.id !== workingTimeID);
    },
    ADD_WORKING_TIME(state, workingTime) {
      state.currentUser.workingTimes.unshift(workingTime);
    },
    UPDATE_WORKING_TIME(state, workingTime) {
      state.currentUser.workingTimes = state.currentUser.workingTimes.map(wt => {
        if (wt.id === workingTime.id)
          return workingTime;
        return wt;
      });
    }
  },
  actions: {
    getAllWorkingTimes({commit}) {
      this._vm.$api.get("/api/workingtimes/").then((res) => {
        commit("SET_WORKING_TIMES", res.data);
      }).catch(err => this._vm.$notify({text: err.message, type: "error"}));
    },
    createWorkingTime({commit}, workingTime) {
      this._vm.$api.post("/api/workingtimes", workingTime).then(res => {
        commit("ADD_WORKING_TIME", res.data);
        this._vm.$notify({text: "Working Time Created!", type: "success"});
      }).catch(err => this._vm.$notify({text: err.message, type: "error"}));
    },
    updateWorkingTime({commit}, workingTime) {
      this._vm.$api.put(`/api/workingtimes/${workingTime.id}`, workingTime).then(res => {
        commit("UPDATE_WORKING_TIME", workingTime);
        this._vm.$notify({text: "Working Time Updated!", type: "success"});
      }).catch(err => this._vm.$notify({text: err.message, type: "error"}));
    },
    deleteWorkingTime({commit}, workingTimeID) {
      commit("DELETE_WORKING_TIME", workingTimeID);
      this._vm.$api.delete(`/api/workingtimes/${workingTimeID}`).then(res => {
        this._vm.$notify({text: "A working time was successfully deleted!", type: "success"});
        commit("DELETE_WORKING_TIME", workingTimeID);
      }).catch(err => this._vm.$notify({text: err.message, type: "error"}));
    }
  },
  getters: {},
};