<template>
  <div>
    <v-card class="mb-6">
      <v-card-title>
        Hours of work in the current week for the team
      </v-card-title>
      <v-card-subtitle>
        {{getStringCurrentWeek()}}
      </v-card-subtitle>
      <div class="d-flex justify-center">
        <div class="w-80 my-10" relative>
          <!-- <hours-current-week :dataset="datasetHoursCurrentWeek" /> -->
        </div>
      </div>
    </v-card>
    <div class="d-flex flex-wrap justify-space-between w-100">
      <v-card class="min-width-card mb-6">
        <v-card-title class='mb-12'>
          General metrics
        </v-card-title>
        <div>
          <v-card-text>
            <!-- Total hours of work: {{totalHours}}h -->
          </v-card-text>
          <v-card-text>
            <!-- Total hours of work this month: {{totalHoursThisMonth}}h -->
          </v-card-text>
        </div>
      </v-card>
      <v-card class="min-width-card mb-6">
        <v-card-title>
          Hours of work last for weeks
        </v-card-title>
        <v-card-subtitle>
          Compare hours count of lasts weeks
        </v-card-subtitle>
        <div class="d-flex justify-center">
          <div class="my-10 mx-15">
            <!-- <hours-last-weeks :labels="labelsHoursLastWeeks" :dataset="datasetHoursLastWeeks" /> -->
          </div>
        </div>
      </v-card>
    </div>
    
  </div>
</template>

<script>
  import HoursCurrentWeek from "../charts/HoursCurrentWeek.vue";
  import HoursLastWeeks from "../charts/HoursLastWeeks.vue"
  import moment from 'moment'
  import { api } from "../../config-api.js"


  export default {
    name: "DashboardTeam",
    components: {
      HoursCurrentWeek,
      HoursLastWeeks
    },

    props: {
        teamId: Number
    },


    data: () => ({
        requestResponse: []
    }),


    methods: {
      getStringCurrentWeek() {
        const firstday = moment().startOf('isoWeek').format("DD/MM/YYYY");
        const lastday = moment().endOf('isoWeek').format("DD/MM/YYYY");
        return `${firstday} - ${lastday}`
      },
      calculateDiffEndStart(start, end) {
          console.log("a", end, start)
          return Math.abs(end.valueOf() - start.valueOf()) / 3600000;
      },
      parseWt() {
          console.log("parse wt", this.requestResponse)
          var allWt = []
          this.requestResponse.users.forEach(u => {
              u.workingtimes.forEach(wt => {
                  allWt.push(wt)
              })
          });
          console.log("ALL WT parse ", allWt)
          
        //   const wtThisMonth = workingTimes.filter(workingtime => { // trie les wt entre 2 dates
        //   return workingtime.start >= moment().startOf('month').toDate() && moment().toDate();
        //     });
      }
    },
    mounted() {
        console.log(new Date("2018-09-16T00:18:00.000Z"))
        console.log(this.calculateDiffEndStart(new Date("2018-09-16T10:00:00.000Z"),  new Date("2018-09-16T18:00:00.000Z")));

        api.get(`api/team/one/${this.teamId}/workingtimes`)
        .then((response) => {
            this.requestResponse = response.data;
            this.parseWt()
        })
    }
  };
</script>

<style scoped>

  .w-100 {
    width: 100%;
  }

  .w-80 {
    width: 80%;
  }

  .min-width-card {
    min-width: 49%;
  }

  @media only screen and (max-width: 1000px){
    .min-width-card {
      min-width: 100%;
  }
  }

</style>