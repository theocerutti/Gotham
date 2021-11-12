<template>
  <div>
    <navigation/>
    <v-main>
      <v-container class="app-container">
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
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

<style scoped>
.app-container {
  min-height: 100%;
  width: 100%;
  max-width: 100%;
}
</style>