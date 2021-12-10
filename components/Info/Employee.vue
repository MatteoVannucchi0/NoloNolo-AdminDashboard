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
				<div class="employee-rentals-grid">
					<CardRental v-for="rental in customerRentals" :key="rental._id" :rental="rental" :link-employee="false" />
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
	#main-info {
		grid-area: info;
	}

	#category-earning {
		grid-area: graph1;
	}

	#overtime-earning {
		grid-area: graph2;
	}

	.employee-rentals {
		grid-area: row3;
	}

	.employee-rentals-grid {
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
