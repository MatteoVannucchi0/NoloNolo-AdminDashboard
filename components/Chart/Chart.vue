<template>
	<div :aria-label="chartOptions.title" role="figure">
		<canvas id="chart" :height="height" :width="width" />
	</div>
</template>

<script>
import Chart from 'chart.js';
import { getShiftedMonthsForNYear } from '../../assets/helper/graphHelper';

export default {
	props: {
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
		chartOptions: {
			type: Object,
			default: () => {},
		},
		labels: {
			type: Array,
			default: () => getShiftedMonthsForNYear(1),
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
		};
	},
	watch: {
		labels() {
			this.updateChart();
		},
	},
	mounted() {
		this.updateChart();
	},
	methods: {
		updateChart() {
			const datasets = this.data;
			let datasetsOptions = this.dataOptions || [];

			// Nel caso in cui le dataOptions sia un solo oggetto quell'opzione viene assegnata a tutti i datasets
			if (this.dataOptions && !Array.isArray(this.dataOptions)) {
				datasetsOptions = Array(this.data.length).fill(this.dataOptions);
			}

			for (let i = 0; i < this.data.length; i += 1) {
				datasets[i] = { ...datasets[i], ...datasetsOptions[i] };
			}

			const chartdata = {
				labels: this.labels,
				datasets,
			};

			this.ctx = this.ctx || document.getElementById('chart').getContext('2d');

			// eslint-disable-next-line no-unused-vars
			const myChart = new Chart(this.ctx, {
				type: this.chartType,
				data: chartdata,
				options: this.chartOptions,
			});
			this.loaded = true;
		},
	},
};
</script>
