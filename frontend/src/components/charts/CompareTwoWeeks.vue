<script>
import { Line } from "vue-chartjs";

export default {
  name: "CompareTwoWeeks",
  extends: Line,

  props: {
    datasets: Object,
    labels: Object
  },
  
  data() {
    return {
      gradient: null,
      gradient2: null,
      chartData: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: this.labels.week1,
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: "#FC2525",
            data: this.datasets.week1
          },
          {
            label: this.labels.week2,
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: "#05CBE1",
            data: this.datasets.week2
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
                stepValue: 1,
                max: 24
            }
          }]
        },
        tooltips: {
          enabled: true,
          displayColors: false,
          callbacks: {
              label: function(tooltipItems) { 
                  return " " + tooltipItems.yLabel + "h";
              }
          }
        },
      }
    };
  },

  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

    this.chartData.datasets[0].backgroundColor = this.gradient
    this.chartData.datasets[1].backgroundColor = this.gradient2
    this.renderChart(this.chartData, this.options);
  },

  watch: {
    datasets: {
      handler: function() { // watch it
        this.chartData.datasets[0].data = this.datasets.week1
        this.chartData.datasets[1].data = this.datasets.week2
        this.renderChart(this.chartData, this.options);
      },
      deep: true
      
    },
    labels: {
      handler: function() { // watch it
        this.chartData.datasets[0].label = this.labels.week1
        this.chartData.datasets[1].label = this.labels.week2
        this.renderChart(this.chartData, this.options);
      },
      deep: true
    }
  }
};
</script>

