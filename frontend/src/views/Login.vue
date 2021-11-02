<template>
  <div class="centering">
    <v-card class="card-login">
      <v-text-field :rules="rulesEmail">Username</v-text-field>
      <v-text-field :rules="rulesUsername">Password</v-text-field>
    </v-card>
  </div>
</template>

<script>

export default ({
  name: "Login",

  data: () => ({
      rulesEmail: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
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
  
})
</script>



<style scoped>
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