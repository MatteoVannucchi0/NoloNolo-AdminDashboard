<template>
	<div>
		<CardProduct :product="product" :link="false" />
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */

export default {
	props: {
		product: {
			type: Object,
			default: () => {},
		},
	},
};
</script>

<style scoped>
</style>
