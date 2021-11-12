<template>
  <div class="container">
    <h1>Your account</h1>
    <v-card class="card-container mt-6">
      <v-card-title>Personal Information
        <v-btn icon @click="editOrSaveUser" color="primary">
          <v-icon v-if="!isEditing">mdi-pencil</v-icon>
          <v-icon v-else>mdi-checkbox-marked</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col cols="1" v-if="$vuetify.breakpoint.smAndUp">
            <v-subheader>
              <v-icon class="mr-2">mdi-account</v-icon>
              Username:
            </v-subheader>
          </v-col>
          <v-col cols="auto">
            <v-text-field :disabled="!isEditing" :flat="!isEditing" v-model="username" placeholder="Username"></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="1" v-if="$vuetify.breakpoint.smAndUp">
            <v-subheader>
              <v-icon class="mr-2">mdi-email</v-icon>
              Email:
            </v-subheader>
          </v-col>
          <v-col cols="auto">
            <v-text-field :disabled="!isEditing" v-model="email" :flat="!isEditing" placeholder="Email"></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="1" v-if="$vuetify.breakpoint.smAndUp">
            <v-subheader>
              <v-icon class="mr-2">mdi-security</v-icon>
              Role:
            </v-subheader>
          </v-col>
          <v-col cols="auto">
            <v-text-field disabled v-model="role" :flat="!isEditing" placeholder="Role"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-title>Delete your account</v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col :cols="$vuetify.breakpoint.smAndUp ? 3 : 12">
            <div>If you want to delete your account type DELETE in this area:</div>
          </v-col>
          <v-col cols="auto">
            <v-text-field v-model="deleteArea" :flat="!isEditing" placeholder="DELETE"></v-text-field>
          </v-col>
        </v-row>
        <v-btn :disabled="deleteArea !== 'DELETE'" @click="deleteMe" color="error">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-text>
      <div v-if="role === 'generalManager' || role === 'manager'">
        <v-card-title>Administrator Panel</v-card-title>
        <v-card-text>
          <div>This administrator panel is only visible by admin accounts.</div>
          <div v-if="role === 'generalManager'">
            <v-card-subtitle>Manager Users (promote/delete)</v-card-subtitle>
            <v-col>
              <v-btn @click="dialogManage = !dialogManage" color="primary">
                <v-icon>mdi-account-multiple-outline</v-icon>
              </v-btn>
            </v-col>
          </div>
          <v-card-subtitle>View users dashboard</v-card-subtitle>
          <v-col>
            <v-btn @click="dialogDashboard = !dialogDashboard" color="primary">
              <v-icon>mdi-view-dashboard</v-icon>
            </v-btn>
          </v-col>
        </v-card-text>
      </div>
    </v-card>

    <v-dialog v-model="dialogManage" :width="$vuetify.breakpoint.smAndUp ? '50%' : '100%'">
      <v-card>
        <v-card-title class="text-h5">
          Manage users
        </v-card-title>
        <div class="manage-users-dialog-container">
          <div v-for="u in allUsers" :key="u.id">
            <user-component :page="'account'" v-if="u.role !== 'generalManager'" :user="u"/>
          </div>
        </div>
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

    <v-dialog v-model="dialogDashboard" :width="$vuetify.breakpoint.smAndUp ? '50%' : '100%'">
      <v-card>
        <v-card-title class="text-h5">
          Users dashboard
        </v-card-title>
        <div class="manage-users-dialog-container">
          <div v-for="u in allUsers" :key="u.id">
            <user-component :page="'dashboard'" v-if="u.role !== 'generalManager'" :user="u"/>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialogDashboard = false"
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
      dialogDashboard: false,
      isEditing: false,
      username: "",
      email: "",
      role: "",
      deleteArea: ""
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
            }).then(
                this.isEditing = false
            )
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
.card-container,
.container {
  height: 100%;
  width: 100%;
}

.manage-users-dialog-container {
  padding: 20px;
  overflow-y: auto;
}
</style>