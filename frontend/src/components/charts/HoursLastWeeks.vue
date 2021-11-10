<script>
import {Doughnut} from "vue-chartjs";

export default {
  name: "HoursLastWeeks",
  extends: Doughnut,
  props: {
    dataset: Array,
    labels: Array
  },
  data() {
    return {
      chartData: {
        labels: this.label,
        datasets: [
          {
            label: "Hours",
            data: this.dataset,
            backgroundColor: [
              "#ff6384",
              "#36a2eb",
              "#cc65fe",
              "#ffce56"
            ],
            hoverOffset: 4
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            label: ((tooltipItems, data) => {
              return `${Math.floor(parseInt(data.datasets[0].data[tooltipItems.index]))} h`;
            })
          }
        },
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    dataset() {
      this.chartData.datasets[0].data = this.dataset;
      this.renderChart(this.chartData, this.options);
    },
    labels() {
      this.chartData.labels = this.labels;
      this.renderChart(this.chartData, this.options);
    },
  }
};
</script>

