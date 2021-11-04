<template>
  <v-app>
    <navigation/>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import NotificationContainer from "../components/NotificationContainer";

export default {
  name: "Container",
  components: {
    Navigation,
    NotificationContainer
  },
};
</script>