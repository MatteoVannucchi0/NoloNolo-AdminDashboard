<template>
	<div>
		<ChartRentalsOverTime
			:get-rentals="getRentals"
			name="CustomerSpendingOverTime"
			:data-options="dataOptions"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */

import api from '../../../assets/helper/api';

export default {
	props: {
		customer: {
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
			return (await api.customers.getRentals(this.customer._id, { populate: true, limit: 0 })).data.docs;
		},
	},
};
</script>
