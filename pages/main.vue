<template>
	<div class="main-container">
		<div class="header-container">
			<Navbar />
		</div>
		<div class="body-container">
			<div class="sidebar-container">
				<Sidebar title="Sidebar" />
			</div>
			<div class="content-container fill-child-flex-space">
				<ExampleChart title="graph-card" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'mainLayout',
};
</script>
