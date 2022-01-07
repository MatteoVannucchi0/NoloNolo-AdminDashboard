<template>
	<div>
		<div class="chart-title">
			Noleggi per categoria
		</div>
		<ChartSingleDatasets
			chart-name="RentPerCategory"
			chart-type="doughnut"
			:data="data"
			:data-options="dataOptions"
			:data-labels="dataLabels"
			:chart-options="chartOptions"
			aria-label="Grafico del numero di noleggi per categoria di prodotti"
			height="350px"
			@preDraw="$emit('preDraw')"
		/>
	</div>
	</div>
</template>
<script>
import appearanceConfig from '../../../assets/helper/appearanceConfig';

export default {
	props: {
		rentals: {
			type: Array,
			required: true,
		},
		units: {
			type: Array,
			required: true,
		},

	},
	data() {
		return {
			data: [],
			dataLabels: [],
			chartLabel: [],
			dataOptions: {},
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					fontColor: 'white',
					display: true,
				},
				title: {
					display: true,
					color: 'rgba(229,12,12,0.7)',
					text: '',
					position: 'top',
					align: 'start',
				},
			},
		};
	},
	async mounted() {
		await this.updateGraph();
		this.$emit('loaded');
	},
	methods: {
		async updateGraph() {
			const categoryFrequency = new Map();

			for (const rent of this.rentals) {
				const { category: rentCategory } = rent.unit.product;

				const newValue = categoryFrequency.get(rentCategory) + 1 || 1;
				categoryFrequency.set(rentCategory, newValue);
			}

			const sortedMap = new Map([...categoryFrequency].sort((a, b) => b[1] - a[1]).slice(0, 10));

			const data = [];
			const dataLabels = [];
			this.dataOptions.backgroundColor = [];
			sortedMap.forEach((value, key) => {
				data.push(value);
				dataLabels.push(key.split(';')[0]);
				this.dataOptions.backgroundColor.push(appearanceConfig.categoryToColor(key));
			});

			this.data = data;
			this.dataLabels = dataLabels;
		},
	},
};
</script>
