<template>
	<div>
		<ChartRentalsOverTime
			:get-rentals="getRentals"
			name="Performance"
			:data-options="dataOptions"
			aria-label="Grafico dei guadagni nel tempo"
			@loaded="onLoaded"
			@preDraw="$emit('preDraw')"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */
export default {
	props: {
		rentals: [],
	},
	data() {
		return {
			dataOptions: {
				borderColor: 'red',
			},
		};
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
