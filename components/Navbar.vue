<template>
	<div>
		<b-navbar id="main-navbar">
			<NuxtLink to="/">
				<b-navbar-brand class="navbar-brand">
					Home
				</b-navbar-brand>
			</NuxtLink>

			<b-navbar-toggle target="nav-collapse" />

			<b-navbar-nav class="mx-auto">
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

				<b-nav-item-dropdown text="User">
					<b-dropdown-item href="#">
						EN
					</b-dropdown-item>
					<b-dropdown-item href="#">
						ES
					</b-dropdown-item>
					<b-dropdown-item href="#">
						RU
					</b-dropdown-item>
					<b-dropdown-item href="#">
						FA
					</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
export default {
};
</script>
