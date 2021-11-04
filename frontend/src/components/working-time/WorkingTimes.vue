<template>
  <div>
    <div v-if="workingTimes === null">
      <div class="mt-10">
        <v-progress-circular color="blue" indeterminate/>
      </div>
    </div>
    <div v-else-if="workingTimes.length === 0">
      <div>You don't have any working times!</div>
      <div>Use the clock to create one!</div>
    </div>
    <div v-else class="mt-8">
      <div v-for="(workingTime, i) in workingTimes" :key="i">
        <WorkingTime :workingTime="workingTime" class="mt-4"/>
      </div>
    </div>
  </div>
</template>

<script>

import WorkingTime from "./WorkingTime.vue";

export default {
  components: {WorkingTime},
  name: "WorkingTimes",
  data: () => ({}),
  computed: {
    workingTimes() {
      return this.$store.getters.currentUser.workingTimes;
    }
  },
  mounted() {
    this.$store.dispatch("getAllWorkingTimes");
  }
};
</script>

<style scoped>
</style>