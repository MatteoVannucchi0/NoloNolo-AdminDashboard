<template>
	<div>
		<b-container fluid>
			<h2 class="text-center">
				NOLEGGI
			</h2>

			<b-form-group class="filter-container">
				<b-form-group
					id="filter-name-container"
					label-for="filter-name-input"
					label="Nome oggetto"
					description="Filtro degli oggetti per nome"
				>
					<b-form-input id="filter-name-input" v-model="filterNameText" placeholder="Inserisci il nome dell'oggetto" list="name-list" />
					<b-form-datalist id="name-list" :options="nameList" />
				</b-form-group>
				<b-form-group
					id="filter-sort-type-container"
					label-for="filter-sort-type"
					label="Ordina per:"
				>
					<b-form-select
						id="filter-sort-type"
						v-model="selectSortTypeSelected"
						:options="selectSortTypeOption"
					/>
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
			</b-form-group>

			<div v-if="rentals.length > 0">
				<b-container fluid>
					<b-row
						cols="1"
						cols-sm="1"
						cols-md="2"
						cols-lg="2"
						cols-xl="4"
					>
						<b-col v-for="rental in rentals" :key="rental._id" :v-if="loaded" class="mb-4">
							<CardRental :rental="rental" />
						</b-col>
					</b-row>
				</b-container>
				<Pagination :paginator="paginator" @at="paginatorAt" />
			</div>
			<div v-else-if="loaded">
				<h2 style="color: white;">
					Nessun noleggio trovato.
				</h2>
			</div>
			<div v-else />
		</b-container>
	</div>
</template>

<script>
/* eslint-disable no-continue */

import api from '../../assets/helper/api';
import Helper from '../../assets/helper/helper';

export default {
	data() {
		return {
			paginator: undefined,
			rentals: [],
			filterNameText: '',
			checkboxStateSelected: ['pending', 'open', 'close'],
			checkboxStateOption: [
				{ text: 'Pending', value: 'pending' },
				{ text: 'Open', value: 'open' },
				{ text: 'Close', value: 'close' },
			],
			selectSortTypeSelected: 'State-Ascending',
			selectSortTypeOption: ['Date-Ascending', 'Date-Descending', 'State-Ascending', 'State-Descending'],
			nameList: [],
		};
	},
	head() {
		return {
			title: 'Inventario',
		};
	},
	computed: {
		loaded() {
			return !!this.paginator;
		},
	},
	watch: {
		async filterNameText() {
			this.filterUpdate();
		},
		async filterOnlyWithRents() {
			this.filterUpdate();
		},
		selectSortTypeSelected() {
			this.filterUpdate();
		},
		checkboxStateSelected() {
			this.filterUpdate();
		},
	},
	async mounted() {
		// this.paginator = (await api.rentals.get()).data;
		this.paginator = await api.localPagination.fromApi(api.rentals.get, []);
		this.filterUpdate();
	},
	methods: {
		filterUpdate() {
			let filtered = [];

			for (const doc of this.paginator.getAllDocs()) {
				const shouldInclude = this.filterNameText.toLowerCase();
				// eslint-disable-next-line no-underscore-dangle
				const name = doc._id.toLowerCase();

				if (!name.includes(shouldInclude)) {
					continue;
				}

				if (!this.checkboxStateSelected.includes(doc.state)) {
					continue;
				}

				filtered.push(doc);
			}

			filtered = Helper.sortRentalsBy(filtered, this.selectSortTypeSelected);

			this.rentals = this.paginator.setFiltered(filtered);
		},
		async paginatorAt(paginator, page) {
			this.rentals = this.paginator.at(page);
		},
	},
};

</script>

<style scoped>
	.container-grid {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: auto;
		justify-content: stretch;
		column-gap: 15px;
		row-gap: 5px;
	}
</style>
