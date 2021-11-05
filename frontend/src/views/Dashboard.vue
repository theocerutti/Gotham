<template>
  <user-dashboard v-bind:userId="this.$store.getters.getCurrentUserId"/>
</template>

<script>
import userDashboard from "../components/dashboard/UserDashboard.vue";

export default {
  name: "Dashboard",
  components: {
    userDashboard,
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
