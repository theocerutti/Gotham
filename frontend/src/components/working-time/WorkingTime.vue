<template>
  <v-card class="wt">
    <v-row class="pa-3" align="center">
      <v-col>{{ workingTime.description }}</v-col>
      <v-col>Team</v-col>
      <v-col>{{ workingTime.name }}</v-col>
      <v-col>
        <v-icon>mdi-currency-usd</v-icon>
      </v-col>
      <v-col><strong>Start:</strong> {{ workingTime.start }}</v-col>
      <v-col><strong>End:</strong> {{ workingTime.end }}</v-col>
      <v-col>Total: {{ workingTime.duration }} H</v-col>
      <v-btn icon color="#C6D2D9" @click="deleteWorkingTime">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "WorkingTime",
  props: ["workingTime"],
  data() {
    return {
      workingTimes: ""
    };
  },
  methods: {
    createWorkingTime() {
    },
    updateWorkingTime() {
    },
    deleteWorkingTime() {
    },
  }
};
</script>

<style scoped>
</style>