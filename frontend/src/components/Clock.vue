<template>
  <v-card elevation="2">
    <v-row align="center" class="pa-1">
      <v-col class="pa-0 px-4" :xs="4" :md="manual ? 4 : 7">
        <v-text-field v-model="description" placeholder="What have you worked on?" hide-details="true" solo-inverted
                      dense flat/>
      </v-col>
      <v-col xs="1" md="1">
        <v-menu offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-row v-on="on" class="project-picker-button">
              <v-icon class="pr-1">mdi-plus-box</v-icon>
              <div>Team</div>
            </v-row>
          </template>
          <div>HERE MODAL TEAM</div>
        </v-menu>
      </v-col>
      <v-divider vertical/>
      <v-col align="center" class="icon-cell-col">
        <v-icon @click="billable = !billable" :class="`icon-cell ${billable ? 'active' : ''}`">mdi-currency-usd</v-icon>
      </v-col>
      <v-divider vertical/>
      <v-col xs="3" md="3" v-if="manual">
        <v-row align="center">
          <v-col>
            <v-menu
              ref="start_time"
              v-model="show_start_time_picker"
              :close-on-content-click="false"
              :return-value.sync="start_time"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="start_time" v-bind="attrs" v-on="on" readonly hide-details="true" solo-inverted
                              dense flat/>
              </template>
              <v-time-picker :max="end_time" format="24hr" v-if="show_start_time_picker" full-width v-model="start_time"
                             @click:minute="$refs.start_time.save(start_time)"></v-time-picker>
            </v-menu>
          </v-col>
          <div>-</div>
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
                <v-text-field v-model="end_time" v-bind="attrs" v-on="on" readonly hide-details="true" solo-inverted
                              dense flat/>
              </template>
              <v-time-picker :min="start_time" format="24hr" v-if="show_end_time_picker" full-width v-model="end_time"
                             @click:minute="$refs.end_time.save(end_time)"></v-time-picker>
            </v-menu>
          </v-col>
          <v-menu
            v-model="show_date_picker"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <div class="pr-3">{{ computedDateFormatted }}</div>
              <v-icon class="pr-1" v-on="on">mdi-calendar</v-icon>
            </template>
            <v-date-picker v-model="date" @change="show_date_picker = false" no-title scrollable/>
          </v-menu>
        </v-row>
      </v-col>
      <v-divider vertical/>
      <v-spacer/>
      <v-col xs="auto" md="auto" class="mr-4">
        <v-row align="center">
          <v-col xs="6" md="6">
            <v-text-field class="centered-input" :value="getTimer" hide-details="true" solo-inverted dense flat
                          readonly/>
          </v-col>
          <v-col xs="5" md="5">
            <v-btn style="width: 100%" :color="!manual ? (clockStatus ? 'red' : '#058FCE') : '#058FCE'"
                   @click="switchClock">
              {{ manual ? "ADD" : clockStatus ? "STOP" : "START" }}
            </v-btn>
          </v-col>
          <v-col xs="1" md="1" class="pa-0 actions-btn-container">
            <div>
              <v-btn icon @click="manual = false">
                <v-icon :color="!manual ? '#058FCE' : ''" small>mdi-clock</v-icon>
              </v-btn>
            </div>
            <div>
              <v-btn icon @click="manual = true">
                <v-icon :color="manual ? '#058FCE' : ''" small>mdi-playlist-edit</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";
import {getDateFromTime, mergeDateAndDuration} from "@/utils/date";

const defaultClockData = {
  description: "",
  projectId: 0,
  billable: false,
  start_time: null,
  show_start_time_picker: false,
  end_time: null,
  show_end_time_picker: false,
  date: moment().format("YYYY-MM-DD"),
  show_date_picker: false,
  counter: 0,
  counterInterval: null,
  clockStatus: false, // false = not running, true = running
};

export default {
  name: "Clock",
  data: () => ({
    ...defaultClockData,
    manual: false,
  }),
  computed: {
    computedDateFormatted() {
      return this.date ? moment(this.date).format("L") : "";
    },
    getTimer() {
      if (this.manual) {
        const start_d = getDateFromTime(this.start_time);
        const end_d = getDateFromTime(this.end_time);
        return moment(moment(end_d).diff(moment(start_d))).subtract(1, "hour").format("HH:mm:ss");
      } else {
        return moment.utc(this.counter * 1000).format("HH:mm:ss");
      }
    },
  },
  methods: {
    switchClock() {
      if (this.manual) {
        this.add();
      } else {
        this.clockStatus = !this.clockStatus;
        if (this.clockStatus) {
          this.counterInterval = setInterval(() => {
            this.counter++;
          }, 1000);
        } else {
          clearInterval(this.counterInterval);
          this.add();
        }
      }
    },
    formatWorkingTimeData() {
      let start_time = null;
      let end_time = new Date();
      if (this.manual) {
        // clone date
        start_time = mergeDateAndDuration(this.date, this.start_time);
        end_time = mergeDateAndDuration(this.date, this.end_time);
      } else {
        end_time = new Date();
        start_time = moment.utc(moment.now() - this.counter * 1000).toDate();
      }
      return {
        billable: this.billable,
        description: this.description,
        start: moment(start_time).toISOString(),
        end: moment(end_time).toISOString(),
        projectId: this.projectId
      };
    },
    add() {
      this.$store.dispatch("createWorkingTime", this.formatWorkingTimeData());
      this.reset();
    },
    reset() {
      Object.keys(defaultClockData).forEach(key => this[key] = defaultClockData[key]);
    }
  },
};
</script>

<style lang="scss">
.icon-cell-col {
  padding: 0;
  flex: 0 0 3%;
  max-width: 3%;
}

.icon-cell {
  &:hover,
  &.active {
    color: #058FCE;
  }
}

.project-picker-button {
  cursor: pointer;
  color: #058FCE;

  & div:hover {
    text-decoration: underline;
  }

  .v-icon {
    color: #058FCE;
  }
}

.actions-btn-container {
  display: block;
  padding: 0;
  margin: 0;

  div .v-btn {
    height: 20px;
    width: 20px;
    max-width: 20px;
    max-height: 20px;
  }
}

.centered-input input {
  text-align: center !important;
}
</style>