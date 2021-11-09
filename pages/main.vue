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
					<div class="card">
						<LineChart
							:aria-label="title"
							role="figure"
							title="graph-card"
							:data="chartdata"
							:data-options="dataOptions"
							:chart-options="options"
						/>
					</div>
					<div class="card">
						ciao
					</div>
				</b-container>
			</div>
		</div>
	</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { graph } from '../assets/global';

export default {
	layout: 'mainLayout',
	data() {
		return {
			chartdata: graph.graphData,
			dataOptions: graph.graphOption,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false,
				},
				title: {
					display: true,
					text: 'Chart.js Bar Chart',
				},
			},
		};
	},
};

/*
	responsive: true,
				plugins: {
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'Chart.js Line Chart',
					},
				},
*/

</script>

<style scoped>
	.card {
		display: flex;
		justify-content: center;
	}
</style>
