<template>
	<div role="navigation">
		<b-sidebar
			id="main-sidebar"
			:visible="true"
			:title="title"
			sidebar-class="sidebar"
			header-class="sidebar-header"
		>
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
			<template #header="{}">
				<div class="">
					{{ title }}
				</div>
			</template>
			<template #footer="{ }">
				<div class="" />
			</template>
		</b-sidebar>
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
