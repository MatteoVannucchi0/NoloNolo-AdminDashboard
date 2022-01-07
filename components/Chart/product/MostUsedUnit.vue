<template>
	<div>
		<div class="chart-title">
			Unità più usate
		</div>
		<ChartSingleDatasets
			chart-name="ProductMostUsedUnit"
			chart-type="bar"
			:data="data"
			:data-options="dataOptions"
			:data-labels="dataLabels"
			:chart-options="chartOptions"
			aria-label="Grafico della frequenza di utilizzo dell'unità più usate di questo prodotto"
			@preDraw="$emit('preDraw')"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */
import api from '../../../assets/helper/api';
import appearanceConfig from '../../../assets/helper/appearanceConfig';

export default {
	props: {
		product: {
			type: Object,
			required: true,
		},
		dataOptions: {
			type: Object,
			default: () => ({ backgroundColor: appearanceConfig.backgroundColor }),
		},
	},
	data() {
		return {
			rentals: [],
			units: [],
			data: [],
			dataLabels: [],
			chartLabel: [],
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					fontColor: 'white',
					display: false,
				},
				title: {
					display: true,
					color: 'rgba(229,12,12,0.7)',
					text: '',
					position: 'top',
					align: 'start',
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0, // minimum will be 0, unless there is a lower value.
							// OR //
							beginAtZero: true, // minimum value will be 0.
						},
					}],
				},
			},
		};
	},
	async mounted() {
		this.rentals = await this.getRentals();
		this.units = await this.getUnits();
		await this.updateGraph();
		this.$emit('loaded');
	},
	methods: {
		async getRentals() {
			const rentals = (await api.rentals.get({ populate: true, limit: 0, product: this.product._id })).data.docs;
			return rentals;
		},
		async getUnits() {
			const units = (await api.products.getUnits(this.product._id)).data;
			return units;
		},
		async updateGraph() {
			const unitsFrequency = new Map();

			for (const rent of this.rentals) {
				const rentUnit = rent.unit._id;
				const newValue = unitsFrequency.get(rentUnit) + 1 || 1;
				unitsFrequency.set(rentUnit, newValue);
			}

			const data = [];
			const dataLabels = [];
			unitsFrequency.forEach((value, key) => {
				data.push(value);
				dataLabels.push(key);
			});

			this.data = data;
			this.dataLabels = dataLabels;
		},
	},
};
</script>
