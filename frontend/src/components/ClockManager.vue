<template>
  <div>
      <v-card class="container">
          <h1>Clock Manager</h1>
          <div class="clockManager">
              <v-btn v-if="!clockIn" @click="clock" class="startButton" >
                  start clock
              </v-btn>
              <v-btn v-else @click="refresh" class="stopButton">
                  stop clock
              </v-btn>
            <div v-if="startDateTime !== null" class="time">
              <p >Start: {{ startDateTime }}</p>
              <p v-if="!clockIn">End: {{ endDateTime }}</p>
              <p v-if="!clockIn" class="total">Total duration: {{ duration.toFixed(2) }} H</p>
            </div>
          </div>
      </v-card>
  </div>
</template>

<script>
export default {
  name: 'ClockManager',
  props: {
  },
  data() {
      return {
          startDateTime: null,
          endDateTime: null,
          clockIn: false,
          startDateFormat: null,
          endDateFormat: null,
          duration: null,
      }
  },
  methods: {
      getTimeNow() {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = 0;
        if(today.getMinutes() < 10) {
           time = today.getHours() + ":" + "0" + today.getMinutes() + ":" + today.getSeconds();
        }
        else {
           time = today.getHours() + ":" +  today.getMinutes() + ":" + today.getSeconds();
        }
        const dateTime = date +' '+ time;
        return dateTime;
      },
      refresh() {
            this.clockIn = false;
            this.endDateFormat= new Date();
            this.endDateTime = new Date().toISOString();
            this.duration = (this.endDateFormat.getTime() - this.startDateFormat.getTime())/1000/3600;
            //  this.$store.dispatch('createWorkingTime', {
            //   working_time: {
            //     start: this.startDateTime,
            //     end: this.endDateTime,
            //   }
            // })
            this.$store.dispatch('createClock', {
              time: this.endDateTime,
            })
      },
      clock() {
        this.clockIn = true;
        this.startDateFormat = new Date();
        this.startDateTime = new Date().toISOString();
        this.$store.dispatch('createClock', {
            time: this.startDateTime,
        })
      },
  },
  // created() {
  //   this.$store.dispatch('getClock')
  //   const clock = this.$store.getters.getterUserClock

  //   if (clock.status === true) {
  //     this.startDateTime = clock.time;
  //     this.clockIn = true;
  //   }
  // }
}
</script>

<style scoped>

.container {
    height: 80%;
    width: 100%;
    background-color: rgb(102, 97, 97) !important;
}
h1 {
    margin: 20px;
}
.startButton {
  margin: 10px;
  background: rgb(66, 186, 150) !important;
}
.stopButton {
  background: rgb(223, 71, 89) !important;
  margin: 10px;
}
.clockManager {
  margin:20px;
}
.time {
  padding:10px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  border-radius:10px;
  margin: 15px;
}
p {
  margin:10px;
}
.total {
  margin:20px;
  font-size:1.3em;
}

</style>