<template>
  <div>
      <v-card color="secondary">
        <v-card-text style="font-size:1.05em" class="blackWhite--text">
          <v-row>
            <v-col md="2" class="accent--text">{{ dataOfWt.name }}</v-col>
            <v-col md="5" class="blue--text">{{ dataOfWt.description }}</v-col>
            <v-col md="1"><v-divider vertical></v-divider> € <v-divider vertical></v-divider></v-col>
            <v-col md="2">{{ dataOfWt.start }}         -        {{ dataOfWt.end }}</v-col>
            <v-col>{{ dataOfWt.duration }}</v-col>
            <v-btn icon @click="deleteWorkingTime"><v-icon >mdi-delete</v-icon></v-btn>
          </v-row>
        </v-card-text>
      </v-card>
  </div>
</template>

<script>
export default {
  name: 'WorkingTime',
  props: ['dataOfWt'],
  data() {
      return {
          userId: '',
          workingTimes: ''
      }
  },
  methods: {
      createWorkingTime() {

      },
      updateWorkingTime() {

      },
      deleteWorkingTime() {
        console.log(this.dataOfWt)
        this.dataOfWt = {}
      },
  }
}
</script>

<style scoped>
.wt {
    
}
.wtDate {
  margin-bottom: 10px;
}
p {
  margin:10px;
}
</style>