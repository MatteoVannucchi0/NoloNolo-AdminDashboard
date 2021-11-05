<template>
	<div class="">
		<div
			id="main-sidebar"
			class="sidebar"
			role="navigation"
		>
			<div class="sidebar-header ">
				Sidebar
			</div>
			<b-nav vertical class="sidebar-nav" variant="success" pill>
				<b-nav-item link-classes="sidebar-nav-item">
					Dashboard
				</b-nav-item>
				<b-nav-item link-classes="sidebar-nav-item">
					Customers
				</b-nav-item>
				<b-nav-item link-classes="sidebar-nav-item">
					Employees
				</b-nav-item>
				<b-nav-item disabled link-classes="sidebar-nav-item">
					Disabled
				</b-nav-item>
				<b-nav-item link-classes="sidebar-nav-item">
					Dashboard
				</b-nav-item>
				<b-nav-item link-classes="sidebar-nav-item">
					Customers
				</b-nav-item>
				<b-nav-item link-classes="sidebar-nav-item">
					Employees
				</b-nav-item>
				<b-nav-item disabled link-classes="sidebar-nav-item">
					Disabled
				</b-nav-item>
			</b-nav>
		</div>
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
