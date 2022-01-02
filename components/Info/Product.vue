<template>
	<div class="info-cards-container">
		<div id="main-info" class="card card-container">
			<CardProduct :product="product" :link="false" />
		</div>
		<div id="category-earning" class="card">
			<ChartProductMostUsedUnit :product="product" />
		</div>
		<div id="overtime-earning" class="card">
			<ChartProductEarningOverTime :product="product" />
		</div>
		<b-tabs id="rentals-and-units" fill active-nav-item-class="tab-active">
			<b-tab title="Rentals" active>
				<div v-if="rentalsLoaded" class="product-rentals">
					<h2 class="text-center">
						Rentals
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
							<CardRental v-for="rental in productRentals" :key="rental._id" :rental="rental" :link-product="false" />
						</div>
						<Pagination v-model="rentalsPaginator.currentPage" :paginator="rentalsPaginator" @at="paginatorRentalAt" />
					</div>
					<h2 v-else class="text-center">
						No Rentals Found
					</h2>
				</div>
			</b-tab>
			<b-tab title="Units">
				<div v-if="unitsLoaded">
					<h2 class="text-center">
						Unità
					</h2>

					<b-form-group id="filter-container-units">
						<b-form-input v-model="filterUnitsId" placeholder="Inserisci il l'id dell'unità" />
						<b-form-checkbox-group
							id="checkbox-condition"
							v-model="checkboxUnitsConditionSelected"
							:options="checkboxUnitsConditionOption"
							aria-describedby="Selezione condizione unità"
							name="checkbox-unit-condition"
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

					<div v-if="!noUnits">
						<b-container fluid>
							<b-row
								cols="1"
								cols-sm="1"
								cols-md="1"
								cols-lg="2"
								cols-xl="2"
							>
								<div v-for="unit in currentUnits" :key="unit._id">
									<b-col class="mb-4">
										<CardUnit :unit="unit" />
									</b-col>
								</div>
							</b-row>
						</b-container>
						<Pagination v-model="unitsPaginator.currentPage" :paginator="unitsPaginator" @at="paginatorUnitAt" />
					</div>
					<h2 v-else class="text-center">
						Nessuna unità trovata
					</h2>
				</div>
			</b-tab>
		</b-tabs>
		<div class="spacer" />
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
			productRentals: [],
			filterRentalsId: '',
			checkboxStateSelected: ['pending', 'open', 'close'],
			checkboxStateOption: [
				{ text: 'Pending', value: 'pending' },
				{ text: 'Open', value: 'open' },
				{ text: 'Close', value: 'close' },
			],
			selectSortTypeSelected: 'State-Ascending',
			selectSortTypeOption: ['Date-Ascending', 'Date-Descending', 'State-Ascending', 'State-Descending'],

			unitsPaginator: {},
			currentUnits: [],
			unitsLoaded: false,
			filterUnitsId: '',
			checkboxUnitsConditionSelected: ['perfect', 'minor flaw', 'major flaw', 'broken'],
			checkboxUnitsConditionOption: [
				{ text: 'Perfetto', value: 'perfect' },
				{ text: 'Danni minori', value: 'minor flaw' },
				{ text: 'Danni gravi', value: 'major flaw' },
				{ text: 'Rotto', value: 'broken' },
			],
		};
	},
	computed: {
		noRentals() {
			return this.productRentals.length === 0;
		},
		noUnits() {
			return this.currentUnits.length === 0;
		},
	},
	watch: {
		filterRentalsId() {
			this.filterUpdateRentals();
		},
		checkboxStateSelected() {
			this.filterUpdateRentals();
		},
		selectSortTypeSelected() {
			this.filterUpdateRentals();
		},

		filterUnitsId() {
			this.filterUpdateUnits();
		},
		checkboxUnitsConditionSelected() {
			this.filterUpdateUnits();
		},
		checkboxUnitsConditionOption() {
			this.filterUpdateUnits();
		},
	},
	async mounted() {
		this.rentalsPaginator = await api.localPagination.fromApi(api.rentals.get, [], { product: this.product._id });
		this.unitsPaginator = await api.localPagination.fromApi(api.products.getUnits, [this.product._id]);
		this.filterUpdateUnits();
		this.filterUpdateRentals();
		this.rentalsLoaded = true;
		this.unitsLoaded = true;
	},
	methods: {
		paginatorRentalAt(page) {
			this.productRentals = this.productRentals.at(page);
		},
		paginatorUnitAt(page) {
			this.unitsPaginator = this.unitsPaginator.at(page);
		},
		filterUpdateRentals() {
			let filtered = [];

			for (const doc of this.rentalsPaginator.getAllDocs()) {
				if (doc._id.includes(this.filterRentalsId) && this.checkboxStateSelected.includes(doc.state)) { filtered.push(doc); }
			}

			filtered = Helper.sortRentalsBy(filtered, this.selectSortTypeSelected);

			this.productRentals = this.rentalsPaginator.setFiltered(filtered);
		},
		filterUpdateUnits() {
			const filtered = [];

			for (const doc of this.unitsPaginator.getAllDocs()) {
				if (doc._id.includes(this.filterUnitsId) && this.checkboxUnitsConditionSelected.includes(doc.condition)) { filtered.push(doc); }
			}

			// filtered = Helper.sortRentalsBy(filtered, this.selectSortTypeSelected);

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
