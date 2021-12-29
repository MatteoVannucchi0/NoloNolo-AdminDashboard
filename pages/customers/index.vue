<template>
	<div>
		<b-container fluid>
			<h2 class="text-center">
				CUSTOMERS
			</h2>
			<div class="spacer" />
			<b-form-group id="filter-container">
				<b-form-input v-model="filterNameText" placeholder="Enter the customer's name" />
				<b-form-checkbox v-model="filterOnlyWithRents" name="checkboxFilterOnlyWithRents">
					Only with rentals
				</b-form-checkbox>
			</b-form-group>
			<div v-if="customers.length > 0">
				<div id="customersContainer" class="container-grid">
					<CardCustomer v-for="customer in customers" :key="customer._id" :v-if="loaded" :customer="customer" />
				</div>
				<Pagination :paginator="paginator" @at="paginatorAt" />
			</div>
			<div v-else>
				<h2 style="color: white;">
					No customers found.
				</h2>
			</div>
		</b-container>
	</div>
</template>

<script>
/* eslint-disable no-continue */

import api from '../../assets/helper/api';

export default {
	data() {
		return {
			paginator: {},
			customers: [],
			filterNameText: '',
			filterOnlyWithRents: false,
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
	},
	async mounted() {
		this.paginator = await api.localPagination.fromApi(api.customers.get, []);
		this.filterUpdate();
	},
	methods: {
		filterUpdate() {
			const filtered = [];

			for (const doc of this.paginator.getAllDocs()) {
				const fullName = `${doc.firstname} ${doc.lastname}`.toLowerCase();
				const inverseFullName = `${doc.lastname} ${doc.firstname}`.toLowerCase();
				const shouldInclude = this.filterNameText.toLowerCase();

				if (!fullName.includes(shouldInclude) && !inverseFullName.includes(shouldInclude)) {
					continue;
				}

				filtered.push(doc);
			}

			this.customers = this.paginator.setFiltered(filtered);
		},
		async paginatorAt(paginator, page) {
			this.employees = this.paginator.at(page);
		},
	},
};

</script>

<style scoped>
	#filter-container {
		height: 100px;
	}
	.container-grid {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: auto;
		justify-content: stretch;
		column-gap: 15px;
		row-gap: 5px;
	}

	.spacer{
		height: 10px;
	}
</style>
