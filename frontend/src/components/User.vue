<template>
  <div>
    <v-container>
      <v-row>
        <v-col :cols="6">
          <v-card height="450px" width="500px" id="card-user-infos" style="padding: 15px;">
            <v-card-title class="justify-center">Welcome {{ username }}</v-card-title>
            <v-text-field :disabled="!isEditing" style="width: 300px; margin-left: 13%" v-model="username" solo
                          prepend-inner-icon="mdi-account" placeholder="Username"></v-text-field>
            <v-text-field :disabled="!isEditing" style="width: 300px; margin-left: 13%" v-model="email" solo
                          prepend-inner-icon="mdi-email"
                          placeholder="Email"></v-text-field>
            <v-text-field disabled style="width: 300px; margin-left: 13%" v-model="role" solo
                          prepend-inner-icon="mdi-security"
                          placeholder="Role"></v-text-field>
            <v-row dense style="margin-left: 10%">
              <v-col :cols="6">
                <v-card width="130px" height="110px">
                  <v-btn @click="editOrSaveUser" color="#64aacf" style="margin-left: 33px; margin-top: 33px">
                    <v-icon v-if="!isEditing">mdi-pencil</v-icon>
                    <v-icon v-else>mdi-checkbox-marked</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col :cols="6">
                <v-card width="130px" height="110px">
                  <v-btn @click="deleteMe" color="#64aacf" style="margin-left: 33px; margin-top: 33px">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col :cols="6">
          <v-card v-if="role === 'generalManager'" height="450px" width="500px" id="card-user-infos"
                  style="padding: 15px">
            <v-card-title class="justify-center">Administrator panel</v-card-title>
            <v-row dense>
              <v-col :cols="4">
                <v-card width="130px" height="110px">
                  <v-btn @click="dialogManage = !dialogManage" color="#64aacf"
                         style="margin-left: 33px; margin-top: 33px">
                    <v-icon>mdi-account-multiple-outline</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col :cols="4">
                <v-card width="130px" height="110px">
                  <v-btn @click="dialogDashboardes = !dialogDashboardes" color="#64aacf"
                         style="margin-left: 33px; margin-top: 33px">
                    <v-icon>mdi-view-dashboard</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col :cols="4">
                <v-card width="130px" height="110px">
                  <v-btn @click="deleteMe" class="text-center" color="#64aacf"
                         style="margin-left: 33px; margin-top: 33px">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
          <v-card v-else-if="role === 'manager'" height="450px" width="500px" id="card-user-infos"
                  style="padding: 15px">
            <v-card-title>Administrator panel</v-card-title>
            <v-row dense>
              <v-col :cols="4">
                <v-card width="130px" height="110px">
                  <v-btn @click="dialogDashboardes = !dialogDashboardes" color="#64aacf"
                         style="margin-left: 33px; margin-top: 33px">
                    <v-icon>mdi-view-dashboard</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col :cols="4">
                <v-card width="130px" height="110px">
                  <v-btn @click="deleteMe" class="text-center" color="#64aacf"
                         style="margin-left: 33px; margin-top: 33px">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>


    <v-dialog
      v-model="dialogManage"
      width="500">
      <v-card>
        <v-card-title class="text-h5">
          Manage users
        </v-card-title>

        <div id="manage-users-dialog-container">
          <div v-for="u in allUsers" :key="u.id">
            <user-component :page="'account'" v-if="u.role !== 'generalManager'" :user="u"/>
          </div>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialogManage = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogDashboardes"
      width="500">
      <v-card>
        <v-card-title class="text-h5">
          Users dashboard
        </v-card-title>

        <div id="manage-users-dialog-container">
          <div v-for="u in allUsers" :key="u.id">
            <user-component :page="'dashboard'" v-if="u.role !== 'generalManager'" :user="u"/>
          </div>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialogDashboardes = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import UserComponent from "../components/UserComponent.vue";


export default {
  components: {UserComponent},
  name: "User",
  props: {},
  data() {
    return {
      dialogManage: false,
      dialogDashboardes: false,
      isEditing: false,
      username: "",
      email: "",
      role: ""
    };
  },
  computed: {
    allUsers() {
      return this.$store.getters.getAllUsers;
    }
  },
  methods: {
    editOrSaveUser() {
      if (!this.isEditing) {
        this.isEditing = true;
      } else {
        this.$store.dispatch("updateUser", {
          email: this.email,
          username: this.username
        }).then(() => this.isEditing = false);
      }
    },
    createUser() {
      this.isUser = true;
      this.editUser = false;
      this.$store.dispatch("setUser", {
        email: this.email,
        username: this.username
      });
      this.$emit("saveUser", this.lastName);
    },
    saveUpdateUser() {
      this.editUser = false;
      this.$store.dispatch("updateUser", {
        email: this.email,
        username: this.username
      });
    },
    updateUser() {
      this.editUser = true;
    },
    getUser() {

    },
    deleteUser() {
      this.username = "";
      this.email = "";
      this.isUser = false;
      this.$store.dispatch("deleteUser");
    },
    deleteMe() {
      this.$store.dispatch("deleteMe");
    }
  },
  mounted() {
    this.$store.dispatch("getAllUsers");
    const usersInfos = this.$store.getters.currentUser;

    this.username = usersInfos.name;
    this.email = usersInfos.email;
    this.role = usersInfos.role;
  }
};
</script>

<style scoped>

#card-user-infos {
  width: 40%;
}

#manage-users-dialog-container {
  padding: 20px;
  overflow-y: auto;
}

</style>