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
					<div id="employeeContainer" class="container-flex">
						<EmployeeCard v-for="employee in duplicateData" :key="employee._id" :v-if="loaded" :employee="employee" />
					</div>
				</b-container>
			</div>
		</div>
	</div>
</template>

<script>

import api from '../assets/helper/api';

export default {
	data() {
		return {
			employees: {
				type: Array,
				default: () => [],
			},
			loaded: {
				type: Boolean,
				default: false,
			},
		};
	},
	computed: {
		duplicateData() {
			const makeRepeated = (arr, repeats) => [].concat(...Array.from({ length: repeats }, () => arr));

			return makeRepeated(this.employees, 5);
		},
	},
	async mounted() {
		const response = await api.employees.get();
		this.employees = response.data;
		console.log(this.employees);
		this.loaded = true;
	},
};

</script>

<style scoped>
	.card {
		display: flex;
		justify-content: center;
	}

	.container-flex{
		gap: 20px;
	}
</style>
