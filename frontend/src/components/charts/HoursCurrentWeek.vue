<script>
import {Bar} from "vue-chartjs";

export default {
  name: "HoursCurrentWeek",
  extends: Bar,
  props: {
    dataset: Array,
    type: String
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
        tooltips: {
          enabled: true,
          displayColors: false,
          callbacks: {
            label: function (tooltipItems) {
              return " " + tooltipItems.yLabel + "h";
            }
          }
        },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              stepValue: 5,
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
      this.chartData.datasets[0].data = this.dataset;
      if (this.type == "userDashboard") {
        this.renderChart(this.chartData, this.options);
      } else if (this.type == "teamDashboard") {
        var maxValue = 0;
        for (const key in this.dataset) {
          if (this.dataset[key] > maxValue)
            maxValue = this.dataset[key];
        }
        maxValue += 15;
        this.options.scales.yAxes[0].ticks.max = parseInt(maxValue);
        this.renderChart(this.chartData, this.options);
      }
    }

  }

};
</script>

