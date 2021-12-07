<template>
	<div class="card" style="height:100%;">
		<div class="chart-title">
			Earning over time
		</div>
		<div>
			<ChartOptionRadioGroup :options="graphDataRangeOptions" :selected="graphDataRangeSelected" @onChange="updateSelected" />
		</div>
		<ChartSingleDatasets
			:chart-name="name"
			chart-type="line"
			:data="data"
			:data-options="dataOptions"
			:data-labels="dataLabels"
			height="300px"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */

import helper from '../../assets/helper/helper';

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
	},
	data() {
		return {
			rentals: [],
			data: [],
			dataLabels: [],
			options: {},
			chartLabel: [],
			graphDataRangeOptions: [
				{ text: '6M', value: '6-M' },
				{ text: '1Y', value: '1-Y', checked: true },
				{ text: '5Y', value: '5-Y' },
			],
			graphDataRangeSelected: '1-Y',
		};
	},
	watch: {
		async graphDataRangeSelected() {
			await this.updateGraph();
		},
	},
	async mounted() {
		this.rentals = await this.getRentals();
		await this.updateGraph();
	},
	methods: {
		updateSelected(sel) {
			this.graphDataRangeSelected = sel;
		},

		async updateGraph() {
			const graphPeriod = this.graphDataRangeSelected;
			const dateMap = helper.rentalsToValueDictionary(this.rentals, graphPeriod, (rent) => {
				const endDate = rent.state === 'close' ? new Date(rent.actualEndDate) : new Date(rent.expectedEndDate);
				return { endDate, value: rent.unit.price };
			});

			const data = [];
			const dataLabels = [];
			dateMap.forEach((value, key) => {
				data.push(value);
				dataLabels.push(key);
			});

			this.data = data.length !== 0 ? data : [1];
			this.dataLabels = dataLabels.length !== 0 ? dataLabels : [''];
		},
	},
};
</script>

<style scoped>
#buttonContainer{
	width: min-content;
	margin-left: auto;
	margin-right: 10px;
}

.card-inline-item{
	margin: 15px 10px 15px 10px;
}
</style>
