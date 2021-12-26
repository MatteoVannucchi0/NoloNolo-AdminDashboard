<template>
	<div>
		<ChartRentalsOverTime
			:get-rentals="getRentals"
			name="ProductEarningOverTime"
			:data-options="dataOptions"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */
import appearanceConfig from '../../../assets/helper/appearanceConfig';

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
				hoverBorderColor: appearanceConfig.doughnut.hoverBorderColor,
				hoverBorderWidth: appearanceConfig.doughnut.hoverBorderWidth,
			},
		};
	},
	methods: {
		async getRentals() {
			// TODO CAMBIARE
			console.log('getRentals di product earn over time VA CAMBIATO PERCHE PRENDERE TUTTI I RENTALS');
			const rentals = (await api.rentals.get({ populate: true, limit: 0 })).data.docs;
			const units = (await api.products.getUnits(this.product._id)).data;
			const unitsID = units.map((u) => u._id);

			if (units.length === 0) {
				return [];
			}

			return rentals.filter((r) => unitsID.includes(r._id));
		},
	},
};
</script>
