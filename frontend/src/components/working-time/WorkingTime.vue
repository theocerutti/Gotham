<template>
  <v-card class="mt-5">
    <v-row class="px-2" align="center">
      <v-col cols="4">
        <v-text-field @blur="updateWorkingTime" v-model="workingTime.description" placeholder="No description" hide-details="true" solo-inverted dense flat/>
      </v-col>
      <v-col cols="1">
        <v-menu offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-row v-on="on" class="project-picker-button">
              <v-icon class="pr-1">mdi-plus-box</v-icon>
              <div>Project</div>
            </v-row>
          </template>
          <div>HERE MODAL PROJECT</div>
        </v-menu>
      </v-col>
      <v-spacer/>
      <v-divider vertical/>
      <v-col cols="1" align="center" class="icon-cell-col">
        <v-btn icon @click="workingTime.billable = !workingTime.billable; updateWorkingTime()" :color="workingTime.billable ? '#058FCE' : ''">
          <v-icon>mdi-currency-usd</v-icon>
        </v-btn>
      </v-col>
      <v-divider vertical/>
      <v-col cols="2" align="center">
        <v-row align="center">
          <v-col>
            <v-text-field v-model="start_time" readonly hide-details="true" solo-inverted dense flat/>
          </v-col>
          <div class="px-1">-</div>
          <v-col>
            <v-text-field v-model="end_time" readonly hide-details="true" solo-inverted dense flat/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1" class="icon-cell-col">
        <v-btn icon @click="deleteWorkingTime">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  name: "WorkingTime",
  props: ["workingTime"],
  data: () => ({
    show_start_time_picker: false,
    show_end_time_picker: false,
  }),
  computed: {
    start_time() {
      return moment(this.workingTime.start).format("HH:mm:ss");
    },
    end_time() {
      return moment(this.workingTime.end).format("HH:mm:ss");
    },
  },
  methods: {
    updateWorkingTime() {
      this.$store.dispatch("updateWorkingTime", this.workingTime);
    },
    deleteWorkingTime() {
      this.$store.dispatch("deleteWorkingTime", this.workingTime.id);
    },
  }
};
</script>

<style scoped>
</style>