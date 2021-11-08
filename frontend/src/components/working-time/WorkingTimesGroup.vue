<template>
  <div>
    <v-alert
      class="group-title-container"
      border="left"
      color="grey"
      dense
      outlined
      text
    >
      {{ dateTitle() }}
    </v-alert>
    <div v-for="(workingTime, i) in workingTimes" :key="i">
      <WorkingTime :workingTime="workingTime" class="mt-4"/>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import WorkingTime from "./WorkingTime.vue";

export default {
  components: {WorkingTime},
  name: "WorkingTimesGroup",
  props: {
    workingTimes: Array,
  },
  methods: {
    dateTitle() {
      const three_days_ago = moment().subtract(3, "days");
      const startDate = new Date(this.workingTimes[0].start);

      if (moment(three_days_ago).isBefore(startDate)) {
        return moment([startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()]).calendar(null, {
          sameDay: "[Today]",
          nextDay: "[Tomorrow]",
          nextWeek: "dddd",
          lastDay: "[Yesterday]",
          lastWeek: "[Last] dddd",
          sameElse: "DD/MM/YYYY"
        });
      } else
        return moment(startDate).format("ddd, MMM D yyyy");
    },
  },
};
</script>

<style scoped>
.group-title-container {
  position: relative;
  right: 10px;
  display: flex;
  height: 20px;
  font-size: 12px;
  width: 8%;
  margin-right: -5px;
}
</style>