<template>
	<div>
		<b-container fluid>
			<h2 class="text-center">
				CUSTOMERS
			</h2>
			<div class="spacer" />
			<div class="filter-container">
				<div id="filter-group">
					<b-form-group
						id="filter-name-container"
						label-for="filter-name-input"
						label="Nome cliente"
						description="Filtro dei clienti per nome"
					>
						<b-form-input id="filter-name-input" v-model="filterNameText" placeholder="Inserisci il nome del cliente" list="name-list" />
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

			<div v-if="customers.length > 0 ">
				<b-container fluid>
					<b-row
						cols="1"
						cols-sm="1"
						cols-md="2"
						cols-lg="2"
						cols-xl="4"
					>
						<div v-for="customer in customers" :key="customer._id" :v-if="loaded">
							<b-col class="mb-4">
								<CardCustomer :customer="customer" :show-extra-info="false" />
							</b-col>
						</div>
					</b-row>
				</b-container>
				<Pagination :paginator="paginator" @at="paginatorAt" />
			</div>
			<div v-else-if="!loaded">
				<h2 style="color: white;">
					No customer found.
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
			customers: [],
			filterNameText: '',
			filterOnlyWithRents: false,
			selectSortTypeSelected: 'A-Z',
			selectSortTypeOption: ['A-Z', 'Z-A'],
			nameList: [],
		};
	},
	head() {
		return {
			title: 'Clienti',
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
	},
	async mounted() {
		this.paginator = await api.localPagination.fromApi(api.customers.get, []);
		this.nameList = this.paginator.getAllDocs().map((doc) => `${doc.lastname} ${doc.firstname}`);
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

			this.customers = Helper.sortCustomersBy(filtered, this.selectSortTypeSelected);

			this.customers = this.paginator.setFiltered(filtered);
		},
		async paginatorAt(paginator, page) {
			this.employees = this.paginator.at(page);
		},
	},
};

</script>
