<template>
	<div>
		<div class="chart-title">
			Impiegati più importanti
		</div>
		<ChartBase
			chart-name="MostValuableEmployees"
			chart-type="bar"
			:data="data"
			:data-options="dataOptions"
			:data-labels="dataLabels"
			:chart-options="chartOptions"
			aria-label="Grafico degli impiegati più importanti"
			@onClick="onClick"
			@preDraw="$emit('preDraw')"
		/>
	</div>
</template>
<script>
/* eslint-disable no-continue */
/* eslint-disable no-underscore-dangle */
import appearanceConfig from '../../../assets/helper/appearanceConfig';

export default {
	props: {
		rentals: {
			type: Array,
			required: true,
		},
		employees: {
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
			const employeesFrequency = new Map();

			for (const rent of this.rentals) {
				if (!rent.employee) { continue; }

				const rentEmployee = `${rent.employee.lastname} ${rent.employee.firstname};${rent.employee._id}`;
				const newValue = employeesFrequency.get(rentEmployee) + 1 || 1;
				employeesFrequency.set(rentEmployee, newValue);
			}

			const sortedMap = new Map([...employeesFrequency].sort((a, b) => b[1] - a[1]).slice(0, 10));

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
			let employee = {};

			for (const emp of this.employees) {
				const empName = `${emp.lastname} ${emp.firstname}`;
				if (empName === label) {
					employee = emp;
					break;
				}
			}

			if (employee._id) { this.$router.push(`/employees/${employee._id}`); }
		},
	},
};
</script>
