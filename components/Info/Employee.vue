<template>
	<b-container fluid>
		<b-row>
			<b-col class="mb-4 pl-0" sm="12" md="6" align-v="stretch">
				<CardEmployee :employee="employee" :link="false" />
			</b-col>

			<b-col id="category-earning" class="mb-4 card" sm="12" md="6" align-v="stretch">
				<ChartEmployeeEarningOverCategory :employee="employee" />
			</b-col>
		</b-row>
		<b-row>
			<b-col id="overtime-earning" class="mb-4 card">
				<ChartEmployeeEarningOverTime :employee="employee" />
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<div v-if="rentalsLoaded" class="employee-rentals">
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
						<b-container fluid>
							<b-row
								cols="1"
								cols-sm="1"
								cols-md="1"
								cols-lg="2"
								cols-xl="2"
							>
								<div v-for="rental in customerRentals" :key="rental._id">
									<b-col class="mb-4">
										<CardRental :rental="rental" :link-employee="false" />
									</b-col>
								</div>
							</b-row>
						</b-container>
						<Pagination v-model="rentalsPaginator.currentPage" :paginator="rentalsPaginator" @at="paginatorRentalAt" />
					</div>
					<div v-else class="empty-rentals" />
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
		employee: {
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
		this.rentalsPaginator = await api.localPagination.fromApi(api.employees.getRentals, [this.employee._id]);
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

	.empty-rentals {
		height: 500px;
	}
</style>
