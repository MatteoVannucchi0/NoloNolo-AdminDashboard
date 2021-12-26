<template>
	<div>
		<ChartRentalsOverCategory :get-rentals="getRentals" name="CustomerCategorySpending" />
	</div>
</template>
<script>
export default {
	props: {
		rentals: [],
	},
	methods: {
		async getRentals() {
			return Promise.resolve(this.rentals);
		},
	},
};
</script>
