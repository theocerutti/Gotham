<template>
  <v-container>
    <Clock class="mt-5"/>
    <WorkingTimes class="mt-8"/>
  </v-container>
</template>

<script>
import Clock from "@/components/Clock";
import WorkingTimes from "@/components/working-time/WorkingTimes";

export default ({
  name: "TimeTracker",
  components: {
    Clock,
    WorkingTimes
  },
});
</script>


<style scoped>
</style>