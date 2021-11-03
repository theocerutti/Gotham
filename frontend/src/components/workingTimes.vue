<template>
    <div>
        <v-card class="container">
            <h1>Your working times</h1>
            <div v-for="wt in allWorkingTimes" :key="wt" class="workingTime">
                <WorkingTime :dataOfWt="wt"/>
            </div>
        </v-card>
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
                  name: 'wt1',
                  start: '19:22',
                  end: '00:12'
              },
              {
                  name: 'wt2',
                  start: '09:22',
                  end: '18:12'
              },
              {
                  name: 'wt3',
                  start: '13:22',
                  end: '18:12'
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
          return this.$store.getters.getterMyWorkingTimes;
      }
  },
  mounted() {
      this.$store.dispatch('getMyWorkingTimes')
  }
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
    margin: 20px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
}
</style>