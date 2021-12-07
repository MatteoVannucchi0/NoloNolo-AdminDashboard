<template>
	<div>
		<b-container id="layout-test" fluid>
			<div class="card">
				<ChartMainPerformanceOverTime />
			</div>
			<div class="card">
				<ChartMainPerformanceOverCategory />
			</div>
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

	#layout-test {
		display: grid;
	}
</style>
