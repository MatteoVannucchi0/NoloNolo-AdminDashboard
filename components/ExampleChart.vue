<template>
	<div class="card">
		<!--TODO rendere il grafico accessibile-->
		<LineChart v-if="loaded" :chart-data="chartdata" :options="options" />
		<div v-else>
			Grafico placeholder
			<!--TODO Aggiungere un place holder-->
		</div>
	</div>
</template>

<script>
import { months, graphData } from '../assets/global';
import LineChart from './charts/LineChart.vue';

export default {
	components: {
		LineChart,
	},
	data() {
		return {
			chartdata: null,
			loaded: false,
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'Chart.js Line Chart',
					},
				},
			},
		};
	},
	mounted() {
		this.fillData();
		this.loaded = true;
	},
	methods: {
		fillData() {
			this.chartdata = {
				labels: months,
				datasets: graphData,
			};

			console.log(this.chartdata);
		},
		getRandomInt() {
			return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
		},
	},
};
</script>

<style scoped>
	.card {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.card-title {
		margin-bottom: .4vh;
	}

</style>
