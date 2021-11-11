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
					<ChartPerformance />
				</b-container>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
	},
};

</script>

<style scoped>
	.card {
		display: flex;
		justify-content: center;
	}
</style>
