<template>
  <v-container>
    <Clock/>
  </v-container>
</template>

<script>
import Clock from "@/components/Clock";

export default ({
  name: "TimeTracker",
  components: {
    Clock
  },
  data: () => ({}),
});
</script>


<style scoped>
</style>