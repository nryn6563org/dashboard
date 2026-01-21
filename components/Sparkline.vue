<template>
  <div class="sparkline-container">
    <canvas ref="sparkChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  props: {
    data: {
      type: Array,
      default: () => [10, 15, 8, 12, 20, 18, 25, 22, 30]
    },
    color: {
      type: String,
      default: '#3b82f6'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.renderSparkline();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
  watch: {
    data: {
      handler() {
        this.updateChart();
      },
      deep: true
    }
  },
  methods: {
    renderSparkline() {
      const ctx = this.$refs.sparkChart.getContext('2d');
      
      const gradient = ctx.createLinearGradient(0, 0, 0, 80);
      gradient.addColorStop(0, `${this.color}33`); // 20% opacity
      gradient.addColorStop(1, `${this.color}00`); // 0% opacity

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.data.map((_, i) => i),
          datasets: [{
            data: this.data,
            borderColor: this.color,
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            backgroundColor: gradient,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          scales: {
            x: { display: false },
            y: { display: false, beginAtZero: false }
          },
          elements: {
            line: {
              borderCapStyle: 'round',
              borderJoinStyle: 'round'
            }
          }
        }
      });
    },
    updateChart() {
      if (this.chart) {
        this.chart.data.labels = this.data.map((_, i) => i);
        this.chart.data.datasets[0].data = this.data;
        this.chart.update('none');
      }
    }
  }
}
</script>

<style scoped>
.sparkline-container {
  width: 100%;
  height: 100%;
}
</style>
