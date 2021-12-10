<template>
	<div>
		<b-container fluid>
			<h2 class="text-center">
				EMPLOYEES
			</h2>
			<div class="spacer" />
			<b-form-group id="filter-container">
				<b-form-input v-model="filterNameText" placeholder="Enter the employee's name" />
				<b-form-checkbox v-model="filterOnlyWithRents" name="checkboxFilterOnlyWithRents">
					Only with rentals
				</b-form-checkbox>
			</b-form-group>
			<div id="employeeContainer" class="container-grid">
				<CardEmployee v-for="employee in employees" :key="employee._id" :v-if="loaded" :employee="employee" />
			</div>
		</b-container>
		<Pagination :paginator="paginator" @at="paginatorAt" />
	</div>
</template>

<script>

import api from '../../assets/helper/api';

export default {
	data() {
		return {
			paginator: {},
			filterNameText: '',
			filterOnlyWithRents: false,
		};
	},
	computed: {
		employees() {
			return this.paginator ? this.paginator.docs : undefined;
		},
		loaded() {
			return !!this.paginator;
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
		this.paginator = (await api.employees.get()).data;
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
			this.paginator = (await api.employees.paginatorAt(paginator, page, query)).data;
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
