<script>
import { Line, mixins } from 'vue-chartjs';
import { months } from '../assets/global';

// eslint-disable-next-line no-unused-vars
const { reactiveProp } = mixins;

export default {
	extends: Line,
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		dataOptions: {
			type: Array || Object,
			default: () => {},
		},
		chartOptions: {
			type: Object,
			default: () => {},
		},
		labels: {
			type: Array,
			default: () => months,
		},
	},
	data() {
		return {
			loaded: true,
		};
	},
	mounted() {
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

		console.log(this.chartOptions);

		this.renderChart(chartdata, this.chartOptions);
		this.loaded = true;
	},
};
</script>
