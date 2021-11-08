<script>
import {Bar} from "vue-chartjs";

export default {
  name: "HoursInWeek",
  extends: Bar,

  props:{
    dataset: Array
  },

  data() {
    return {
      chartData: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: "Hours",
            data: this.dataset,
            fill: false,
            borderColor: "#32CD32",
            backgroundColor: "#32CD32",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    dataset() {
      console.log('dataset:', this.dataset)
      console.log("watch trigger dataset change")
      this.chartData.datasets[0].data = this.dataset
      this.renderChart(this.chartData, this.options)
    }
  }
  
};

// props: {
//     chartdata: {
//       type: Object,
//       default: null
//     },
//     options: {
//       type: Object,
//       default: {
//         responsive: true,
//         maintainAspectRatio: false
//       }
//     }
//   },
</script>

