<template>
	<div class="main-container">
		<div class="header-container">
			<Navbar />
		</div>
		<div class="body-container">
			<div class="sidebar-container">
				<Sidebar v-if="false" title="Sidebar" />
			</div>
			<div class="content-container">
				<Nuxt />
			</div>
		</div>
		<div class="footer-container">
			<Footer />
		</div>
	</div>
</template>
