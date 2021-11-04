<template>
    <div>
        <h1>This week</h1>
            <v-card color="primary">
                <v-card-text style="font-size:1.4em">
                    <v-row class="info--text">
                        <v-col md="10">Today</v-col>
                        <v-col>Total: 7h</v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        <div v-for="wt in allWorkTimes" :key="wt">
            <WorkingTime :dataOfWt="wt"/>
            <v-divider class="grey"></v-divider>
        </div>
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
                  duration: "2:00"
              },
              {
                  name: 'API',
                  start: '09:22',
                  end: '18:12',
                  description: "Convert Elixir API in Nest API",
                  duration: "3:00"
              },
              {
                  name: 'Front-end',
                  start: '13:22',
                  end: '18:12',
                  description: "Making Front-end using Vuetify",
                  duration: "2:00"
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
h1 {
    margin: 20px;
}
</style>