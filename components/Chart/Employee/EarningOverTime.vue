<template>
	<div>
		<ChartRentalsOverTime
			:get-rentals="getRentals"
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
			rentals: {
				type: Array,
				default: () => [],
			},
			loaded: {
				type: Boolean,
				default: false,
			},
			dataOptions: {
				borderColor: 'red',
			},
		};
	},
	methods: {
		async getRentals() {
			return (await api.rentals.get({ populate: true, employee: this.employee._id, limit: 0 })).data.docs;
		},
	},
};
</script>
