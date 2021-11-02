<template>
  <div>
      <div class="wt">
      <h2 style="margin:10px">{{ dataOfWt.name }}</h2>
        <div>
          <p>Start:  {{ dataOfWt.start }} </p>
          <p>End:  {{ dataOfWt.end }} </p>
        </div>
      </div> 
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

      },
  }
}
</script>

<style scoped>
.wt {
  padding:10px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  border-radius:10px;
  margin: 15px;
}
p {
  margin:10px;
}
</style>