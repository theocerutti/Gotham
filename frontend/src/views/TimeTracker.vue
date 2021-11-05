<template>
  <v-container>
    <Clock class="mt-5"/>
    <v-divider class="mt-10"/>
    <WorkingTimesGroups/>
  </v-container>
</template>

<script>
import Clock from "@/components/Clock";
import WorkingTimesGroups from "@/components/working-time/WorkingTimesGroups";

export default ({
  name: "TimeTracker",
  components: {
    Clock,
    WorkingTimesGroups
  },
});
</script>

<style scoped>
</style>