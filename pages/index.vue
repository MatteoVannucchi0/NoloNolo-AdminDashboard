<template>
	<div>
		<b-container id="layout-test" fluid>
			<b-container fluid>
				<h2 class="text-center">
					Benvenuto nella dashboard di NoloNolo
				</h2>
				<b-row class="mb-4">
					<b-col class="card">
						<ChartMainPerformanceOverTime v-if="rentals.length > 0" :rentals="rentals" />
					</b-col>
				</b-row>
				<b-row>
					<b-col class="card">
						<ChartMainPerformanceOverCategory v-if="rentals.length > 0" :rentals="rentals" />
					</b-col>
				</b-row>
			</b-container>
			<div class="card">
				TODO top impiegati
				TODO top customer
				TODO top oggetti
			</div>
		</b-container>
	</div>
</template>

<script>
import api from '../assets/helper/api';

export default {
	data() {
		return {
			rentals: [],
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
		const project = ['state', 'startDate', 'expectedEndDate', 'actualEndDate', 'unit'];
		this.rentals = (await api.rentals.get({ populate: true, limit: 0, project })).data.docs;
	},
};

</script>

<style scoped>
</style>
