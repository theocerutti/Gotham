<template>
  <div>
    <v-btn @click="goBack" color="secondary" class="mb-5" id="btnGoBack">
      <v-icon>
        mdi-keyboard-backspace
      </v-icon>
      Back
    </v-btn>
    <h1 class="mb-4">
      {{ dashboardWelcome() }}
    </h1>
    <div class="d-flex flex-wrap justify-space-between w-100">
      <v-card class="w-100 mb-6">
        <v-card-title>
          General metrics
        </v-card-title>
        <v-card-text>
          <v-row align="center">
            <v-col align="center">
              <div class="hours-text">{{ totalHours }} h</div>
              <div>Total hours of work</div>
            </v-col>
            <v-col align="center">
              <div class="hours-text">{{ totalHoursMonth }} h</div>
              <div>Total hours of work this month</div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="w-59 mb-6 ">
        <v-card-title>
          Hours of work of the current week
        </v-card-title>
        <v-card-subtitle>
          {{ getStringCurrentWeek() }}
        </v-card-subtitle>
        <div class="d-flex justify-center">
          <div class="w-80 my-10">
            <hours-current-week :dataset="datasetHoursCurrentWeek" type="teamDashboard"/>
          </div>
        </div>
      </v-card>
      <v-card class="w-39 mb-6">
        <v-card-title>
          Hours of work of last weeks
        </v-card-title>
        <v-card-subtitle>
          Compare hours count of lasts weeks
        </v-card-subtitle>
        <div class="d-flex justify-center">
          <div class="w-80 my-10 mx-15">
            <hours-last-weeks :labels="labels" :dataset="hoursLast4weeks" />
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import HoursCurrentWeek from "../charts/HoursCurrentWeek.vue";
import HoursLastWeeks from "../charts/HoursLastWeeks.vue";
import moment from "moment";
import {api} from "@/config-api";


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
    teamData: null,
    datasetHoursCurrentWeek: [],
    totalHours: 0,
    totalHoursMonth: 0,
    hoursLast4weeks: [],
    labels: []
  }),

  methods: {
    goBack() {
      this.$router.back();
    },
    dashboardWelcome() {
      return this.teamData ? `Dashboard of ${this.teamData.name} team` : "";
    },
    calculateDiffEndStart(start, end) {
      return Math.abs(new Date(end).valueOf() - new Date(start).valueOf()) / 3600000;
    },
    parseWt() {
      var allWt = [];
      const workingTimesSortedByDays = {};
      var hoursPerDay = [];
      var i = -1;

      this.teamData.users.forEach(u => {
        u.workingtimes.forEach(wt => {
          allWt.push(wt);
        });
      });

      const wtCurrWeek = allWt.filter(wt => {
        return wt.start >= moment().startOf("isoWeek").toDate().toISOString();
      });

      for (const work of wtCurrWeek) {
        const dateKey = new Date(work.start).getDay();
        if (!workingTimesSortedByDays[dateKey])
          workingTimesSortedByDays[dateKey] = [];
        workingTimesSortedByDays[dateKey].push(work);
      }
      for (const key in workingTimesSortedByDays) {
        i += 1;
        hoursPerDay[i] = 0;
        for (const wt in workingTimesSortedByDays[key]) {
          hoursPerDay[i] += parseInt(this.calculateDiffEndStart(workingTimesSortedByDays[key][wt].start, workingTimesSortedByDays[key][wt].end).toFixed(2));
        }
      }

      this.labels = [47, 48, 49, 50];

      this.datasetHoursCurrentWeek = hoursPerDay;
    },
    getTotalHours() {
      var totalHours = 0;
      const allUsers = this.teamData.users;
      allUsers.forEach(u => {
        u.workingtimes.forEach(w => {
          totalHours += this.calculateDiffEndStart(w.start, w.end);
        });
      });
      this.totalHours = totalHours.toFixed();
    },
    getTotalHoursMonth() {
      var totalHours = 0;
      this.teamData.users.forEach(u => {
        u.workingtimes.forEach(w => {
          if (w.start >= moment().startOf("month").toDate().toISOString()) {
            totalHours += this.calculateDiffEndStart(w.start, w.end);
          }
        });
      });
      this.totalHoursMonth = totalHours.toFixed();
    },
    getHoursLastWeeks() {
      var workingTimes = [];

      this.teamData.users.forEach(u => {
        u.workingtimes.forEach(w => {
            workingTimes.push(w);
          }
        );
      });

      const lastWeeksWT = workingTimes.filter(workingtime => {
        return workingtime.start >= moment().subtract(4, "weeks").startOf("week").toISOString() && workingtime.start <= moment().subtract(1, "weeks").endOf("isoWeek").toISOString();
      });
      //group by week
      const workingTimesSortedByWeeks = {};
      const labels = [];

      for (const wt of lastWeeksWT) {
        const dateKey = moment(wt.start).week();
        if (!workingTimesSortedByWeeks[dateKey]) {
          workingTimesSortedByWeeks[dateKey] = [];
          labels.push(this.getStringCurrentWeek(wt.start));
        }
        workingTimesSortedByWeeks[dateKey].push(wt);
      }

      var hoursInMonth = [];
      for (const week in workingTimesSortedByWeeks) {
        var hours = 0;
        for (const wt of workingTimesSortedByWeeks[week]) {
          hours += parseInt(this.calculateDiffEndStart(wt.start, wt.end).toFixed());
        }
        hoursInMonth.push(hours.toFixed());
      }
      this.labels = labels;
      this.hoursLast4weeks = hoursInMonth;
    },

    getStringCurrentWeek() {
      const firstday = moment().startOf("isoWeek").format("DD/MM/YYYY");
      const lastday = moment().endOf("isoWeek").format("DD/MM/YYYY");
      return `${firstday} - ${lastday}`;
    },
  },
  mounted() {
    api.get(`api/team/one/${this.teamId}/workingtimes`)
      .then((response) => {
        this.teamData = response.data;
        this.parseWt();
        this.getTotalHours();
        this.getTotalHoursMonth();
        this.getHoursLastWeeks();
      });
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

@media only screen and (max-width: 1000px) {
}

.hours-text {
  font-size: 2rem;
}

.w-100 {
  width: 100%;
}

.w-80 {
  width: 80%;
}

.w-59 {
  width: 59%;
}

.w-39 {
  width: 39%;
}

@media only screen and (max-width: 1000px) {
  .w-59 {
    width: 100%;
  }

  .w-39 {
    width: 100%;
  }
}

</style>