<template>
  <v-app>
    <NotificationContainer/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import NotificationContainer from "./components/NotificationContainer";

export default {
  name: "App",
  components: {
    NotificationContainer
  },
  mounted() {
    const darkTheme = localStorage.getItem("dark_theme");
    if (darkTheme) {
      this.$vuetify.theme.dark = darkTheme === "true";
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem(
        "dark_theme",
        this.$vuetify.theme.dark.toString()
      );
    }
  },
};
</script>
