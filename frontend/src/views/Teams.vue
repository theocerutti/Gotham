<template>
  <div :class="{ 'team-container' : !isMobile }">
    <h1 class="mb-4">
      Your teams
    </h1>
    <v-btn :class="{'btn-web': !isMobile, 'btn-mob': isMobile}" v-if="currentUser.role !== 'user'" @click="createTeam = !createTeam" color="primary">
      create new team
    </v-btn>
    <div v-if="allMyTeams && allMyTeams.length === 0">
      <v-alert class="mt-5" prominent type="warning" shaped>
        <div>You don't belongs to any team!</div>
        <div>Wait for your manager to add you in a team!</div>
      </v-alert>
    </div>
    <team-component v-else :team="team" v-for="team in allMyTeams" :key="team.id"/>
    <v-dialog
      v-model="createTeam"
      :width="$vuetify.breakpoint.smAndUp ? '50%' : '100%'"
      scrollable>
      <v-card>
        <v-card-title class="text-h5">
          Create a new team
        </v-card-title>
        <div style="padding: 20px;">
          <v-text-field  id="team-name-input" placeholder="Enter team name" v-model="teamName">
          </v-text-field>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="createTeam = false">
            Close
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="createNewTeam">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>  </div>
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
      this.createTeam = false;
      this.$store.dispatch("createNewTeam", this.teamName);
      this.teamName = '';
    },
  },
  mounted() {
    this.$store.dispatch("getAllUsers");
    this.$store.dispatch("getMyTeams");
  }
};
</script>

<style scoped>
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