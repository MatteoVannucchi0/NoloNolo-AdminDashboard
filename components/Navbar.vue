<template>
	<div>
		<b-navbar id="main-navbar" toggleable="sm" type="dark">
			<b-navbar-brand to="/" class="sidebar-nav-item">
				Dashboard
			</b-navbar-brand>
			<b-navbar-toggle target="navbar-collapse" style="color: white !important;" />
			<b-collapse id="navbar-collapse" is-nav>
				<b-navbar-nav class="mr-auto">
					<b-nav-item to="/customers" class="navbar-nav-item-color">
						Clienti
					</b-nav-item>
					<b-nav-item to="/employees" class="navbar-nav-item-color">
						Impiegati
					</b-nav-item>
					<b-nav-item to="/inventory" class="navbar-nav-item-color">
						Inventario
					</b-nav-item>
					<b-nav-item to="/rentals" class="navbar-nav-item-color">
						Noleggi
					</b-nav-item>
				</b-navbar-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item class="navbar-nav-item-color" @click="logout">
						Logout
					</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import config from '../assets/helper/config';

export default {
	methods: {
		logout() {
			config.logout();
			this.$router.push('/login');
		},
	},
};
</script>

<style scoped>
	#main-navbar{
		padding-bottom: 0px;
		padding-top: 0px;
		margin-bottom: 0px;
		border-bottom: 2px solid #27293d;
	}
</style>
