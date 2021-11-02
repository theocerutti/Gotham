<template>
  <div>
    <v-card id="account-container">
      <user />
    </v-card>
    <v-card id="team-container" style="margin-top: 50px;">
      <team-manager/>
    </v-card>
  </div>
</template>

<script>
import TeamManager from '../components/TeamManager.vue'
import User from '../components/User.vue'

export default {
  components: { User, TeamManager },
  name: 'MyAccount',
  props: {
  },
  data() {
      return {
          
      }
  },
  methods: {
     
  },
  computed: {
    
  },
  created() {
    this.$store.dispatch('getAllUsers');
  }
}
</script>

<style scoped>

#team-container {
  margin-top: 50px !important;
}

#account-container, #team-container {
  background-color: rgb(87, 81, 81) !important;
  padding: 30px;
  height: 100%;
}


</style>