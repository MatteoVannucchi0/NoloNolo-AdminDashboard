<template>
	<div>
		<b-container fluid>
			<ChartPerformance />
		</b-container>
	</div>
</template>

<script>

export default {
	data() {
		return {};
	},
	head() {
		return {
			title: 'Manager-Dashboard',
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
				{ charset: 'utf-8' },
			],
		};
	},
};

</script>

<style scoped>
	.card {
		display: flex;
		justify-content: center;
	}
</style>
