<template>
  <div :class="{ 'team-container' : !isMobile }">
    <h1>Teams</h1>
    <v-btn :class="{'btn-web': !isMobile, 'btn-mob': isMobile}" v-if="currentUser.role !== 'user'" @click="createNewTeam" color="primary">
      create new team
    </v-btn>
    <v-text-field style="width: 20%; margin-left: 37%" id="team-name-input" placeholder="Enter team name" v-model="teamName" v-show="createTeam"/>
    <div v-if="allMyTeams && allMyTeams.length === 0">
      <v-alert class="mt-5" prominent type="warning" shaped>
        <div>You don't belongs to any team!</div>
        <div>Wait for your manager to add you in a team!</div>
      </v-alert>
    </div>
    <team-component v-else :team="team" v-for="team in allMyTeams" :key="team.id"/>
  </div>
</template>

<script>
import TeamComponent from "../components/TeamComponent.vue";

export default {
  name: "Teams",
  components: {TeamComponent},
  props: {},
  data() {
    return {
      isTeamDetailsShow: false,
      createTeam: false,
      teamName: "",
    };
  },
  computed: {
    allMyTeams() {
      return this.$store.getters.getMyTeams;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  },
  methods: {
    createNewTeam() {
      if (!this.createTeam)
        this.createTeam = true;
      else {
        this.createTeam = false;
        this.$store.dispatch("createNewTeam", this.teamName);
      }
    },
  },
  mounted() {
    this.$store.dispatch("getAllUsers");
    this.$store.dispatch("getMyTeams");
  }
};
</script>

<style scoped>

.team-container {
  padding: 50px;
}

.btn-web {
  margin-left: 37%;
  margin-bottom: 5%;
}

.btn-mob {
  margin-left: 20%;
  margin-bottom: 5%;
}


#manage-users-dialog-container {
  padding: 20px;
  overflow-y: auto;
}

#team-name-input {
  width: 20%;
  margin-left: 37%;
}


</style>