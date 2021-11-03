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
};
</script>
