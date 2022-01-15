<template>
	<div>
		<b-container fluid>
			<h1 class="text-center">
				IMPIEGATI
			</h1>

			<div class="filter-container">
				<div id="filter-group">
					<b-form-group
						id="filter-name-container"
						label-for="filter-name-input"
						label="Nome impiegato"
						description="Filtro degli impiegati per nome"
					>
						<b-form-input id="filter-name-input" v-model="filterNameText" placeholder="Inserisci il nome dell'impiegato" list="name-list" />
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
							v-slot="{ ariaDescribedby }"
							label="Selezione degli impiegati per ruolo da mostrare"
						>
							<b-form-checkbox-group
								id="filter-checkbox-role"
								v-model="checkboxRoleSelected"
								:options="checkboxRoleOption"
								:aria-describedby="ariaDescribedby"
								name="checkbox-state"
							/>
						</b-form-group>
					</div>
				</div>
			</div>

			<div v-if="employees.length > 0">
				<b-container fluid>
					<b-row
						cols="1"
						cols-sm="1"
						cols-md="2"
						cols-lg="2"
						cols-xl="4"
					>
						<b-col v-for="employee in employees" :key="employee._id" :v-if="loaded" class="mb-4">
							<CardEmployee :employee="employee" />
						</b-col>
					</b-row>
				</b-container>
				<Pagination :paginator="paginator" @at="paginatorAt" />
			</div>
			<div v-else-if="loaded">
				<h2 style="color: white;">
					Nessun impiegato trovato.
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
			employees: [],
			filterNameText: '',
			filterOnlyWithRents: false,
			checkboxRoleSelected: ['employee', 'admin'],
			checkboxRoleOption: [
				{ text: 'Impiegati', value: 'employee' },
				{ text: 'Manager', value: 'admin' },
			],
			selectSortTypeSelected: 'A-Z',
			selectSortTypeOption: ['A-Z', 'Z-A', 'Ruolo crescente', 'Ruolo decrescente'],
			nameList: [],
		};
	},
	head() {
		return {
			title: 'Impiegati',
		};
	},
	computed: {
		loaded() {
			return !!this.paginator;
		},
	},
	watch: {
		filterNameText() {
			this.filterUpdate();
		},
		filterOnlyWithRents() {
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
