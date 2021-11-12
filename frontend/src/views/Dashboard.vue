<template>
  <user-dashboard  :key="$route" v-if="mode === 'individual' || mode === undefined" v-bind:userId="dashboardIdToDisplay"/>
  <team-dashboard v-else :teamId="dashboardTeamIdToDisplay"/>
</template>

<script>
import userDashboard from "../components/dashboard/UserDashboard.vue";
import teamDashboard from "../components/dashboard/TeamDashboard.vue";

export default {
  name: "Dashboard",
  components: {
    userDashboard,
    teamDashboard
  },

  data: () => ({}),
  computed: {
    dashboardIdToDisplay() {
      return this.$route.query.userId ? this.$route.query.userId : this.$store.getters.currentUser.id;
    },
    dashboardTeamIdToDisplay() {
      return this.$route.query.teamId ? this.$route.query.teamId : null;
    },
    mode() {
      return this.$route.params.mode;
    }
  }
};
</script>

<style scoped>
</style>
