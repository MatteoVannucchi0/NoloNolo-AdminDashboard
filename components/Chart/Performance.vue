<template>
	<div class="card">
		<div class="">
			<div class="chart-title">
				Performance over {{ graphDataRangeSelected }}
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
		</div>
		<Chart
			chart-type="line"
			:data="chartdata"
			:data-options="dataOptions"
			:chart-options="options"
			:labels="chartLabel"
			height="400px"
		/>
	</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { graph } from '../../assets/helper/global';
import { getShiftedNMonths, getShiftedMonthsForNYear } from '../../assets/helper/graphHelper';

export default {
	props: {

	},
	data() {
		return {
			chartdata: graph.graphData,
			dataOptions: graph.graphOption,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false,
				},
				title: {
					display: true,
					color: 'rgba(229,12,12,0.7)',
					text: 'PERFORMANCE ANNUALI',
					position: 'top',
					align: 'start',
				},
			},
			chartLabel: graph.chartLabel,
			graphDataRangeOptions: [
				{ text: '6M', value: '6 months' },
				{ text: '1Y', value: '1 year' },
				{ text: '5Y', value: '5 year' },
			],
			graphDataRangeSelected: '1 year',
		};
	},

	methods: {
		updateGraph() {
			console.log('Updated graph', this.chartdata);

			if (this.graphDataRangeSelected === '6 months') {
				this.chartLabel = getShiftedNMonths(6);
			} else if (this.graphDataRangeSelected === '1 year') {
				this.chartLabel = getShiftedMonthsForNYear(1);
			} else if (this.graphDataRangeSelected === '5 year') {
				this.chartLabel = getShiftedMonthsForNYear(5);
			}
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
