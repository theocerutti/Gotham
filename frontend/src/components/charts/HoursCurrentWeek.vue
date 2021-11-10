<script>
import {Bar} from "vue-chartjs";
import moment from "moment";

export default {
  name: "HoursCurrentWeek",
  extends: Bar,
  props: {
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
        tooltips: {
          enabled: true,
          callbacks: {
            label: ((tooltipItems, data) => {
              return moment({hour: tooltipItems.value}).format("H [h]");
            })
          }
        },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
                beginAtZero: true,
                steps: 24,
                stepValue: 1,
                max: 80
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

      var maxValue = 0

      for (const key in this.dataset) {
        if (this.dataset[key] > maxValue)
          maxValue = this.dataset[key]
      }
      maxValue += 15;
      this.options.scales.yAxes[0].ticks.max = parseInt(maxValue)
      this.renderChart(this.chartData, this.options);
    }
  }

};
</script>

