<template>
	<div :id="containerId" ref="container" class="chart-container" :aria-label="chartOptions.title" role="figure">
		<div>
			<canvas :id="chartId" class="chart-canvas" />
		</div>
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
					fontColor: 'white',
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
			canvas: null,
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
		await this.createChart();
	},
	methods: {
		createChart() {
			this.resetCanvas();
			this.updateChart();
		},
		async updateChart() {
			Chart.defaults.global.defaultFontColor = 'lightblue';

			const datasets = [{ data: this.data, ...this.dataOptions }];
			const data = {
				datasets,
				labels: this.dataLabels,
			};

			this.ctx = this.ctx || document.getElementById(this.chartId).getContext('2d');
			this.canvas = this.canvas || document.getElementById(this.chartId);
			this.canvas.onclick = this.internalOnClick;

			this.$emit('preDraw');

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
		internalOnClick(event) {
			const activePoints = this.chart.getElementsAtEvent(event);
			if (activePoints.length === 0) { return; }

			const firstPoint = activePoints[0];
			// eslint-disable-next-line no-underscore-dangle
			const label = this.chart.data.labels[firstPoint._index];

			console.log('onCli');
			this.$emit('onClick', { label, firstPoint });
		},
	},
};
</script>
