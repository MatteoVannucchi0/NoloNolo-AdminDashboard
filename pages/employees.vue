<template>
	<div class="main-container">
		<div class="header-container">
			<Navbar />
		</div>
		<div class="body-container">
			<div class="sidebar-container">
				<Sidebar title="Sidebar" />
			</div>
			<div class="content-container">
				<b-container fluid>
					<div id="employeeContainer" class="container-grid">
						<EmployeeCard v-for="employee in employees" :key="employee._id" :v-if="loaded" :employee="employee" />
					</div>
				</b-container>
				<b-button v-if="paginator.hasPrevPage" @click="paginatorPrev">
					Prev
				</b-button>
				<b-button v-if="paginator.hasNextPage" @click="paginatorNext">
					Next
				</b-button>
			</div>
		</div>
	</div>
</template>

<script>

import api from '../assets/helper/api';

export default {
	data() {
		return {
			paginator: {
				type: Object,
				default: () => {},
			},
		};
	},
	computed: {
		duplicateData() {
			/* const makeRepeated = (arr, repeats) => [].concat(...Array.from({ length: repeats }, () => arr));
			const data = makeRepeated(this.employees, 50); */
			/* eslint-disable no-underscore-dangle */
			/* eslint-disable no-restricted-syntax */

			/* // eslint-disable-next-line vue/no-side-effects-in-computed-properties
			for (const e of data) {
				e._id = Math.random() * (1000000 - 10) + 10;
			} */

			return undefined;
		},

		employees() {
			return this.paginator ? this.paginator.docs : undefined;
		},
		loaded() {
			return !!this.paginator;
		},
	},
	async mounted() {
		this.paginator = (await api.employees.get({ limit: 3 })).data;
	},
	methods: {
		async paginatorPrev() {
			this.paginator = (await api.employees.paginatorPrev(this.paginator)).data;
		},
		async paginatorNext() {
			this.paginator = (await api.employees.paginatorNext(this.paginator)).data;
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
