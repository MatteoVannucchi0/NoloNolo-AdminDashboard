<template>
	<div :id="containerId" ref="container" class="chart-container" :aria-label="chartOptions.title" role="figure">
		<canvas :id="chartId" class="chart-canvas" />
	</div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */

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
		dataOptions: {
			type: [Array, Object],
			default: () => {},
		},
		dataLabels: {
			type: Array,
			default: () => [],
		},
		chartOptions: {
			type: Object,
			default: () => ({
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false,
				},
				title: {
					display: true,
					color: 'rgba(229,12,12,0.7)',
					text: '',
					position: 'top',
					align: 'start',
				},
			}),
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
	},
	async mounted() {
		await this.$nextTick();
		this.createChart();
	},
	methods: {
		createChart() {
			this.resetCanvas();
			this.updateChart();
		},
		updateChart() {
			const datasets = [{ data: this.data, ...this.dataOptions }];
			const data = {
				datasets,
				labels: this.dataLabels,
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
			if (!this.chart) { return; }
			this.chart.destroy();
			this.chart = null;
		},
	},
};
</script>
