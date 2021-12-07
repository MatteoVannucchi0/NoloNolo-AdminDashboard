<template>
	<div class="card" style="height:100%;">
		<ChartRentalsOverTime
			:get-rentals="getRentals"
			name="Performance"
			:data-options="dataOptions"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */
import appearanceConfig from '../../assets/helper/appearanceConfig';

import api from '../../assets/helper/api';

export default {
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
				backgroundColor: 'red',
				hoverBorderColor: appearanceConfig.doughnut.hoverBorderColor,
				hoverBorderWidth: appearanceConfig.doughnut.hoverBorderWidth,
			},
		};
	},
	methods: {
		async getRentals() {
			return (await api.rentals.get({ populate: true, limit: 0 })).data.docs;
		},
	},
};
</script>
