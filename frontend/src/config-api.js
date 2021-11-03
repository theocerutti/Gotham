import Axios from 'axios';
import store from '../src/store/index'

const api = Axios.create({
    transformRequest: [(data, headers) => {
      if (store.getters.isLogged) {
        headers['Authorization'] = `Bearer ${store.state.loginToken}`
        console.log("api store.state.loginToken")
      }
      return data
    }, ...Axios.defaults.transformRequest],
    baseURL: "http://localhost:4000/"
});

export default api;