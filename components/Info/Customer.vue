<template>
	<div class="info-cards-container">
		<div class="card card-container main-info">
			<CardCustomer :customer="customer" :link="false" />
		</div>
		<div class="card category-spending">
			<ChartCustomerCategorySpending :customer="customer" />
		</div>
		<div class="card spending-overtime">
			<ChartCustomerSpendingOverTime :customer="customer" />
		</div>
		<div v-if="rentalsLoaded" class="customer-rentals">
			<div v-if="!noRentals">
				<h2 class="text-center">
					Rentals
				</h2>
				<div class="customer-rentals-grid">
					<CardRental v-for="rental in customerRentals" :key="rental._id" :rental="rental" />
				</div>
				<Pagination :paginator="rentalsPaginator" @at="paginatorRentalAt" />
			</div>
			<h2 v-else class="text-center">
				No Rentals associated with this customer
			</h2>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import api from '../../assets/helper/api';

export default {
	props: {
		customer: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			customerRentals: [],
			rentalsLoaded: false,
			rentalsPaginator: {},
		};
	},
	computed: {
		noRentals() {
			return this.customerRentals.length === 0;
		},
	},
	async mounted() {
		this.rentalsPaginator = (await api.customers.getRentals(this.customer._id)).data;
		this.customerRentals = this.rentalsPaginator.docs;
		this.rentalsLoaded = true;
	},
	methods: {
		async paginatorRentalAt(paginator, page, query = {}) {
			this.rentalsPaginator = (await api.customers.paginatorRentalAt(paginator, this.customer._id, page, query)).data;
			this.customerRentals = this.rentalsPaginator.docs;
		},
	},
};
</script>

<style scoped>
	.main-info {
		grid-area: info;
	}

	.category-spending {
		grid-area: graph1;
	}

	.spending-overtime {
		grid-area: graph2;
	}

	.customer-rentals {
		grid-area: row3;
	}

	.customer-rentals-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto;
		justify-content: stretch;
		column-gap: 15px;
		row-gap: 5px;
	}
</style>
