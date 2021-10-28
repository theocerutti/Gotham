<template>
  <v-container class="d-flex flex-wrap">
      <employee-working-time class="pa-2 width-45" />
      <team-working-time class="pa-2 width-45" />
      <team-working-time class="pa-2 width-45" />
      <employee-working-time class="pa-2 width-45" />
  </v-container>
</template>


<script>

  import EmployeeWorkingTime from '../components/charts/EmployeeWorkingTime.vue'
  import TeamWorkingTime from '../components/charts/TeamWorkingTime.vue'

  export default {
    name: 'Dashboard',

    components: {
      EmployeeWorkingTime,
      TeamWorkingTime
    },

    data: () => ({
      
    }),
  }
</script>

<style scoped>
  .width-45{
    width: 45%
  }
</style>
