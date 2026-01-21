<template>
  <div class="bubble-chart-container">
    <canvas ref="bubbleChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

export default {
  props: {
    data: {
      type: Array,
      default: () => [
        { name: '반도체', value: 80 },
        { name: 'AI', value: 65 },
        { name: '로봇', value: 45 },
        { name: '금리', value: 55 },
        { name: '2차전지', value: 40 },
        { name: '전기차', value: 35 },
        { name: '나스닥', value: 50 },
        { name: '코스피', value: 30 }
      ]
    }
  },
  data() {
    return {
      chart: null,
      pastelColors: [
        '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA',
        '#E0BBE4', '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3'
      ]
    }
  },
  mounted() {
    this.renderChart();
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
    renderChart() {
      const ctx = this.$refs.bubbleChart.getContext('2d');
      
      const chartData = this.data.map((item, i) => {
        // Simple cluster positioning: spiral or random near center
        const angle = (i / this.data.length) * 2 * Math.PI;
        const distance = 0.2 + Math.random() * 0.3;
        return {
          label: item.name,
          x: 0.5 + Math.cos(angle) * distance,
          y: 0.5 + Math.sin(angle) * distance,
          r: item.value / 2 // Adjust radius scale
        };
      });

      this.chart = new Chart(ctx, {
        type: 'bubble',
        data: {
          datasets: [{
            data: chartData,
            backgroundColor: (context) => {
              const color = this.pastelColors[context.dataIndex % this.pastelColors.length];
              return color + 'CC'; // 80% opacity
            },
            borderColor: (context) => this.pastelColors[context.dataIndex % this.pastelColors.length],
            borderWidth: 1,
            hoverBackgroundColor: (context) => this.pastelColors[context.dataIndex % this.pastelColors.length]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 20
          },
          scales: {
            x: { display: false, min: 0, max: 1 },
            y: { display: false, min: 0, max: 1 }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.raw.label}: ${context.raw.r * 2}`;
                }
              }
            },
            datalabels: {
              color: '#475569',
              font: {
                weight: '900',
                size: (context) => {
                  const r = context.dataset.data[context.dataIndex].r;
                  return Math.min(r / 2, 14);
                }
              },
              formatter: (value) => value.label
            }
          },
          animations: {
            numbers: {
              type: 'number',
              properties: ['x', 'y', 'r']
            }
          }
        }
      });
    },
    updateChart() {
      if (this.chart) {
        const chartData = this.data.map((item, i) => {
          const angle = (i / this.data.length) * 2 * Math.PI;
          const distance = 0.2 + Math.random() * 0.3;
          return {
            label: item.name,
            x: 0.5 + Math.cos(angle) * distance,
            y: 0.5 + Math.sin(angle) * distance,
            r: item.value / 2
          };
        });
        this.chart.data.datasets[0].data = chartData;
        this.chart.update();
      }
    }
  }
}
</script>

<style scoped>
.bubble-chart-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
