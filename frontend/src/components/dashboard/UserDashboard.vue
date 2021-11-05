<template >
  <v-card>
    <v-card-title>
      Hours of work in the current week
    </v-card-title>
    <v-card-subtitle>
      {{getStringCurrentWeek()}}
    </v-card-subtitle>
    <div class="d-flex justify">
      <div class="width-80 my-10" relative>
        <div></div>
        <hours-in-week :dataset="datasetHoursInWeek" />
      </div>
    </div>
  </v-card>
</template>

<script>
import HoursInWeek from "../charts/HoursInWeek.vue";
import TeamWorkingTime from "../charts/TeamWorkingTime.vue";
import moment from 'moment'

export default {
  name: "Dashboard",
  components: {
    HoursInWeek,
    TeamWorkingTime
  },

  props:{
    userId: Number
  },


  data: () => ({
    datasetHoursInWeek: [],
    chartOptionsHoursInWeek: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),


  methods:{
    getStringCurrentWeek(){
      const firstday = moment().startOf('isoWeek').format("DD/MM/YYYY");
      const lastday = moment().endOf('isoWeek').format("DD/MM/YYYY");
      return `${firstday} - ${lastday}`
    },
  },
};
</script>

<style scoped>

.width-80{
  width: 80%;
}

.justify {
  justify-content: center;
}
</style>
