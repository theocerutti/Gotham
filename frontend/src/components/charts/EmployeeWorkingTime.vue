<script>
  import { Line } from 'vue-chartjs'

  export default {
    name: "EmployeeWorkingTime",
    extends: Line,
    data () {
      return {
        chartData: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Line Chart',
              data: [600,	1150,	342,	6050,	2522,	3241,	1259,	157,	1545, 9841, 5430, 3359],
              fill: false,
              borderColor: '#32CD32',
              backgroundColor: '#32CD32',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>