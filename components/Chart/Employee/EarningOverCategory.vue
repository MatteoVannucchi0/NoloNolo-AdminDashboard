<template>
	<div>
		<ChartRentalsOverCategory :get-rentals="getRentals" name="EmployeeCategoryEarning" />
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */

import api from '../../../assets/helper/api';

export default {
	props: {
		employee: {
			type: Object,
			default: () => {},
		},
	},
	methods: {
		async getRentals() {
			return (await api.rentals.get({ populate: true, employee: this.employee._id, limit: 0 })).data.docs;
		},
	},
};
</script>
