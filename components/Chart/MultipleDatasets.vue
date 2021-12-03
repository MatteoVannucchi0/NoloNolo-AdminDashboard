<template>
	<div :id="containerId" class="chart-container" :aria-label="chartOptions.title" role="figure">
		<canvas :id="chartId" :height="height" :width="width" />
	</div>
</template>

<script>
import Chart from 'chart.js';

export default {
	props: {
		chartName: {
			type: String,
			default: 'NEED A CHART NAME',
		},
		chartType: {
			type: String,
			default: 'line',
		},
		data: {
			type: Array,
			default: () => [],
		},
		dataLabels: {
			type: Array,
			default: () => [],
		},
		dataOptions: {
			type: [Array, Object],
			default: () => [],
		},
		chartLabels: {
			type: Array,
			default: () => [],
		},
		chartOptions: {
			type: Object,
			default: () => {},
		},
		width: {
			type: String,
			default: 'auto',
		},
		height: {
			type: String,
			default: 'auto',
		},
	},
	data() {
		return {
			loaded: true,
			ctx: null,
			chart: null,
		};
	},
	computed: {
		containerId() {
			return `canvasContainer-${this.chartName}`;
		},
		chartId() {
			return `chart-${this.chartName}`;
		},
	},
	watch: {
		dataLabels() {
			this.createChart();
		},
		chartType() {
			this.createChart();
		},
		data() {
			this.createChart();
		},
		dataOptions() {
			this.createChart();
		},
		chartOptions() {
			this.createChart();
		},
		chartLabels() {
			this.createChart();
		},
		width() {
			this.createChart();
		},
		height() {
			this.createChart();
		},
	},
	mounted() {
		this.createChart();
	},
	methods: {
		createChart() {
			this.resetCanvas();
			this.updateChart();
		},
		updateChart() {
			const datasets = [];
			let { dataOptions = [] } = this;
			if (this.dataOptions && !Array.isArray(this.dataOptions)) {
				dataOptions = Array(this.data.length).fill(this.dataOptions);
			}

			for (let i = 0; i < this.data.length; i += 1) {
				const currData = this.data[i];
				const currDataLabel = this.dataLabels[i];
				const currDataOptions = dataOptions[i];

				datasets.push({
					data: currData,
					label: currDataLabel,
					...currDataOptions,
				});
			}

			const data = {
				datasets,
				labels: this.chartLabels,
			};

			this.ctx = this.ctx || document.getElementById(this.chartId).getContext('2d');

			this.chart = new Chart(this.ctx, {
				type: this.chartType,
				data,
				options: this.chartOptions,
			});
			this.loaded = true;
		},
		resetCanvas() {
			if (!this.chart) return;
			this.chart.destroy();
			this.chart = null;
		},
	},
};
</script>
