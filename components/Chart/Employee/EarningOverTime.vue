<template>
	<div>
		<div class="chart-title">
			Guadagno nel tempo
		</div>
		<ChartRentalsOverTime
			:rentals="rentals"
			name="EmployeeEarningOverTime"
			:data-options="dataOptions"
			aria-label="Grafico dei guadagni nel tempo del impiegato"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */

import api from '../../../assets/helper/api';

export default {
	props: {
		employee: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			rentals: [],
			loaded: {
				type: Boolean,
				default: false,
			},
			dataOptions: {
				borderColor: 'red',
			},
		};
	},
	async mounted() {
		this.rentals = (await api.rentals.get({ populate: true, employee: this.employee._id, limit: 0 })).data.docs;
	},
};
</script>
