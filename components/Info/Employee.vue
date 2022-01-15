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
				<CardEmployee :employee="employee" :link="false" />
			</b-col>

			<b-col class="mb-4">
				<div class="card" style="height:100%;">
					<ChartEmployeeEarningOverCategory :employee="employee" />
				</div>
			</b-col>
		</b-row>
		<b-row>
			<b-col class="mb-4">
				<ChartEmployeeEarningOverTime class="card" :employee="employee" />
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<div v-if="rentalsLoaded" class="employee-rentals">
					<h2 class="text-center">
						Noleggi
					</h2>

					<b-form-group id="filter-container">
						<b-form-group
							id="filter-name-container"
							label-for="filterRentalsId"
							label="ID noleggio"
							description="Filtro dei noleggi per id"
						>
							<b-form-input id="filterRentalsId" v-model="filterRentalsId" placeholder="Inserisci l'id del noleggio" />
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
									<CardRental :rental="rental" :link-employee="false" />
								</b-col>
							</b-row>
						</b-container>
						<Pagination v-model="rentalsPaginator.currentPage" :paginator="rentalsPaginator" @at="paginatorRentalAt" />
					</div>
					<h2 v-else class="text-center empty-rentals">
						Nessun noleggio trovato
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
				{ text: 'Aperti', value: 'open' },
				{ text: 'Chiusi', value: 'close' },
			],
			selectSortTypeSelected: 'Più recenti',
			selectSortTypeOption: ['Più recenti', 'Meno recenti', 'Stato crescente', 'Stato decrescente'],
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

</style>
