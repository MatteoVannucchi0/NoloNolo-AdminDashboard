<template>
	<div>
		<b-container fluid>
			<h2 class="text-center">
				EMPLOYEES
			</h2>
			<div class="spacer" />

			<div id="filter-container">
				<div id="filter-group">
					<b-form-group
						id="filter-name-container"
						label-for="filter-name-input"
						label="Nome impiegato"
						description="Filtro degli impiegati per nome"
					>
						<b-form-input id="filter-name-input" v-model="filterNameText" placeholder="Enter the employee's name" list="name-list" />
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
						<b-form-group
							id="filter-checkbox-role-container"
							label-for="filter-checkbox-role"
							label="Mostra solo:"
						>
							<b-form-checkbox-group
								id="filter-checkbox-role"
								v-model="checkboxRoleSelected"
								:options="checkboxRoleOption"
								aria-describedby="employees role selection"
								name="checkbox-state"
							/>
						</b-form-group>
					</div>
				</div>
			</div>

			<div v-if="employees.length > 0">
				<div id="employeeContainer" class="container-grid">
					<CardEmployee v-for="employee in employees" :key="employee._id" :v-if="loaded" :employee="employee" />
				</div>
				<Pagination :paginator="paginator" @at="paginatorAt" />
			</div>
			<div v-else>
				<h2 style="color: white;">
					No employee found.
				</h2>
			</div>
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
			employees: [],
			filterNameText: '',
			filterOnlyWithRents: false,
			checkboxRoleSelected: ['employee', 'admin'],
			checkboxRoleOption: [
				{ text: 'Employee', value: 'employee' },
				{ text: 'Admin', value: 'admin' },
			],
			selectSortTypeSelected: 'A-Z',
			selectSortTypeOption: ['A-Z', 'Z-A', 'Role-Ascending', 'Role-Descending'],
			nameList: [],
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
		this.nameList = this.paginator.getAllDocs().map((doc) => `${doc.lastname} ${doc.firstname}`);

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

			filtered = Helper.sortEmployeesBy(filtered, this.selectSortTypeSelected);

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
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: auto;
		justify-content: stretch;
		column-gap: 15px;
		row-gap: 5px;
	}

	#filter-container{
		padding: 0 10vw 0 10vw;
	}
</style>
