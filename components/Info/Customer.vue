<template>
	<div class="info-cards-container">
		<div id="main-info" class="card card-container">
			<CardCustomer :customer="customer" :link="false" />
		</div>
		<div id="category-spending">
			<ChartCustomerCategorySpending :customer="customer" />
		</div>
	</div>
</template>

<script>

export default {
	props: {
		customer: {
			type: Object,
			default: () => {},
		},
	},
};
</script>

<style scoped>
	.info-cards-container {
		display: grid;
		grid-template-areas: "info graph1"
							"graph2 graph3";
		grid-template-columns: 1fr 1fr;
		grid-gap: 10px;
		height: 100%;
	}

	#main-info {
		grid-area: info;
	}

	#category-spending {
		grid-area: graph1;
	}

	#spending-overtime {
		grid-area: graph2;
	}
</style>
