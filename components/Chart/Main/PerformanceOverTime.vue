<template>
	<div>
		<ChartRentalsOverTime
			:rentals="rentals"
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
		onLoaded() {
			this.$emit('loaded');
		},
	},
};
</script>
