<template>
  <v-container  class="d-flex justify-center">
    <v-card class="w-50 rounded-lg">
      <v-container class="d-flex flex-column align-center">
        <v-row class="d-flex flex-column align-items">
          <v-text-field label="Username" v-model="username" :rules="rulesUsername"></v-text-field>
          <v-text-field label="Password" :type="'password'" v-model="password"></v-text-field>
        </v-row>
        <v-row class="d-flex justify-content">
        <v-btn @click="login">
          LOGIN
        </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>

export default ({
  name: "Login",

  data: () => ({
      username: '',
      password: '',
      rulesEmail: [
        value => !!value || 'Required.',
        value => (value || '').length <= 30 || 'Max 30 characters',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],
      rulesUsername: [
        value => !!value || 'Required.',
        value => (value || '').length >= 3 || 'Min 3 characters'
      ],
    }),
    methods: {
      login() {
        var self = this;
        this.$store.dispatch('User_login', {
          username: this.username,
          password: this.password
        }).then(
          setTimeout(function() {
            self.$router.push({ name: 'MyAccount' })
          }, 1500)
        )
      }
    }
  
})
</script>



<style scoped>

  .w-50{
    width: 50%;    
  }
  .card-login{
    width: 40%;
    height: 40%;
    border-radius: 20px;
  }

  .centering{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>