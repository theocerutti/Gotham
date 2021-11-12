import moment from "moment";
import {sortObject} from "@/utils/sort";

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
      state.currentUser.workingTimes.forEach(w => {
        if (w.id === workingTime.id) {
          workingTime.start = moment(workingTime.start).toISOString()
          workingTime.end = moment(workingTime.end).toISOString()
          w = workingTime
        }
      })
    }
  },
  actions: {
    getAllWorkingTimes({commit}) {
      this._vm.$api.get("/api/workingtimes/").then((res) => {
        commit("SET_WORKING_TIMES", res.data);
      });
    },
    createWorkingTime({commit}, workingTime) {
      this._vm.$api.post("/api/workingtimes", workingTime).then(res => {
        commit("ADD_WORKING_TIME", res.data);
        this._vm.$notify({text: "Working Time Created!", type: "success"});
      });
    },
    updateWorkingTime({commit}, workingTime) {
      this._vm.$api.put(`/api/workingtimes/${workingTime.id}`, workingTime).then(res => {
        commit("UPDATE_WORKING_TIME", workingTime);
        this._vm.$notify({text: "Working Time Updated!", type: "success"});
      });
    },
    deleteWorkingTime({commit}, workingTimeID) {
      commit("DELETE_WORKING_TIME", workingTimeID);
      this._vm.$api.delete(`/api/workingtimes/${workingTimeID}`).then(res => {
        this._vm.$notify({text: "A working time was successfully deleted!", type: "success"});
        commit("DELETE_WORKING_TIME", workingTimeID);
      });
    }
  },
  getters: {
    workingTimesByDay: state => {
      if (state.currentUser.workingTimes === null) return null;
      const wts = {};

      state.currentUser.workingTimes.forEach(wt => {
        const dateToken = moment(wt.start).format("YYYY-M-D");
        if (!wts[dateToken])
          wts[dateToken] = [];
        wts[dateToken].push(wt);
      });
      const sortedWt = sortObject(wts, (wt1, wt2) => moment(wt2[1][0].start).unix() - moment(wt1[1][0].start).unix());
      return Object.keys(sortedWt).map(wtKey => sortedWt[wtKey]); // object to map
    },
  },
};