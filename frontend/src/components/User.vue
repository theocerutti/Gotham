<template>
  <div>
    <v-container>
      <v-row>
        <v-col :cols="6">
          <v-card height="450px" width="500px" id="card-user-infos" style="padding: 15px">
            <v-card-title>Welcome {{ username }}</v-card-title>
            <v-text-field style="width: 300px; margin-left: 25px" v-model="username" solo
                          prepend-inner-icon="mdi-account" placeholder="Username"></v-text-field>
            <v-text-field style="width: 300px; margin-left: 25px" v-model="email" solo prepend-inner-icon="mdi-email"
                          placeholder="Email"></v-text-field>
            <v-row dense>
              <v-col :cols="4">
                <v-card width="130px" height="110px">
                  <v-btn color="#64aacf" style="margin-left: 33px; margin-top: 33px">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col :cols="4">
                <v-card width="130px" height="110px">
                  <v-btn color="#64aacf" style="margin-left: 33px; margin-top: 33px">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col :cols="4">
                <v-card width="130px" height="110px">
                  <v-btn class="text-center" color="#64aacf" disabled style="margin-left: 33px; margin-top: 33px">
                    <v-icon>mdi-account</v-icon>
                  </v-btn>
                  <v-card-text class="text-center">employee</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col :cols="6">
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "User",
  props: {},
  data() {
    return {
      isUser: false,
      editUser: false,
      username: "",
      email: ""
    };
  },
  methods: {
    createUser() {
      this.isUser = true;
      this.editUser = false;
      console.log("user store infos :", this.$store.getters.getterAllUserInfos);
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
    }
  },
  async created() {
    const userInfos = this.$store.getters.getterAllUserInfos;
    await this.$store.dispatch("getUserById", userInfos.id);
    const user = this.$store.getters.getterAllUserInfos;
    if (user.username) {
      this.username = user.username;
      this.email = user.email;
      this.isUser = true;
    }
  }
};
</script>

<style scoped>
#card-user-infos {
  width: 40%;
}
</style>