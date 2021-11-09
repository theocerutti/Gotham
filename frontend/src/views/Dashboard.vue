<template>
  <user-dashboard v-bind:userId="dashboardIdToDisplay"/>
</template>

<script>
import userDashboard from "../components/dashboard/UserDashboard.vue";

export default {
  name: "Dashboard",
  components: {
    userDashboard,
  },

  data: () => ({}),
  computed: {
    dashboardIdToDisplay() {
      return this.$route.query.userId ? this.$route.query.userId : this.$store.getters.currentUser.id;
    }
  }
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
