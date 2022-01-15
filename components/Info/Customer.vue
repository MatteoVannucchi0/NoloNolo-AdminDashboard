<template>
	<b-container fluid>
		<b-row
			cols="1"
			cols-sm="1"
			cols-md="1"
			cols-lg="2"
			cols-xl="2"
		>
			<b-col class="mb-4">
				<CardCustomer :customer="customer" :link="false" />
			</b-col>
			<b-col class="mb-4">
				<div class="card" style="height:100%;">
					<ChartCustomerCategorySpending :customer="customer" />
				</div>
			</b-col>
		</b-row>
		<b-row>
			<b-col class="mb-4">
				<div class="card" style="height:100%;">
					<ChartCustomerSpendingOverTime :customer="customer" />
				</div>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<div v-if="rentalsLoaded" class="customer-rentals">
					<h2 class="text-center">
						Rentals
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
						<b-container fluid>
							<b-row
								cols="1"
								cols-sm="1"
								cols-md="1"
								cols-lg="2"
								cols-xl="2"
							>
								<b-col v-for="rental in customerRentals" :key="rental._id" class="mb-4">
									<CardRental :rental="rental" :link-customer="false" />
								</b-col>
							</b-row>
						</b-container>
						<Pagination v-model="rentalsPaginator.currentPage" :paginator="rentalsPaginator" @at="paginatorRentalAt" />
					</div>
					<h2 v-else class="text-center empty-rentals">
						No Rentals Found
					</h2>
				</div>
			</b-col>
		</b-row>
	</b-container>
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
