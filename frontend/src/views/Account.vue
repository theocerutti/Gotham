<template>
  <div>
    <v-card id="account-container">
      <user/>
    </v-card>
  </div>
</template>

<script>
import TeamManager from "../components/TeamManager.vue";
import User from "../components/User.vue";

export default {
  components: {User, TeamManager},
  name: "MyAccount",
};
</script>

<style scoped>
#team-container {
  margin-top: 50px !important;
}

#account-container, #team-container {
  padding: 30px;
  height: 100%;
}
</style>