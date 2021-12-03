<template>
	<div class="card" style="height:100%;">
		<div class="chart-title">
			Spending across products category
		</div>
		<ChartSingleDatasets
			chart-name="CustomerCategorySpending"
			chart-type="doughnut"
			:data="data"
			:data-options="dataOptions"
			:data-labels="dataLabels"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */

import api from '../../assets/helper/api';
import appearanceConfig from '../../assets/helper/appearanceConfig';

export default {
	props: {
		customer: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			data: [],
			dataOptions: [],
			dataLabels: [],
			options: {},
			chartLabel: [],
		};
	},
	async mounted() {
		await this.setupData();
		this.updateGraph();
	},
	methods: {
		async setupData() {
			const rentals = (await api.customers.getRentals(this.customer._id, { populate: true })).data;
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
			this.dataOptions = {
				backgroundColor: dataLabels.map((category) => appearanceConfig.doughnut.getColorOfCategory(category)),
				hoverBorderColor: appearanceConfig.doughnut.hoverBorderColor,
				hoverBorderWidth: appearanceConfig.doughnut.hoverBorderWidth,
			};
		},
		updateGraph() {
		},
	},
};
</script>
