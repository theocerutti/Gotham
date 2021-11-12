<template>
  <div>
    <v-card class="team-container">
      <span class="tooltip" style="cursor: pointer" @click="isTeamDetailsShow = !isTeamDetailsShow">
        {{ team.name }}
        <v-icon v-if="!isTeamDetailsShow">
          mdi-arrow-up-drop-circle-outline
        </v-icon>
        <v-icon v-else>
          mdi-arrow-down-drop-circle-outline
        </v-icon>
        <span v-if="!isTeamDetailsShow" class="tooltiptext">
          Show team details
        </span>
        <span v-else class="tooltiptext">
          Hide team details
        </span>
      </span>
      <div v-show="currentUser.role === 'generalManager' || currentUser.role === 'manager'">
        <v-btn @click="viewTeamDashboard" :class="{ 'team-dashboard-btn': !isMobile}" color="primary">
          <v-icon>
            mdi-chart-bar-stacked
          </v-icon>
        </v-btn>
        <v-btn @click="dialogTeam = !dialogTeam" style="margin-left: 5%" id="team-add-user" color="primary">
          <v-icon>
            mdi-account-plus
          </v-icon>
        </v-btn>
        <v-btn style="margin-left: 5%" @click="deleteTeam" color="primary">
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </div>

      <transition name="slide">
        <div style="margin-top: 5%;" v-show="isTeamDetailsShow">
          <v-card style="padding: 10px; margin: 15px; height: auto" v-for="u in team.users" :key="u.id">
            <span :class="{'spanWeb': !isMobile, 'spanMobile': isMobile}">
                {{ u.username }}
            </span>
            <v-divider v-if="!isMobile" style="height: 35px; margin-left: 15px; margin-right: 15px;" vertical></v-divider>
            <span :class="{'spanWeb': !isMobile, 'spanMobile': isMobile}">
              {{ u.email }}
            </span>
            <v-divider v-if="!isMobile" style="height: 35px; margin-left: 15px; margin-right: 15px;" vertical></v-divider>
            <span :class="{'spanWeb': !isMobile, 'spanMobile': isMobile}">
              {{ u.role }}
            </span>
            <v-divider v-if="!isMobile" style="height: 35px; margin-left: 50px;" vertical></v-divider>
            <span v-if="currentUser.role === 'generalManager' || currentUser.role === 'manager'">
              <v-btn @click="viewUserDashboard(u)" :class="{'user-dashboard': !isMobile, 'user-dashboard-mobile': isMobile }" color="primary">
                  <v-icon>
                      mdi-chart-bar
                  </v-icon>
              </v-btn>
              <v-btn :class="{'user-team-kick': !isMobile, 'user-team-kick-mobile': isMobile }" @click="removeUserFromTeam(u)" color="primary">
                  <v-icon>
                      mdi-account-minus
                  </v-icon>
              </v-btn>
            </span>
          </v-card>
        </div>
      </transition>
    </v-card>

    <v-dialog
      v-model="dialogTeam"
      :width="$vuetify.breakpoint.smAndUp ? '50%' : '100%'"
      scrollable>
      <v-card>
        <v-card-title class="text-h5">
          Add users to team
        </v-card-title>
        <div style="padding: 20px;" id="manage-users-dialog-container" class="manage-team-dialog-container">
          <div v-for="u in allUsers" :key="u.id">
            <user-component
              v-if="u.role != 'generalManager'"
              :page="'team'"
              :user="u"
              @addUser="addUserToTeam"/>
          </div>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
          color="primary"
          text
          @click="dialogTeam = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>  
</template>

<script lang="ts">

import UserComponent from "../components/UserComponent.vue";

export default {
  name: "TeamComponent",
  props: ["team"],
  components: {UserComponent},
  data() {
    return {
      isTeamDetailsShow: false,
      dialogTeam: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    allUsers() {
      const allUsrs = this.$store.getters.getAllUsers
      var usersAvailable = []
      var usersAlreadyInTeam = []

      this.team.users.forEach(u => {
        usersAlreadyInTeam.push(u)
      });
    
      usersAvailable = allUsrs.filter((u) => !usersAlreadyInTeam.find(({ id }) => u.id === id))

      return usersAvailable;
    },
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        return true;
      else
        return false;
    }
  },
  methods: {
    addUserToTeam(uId) {
      this.$store.dispatch("addUserToTeam", {
        userId: uId,
        teamId: this.team.id
      });
    },
    removeUserFromTeam(user) {
      this.$store.dispatch("removeUserFromTeam", {
        teamId: this.team.id,
        userId: user.id
      });
    },
    deleteTeam() {
      this.$store.dispatch("deleteTeam", this.team.id);
    },
    viewUserDashboard(user) {
      this.$router.push({name: "Dashboard", params: {mode: "individual"}, query: {userId: user.id}});
    },
    viewTeamDashboard() {
      this.$router.push({name: "Dashboard", params: {mode: "team"}, query: {teamId: this.team.id}});
    }
  }
};

</script>

<style scoped>

::v-deep .spanWeb {
  display: inline-block;
  width: 150px;
  text-align: center;
}

::v-deep .spanMobile {
  display: inline-block;
  width: 100%;
  text-align: center;
}


.user-dashboard {
  height: 25px;
  min-width: 40px;
  margin-left: 11%;
}

.user-dashboard-mobile {
  height: 25px;
  min-width: 40px;
  margin-left: 25%;
}

.user-team-kick {
  height: 25px;
  min-width: 40px;
  margin-left: 2%;
}

.user-team-kick-mobile {
  height: 25px;
  min-width: 40px;
  margin-left: 2%;
}

.team-dashboard-btn {
  margin-left: 55%;
}

#team-add-user {
  margin-left: 3%;
}

.team-container {
  /* height: 90px; */
  margin-bottom: 35px;
  padding: 15px;
}

.user-container {
  padding: 10px;
}


.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
.manage-team-dialog-container {
  padding: 20px;
  overflow-y: auto;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

</style>