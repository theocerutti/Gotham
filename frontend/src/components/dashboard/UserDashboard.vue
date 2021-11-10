<template>
  <div>
    <h1 class="mb-4">{{ dashboardWelcome }}</h1>
    <v-card class="mb-6">
      <v-card-title>
        Hours of work of the current week - {{ totalHoursWeekFormatted }}
      </v-card-title>
      <v-card-subtitle>
        {{ getStringCurrentWeek() }}
      </v-card-subtitle>
      <div class="d-flex justify-center">
        <div class="w-80 my-10">
          <hours-current-week :dataset="datasetHoursCurrentWeek"/>
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
            <hours-last-weeks :labels="labelsHoursLastWeeks" :dataset="datasetHoursLastWeeks"/>
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
import {extractErrMessage} from "@/utils/axiosError";

export default {
  name: "DashboardUser",
  components: {
    HoursCurrentWeek,
    HoursLastWeeks
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
      return moment({hour: totalHoursWeek}).format("H [h]");
    },
    totalHoursFormatted() {
      return `${Math.floor(this.totalHours)} h`;
    },
    totalHoursMonthFormatted() {
      return `${Math.floor(this.totalHoursThisMonth)} h`;
    }
  },
  mounted() {
    api.get(`/api/users/${this.userId}`).then(res => {
      this.user = res.data;
    }).catch(err => this._vm.$notify({
      text: extractErrMessage(err),
      type: "error"
    }));

    api.get(`api/workingtimes/user/${this.userId}`, {
      params: {
        start: moment().startOf("isoWeek").toDate(),
        end: moment().endOf("isoWeek").toDate(),
        formatType: "hoursCurrentWeek"
      }
    }).then((res) => {
      this.datasetHoursCurrentWeek = res.data;
    }).catch(err => this._vm.$notify({
      text: extractErrMessage(err),
      type: "error"
    }));

    api.get(`api/workingtimes/user/${this.userId}`, {
      params: {
        start: moment().subtract(4, "weeks").startOf("week").toDate(),
        end: moment().subtract(1, "weeks").endOf("isoWeek").toDate(),
        formatType: "hoursLastWeeks"
      }
    }).then((res) => {
      this.datasetHoursLastWeeks = res.data.dataset;
      this.labelsHoursLastWeeks = res.data.labels;
    }).catch(err => this._vm.$notify({
      text: extractErrMessage(err),
      type: "error"
    }));

    api.get(`api/workingtimes/user/${this.userId}`, {
      params: {
        formatType: "generalMetrics"
      }
    }).then((res) => {
      this.totalHours = res.data.totalHours;
      this.totalHoursThisMonth = res.data.totalHoursThisMonth;
    }).catch(err => this._vm.$notify({
      text: extractErrMessage(err),
      type: "error"
    }));
  },
  methods: {
    getStringCurrentWeek() {
      const firstday = moment().startOf("isoWeek").format("DD/MM/YYYY");
      const lastday = moment().endOf("isoWeek").format("DD/MM/YYYY");
      return `${firstday} - ${lastday}`;
    },
  },
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

.min-width-card {
  min-width: 49%;
}

@media only screen and (max-width: 1000px) {
  .min-width-card {
    min-width: 100%;
  }
}
</style>