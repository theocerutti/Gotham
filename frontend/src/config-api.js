import Axios from "axios";
import store from "../src/store/index";
import {router} from "@/main";

const SERVER_URL = process.env.VUE_APP_API_URL;

const api = Axios.create({
  transformRequest: [(data, headers) => {
    if (store.getters.isLogged) {
      headers["Authorization"] = `Bearer ${store.state.auth.accessToken}`;
    }
    return data;
  }, ...Axios.defaults.transformRequest],
  baseURL: SERVER_URL
});

const isJwtExpirationError = (err) => {
  if (err.response && err.response.data) {
    const data = err.response.data;
    return data.statusCode === 401 && data.type === "ExpiredJwtToken";
  }
  return false;
};

api.interceptors.response.use((res) => {
  return res;
}, (err) => {
  const originalRequest = err.config;

  // if even after refetch an access token on /refresh route we receive a 401 code then go to login
  if (isJwtExpirationError(err) && originalRequest.url === "/api/auth/refresh") {
    router.push("/login");
    return Promise.reject(err);
  } else if (isJwtExpirationError(err) && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = store.state.auth.refreshToken;
    return api.post("/api/auth/refresh", {refresh_token: refreshToken}).then(res => {
      const newToken = res.data;
      store.commit("SET_ACCESS_TOKEN", newToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      return api(originalRequest);
    });
  }
  return Promise.reject(err);
});

export {api};