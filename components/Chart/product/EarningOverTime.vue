<template>
	<div>
		<div class="chart-title">
			Guadagno nel tempo
		</div>
		<ChartRentalsOverTime
			:rentals="rentals"
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
			rentals: [],
			dataOptions: {
				borderColor: 'red',
			},
		};
	},
	async mounted() {
		this.rentals = (await api.rentals.get({ populate: true, limit: 0, product: this.product._id })).data.docs;
	},
};
</script>
