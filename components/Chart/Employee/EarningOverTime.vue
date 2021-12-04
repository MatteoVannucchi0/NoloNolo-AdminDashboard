<template>
	<div class="card" style="height:100%;">
		<div class="chart-title">
			Earning over time
		</div>
		<div>
			<ChartOptionRadioGroup :options="graphDataRangeOptions" :selected="graphDataRangeSelected" @onChange="updateSelected" />
		</div>
		<ChartSingleDatasets
			chart-name="EmployeeEarningOverTime"
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

import api from '../../../assets/helper/api';
import appearanceConfig from '../../../assets/helper/appearanceConfig';
import helper from '../../../assets/helper/helper';

export default {
	props: {
		employee: {
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
		await this.updateGraph();
	},
	methods: {
		updateSelected(sel) {
			this.graphDataRangeSelected = sel;
		},
		async updateGraph() {
			const rentals = (await api.rentals.get({ populate: true, employee: this.employee._id, limit: 0 })).data.docs;

			const graphPeriod = this.graphDataRangeSelected;
			const dateToEarning = helper.rentalsToValueDictionary(rentals, graphPeriod, (rent) => {
				const endDate = rent.state === 'close' ? new Date(rent.actualEndDate) : new Date(rent.expectedEndDate);
				return { endDate, value: rent.unit.price };
			});

			const data = [];
			const dataLabels = [];
			dateToEarning.forEach((value, key) => {
				data.push(value);
				dataLabels.push(key);
			});

			this.data = data.length !== 0 ? data : [1];
			this.dataLabels = dataLabels.length !== 0 ? dataLabels : [''];
			this.dataOptions = { // TODO va aggiunto il colore
			};
		},
	},
};
</script>
