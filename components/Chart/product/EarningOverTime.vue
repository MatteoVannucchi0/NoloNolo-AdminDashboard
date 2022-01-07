<template>
	<div>
		<ChartRentalsOverTime
			:get-rentals="getRentals"
			name="ProductEarningOverTime"
			:data-options="dataOptions"
			aria-label="Grafico dei noleggi nel tempo del prodotto"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */

import api from '../../../assets/helper/api';

export default {
	props: {
		product: {
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
			const rentals = (await api.rentals.get({ populate: true, limit: 0, product: this.product._id })).data.docs;
			return rentals;
		},
	},
};
</script>
