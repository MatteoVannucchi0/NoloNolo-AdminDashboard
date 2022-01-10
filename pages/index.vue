<template>
	<div>
		<b-container fluid>
			<h1 class="text-center">
				Benvenuto {{ user.firstname || '' }} nella dashboard di NoloNolo
			</h1>

			<div style="margin:0 auto;">
				<div class="text-center">
					<b-spinner v-if="!graphLoaded" label="spinner" style="width: 3rem; height: 3rem;" />
				</div>
			</div>

			<div v-show="preLoaded" style="width: 100%;">
				<b-row class="mb-4" style="height:100%;">
					<b-col>
						<ChartMainPerformanceOverTime class="card" :rentals="rentals" @loaded="onGraphLoad" @preDraw="preDrawGraph" />
					</b-col>
				</b-row>

				<b-tabs id="tabs-for-chart" fill active-nav-item-class="tab-active" class="mt-4">
					<b-tab title="Prodotti" active class="pt-4">
						<b-row>
							<b-col class="mb-4">
								<ChartMainMostSoldProducts v-if="rentals.length > 0 && units.length > 0" class="card" :rentals="rentals" :units="units" :products="products" />
							</b-col>
						</b-row>
						<b-row
							cols="1"
							cols-sm="1"
							cols-md="1"
							cols-lg="2"
							cols-xl="2"
						>
							<b-col class="mb-4">
								<ChartMainPerformanceOverCategory v-if="rentals.length > 0 && units.length > 0" class="card" :rentals="rentals" :units="units" />
							</b-col>
							<b-col class="mb-4">
								<ChartMainRentPerCategory v-if="rentals.length > 0 && units.length > 0" class="card" :rentals="rentals" :units="units" />
							</b-col>
						</b-row>
					</b-tab>
					<b-tab title="Clienti" lazy class="pt-4">
						<b-row
							cols="1"
							cols-sm="1"
							cols-md="1"
							cols-lg="1"
							cols-xl="1"
						>
							<b-col class="mb-4">
								<ChartMainMostValuableCustomers v-if="rentals.length > 0 && customers.length > 0" class="card" :rentals="rentals" :customers="customers" />
							</b-col>
						</b-row>
					</b-tab>
					<b-tab title="Impiegati" lazy class="pt-4">
						<b-row
							cols="1"
							cols-sm="1"
							cols-md="1"
							cols-lg="1"
							cols-xl="1"
						>
							<b-col class="mb-4">
								<ChartMainMostValuableEmployees v-if="rentals.length > 0 && employees.length > 0" class="card" :rentals="rentals" :employees="employees" />
							</b-col>
						</b-row>
					</b-tab>
				</b-tabs>
			</div>
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
			htmlAttrs: { lang: 'it' },
		};
	},
	async mounted() {
		this.user = await config.user();
		this.rentals = (await api.rentals.get({ populate: true, limit: 0 })).data.docs;
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
