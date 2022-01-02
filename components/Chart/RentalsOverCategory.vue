<template>
	<div>
		<div class="chart-title">
			Spending across products category
		</div>
		<ChartSingleDatasets
			:chart-name="name"
			:chart-type="chartType"
			:data="data"
			:data-options="dataOptions"
			:data-labels="dataLabels"
			height="350px"
			@preDraw="$emit('preDraw')"
		/>
	</div>
	</div>
</template>
<script>
import appearanceConfig from '../../assets/helper/appearanceConfig';

export default {
	props: {
		getRentals: {
			type: Function,
			required: true,
		},
		dataOptions: {
			type: Object,
			default: () => ({ backgroundColor: appearanceConfig.backgroundColor }),
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
			loaded: false,
		};
	},
	async mounted() {
		this.rentals = await this.getRentals();
		await this.updateGraph();
		this.$emit('loaded');
	},
	methods: {
		async updateGraph() {
			const rentals = await this.getRentals();
			const categoryToSpending = {};

			for (const rent of rentals) {
				const { category } = rent.unit.product;
				// TODO dovrebbe essere rentals.priceEstimantion ...., però i dati non ci sono quindi simulo
				const spent = rent.unit.price;
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
