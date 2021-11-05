<template>
	<div class="login-outer-container">
		<LoginForm title="Sign in" :url="$config.apiBaseURL + '/authentication/customers/login'" to="/main" />
	</div>
</template>

<script>
export default {
};
</script>

<style scoped>

</style>
