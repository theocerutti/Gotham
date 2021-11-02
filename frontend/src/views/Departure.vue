<template>
    <div>
        <v-card id="departure-container">
            <clock-manager/>
        </v-card>
        <v-card id="workingtimes-container">
            <working-times/>
        </v-card>
    </div>
</template>

<script>
import ClockManager from '../components/ClockManager.vue'
import WorkingTimes from '../components/workingTimes.vue'

export default {
  components: { ClockManager, WorkingTimes },
  name: 'Departure',
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

  }
}
</script>

<style scoped>

#workingtimes-container {
    margin-top: 50px;
}

#departure-container, #workingtimes-container {
  background-color: rgb(87, 81, 81) !important;
  padding: 30px;
  height: 100%;
}

</style>