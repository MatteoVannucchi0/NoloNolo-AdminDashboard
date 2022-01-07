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
			<h2 v-if="!noRentals" class="text-center">
				Rentals
			</h2>
			<h2 v-else class="text-center">
				No Rentals Found
			</h2>
			<b-form-group id="filter-container">
				<b-form-group
					id="filter-name-container"
					label-for="filterRentalsId"
					label="ID noleggio"
					description="Filtro dei noleggi per id"
				>
					<b-form-input id="filterRentalsId" v-model="filterRentalsId" placeholder="Enter the rental's id" :aria-describedby="ariaDescribedby" />
				</b-form-group>

				<b-form-group v-slot="{ ariaDescribedby }" label="Filtro per stato del noleggio">
					<b-form-checkbox-group
						id="checkbox-state"
						v-model="checkboxStateSelected"
						:options="checkboxStateOption"
						:aria-describedby="ariaDescribedby"
						name="checkbox-state"
					/>
				</b-form-group>

				<b-form-group label="Tipo di ordinamento" label-for="selectSortType">
					<b-form-select
						id="selectSortType"
						v-model="selectSortTypeSelected"
						:options="selectSortTypeOption"
						class="mb-3"
						value-field="item"
						text-field="name"
						disabled-field="notEnabled"
					/>
				</b-form-group>
			</b-form-group>

			<div v-if="!noRentals">
				<div class="customer-rentals-grid">
					<CardRental v-for="rental in customerRentals" :key="rental._id" :rental="rental" :link-customer="false" />
				</div>
				<Pagination v-model="rentalsPaginator.currentPage" :paginator="rentalsPaginator" @at="paginatorRentalAt" />
			</div>
			<div v-else class="empty-rentals" />
		</div>
	</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import api from '../../assets/helper/api';
import Helper from '../../assets/helper/helper';

export default {
	props: {
		customer: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			rentalsLoaded: false,
			rentalsPaginator: {},
			customerRentals: [],
			filterRentalsId: '',
			checkboxStateSelected: ['pending', 'open', 'close'],
			checkboxStateOption: [
				{ text: 'Pending', value: 'pending' },
				{ text: 'Open', value: 'open' },
				{ text: 'Close', value: 'close' },
			],
			selectSortTypeSelected: 'State-Ascending',
			selectSortTypeOption: ['Date-Ascending', 'Date-Descending', 'State-Ascending', 'State-Descending'],
		};
	},
	computed: {
		noRentals() {
			return this.customerRentals.length === 0;
		},
	},
	watch: {
		filterRentalsId() {
			this.filterUpdate();
		},
		checkboxStateSelected() {
			this.filterUpdate();
		},
		selectSortTypeSelected() {
			this.filterUpdate();
		},
	},
	async mounted() {
		this.rentalsPaginator = await api.localPagination.fromApi(api.customers.getRentals, [this.customer._id]);
		this.filterUpdate();
		this.rentalsLoaded = true;
	},
	methods: {
		paginatorRentalAt(paginator, page) {
			this.customerRentals = this.rentalsPaginator.at(page);
		},
		filterUpdate() {
			let filtered = [];

			for (const doc of this.rentalsPaginator.getAllDocs()) {
				if (doc._id.includes(this.filterRentalsId) && this.checkboxStateSelected.includes(doc.state)) { filtered.push(doc); }
			}

			filtered = Helper.sortRentalsBy(filtered, this.selectSortTypeSelected);

			this.customerRentals = this.rentalsPaginator.setFiltered(filtered);
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

	.empty-rentals {
		height: 500px;
	}
</style>
