<template>
	<div>
		<b-navbar id="main-navbar">
			<b-navbar-nav class="mx-auto">
				<b-nav-item>
					<NuxtLink to="/" class="sidebar-nav-item">
						Home
					</NuxtLink>
				</b-nav-item>
				<b-nav-item>
					<NuxtLink to="/customers" class="sidebar-nav-item">
						Customers
					</NuxtLink>
				</b-nav-item>
				<b-nav-item>
					<NuxtLink to="/employees" class="sidebar-nav-item">
						Employees
					</NuxtLink>
				</b-nav-item>
				<b-nav-item>
					<NuxtLink to="/inventory" class="sidebar-nav-item">
						Inventory
					</NuxtLink>
				</b-nav-item>
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
export default {
};
</script>

<style scoped>
	#main-navbar{
		border-bottom: 2px solid #27293d;
	}
</style>
