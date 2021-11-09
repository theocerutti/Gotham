<template>
  <div>
    <v-card class="mb-6">
      <v-card-title>
        Hours of work in the current week
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
            Total hours of work this month: {{totalHoursThisMonth}}h
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
            <hours-last-weeks :labels="labelsHoursLastWeeks" :dataset="datasetHoursLastWeeks" />
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
    name: "Dashboard",
    components: {
      HoursCurrentWeek,
      HoursLastWeeks
    },

    props: {
      userId: Number
    },


    data: () => ({
      datasetHoursCurrentWeek: [],
      datasetHoursLastWeeks: [],
      labelsHoursLastWeeks: [],
      totalHours: 0,
      totalHoursThisMonth: 0,
      chartOptionsHoursInWeek: {
        responsive: true,
        maintainAspectRatio: false
      },
    }),

    async mounted() {
      api.get(`api/workingtimes/user/${this.userId}`, {
          params: {
            start: moment().startOf('isoWeek').toDate(),
            end: moment().endOf('isoWeek').toDate(),
            formatType: "hoursCurrentWeek"
          }
        })
        .then((res) => {
          this.datasetHoursCurrentWeek = res.data
        }).catch(err => this._vm.$notify({
          text: err.message,
          type: "error"
        }));


      api.get(`api/workingtimes/user/${this.userId}`, {
          params: {
            start: moment().subtract(4, 'weeks').startOf('week').toDate(),
            end: moment().subtract(1, 'weeks').endOf('isoWeek').toDate(),
            formatType: "hoursLastWeeks"
          }
        })
        .then((res) => {
          this.datasetHoursLastWeeks = res.data.dataset
          this.labelsHoursLastWeeks = res.data.labels
        });

      api.get(`api/workingtimes/user/${this.userId}`, {
          params: {
            formatType: "generalMetrics"
          }
        })
        .then((res) => {
          this.totalHours = res.data.totalHours
          this.totalHoursThisMonth = res.data.totalHoursThisMonth
        });

    },


    methods: {
      getStringCurrentWeek() {
        const firstday = moment().startOf('isoWeek').format("DD/MM/YYYY");
        const lastday = moment().endOf('isoWeek').format("DD/MM/YYYY");
        return `${firstday} - ${lastday}`
      },
    },
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