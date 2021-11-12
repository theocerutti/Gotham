<template>
  <div>
    <div v-if="workingTimesGroups === null">
      <div class="mt-10">
        <v-progress-circular color="blue" indeterminate/>
      </div>
    </div>
    <div v-else-if="Object.keys(workingTimesGroups).length === 0">
      <NoWorkingTime/>
    </div>
    <div v-else>
      <div v-for="(workingTimes, i) in workingTimesGroups" :key="i">
        <WorkingTimesGroup :workingTimes="workingTimes" class="mt-10"/>
      </div>
      <v-pagination
        v-if="totalPages > 0"
        v-model="pageIndex"
        total-visible="8"
        :length="this.totalPages"
        class="mt-10"/>
    </div>
  </div>
</template>

<script>
import WorkingTimesGroup from "@/components/working-time/WorkingTimesGroup";
import NoWorkingTime from "@/components/working-time/NoWorkingTime";

const WORKING_GROUP_BY_PAGE = 10;

export default {
  components: {NoWorkingTime, WorkingTimesGroup},
  name: "WorkingTimesGroups",
  data: () => ({
    pageIndex: 1,
    totalPages: 0,
  }),
  computed: {
    workingTimesGroups() {
      const wts = this.$store.getters.workingTimesByDay;
      if (wts === null)
        return null;
      this.totalPages = Math.floor(wts.length / WORKING_GROUP_BY_PAGE);
      const startItemIndex = (this.pageIndex - 1) * WORKING_GROUP_BY_PAGE;
      return wts.slice(startItemIndex, startItemIndex + WORKING_GROUP_BY_PAGE);
    }
  },
  mounted() {
    this.$store.dispatch("getAllWorkingTimes");
  }
};
</script>

<style scoped>
</style>