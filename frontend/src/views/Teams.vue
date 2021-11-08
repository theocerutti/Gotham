<template>
  <div id="team-container">
      <v-btn style="margin-left: 37%; margin-bottom: 5%;" v-if="currentUser.role != 'user'" @click="createNewTeam" color="#64aacf">
          create new team
      </v-btn>
      <v-text-field style="width: 20%; margin-left: 37%" id="team-name-input" placeholder="Enter team name" v-model="teamName" v-show="createTeam">
      </v-text-field>
      <team-component :team="team" v-for="team in allMyTeams" :key="team.id"/>
  </div>
</template>

<script>

import TeamComponent from '../components/TeamComponent.vue'

export default {
  name: "Teams",
  components: { TeamComponent },
  props: {},
  data() {
    return {
        isTeamDetailsShow: false,
        createTeam: false,
        teamName: '',
    };
  },
  computed: {
      allMyTeams() {
          return this.$store.getters.getMyTeams;
      },
      currentUser() {
          return this.$store.getters.currentUser;
      }
  },
  methods: {
    createNewTeam() {
      if (!this.createTeam)
        this.createTeam = true;
      else
        this.$store.dispatch('createNewTeam', this.teamName)
    },
  },
  mounted() {
    this.$store.dispatch('getAllUsers') // charge la liste de tous les users pour le GeneralManager
    this.$store.dispatch('getMyTeams')
  }
};
</script>

<style scoped>

#team-container {
    padding: 50px;
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