<template>
	<div class="card" style="height:100%;">
		<div class="chart-title">
			Spending over time
		</div>
		<div id="buttonContainer">
			<b-form-radio-group
				id="graphTypeSelect"
				v-model="graphDataRangeSelected"
				:options="graphDataRangeOptions"
				aria-describedby="Graph data range radio"
				button-variant="outline-primary"
				name="radio-btn-outline"
				buttons
				@change="updateGraph"
			/>
		</div>
		<ChartSingleDatasets
			chart-name="CustomerSpendingOverTime"
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

import api from '../../assets/helper/api';
import appearanceConfig from '../../assets/helper/appearanceConfig';
import helper from '../../assets/helper/helper';

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
			graphDataRangeOptions: [
				{ text: '6M', value: '6-M' },
				{ text: '1Y', value: '1-Y' },
				{ text: '5Y', value: '5-Y' },
			],
			graphDataRangeSelected: '1-Y',
		};
	},
	watch: {
		async graphDataRangeSelected() {
			await this.setupData();
		},
	},
	async mounted() {
		await this.setupData();
		this.updateGraph();
	},
	methods: {
		async setupData() {
			const rentals = (await api.customers.getRentals(this.customer._id, { populate: true })).data;

			const monthToActualSpending = new Map();
			const monthToPredictedSpending = new Map();

			const graphPeriod = this.graphDataRangeSelected;

			for (const dateKey of helper.generateDateKeyForPeriod(graphPeriod)) {
				monthToPredictedSpending.set(dateKey, 0);
				monthToActualSpending.set(dateKey, 0);
			}

			for (const rent of rentals) {
				const endDate = rent.state === 'close' ? new Date(rent.actualEndDate) : new Date(rent.expectedEndDate);
				const endMonth = helper.numberToMonth(endDate.getMonth());
				const endYear = endDate.getFullYear();
				const dateKey = `${endMonth}-${endYear}`;

				const spent = rent.unit.price;

				const map = rent.state === 'close' ? monthToActualSpending : monthToPredictedSpending;
				if (map.has(dateKey)) {
					map.set(dateKey, map.get(dateKey) + spent);
				}
			}

			const data = [];
			const dataLabels = [];

			monthToPredictedSpending.forEach((value, key) => {
				data.push(value);
				dataLabels.push(key);
			});

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
