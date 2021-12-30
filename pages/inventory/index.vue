<template>
	<div>
		<b-container fluid>
			<h2 class="text-center">
				INVENTORY
			</h2>
			<div class="spacer" />

			<div class="filter-container">
				<div id="filter-group">
					<b-form-group
						id="filter-name-container"
						label-for="filter-name-input"
						label="Nome oggetto"
						description="Filtro degli oggetti per nome"
					>
						<b-form-input id="filter-name-input" v-model="filterNameText" placeholder="Inserisci il nome dell'oggetto" list="name-list" />
						<b-form-datalist id="name-list" :options="nameList" />
					</b-form-group>
					<div id="other-filter">
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
					</div>
				</div>
			</div>

			<div v-if="products.length > 0">
				<b-container fluid>
					<b-row
						cols="1"
						cols-sm="1"
						cols-md="2"
						cols-lg="2"
						cols-xl="4"
					>
						<div v-for="product in products" :key="product._id" :v-if="loaded">
							<b-col class="mb-4">
								<CardProduct :product="product" />
							</b-col>
						</div>
					</b-row>
				</b-container>
				<Pagination :paginator="paginator" @at="paginatorAt" />
			</div>
			<div v-else-if="!loaded">
				<h2 style="color: white;">
					No product found.
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
			paginator: {},
			products: [],
			filterNameText: '',
			selectSortTypeSelected: 'A-Z',
			selectSortTypeOption: ['A-Z', 'Z-A'],
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
	},
	async mounted() {
		// this.paginator = (await api.products.get()).data;
		this.paginator = await api.localPagination.fromApi(api.products.get, []);
		this.nameList = this.paginator.getAllDocs().map((doc) => `${doc.name}`);

		this.filterUpdate();
	},
	methods: {
		filterUpdate() {
			let filtered = [];

			for (const doc of this.paginator.getAllDocs()) {
				const shouldInclude = this.filterNameText.toLowerCase();
				const name = doc.name.toLowerCase();

				if (!name.includes(shouldInclude)) {
					continue;
				}

				filtered.push(doc);
			}

			filtered = Helper.sortProductsBy(filtered, this.selectSortTypeSelected);

			this.products = this.paginator.setFiltered(filtered);
		},
		async paginatorAt(paginator, page) {
			this.products = this.paginator.at(page);
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
