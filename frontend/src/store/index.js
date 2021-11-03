import Vue from 'vue'
import Vuex from 'vuex'
import api from '../config-api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myWorkingTimes: [],
    workingTimes: [],
    users: [],
    clock: {},

    userName: '',
    userEmail: '',
    userId: null,
    userRole: '',

    loginToken: '',
  },
  mutations: {
    SET_USER (state, payload) {
      console.log("SET_USER mutation payl: ", payload)
      state.userName = payload.data.username
      state.userEmail = payload.data.email
      state.userId = payload.data.id
      state.userRole = payload.data.role
    },
    SET_ALL_USERS(state, payload) {
      state.users = payload.data
    },
    DELETE_USER(state, payload) {
      console.log("PAYLOAD DELETE USER ", payload)
      state.userName = ''
      state.userEmail = ''
      state.userId = null
    },
    SET_CLOCK(state, payload) {
      console.log('CLOCK mutation payload : ', payload)
      state.clock = payload.data.data
    },
    SET_WORKINGTIME(state, payload) {
      state.workingTimes = [...state.workingTimes, payload.data.data]
    },
    SET_WORKINGTIMES(state, payload) {
      state.workingTimes = payload.data.data;
    },
    SET_MY_WORKINGTIMES(state, payload) {
      state.myWorkingTimes = payload.data;
    },
    LOGIN(state, payload) {
      console.log("LOGIN mut ", payload)
      console.log("state", state)
      state.loginToken = payload.data;
    }
  },
  actions: {

    // USER DISPATCHES

    setUser ({ commit }, payload) {
      console.log('action set user', payload)
      api
        .post('http://localhost:4000/api/users', payload)
        .then((response) => {
          commit('SET_USER', response)
        })
    },
    getUser ({ commit }) {
      api
        .get('http://localhost:4000/api/users')
        .then((response) => {
          commit('SET_USER', response)
        })
    },
    updateUser ({ commit }, payload) {
      api
        .put('http://localhost:4000/api/users/' + this.state.userId, payload)
        .then((response) => {
          commit('SET_USER', response)
        })
    },
    deleteUser ({ commit }) {
      api
        .delete('http://localhost:4000/api/users/')
        .then((response) => {
          commit('DELETE_USER', response)
        })
    },
    async getUserById ({ commit }, payload) {
      console.log("GET USER")
      await api
        .get('http://localhost:4000/api/users/' + payload)
        .then((response) => {
          commit('SET_USER', response)
        })
    },

    getAllUsers ({ commit }) {
      api
        .get('http://localhost:4000/api/users')
        .then((response) => {
          commit('SET_ALL_USERS', response)
        })
    },
    
    User_register ({ commit }, payload) {
      api
        .post('http://localhost:4000/api/auth/register', payload)
    },

    User_login ({ commit }, payload) {
      api
        .post('http://localhost:4000/api/auth/login', payload)
        .then(response => {
          commit('LOGIN', response)
          this.dispatch('getUser')
        })
    },

    // CLOCK DISSET_ALL_USERSPATCHES 

    createClock ({ commit }, payload) {

      api
        .post('http://localhost:4000/api/clocks', payload)
        .then((response) => {
          commit('SET_CLOCK', response)
          this.dispatch('getMyWorkingTimes')
        })
    },
    async getClockByUserId ({ commit }) {
      await api
        .get('http://localhost:4000/api/clocks/user/' + this.state.userId)
        .then((response) => {
          commit('SET_CLOCK', response)
        })
    },

    getClock () {
      api
        .get('http://localhost:4000/api/clocks')
        .then((response) => {
          console.log("getclockresp", response)
          // commit('SET_CLOCK', response.da)
        })
    },

    // WORKING TIMES DISPATCHES

    createWorkingTime ({ commit }, payload) {

      payload.working_time['user_id'] = this.state.userId;

      api
        .post('http://localhost:4000/api/workingtimes', payload)
        .then((response) => {
          commit('SET_WORKINGTIME', response)
        })
    },
    getMyWorkingTimes ({ commit }, payload) {
      api
        .get('http://localhost:4000/api/workingtimes')
        .then((response) => {
          commit('SET_MY_WORKINGTIMES', response)
        })
    },
    getWorkingTimesById( {commit} ) {
      api
        .get('http://localhost:4000/api/workingtimes/user/' + this.state.userId)
        .then((response) => {
          commit('SET_WORKINGTIMES', response)
        })
    }
  },
  getters: {
    getterWorkingTimes: state => {
      return state.workingTimes;
    },
    getterMyWorkingTimes: state => {
      return state.myWorkingTimes;
    },
    getterAllUserInfos: state => {
      return {
        username: state.userName,
        email: state.userEmail,
        id: state.userId
      }
    },
    getterUserClock: state => {
      return state.clock
    },
    getterAllUsers: state => {
      return state.users;
    },
    isLogged: state => {
      if (state.loginToken.length > 20)
        return true;
      else
        return false;
    }
  },
  modules: {
  }
})
