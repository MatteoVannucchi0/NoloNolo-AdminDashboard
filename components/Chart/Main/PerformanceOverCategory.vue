<template>
	<div>
		<ChartRentalsOverCategory :get-rentals="getRentals" name="CustomerCategorySpending" />
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
			return (await api.rentals.get({ populate: true, limit: 0 })).data.docs;
		},
	},
};
</script>
