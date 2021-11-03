<template>
    <div>
        <v-card class="container">
            <h1>Your working times</h1>
             <v-card color="#C6D2D9">
                <v-row>
                    <v-col md="10">Today</v-col>
                    <v-col>Total: 7h</v-col>
                </v-row>
            </v-card>
            <div v-for="wt in allWorkTimes" :key="wt" class="workingTime">
                <WorkingTime :dataOfWt="wt"/>
            </div>
        </v-card>
        <v-divider></v-divider>
    </div>
</template>

<script>

import WorkingTime from './workingTime.vue'

export default {
    components: {WorkingTime},
  name: 'WorkingTimes',
  props: {
  },
  data() {
      return {
          userName: '',
          userId: '',
          workingTimes: '',
          allWorkTimes: [
              {
                  name: 'Mock-up',
                  start: '19:22',
                  end: '00:12',
                  description: "Making mock-up using Figma",
                  duration: "2"
              },
              {
                  name: 'API',
                  start: '09:22',
                  end: '18:12',
                  description: "Convert Elixir API in Nest API",
                  duration: "3"
              },
              {
                  name: 'Front-end',
                  start: '13:22',
                  end: '18:12',
                  description: "Making Front-end using Vuetify",
                  duration: "2"
              }
          ]
      }
  },
  methods: {
      getWorkingTimes() {

      },
  },
  computed: {
      allWorkingTimes() {
          return this.$store.getters.getterWorkingTimes;
      }
  },
//   created() {
//     this.$store.dispatch('getWorkingTimesById')    
//   }
}
</script>

<style scoped>


.container {
    height: 80%;
    width: 100%;
    background-color: rgb(102, 97, 97) !important;
}
h1 {
    margin: 20px;
}
.workingTime {
    background: #F2F6F8;
    color: black;
}
</style>