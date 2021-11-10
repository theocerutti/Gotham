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
          <hours-current-week :dataset="datasetHoursCurrentWeek" />
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
            Total hours of work: {{totalHours}}h
          </v-card-text>
          <v-card-text>
            Total hours of work this month: {{totalHoursMonth}}h
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
            <hours-last-weeks :labels="labels" :dataset="hoursLast4weeks" />
          </div>
        </div>
      </v-card>
    </div>
    
  </div>
</template>

<script>
  import HoursCurrentWeek from "../charts/HoursCurrentWeek.vue";
  import HoursLastWeeks from "../charts/HoursLastWeeks.vue"
  import moment, { min } from 'moment'
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
        requestResponse: [],
        datasetHoursCurrentWeek: [],
        totalHours: 0,
        totalHoursMonth: 0,
        hoursLast4weeks: [],
        labels: []
    }),

    methods: {
      getStringCurrentWeek() {
        const firstday = moment().startOf('isoWeek').format("DD/MM/YYYY");
        const lastday = moment().endOf('isoWeek').format("DD/MM/YYYY");
        return `${firstday} - ${lastday}`
      },
      calculateDiffEndStart(start, end) {
          return Math.abs(new Date(end).valueOf() - new Date(start).valueOf()) / 3600000;
      },
      parseWt() {
          var allWt = []
          const workingTimesSortedByDays = {}
          var hoursPerDay = []
          var i = -1

          this.requestResponse.users.forEach(u => {
              u.workingtimes.forEach(wt => {
                  allWt.push(wt)
              })
          });

          const wtCurrWeek = allWt.filter(wt => {
            return wt.start >= moment().startOf('isoWeek').toDate().toISOString();
          })

          for (const work of wtCurrWeek) {
            const dateKey = new Date(work.start).getDay();
            if (!workingTimesSortedByDays[dateKey])
              workingTimesSortedByDays[dateKey] = []
            workingTimesSortedByDays[dateKey].push(work)
          }
          for (const key in workingTimesSortedByDays) {
            i+=1;
            hoursPerDay[i] = 0
            for (const wt in workingTimesSortedByDays[key]) {
              hoursPerDay[i] += parseInt(this.calculateDiffEndStart(workingTimesSortedByDays[key][wt].start, workingTimesSortedByDays[key][wt].end).toFixed(2))
            }
          }

          this.labels = [47, 48, 49, 50]

          this.datasetHoursCurrentWeek = hoursPerDay;
      },
      getTotalHours() {
        var totalHours = 0
        const allUsers = this.requestResponse.users;
        allUsers.forEach(u => {
          u.workingtimes.forEach(w => {
            totalHours += this.calculateDiffEndStart(w.start, w.end)
          })
        })
        this.totalHours = totalHours.toFixed(2)
      },
      getTotalHoursMonth() {
        var totalHours = 0
        this.requestResponse.users.forEach(u => {
          u.workingtimes.forEach(w => {
            if (w.start >= moment().startOf('month').toDate().toISOString()) {
              totalHours += this.calculateDiffEndStart(w.start, w.end)
            }
          })
        })
        this.totalHoursMonth = totalHours.toFixed(2)
      },
      getHoursLastWeeks() {
        var thisweek = moment().isoWeek();
        var wLastWeeks = []
        var ret = []
        var minWeek = 57;

        this.requestResponse.users.forEach(u => {
          u.workingtimes.forEach(w => {
            if (w.start >= moment().subtract(4, 'week').startOf('isoWeek').toISOString()) {
              wLastWeeks.push(w);
            }
          })
        })

        wLastWeeks.forEach(w => {
          if (moment(w.start).isoWeek() < minWeek) {
            minWeek = moment(w.start).isoWeek()
          }
        })

        wLastWeeks.forEach(w => {
          if (!ret[moment(w.start).isoWeek() - minWeek])
            ret[moment(w.start).isoWeek() - minWeek] = 0
          ret[moment(w.start).isoWeek() - minWeek] += this.calculateDiffEndStart(w.start, w.end)
        })

        this.hoursLast4weeks = ret;
      }
    },
    mounted() {
        api.get(`api/team/one/${this.teamId}/workingtimes`)
        .then((response) => {
            this.requestResponse = response.data;
            this.parseWt()
            this.getTotalHours()
            this.getTotalHoursMonth()
            this.getHoursLastWeeks()
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