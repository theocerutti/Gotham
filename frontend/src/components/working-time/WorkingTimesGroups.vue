<template>
  <div>
    <div v-if="workingTimesGroups === null">
      <div class="mt-10">
        <v-progress-circular color="blue" indeterminate/>
      </div>
    </div>
    <div v-else-if="Object.keys(workingTimesGroups).length === 0">
      <div>You don't have any working times!</div>
      <div>Use the clock to create one!</div>
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

export default {
  components: {WorkingTimesGroup},
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