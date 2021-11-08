import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Container from "@/views/Container";
import Auth from "@/views/Auth";

Vue.use(VueRouter);

const createRouter = (store) => {
  const authGuard = (to, from, next) => {
    if (!store.getters.isLogged) {
      next("/login");
    } else {
      next();
    }
  };

  const routes = [
    {
      path: "/login",
      name: "Login",
      component: Auth,
      props: () => ({action: "login"})
    },
    {
      path: "/register",
      name: "Register",
      component: Auth,
      props: () => ({action: "register"})
    },
    {
      path: "/",
      name: "Container",
      component: Container,
      beforeEnter: authGuard,
      redirect: "/time-tracker",
      children: [
        {
          path: "/",
          name: "Dashboard",
          component: () => import("../views/Dashboard")
        },
        {
          path: "/my-account",
          name: "MyAccount",
          component: () => import("../views/Account")
        },
        {
          path: "/time-tracker",
          name: "Time Tracker",
          component: () => import("../views/TimeTracker")
        },
      ]
    },
    {
      path: "/404",
      name: "Page404",
      component: () => import("../views/statusPage/Page404")
    },
    {path: "*", redirect: "/404"}
  ];

  return new VueRouter({
    mode: "history",
    base: process.env.BASE_URL, // TODO: get from env?
    routes
  });
};

export default createRouter;
