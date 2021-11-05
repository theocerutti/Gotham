<template>
  <div class="container">
    <div v-if="currentAction === 'login'">
      <v-container fluid>
        <v-row dense>
          <v-col :cols="6">
            <v-card class="container" width="500px" height="400px">
              <v-card-title>Login</v-card-title>
              <v-card-text align="center">Sign in to your account</v-card-text>
              <v-text-field v-model="username" solo prepend-inner-icon="mdi-account"
                            placeholder="Username"></v-text-field>
              <v-text-field v-model="password" solo prepend-inner-icon="mdi-lock"
                            placeholder="Password"></v-text-field>
              <v-btn class="mb-5" @click="signIn" color="#64aacf">
                sign in
              </v-btn>
            </v-card>
          </v-col>
          <v-col :cols="6">
            <v-card width="440px" height="400px" class="container" color="#64aacf">
              <v-card-title class="justify-center">Sign up</v-card-title>
              <v-card-text class="text-center">
                If you did not already registered, you can create account by clicking here !
              </v-card-text>
              <v-btn @click="currentAction = 'register'" color="#497d98">
                Sign up now !
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <v-container fluid>
        <v-row dense>
          <v-col :cols="6">
            <v-card class="container" width="500px" height="500px">
              <v-card-title>Register</v-card-title>
              <v-card-text align="center">Sign up</v-card-text>
              <v-text-field v-model="username" :rules="rulesUsername" solo prepend-inner-icon="mdi-account"
                            placeholder="Username"></v-text-field>
              <v-text-field v-model="email" :rules="rulesEmail" solo prepend-inner-icon="mdi-email"
                            placeholder="Email"></v-text-field>
              <v-text-field v-model="password" type='password' solo prepend-inner-icon="mdi-lock"
                            placeholder="Password"></v-text-field>
              <v-text-field v-model="rePassword" type='password' :rules="[passwordConfirmationRule]" solo
                            prepend-inner-icon="mdi-lock" placeholder="Password confirmation"></v-text-field>
              <v-btn class="mb-5" @click="signUp" color="#64aacf">
                sign up
              </v-btn>
            </v-card>
          </v-col>
          <v-col :cols="6">
            <v-card width="440px" height="500px" class="container" color="#64aacf">
              <v-card-title class="justify-center">Sign in</v-card-title>
              <v-card-text class="text-center">
                If you already have an account, you can sign in here !
              </v-card-text>
              <v-btn @click="currentAction = 'login'" color="#497d98">
                Sign in now !
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>

export default ({
  name: "Login",
  data: () => ({
    currentAction: "login",
    username: "",
    email: "",
    password: "",
    rePassword: "",
    rulesEmail: [
      value => !!value || "Required.",
      value => (value || "").length <= 30 || "Max 30 characters",
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    ],
    rulesUsername: [
      value => !!value || "Required.",
      value => (value || "").length >= 3 || "Min 3 characters"
    ],
  }),
  computed: {
    passwordConfirmationRule() {
      return () => (this.password === this.rePassword) || "Password must match";
    }
  },
  methods: {
    signIn() {
      this.$store.dispatch("loginUser", {
        username: this.username,
        password: this.password,
      });
    },
    signUp() {
      this.$store.dispatch("registerUser", {
        username: this.username,
        password: this.password,
        email: this.email,
      });
    }
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>