<template>
	<div class="login-outer-container">
		<b-card title="Sign in" class="">
			<LoginForm title="" :url="$config.apiBaseURL + '/authentication/customers/login'" to="/main" />
		</b-card>
	</div>
</template>

<script>
export default {
};
</script>

<style scoped>

</style>
