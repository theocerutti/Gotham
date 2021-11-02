<template>
  <v-container  class="d-flex justify-center">
    <v-card class="w-50 rounded-lg">
      <v-container class="d-flex flex-column align-center">
        <v-row class="d-flex flex-column align-items">
          <v-text-field label="Username" v-model="username" :rules="rulesUsername"></v-text-field>
          <v-text-field label="Email" v-model="email" :rules="rulesEmail"></v-text-field>
          <v-text-field label="Password" v-mh-2odel="password"></v-text-field>
          <v-text-field label="Password Verification" v-model="passwordVerif"></v-text-field>
        </v-row>
        <v-row class="d-flex justify-content">
          
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
    email: '',
    password: '',
    passwordVerif: '',
    rulesUsername: [
      value => !!value || 'Required.',
      value => (value || '').length >= 3 || 'Min 3 characters'
    ],
    rulesEmail: [
      value => !!value || 'Required.',
      value => (value || '').length <= 20 || 'Max 20 characters',
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    ],
  }),
  
})
</script>



<style scoped>
  .w-50{
    width: 50%;    
  }

  /* .full-w-h{
    width: 100%;
    height: 100%;
  }

  .column{
    flex-direction: column;
  }

  .centering{
    display: flex;
    justify-content: center;
    align-items: center;
  } */
</style>