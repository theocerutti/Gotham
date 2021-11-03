<template>
  <v-app>
    <notifications position="bottom right"/>
    <side-bar/>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import NotificationContainer from "../components/NotificationContainer";

export default {
  name: "Container",
  components: {
    SideBar,
    NotificationContainer
  },
};
</script>
