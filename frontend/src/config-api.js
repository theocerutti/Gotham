import Axios from "axios";
import store from "../src/store/index";

const SERVER_URL = "http://localhost:4000/"; // TODO: get from env

export const api = Axios.create({
  transformRequest: [(data, headers) => {
    if (store.getters.isLogged) {
      headers["Authorization"] = `Bearer ${store.state.auth.loginToken}`;
    }
    return data;
  }, ...Axios.defaults.transformRequest],
  baseURL: SERVER_URL
});