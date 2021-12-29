<template>
	<div>
		<b-navbar id="main-navbar" toggleable="sm" type="dark">
			<b-navbar-brand href="#">
				<NuxtLink to="/" class="sidebar-nav-item">
					Dashboard
				</NuxtLink>
			</b-navbar-brand>
			<b-navbar-toggle target="navbar-collapse" />
			<b-collapse id="navbar-collapse" is-nav>
				<b-navbar-nav class="mr-auto">
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
			</b-collapse>
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
