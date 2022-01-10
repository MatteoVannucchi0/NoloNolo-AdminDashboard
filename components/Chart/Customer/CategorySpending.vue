<template>
	<div style="height: 100%;">
		<div class="chart-title">
			Spese per categoria
		</div>
		<ChartRentalsOverCategory :get-rentals="getRentals" name="CustomerCategorySpending" aria-label="Grafico dei noleggi per categoria del cliente" />
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */

import api from '../../../assets/helper/api';

export default {
	props: {
		customer: {
			type: Object,
			default: () => {},
		},
	},
	methods: {
		async getRentals() {
			return (await api.customers.getRentals(this.customer._id, { populate: true, limit: 0 })).data.docs;
		},
	},
};
</script>
