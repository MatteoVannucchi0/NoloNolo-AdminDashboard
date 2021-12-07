<template>
	<div class="info-cards-container">
		<div id="main-info" class="card card-container">
			<CardCustomer :customer="customer" :link="false" />
		</div>
		<div id="category-spending" class="card">
			<ChartCustomerCategorySpending :customer="customer" />
		</div>
		<div id="spending-overtime" class="card">
			<ChartCustomerSpendingOverTime :customer="customer" />
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
