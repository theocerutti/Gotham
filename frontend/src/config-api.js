import Axios from "axios";
import store from "../src/store/index";

const SERVER_URL = process.env.VUE_APP_API_URL;

export const api = Axios.create({
  transformRequest: [(data, headers) => {
    if (store.getters.isLogged) {
      headers["Authorization"] = `Bearer ${store.state.auth.loginToken}`;
    }
    return data;
  }, ...Axios.defaults.transformRequest],
  baseURL: SERVER_URL
});