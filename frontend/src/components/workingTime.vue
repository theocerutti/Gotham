<template>
  <div>
      <v-card color="#F2F6F8" class="wt">
        <v-row>
          <v-col>{{ dataOfWt.description }}</v-col>
          <v-col>Team</v-col>
          <v-col>{{ dataOfWt.name }}</v-col>
          <v-col>€</v-col>
          <v-col><strong>Start:</strong> {{ dataOfWt.start }}</v-col>
          <v-col><strong>End:</strong> {{ dataOfWt.end }}</v-col>
          <v-col>Total: {{ dataOfWt.duration }} H</v-col>
          <v-btn icon color="#C6D2D9" @click="deleteWorkingTime"><v-icon >mdi-delete</v-icon></v-btn>
        </v-row>
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
  color:black;
}
.wtDate {
  margin-bottom: 10px;
}
p {
  margin:10px;
}
</style>