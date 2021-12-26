<template>
	<div>
		<b-container id="layout-test" fluid>
			<div class="card">
				<ChartMainPerformanceOverTime v-if="rentals.length > 0" :rentals="rentals" />
			</div>
			<div class="card">
				<ChartMainPerformanceOverCategory v-if="rentals.length > 0" :rentals="rentals" />
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
	.card {
		display: flex;
		justify-content: center;
	}

	#layout-test {
		display: grid;
		grid-gap: 10px;
	}
</style>
