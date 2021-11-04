<template>
  <v-card class="d-flex flex-wrap justify">
    <employee-working-time class="ma-2 width-45"/>
    <team-working-time class="ma-2 width-45"/>
    <team-working-time class="ma-2 width-45"/>
    <employee-working-time class="ma-2 width-45"/>
  </v-card>
</template>

<script>
import EmployeeWorkingTime from "../components/charts/EmployeeWorkingTime.vue";
import TeamWorkingTime from "../components/charts/TeamWorkingTime.vue";

export default {
  name: "Dashboard",
  components: {
    EmployeeWorkingTime,
    TeamWorkingTime
  },
  data: () => ({}),
};
</script>

<style scoped>
.width-45 {
  width: 45%
}

.justify {
  justify-content: center;
}
</style>
