<template>
  <v-card class="mt-5">
    <v-row class="px-2" align="center">
      <v-col xs="2" md="6">
        <v-text-field @blur="updateWorkingTime" v-model="workingTime.description" placeholder="No description"
                      hide-details="true" solo-inverted dense flat/>
      </v-col>
      <v-spacer v-if="this.$vuetify.breakpoint.smAndUp"/>
      <v-divider vertical/>
      <v-col xs="1" md="1" align="center">
        <v-btn icon @click="workingTime.billable = !workingTime.billable; updateWorkingTime()"
               :color="workingTime.billable ? 'primary' : ''">
          <v-icon>mdi-currency-usd</v-icon>
        </v-btn>
      </v-col>
      <v-divider vertical/>
      <v-col xs="1" md="2" align="center" v-if="this.$vuetify.breakpoint.smAndUp">
        <v-row align="center">
          <v-col>
            <v-menu
              ref="start_time"
              v-model="show_start_time_picker"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="start_time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field @blur="updateWorkingTime" v-model="start_time" v-bind="attrs" v-on="on" readonly
                              hide-details="true" solo-inverted dense flat/>
              </template>
              <v-time-picker use-seconds :max="end_time" format="24hr" v-if="show_start_time_picker" full-width v-model="start_time"
                             @click:second="$refs.start_time.save(start_time)"></v-time-picker>
            </v-menu>
          </v-col>
          <div class="px-1">-</div>
          <v-col>
            <v-menu
              ref="end_time"
              v-model="show_end_time_picker"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="end_time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field @blur="updateWorkingTime" v-model="end_time" v-bind="attrs" v-on="on" readonly
                              hide-details="true" solo-inverted dense flat/>
              </template>
              <v-time-picker use-seconds :min="start_time" format="24hr" v-if="show_end_time_picker" full-width v-model="end_time"
                             @click:second="$refs.end_time.save(end_time)"></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
      <v-col xs="1" md="2" align="center" v-else>
        <div>{{ getDiffTime() }}</div>
      </v-col>
      <v-col xs="1" md="1">
        <v-btn icon @click="deleteWorkingTime">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";
import {mergeDateAndDuration} from "@/utils/date";

export default {
  name: "WorkingTime",
  props: ["workingTime"],
  data: () => ({
    show_start_time_picker: false,
    show_end_time_picker: false,
  }),
  computed: {
    start_time: {
      get() {
        return moment(this.workingTime.start).format("HH:mm:ss");
      },
      set(value) {
        this.workingTime.start = mergeDateAndDuration(this.workingTime.start, value);
      }
    },
    end_time: {
      get() {
        return moment(this.workingTime.end).format("HH:mm:ss");
      },
      set(value) {
        this.workingTime.end = mergeDateAndDuration(this.workingTime.end, value);
      }
    },
  },
  methods: {
    getDiffTime() {
      return moment(this.workingTime.start).from(this.workingTime.end, true);
    },
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