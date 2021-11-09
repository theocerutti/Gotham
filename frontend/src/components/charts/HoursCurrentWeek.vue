<script>
import {Bar} from "vue-chartjs";

export default {
  name: "HoursCurrentWeek",
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
            display: true,
            ticks: {
                beginAtZero: true,
                steps: 24,
                stepValue: 1,
                max: 24
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
      this.chartData.datasets[0].data = this.dataset
      this.renderChart(this.chartData, this.options)
    }
  }
  
};
</script>

