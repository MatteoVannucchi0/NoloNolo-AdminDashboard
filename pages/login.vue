<template>
	<div class="login-outer-container ">
		<div>
			<LoginForm title="Sign in" to="/" />
		</div>
	</div>
</template>

<script>
export default {
	layout: 'empty',
	head() {
		return {
			title: 'Dashboard-login',
			htmlAttrs: { lang: 'it' },
		};
	},
};
</script>

<style scoped>
</style>
