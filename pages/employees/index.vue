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
				<b-form-checkbox-group
					id="checkbox-state"
					v-model="checkboxRoleSelected"
					:options="checkboxRoleOption"
					aria-describedby="employees role selection"
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
			<div id="employeeContainer" class="container-grid">
				<CardEmployee v-for="employee in employees" :key="employee._id" :v-if="loaded" :employee="employee" />
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
	middleware: 'protectedPage',
	data() {
		return {
			paginator: {},
			employees: [],
			filterNameText: '',
			filterOnlyWithRents: false,
			checkboxRoleSelected: ['employee', 'admin'],
			checkboxRoleOption: [
				{ text: 'Employee', value: 'employee' },
				{ text: 'admin', value: 'admin' },
			],
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
		// this.paginator = (await api.employees.get()).data;
		this.paginator = await api.localPagination.fromApi(api.employees.get, []);
		this.filterUpdate();
	},
	methods: {
		filterUpdate() {
			let filtered = [];

			for (const doc of this.paginator.getAllDocs()) {
				const fullName = `${doc.firstname} ${doc.lastname}`.toLowerCase();
				const inverseFullName = `${doc.lastname} ${doc.firstname}`.toLowerCase();
				const shouldInclude = this.filterNameText.toLowerCase();

				if (!fullName.includes(shouldInclude) && !inverseFullName.includes(shouldInclude)) {
					continue;
				}

				if (!this.checkboxRoleSelected.includes(doc.authorization)) {
					continue;
				}

				filtered.push(doc);
			}

			console.log(this.selectSortTypeSelected);

			console.log(filtered);

			filtered = Helper.sortEmployeesBy(filtered, this.selectSortTypeSelected);

			console.log(filtered);

			this.employees = this.paginator.setFiltered(filtered);
		},
		async paginatorAt(paginator, page) {
			this.employees = this.paginator.at(page);
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
