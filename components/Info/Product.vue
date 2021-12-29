<template>
	<div class="info-cards-container">
		<div id="main-info" class="card card-container">
			<CardProduct :product="product" :link="false" />
		</div>
		<div id="category-earning" class="card">
			TODO top unit usate
		</div>
		<div id="overtime-earning" class="card">
			<ChartProductEarningOverTime :product="product" />
		</div>
		<b-tabs id="rentals-and-units" fill active-nav-item-class="tab-active">
			<b-tab title="Rentals" active>
				<div v-if="rentalsLoaded" class="product-rentals">
					<h2 v-if="!noRentals" class="text-center">
						Rentals
					</h2>
					<h2 v-else class="text-center">
						No Rentals Found
					</h2>
					<b-form-group id="filter-container">
						<b-form-input v-model="filterRentalsId" placeholder="Enter the rental's id" />
						<b-form-checkbox-group
							id="checkbox-state"
							v-model="checkboxStateSelected"
							:options="checkboxStateOption"
							aria-describedby="rentals state selection"
							name="checkbox-state"
						/>
						Sort type: <b-form-select
							v-model="selectSortTypeSelected"
							:options="selectSortTypeOption"
							class="mb-3"
							value-field="item"
							text-field="name"
							disabled-field="notEnabled"
						/>
					</b-form-group>

					<div v-if="!noRentals">
						<div class="product-rentals-grid">
							<CardRental v-for="rental in customerRentals" :key="rental._id" :rental="rental" :link-product="false" />
						</div>
						<Pagination v-model="rentalsPaginator.currentPage" :paginator="rentalsPaginator" @at="paginatorRentalAt" />
					</div>
					<div v-else class="empty-rentals" />
				</div>
			</b-tab>
			<b-tab title="Units">
				<div v-if="currentUnits.length > 0" class="product-rentals-grid">
					<CardUnit v-for="unit in currentUnits" :key="unit._id" :unit="unit" />
				</div>
				<h2 v-else class="text-center">
					No Units Found
				</h2>
			</b-tab>
		</b-tabs>
	</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import api from '../../assets/helper/api';
import Helper from '../../assets/helper/helper';

export default {
	props: {
		product: {
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
			checkboxStateSelected: ['open', 'close'],
			checkboxStateOption: [
				{ text: 'Open', value: 'open' },
				{ text: 'Close', value: 'close' },
			],
			selectSortTypeSelected: 'State-Ascending',
			selectSortTypeOption: ['Date-Ascending', 'Date-Descending', 'State-Ascending', 'State-Descending'],

			unitsPaginator: {},
			currentUnits: [],
			unitsLoaded: false,
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
		this.unitsPaginator = await api.localPagination.fromApi(api.products.getUnits, [this.product._id]);
		this.filterUpdateUnits();
		console.log(this.currentUnits);
		// this.rentalsPaginator = await api.localPagination.fromApi(api.products.getRentals, [this.product._id]);
		// this.filterUpdate();
		// this.rentalsLoaded = true;
	},
	methods: {
		paginatorRentalAt(page) {
			this.currentUnits = this.unitsPaginator.at(page);
		},
		filterUpdateRentals() {
		},
		filterUpdateUnits() {
			const filtered = this.unitsPaginator.getAllDocs();
			this.currentUnits = this.unitsPaginator.setFiltered(filtered);
		},
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

	#rentals-and-units {
		grid-area: row3;
	}

	.product-rentals-grid {
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

<style>
	.tab-active{
		background-color:#27293d !important;
		color: white;
	}
</style>
