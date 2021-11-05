<template>
	<div>
		<b-navbar toggleable="lg" class="navbar">
			<b-navbar-brand href="#" class="navbar-brand">
				NoloNolo
			</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse" />

			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown right>
					<template #button-content>
						<em>User</em>
					</template>
					<b-dropdown-item href="#">
						Profile
					</b-dropdown-item>
					<b-dropdown-item href="#">
						Sign Out
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
