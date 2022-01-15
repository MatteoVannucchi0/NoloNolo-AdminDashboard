<template>
	<div>
		<div class="chart-title">
			Clienti più importanti
		</div>
		<ChartBase
			chart-name="MostValuableCustomer"
			chart-type="bar"
			:data="data"
			:data-options="dataOptions"
			:data-labels="dataLabels"
			:chart-options="chartOptions"
			aria-label="Grafico dei clienti più importanti in base al numero di noleggi"
			@onClick="onClick"
			@preDraw="$emit('preDraw')"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */
import appearanceConfig from '../../../assets/helper/appearanceConfig';

export default {
	props: {
		rentals: {
			type: Array,
			required: true,
		},
		customers: {
			type: Array,
			required: true,
		},
		dataOptions: {
			type: Object,
			default: () => ({ backgroundColor: appearanceConfig.backgroundColor }),
		},

	},
	data() {
		return {
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
		await this.updateGraph();
		this.$emit('loaded');
	},
	methods: {
		async updateGraph() {
			const customersFrequency = new Map();

			for (const rent of this.rentals) {
				const rentCustomer = `${rent.customer.lastname} ${rent.customer.firstname};${rent.customer._id}`;
				const newValue = customersFrequency.get(rentCustomer) + 1 || 1;
				customersFrequency.set(rentCustomer, newValue);
			}

			const sortedMap = new Map([...customersFrequency].sort((a, b) => b[1] - a[1]).slice(0, 10));

			const data = [];
			const dataLabels = [];
			sortedMap.forEach((value, key) => {
				data.push(value);
				dataLabels.push(key.split(';')[0]);
			});

			this.data = data;
			this.dataLabels = dataLabels;
		},
		onClick(contex) {
			const { label } = contex;
			let customer = {};

			for (const cust of this.customers) {
				const custName = `${cust.lastname} ${cust.firstname}`;
				if (custName === label) {
					customer = cust;
					break;
				}
			}

			this.$router.push(`/customers/${customer._id}`);
		},
	},
};
</script>
