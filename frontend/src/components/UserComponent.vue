<template>
  <v-card v-if="page === 'account'" class="wt">
    <v-row style="margin-bottom: 25px;" class="pa-3" align="center">
      <v-col>
        {{ user.username }}
      </v-col>
      <v-col>
        {{ user.role }}
      </v-col>
      <v-col :cols="2">
        <v-btn @click="promoteUser" :disabled="user.role === 'manager'" color="#64aacf"
               style="margin-left: 15px; margin-top: 15px">
          <v-icon>mdi-arrow-up-bold-hexagon-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col :cols="4">
        <v-btn color="#64aacf" style="margin-left: 15px; margin-top: 15px">
          <v-icon @click="deleteUser">mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
  <v-card v-else-if="page === 'team'" class="wt">
    <v-row style="margin-bottom: 25px;" class="pa-3" align="center">
      <v-col>
        {{ user.username }}
      </v-col>
      <v-col>
        {{ user.role }}
      </v-col>
      <v-col :cols="4">
        <v-btn @click="addUserToTeam" color="#64aacf" style="margin-left: 15px; margin-top: 15px">
          <v-icon>mdi-plus-box-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
  <v-card v-else-if="page === 'dashboard'" class="wt">
    <v-row style="margin-bottom: 25px;" class="pa-3" align="center">
      <v-col>
        {{ user.username }}
      </v-col>
      <v-col>
        {{ user.role }}
      </v-col>
      <v-col :cols="4">
        <v-btn @click="viewUserDashboard" color="#64aacf" style="margin-left: 15px; margin-top: 15px">
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>


export default {
  name: "SingleUserComponent",
  props: ["user", "page"],
  data() {
    return {};
  },
  methods: {
    promoteUser() {
      this.$store.dispatch("promoteUser", this.user.id);
    },
    deleteUser() {
      this.$store.dispatch("deleteUserById", this.user.id);
    },
    addUserToTeam() {
      this.$emit("addUser", this.user.id);
    },
    viewUserDashboard() {
      this.$router.push({name: "Dashboard", params: {mode: "individual"}, query: {userId: this.user.id}});
    }
  }
};
</script>

<style scoped>
</style>