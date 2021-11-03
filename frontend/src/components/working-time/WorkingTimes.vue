<template>
  <div>
    <div v-for="(workingTime, i) in workingTimes" :key="i">
      <v-col>
        <WorkingTime :workingTime="workingTime" class="mt-4"/>
      </v-col>
    </div>
  </div>
</template>

<script>

import WorkingTime from "./WorkingTime.vue";

export default {
  components: {WorkingTime},
  name: "WorkingTimes",
  data() {
    return {
      workingTimes: [
        {
          name: "Mock-up",
          start: "19:22",
          end: "00:12",
          description: "Making mock-up using Figma",
          duration: "2"
        },
        {
          name: "API",
          start: "09:22",
          end: "18:12",
          description: "Convert Elixir API in Nest API",
          duration: "3"
        },
        {
          name: "Front-end",
          start: "13:22",
          end: "18:12",
          description: "Making Front-end using Vuetify",
          duration: "2"
        }
      ]
    };
  },
  computed: {},
};
</script>

<style scoped>
</style>