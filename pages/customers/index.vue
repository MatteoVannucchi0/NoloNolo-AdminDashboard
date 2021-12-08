<template>
	<div>
		<b-container fluid>
			<b-form-group id="filter-container">
				<b-form-input v-model="filterNameText" placeholder="Enter the customer's name" />
				<b-form-checkbox v-model="filterOnlyWithRents" name="checkboxFilterOnlyWithRents">
					Only with rentals
				</b-form-checkbox>
			</b-form-group>
			<div v-if="!isEmpty">
				<b-card-group id="customerContainer" class="container-grid">
					<CardCustomer v-for="customer in customers" :key="customer._id" :v-if="loaded" :customer="customer" />
				</b-card-group>
				<Pagination :paginator="paginator" @at="paginatorAt" />
			</div>
			<div v-else>
				<h2 style="color: white;">
					No customer found.
				</h2>
			</div>
		</b-container>
	</div>
</template>

<script>

import api from '../../assets/helper/api';

export default {
	data() {
		return {
			paginator: {
				type: Object,
				default: () => {},
			},
			filterNameText: '',
			filterOnlyWithRents: false,
		};
	},
	computed: {
		duplicateData() {
			return undefined;
		},
		customers() {
			return this.paginator ? this.paginator.docs : undefined;
		},
		loaded() {
			return !!this.paginator;
		},
		isEmpty() {
			return this.paginator.totalDocs === 0;
		},
	},
	watch: {
		async filterNameText() {
			await this.getFiltered();
		},
		async filterOnlyWithRents() {
			await this.getFiltered();
		},
	},
	async mounted() {
		this.paginator = (await api.customers.get()).data;
	},
	methods: {
		async getFiltered() {
			const query = {};
			if (this.filterNameText.length > 0) {
				query.nameStartWith = this.filterNameText;
			}

			if (this.filterOnlyWithRents) {
				query.onlyWithRentals = this.filterOnlyWithRents;
			}

			await this.paginatorAt(this.paginator, 1, query);
		},
		async paginatorAt(paginator, page, query = {}) {
			this.paginator = (await api.customers.paginatorAt(paginator, page, query)).data;
		},
	},
};

</script>

<style scoped>
	#filter-container {
		height: 200px;
	}
	.container-grid {
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: auto;
		justify-content: stretch;
		column-gap: 15px;
		row-gap: 5px;
	}
</style>
