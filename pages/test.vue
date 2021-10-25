<template>
	<div class="login-outer-container">
		<b-container fluid>
			<b-row>
				<b-col />
				<b-col
					class="login-form-container"
					sm="8"
					md="5"
					lg="3"
					xl="2"
					xxl="1"
				>
					<LoginForm title="Sign in" url="http://localhost:8000/api/authentication/customers/login" to="/main" />
				</b-col>
				<b-col />
			</b-row>
		</b-container>
	</div>
</template>

<script>
export default {
};
</script>

<style scoped>

.login-form-container {
    background-color:white;
    border-radius: 5%;
    border: 2px solid black;
}

</style>
