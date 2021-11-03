export default {
  mutations: {
    SET_HELLO(state, payload) {
      console.log("HELLO");
    }
  },
  actions: {
    getHello({commit}, payload) {
      return "hello";
    }
  },
  getters: {
    getHello(state) {
      return "hello";
    }
  },
};