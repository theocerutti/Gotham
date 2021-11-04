<template>
  <div>
    <!--    <v-card class="container">
          <h1>My team {{ teamName }}</h1>
        </v-card>
        &lt;!&ndash; <v-card class="user" v-for="user in teamUsers" :key="user.id">
            {{ user.username }}
            {{ user.email }}
        </v-card> &ndash;&gt;
        <team-user :infos="user" v-for="user in teamUsers" :key="user.id"/>
        <div class="text-center">
          <v-dialog
            v-model="isAddingUser"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                style="margin-top: 30px;"
                color="red lighten-2"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Add user
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Add user to team {{ teamName }}
              </v-card-title>


              <v-card class="card-add-user" v-for="user in allUsers" :key="user.id">
                {{ user.username }}
                {{ user.email }}
                <v-btn
                  class="add-button"
                  color="red lighten-2"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="addUserToTeam(user.id)"
                >
                  Add user
                </v-btn>
              </v-card>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="isAddingUser = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>-->
  </div>
</template>

<script>
import TeamUser from "../components/TeamUser.vue";

export default {
  components: {TeamUser},
  name: "TeamsManager",
  props: {},
  data() {
    return {
      teamName: "ABC team",
      isAddingUser: false,
      teamUsers: [],
    };
  },
  methods: {
    addUserToTeam(uId) {
      const userToAdd = this.allUsers.find(usr => usr.id === uId);
      this.teamUsers = [...this.teamUsers, userToAdd];
    }
  },
  computed: {
    allUsers() {
      return this.$store.getters.getterAllUsers;
    }
  },
};
</script>

<style scoped>

v-dialog {
  background-color: gray !important;
}

.add-button {
  margin-left: 50px;
}

.card-add-user {
  padding: 20px;
  margin: 15px;
}

.container {
  height: 80%;
  width: 100%;
  background-color: rgb(102, 97, 97) !important;
}

h1 {
  margin: 20px;
}
</style>