<template>
	<div>
		<b-container id="layout-test" fluid>
			<b-container fluid>
				<h2 class="text-center">
					Benvenuto {{ user.firstname || '' }} nella dashboard di NoloNolo
				</h2>

				<div style="margin:0 auto;">
					<div class="text-center">
						<b-spinner v-if="!graphLoaded" label="spinner" style="width: 3rem; height: 3rem;" />
					</div>
				</div>

				<div v-show="preLoaded">
					<b-row class="mb-4">
						<b-col class="card">
							<ChartMainPerformanceOverTime v-if="rentals.length > 0" :rentals="rentals" @preDraw="preDrawGraph" />
						</b-col>
					</b-row>
					<b-row class="mb-4">
						<b-col class="card mr-4">
							<ChartMainPerformanceOverCategory v-if="rentals.length > 0" :rentals="rentals" @loaded="onGraphLoad" />
						</b-col>
						<b-col class="card">
							<ChartMainMostSoldProducts v-if="rentals.length > 0 && units.length > 0" :rentals="rentals" :units="units" :products="products" />
						</b-col>
					</b-row>
					<b-row class="mb-4">
						<b-col class="card mr-4">
							<ChartMainMostValuableCustomers v-if="rentals.length > 0 && customers.length > 0" :rentals="rentals" :customers="customers" />
						</b-col>
						<b-col class="card" />
					</b-row>
				</div>
			</b-container>
		</b-container>
	</div>
</template>

<script>
import api from '../assets/helper/api';
import config from '../assets/helper/config';

export default {
	data() {
		return {
			user: {},
			rentals: [],
			products: [],
			units: [],
			customers: [],
			employees: [],
			graphLoaded: false,
			preLoaded: false,
		};
	},
	head() {
		return {
			title: 'Manager-Dashboard',
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
				{ charset: 'utf-8' },
			],
		};
	},
	async mounted() {
		this.user = await config.user();
		const project = ['state', 'startDate', 'expectedEndDate', 'actualEndDate', 'unit', 'customer'];
		this.rentals = (await api.rentals.get({ populate: true, limit: 0, project })).data.docs;
		this.products = (await api.products.get({ limit: 0 })).data.docs;
		this.units = (await api.units.get({ limit: 0, populate: true })).data;
		this.customers = (await api.customers.get({ limit: 0 })).data.docs;
		this.employees = (await api.employees.get({ limit: 0 })).data.docs;
	},
	methods: {
		onGraphLoad() {
			this.graphLoaded = true;
		},
		preDrawGraph() {
			this.preLoaded = true;
		},
	},
};

</script>

<style scoped>
</style>
