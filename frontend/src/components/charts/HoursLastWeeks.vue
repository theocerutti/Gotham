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
              "#11324D",
              "#6B7AA1",
              "#C1CFC0",
              "#3A6351"
            ],
            borderWidth: 0,
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

