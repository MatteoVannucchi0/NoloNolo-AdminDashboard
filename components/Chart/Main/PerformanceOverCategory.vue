<template>
	<div>
		<ChartRentalsOverCategory :get-rentals="getRentals" name="CustomerCategorySpending" @loaded="onLoaded" @preDraw="$emit('preDraw')" />
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
		onLoaded() {
			this.$emit('loaded');
		},
	},
};
</script>
