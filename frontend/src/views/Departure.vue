<template>
    <div class="container">
        <clock-manager class="clockManager"/>
        <working-times class="workingTimes"/>   
    </div>
</template>

<script>
import ClockManager from '../components/ClockManager.vue'
import WorkingTimes from '../components/workingTimes.vue'

export default {
  components: { ClockManager, WorkingTimes },
  name: 'Departure',
  props: {
  },
  data() {
      return {
          
      }
  },
  methods: {
     
  },
  computed: {
    
  },
  created() {

  }
}
</script>

<style scoped>

.container {
    
}
.clockManager {
  margin-top:50px;
}
.workingTimes { 
  margin-top:50px;  
}

</style>