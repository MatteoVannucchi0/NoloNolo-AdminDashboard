<template>
	<div class="card" style="height:100%;">
		<div class="chart-title">
			Spending across products category
		</div>
		<ChartSingleDatasets
			:chart-name="name"
			:chart-type="chartType"
			:data="data"
			:data-options="dataOptions"
			:data-labels="dataLabels"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */

export default {
	props: {
		getRentals: {
			type: Function,
			required: true,
		},
		dataOptions: {
			type: Object,
			default: () => {},
		},
		name: {
			type: String,
			required: true,
		},
		chartType: {
			type: String,
			default: 'doughnut',
		},
	},
	data() {
		return {
			rentals: [],
			data: [],
			dataLabels: [],
			options: {},
			chartLabel: [],
		};
	},
	async mounted() {
		this.rentals = await this.getRentals();
		await this.updateGraph();
	},
	methods: {
		async updateGraph() {
			const rentals = await this.getRentals();
			const categoryToSpending = {};

			for (const rent of rentals) {
				const { category } = rent.unit.product;
				// TODO dovrebbe essere rentals.priceEstimantion ...., però i dati non ci sono quindi simulo
				const spent = 5;
				categoryToSpending[category] = categoryToSpending[category] ? categoryToSpending[category] + spent : spent;
			}

			const data = [];
			const dataLabels = [];
			for (const category in categoryToSpending) {
				if (categoryToSpending[category]) {
					data.push(categoryToSpending[category]);
					dataLabels.push(category);
				}
			}
			this.data = data.length !== 0 ? data : [1];
			this.dataLabels = dataLabels.length !== 0 ? dataLabels : [''];
		},
	},
};
</script>
