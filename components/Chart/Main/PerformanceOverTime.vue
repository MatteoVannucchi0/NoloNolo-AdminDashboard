<template>
	<div>
		<ChartRentalsOverTime
			:get-rentals="getRentals"
			name="Performance"
			:data-options="dataOptions"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */
import appearanceConfig from '../../../assets/helper/appearanceConfig';

export default {
	props: {
		rentals: [],
	},
	data() {
		return {
			dataOptions: {
				borderColor: 'red',
				hoverBorderColor: appearanceConfig.doughnut.hoverBorderColor,
				hoverBorderWidth: appearanceConfig.doughnut.hoverBorderWidth,
			},
		};
	},
	methods: {
		async getRentals() {
			return Promise.resolve(this.rentals);
		},
	},
};
</script>
