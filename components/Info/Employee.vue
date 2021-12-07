<template>
	<div class="info-cards-container">
		<div id="main-info" class="card card-container">
			<CardEmployee :employee="employee" :link="false" />
		</div>
		<div id="category-earning" class="card">
			<ChartEmployeeEarningOverCategory :employee="employee" />
		</div>
		<div id="overtime-earning" class="card">
			<ChartEmployeeEarningOverTime :employee="employee" />
		</div>
	</div>
</template>

<script>

export default {
	props: {
		employee: {
			type: Object,
			default: () => {},
		},
	},
	computed: {
	},
};
</script>

<style scoped>
	#main-info {
		grid-area: info;
	}

	#category-earning {
		grid-area: graph1;
	}

	#overtime-earning {
		grid-area: graph2;
	}
</style>
