<template>
	<div>
		<b-container fluid>
			<h2 class="text-center">
				INVENTORY
			</h2>
			<div class="spacer" />
			<b-form-group id="filter-container">
				<b-form-input v-model="filterNameText" placeholder="Enter the product's name" />
				Sort type: <b-form-select
					v-model="selectSortTypeSelected"
					:options="selectSortTypeOption"
					class="mb-3"
					value-field="item"
					text-field="name"
					disabled-field="notEnabled"
				/>
			</b-form-group>
			<div id="employeeContainer" class="container-grid">
				<CardProduct v-for="product in products" :key="product._id" :v-if="loaded" :product="product" />
			</div>
		</b-container>
		<Pagination :paginator="paginator" @at="paginatorAt" />
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
			selectSortTypeOption: ['A-Z', 'Z-A', 'Role-Ascending', 'Role-Descending'],
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
		checkboxRoleSelected() {
			this.filterUpdate();
		},
	},
	async mounted() {
		// this.paginator = (await api.products.get()).data;
		this.paginator = await api.localPagination.fromApi(api.products.get, []);
		this.filterUpdate();
	},
	methods: {
		filterUpdate() {
			const filtered = [];

			for (const doc of this.paginator.getAllDocs()) {
				const shouldInclude = this.filterNameText.toLowerCase();
				const name = doc.name.toLowerCase();

				if (!name.includes(shouldInclude)) {
					continue;
				}

				filtered.push(doc);
			}

			// filtered = Helper.sortproductsBy(filtered, this.selectSortTypeSelected);

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
