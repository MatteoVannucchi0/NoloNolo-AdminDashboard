<template>
	<div class="login-outer-container">
		<div class="card">
			<LoginForm title="Sign in" :url="$config.apiBaseURL + '/authentication/customers/login'" to="/main" />
		</div>
	</div>
</template>

<script>
export default {
};
</script>

<style scoped>

</style>
