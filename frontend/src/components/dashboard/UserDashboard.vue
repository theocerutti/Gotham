<template>
  <div>
    <h1 class="mb-4">{{ dashboardWelcome }}</h1>
    <v-card class="mb-6">
      <v-card-title>
        Hours of work of the current week - {{ totalHoursWeekFormatted }}
      </v-card-title>
      <v-card-subtitle>
        {{ getStringCurrentWeek }}
      </v-card-subtitle>
      <v-card-subtitle>
        <v-btn @click="test">test</v-btn>
      </v-card-subtitle>
      <div class="d-flex justify-center">
        <div class="w-80 my-10">
          <hours-current-week :dataset="datasetHoursCurrentWeek" :userId="user.id" :key="componentKey"/>
        </div>
      </div>
    </v-card>
    <v-card class="mb-6">
      <v-card-title>
        Compare two weeks
      </v-card-title>
      <div class="d-flex justify-space-around">
        <div class="w-20">
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
            transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field color="red" v-model="week1" label="Choose a week" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="week1" :min="min" :max="max" range no-title scrollable :first-day-of-week="1">
              <v-spacer></v-spacer>
              <v-btn text color="accent" @click="menu = false, week1 = null">
                Cancel
              </v-btn>
              <v-btn text color="accent" @click="menu = false, getDatasetWeek1()">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu ref="menu" v-model="menu2" :close-on-content-click="false"
            transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field color="blue" v-model="week2" label="Choose a second week" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="week2" :min="min" :max="max" range no-title scrollable :first-day-of-week="1">
              <v-spacer></v-spacer>
              <v-btn text color="accent" @click="menu2 = false, week2 = null">
                Cancel
              </v-btn>
              <v-btn text color="accent" @click="menu2 = false, getDatasetWeek2()">
                OK
              </v-btn> 
            </v-date-picker>
          </v-menu>

        </div>
        <div class="w-60 my-10">
          <compare-two-weeks :datasets="compareDatasets" :labels="compareLabels" />
        </div>
      </div>
    </v-card>
    <div class="d-flex flex-wrap justify-space-between w-100">
      <v-card class="min-width-card mb-6">
        <v-card-title class='mb-12'>
          General metrics
        </v-card-title>
        <v-card-text>
          <v-row align="center">
            <v-col align="center">
              <div class="hours-text">{{ totalHoursFormatted }}</div>
              <div>Total hours of work</div>
            </v-col>
            <v-col align="center">
              <div class="hours-text">{{ totalHoursMonthFormatted }}</div>
              <div>Total hours of work this month</div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="min-width-card mb-6">
        <v-card-title>
          Hours of work of last weeks
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
  import HoursLastWeeks from "../charts/HoursLastWeeks.vue";
  import CompareTwoWeeks from "../charts/CompareTwoWeeks.vue";
  import moment from "moment";
  import {
    api
  } from "@/config-api";

  export default {
    name: "DashboardUser",
    components: {
      HoursCurrentWeek,
      HoursLastWeeks,
      CompareTwoWeeks
    },
    props: {
      userId: Number
    },
    data: () => ({
      user: null,
      datasetHoursCurrentWeek: [],
      datasetHoursLastWeeks: [],
      labelsHoursLastWeeks: [],
      totalHours: 0,
      totalHoursThisMonth: 0,
      chartOptionsHoursInWeek: {
        responsive: true,
        maintainAspectRatio: false
      },
      workingTimes : [],
      min: null,
      max: null,
      menu: false,
      menu2: false,
      week1: null,
      week2: null,
      compareDatasets: {week1: [], week2: []},
      compareLabels: {week1: "", week2: ""},
      componentKey: 0
    }),
    computed: {
      dashboardWelcome() {
        if (this.user) {
          if (this.user.id === this.$store.getters.currentUser.id)
            return "Your dashboard";
          else
            return `Dashboard of ${this.user.username}`;
        }
        return "";
      },
      totalHoursWeekFormatted() {
        const totalHoursWeek = this.datasetHoursCurrentWeek.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        return moment({
          hour: totalHoursWeek
        }).format("H [h]");
      },
      totalHoursFormatted() {
        return `${Math.floor(this.totalHours)} h`;
      },
      totalHoursMonthFormatted() {
        return `${Math.floor(this.totalHoursThisMonth)} h`;
      },
      getStringCurrentWeek() {
        const firstday = moment().startOf("isoWeek").format("DD/MM/YYYY");
        const lastday = moment().endOf("isoWeek").format("DD/MM/YYYY");
        return `${firstday} - ${lastday}`;
      },
    },
    mounted() {
      api.get(`/api/users/${this.userId}`).then(res => {
        this.user = res.data;
      });

      api.get(`api/workingtimes/user/${this.userId}`, {
        params: {
          formatType: "userDashboard"
        }
      }).then((res) => {
        this.workingTimes = res.data.workingTimes
        this.datasetHoursCurrentWeek = res.data.hoursCurrentWeek;
        this.datasetHoursLastWeeks = res.data.hoursLastWeeks.dataset;
        this.labelsHoursLastWeeks = res.data.hoursLastWeeks.labels;
        this.totalHours = res.data.generalMetrics.totalHours;
        this.totalHoursThisMonth = res.data.generalMetrics.totalHoursThisMonth;
        this.min = res.data.minDate
        this.max = moment().endOf('isoWeek').format("YYYY-MM-DD")
      });
    },
    methods: {
      getDatasetWeek1(){
        this.compareDatasets.week1 = this.getDataset(this.week1);
        this.compareLabels.week1 = `${this.week1[0]}/${this.week1[1]}`;
      },

      getDatasetWeek2(){
        this.compareDatasets.week2 = this.getDataset(this.week2)
        this.compareLabels.week2 = `${this.week2[0]} - ${this.week2[1]}`
      },


      getDataset(week){
        const weekWT = this.workingTimes.filter(workingtime => {
          return workingtime.start >= moment(week[0]).format("YYYY-MM-DD[T]HH:mm:ss") && workingtime.end <= moment(week[1]).format("YYYY-MM-DD[T]HH:mm:ss");
        });

        const workingTimesSortedByDays = {}
        for(const wt of weekWT){
          const dateKey = moment(wt.start).toDate().getDay();
          if (!workingTimesSortedByDays[dateKey])
            workingTimesSortedByDays[dateKey] = [];
          workingTimesSortedByDays[dateKey].push(wt);
        }

        var hoursInWeek = []
        for(const day in workingTimesSortedByDays){
          var hours = 0
          for(const wt of workingTimesSortedByDays[day]){
            hours += Math.abs(moment(wt.start).toDate().getTime() - moment(wt.end).toDate().getTime() ) / 36e5
          }
          hoursInWeek.push(hours.toFixed())
        }
        return hoursInWeek
      },

      test(){
        this.datasetHoursCurrentWeek = [1, 2, 6, 7, 8]
      }

    },
    watch: {
      compareDatasets() {
        this.componentKey += 1;
        console.log('this.componentKey:', this.componentKey)
      },
    }
  };
</script>

<style scoped>
  .hours-text {
    font-size: 2rem;
  }

  .w-100 {
    width: 100%;
  }

  .w-80 {
    width: 80%;
  }

  .w-60 {
    width: 60%;
  }

  .w-20 {
    width: 20%;
  }

  .min-width-card {
    min-width: 49%;
  }

  @media only screen and (max-width: 1000px) {
    .min-width-card {
      min-width: 100%;
    }
  }
</style>