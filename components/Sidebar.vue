<template>
	<div id="main-sidebar" class="sidebar" role="navigation">
		<div class="sidebar-header ">
			Sidebar
		</div>
		<b-nav vertical class="sidebar-nav" variant="success" pill>
			<b-nav-item>
				<nuxt-link to="/customers" class="sidebar-nav-item">
					Customers
				</nuxt-link>
			</b-nav-item>
			<b-nav-item>
				<nuxt-link to="/employees" class="sidebar-nav-item">
					Employees
				</nuxt-link>
			</b-nav-item>
			<b-nav-item>
				<nuxt-link to="/inventory" class="sidebar-nav-item">
					Inventory
				</nuxt-link>
			</b-nav-item>
			<b-nav-item>
				<nuxt-link to="/rentals" class="sidebar-nav-item">
					Rentals
				</nuxt-link>
			</b-nav-item>
		</b-nav>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			showSidebar: false, // starts off invisible
		};
	},
	methods: {
		toggleSidebar() {
			this.showSidebar = !this.showSidebar;
		},
	},
};
</script>
