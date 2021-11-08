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
    </div>
  </div>
</template>

<script>
import WorkingTimesGroup from "@/components/working-time/WorkingTimesGroup";
import NoWorkingTime from "@/components/working-time/NoWorkingTime";

export default {
  components: {NoWorkingTime, WorkingTimesGroup},
  name: "WorkingTimesGroups",
  data: () => ({}),
  computed: {
    workingTimesGroups() {
      return this.$store.getters.workingTimesByDay;
    }
  },
  mounted() {
    this.$store.dispatch("getAllWorkingTimes");
  }
};
</script>

<style scoped>
</style>