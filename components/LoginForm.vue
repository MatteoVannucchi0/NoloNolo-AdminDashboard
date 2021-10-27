<template>
	<div class="container">
		<h3 class="title">
			{{ title }}
		</h3>

		<div v-if="unknownError" class="wrong-credential-container">
			<p><b>Login Failed</b></p>
			<p>An error has occured</p>
		</div>

		<div v-if="wrongEmail" class="wrong-credential-container">
			<p><b>Login Failed:</b></p>
			<p>No user found with that email</p>
		</div>

		<div v-if="wrongPassword" class="wrong-credential-container">
			<p><b>Login Failed:</b></p>
			<p>Incorrect password</p>
		</div>

		<b-form @submit="onSubmit">
			<b-form-group id="input-group-1" label="" label-for="input-1">
				<b-form-input
					id="input-1"
					v-model="form.email"
					type="email"
					placeholder="Email"
					required
				/>
			</b-form-group>

			<b-form-group id="input-group-2" label="" label-for="input-2">
				<b-form-input
					id="input-2"
					v-model="form.password"
					type="password"
					placeholder="Password"
					required
				/>
			</b-form-group>

			<div class="inline">
				<b-form-checkbox id="checkbox-1" v-model="remember" name="checkbox-1" class="remember-me-checkbox" switch>
					Remember me
				</b-form-checkbox>

				<NuxtLink to="/forgot" class="forgot-password">
					Forgot password?
				</NuxtLink>
			</div>

			<b-button type="submit" variant="primary" block>
				Login
			</b-button>
		</b-form>
	</div>
</template>

<script>
export default {
	props: {
		url: {
			type: String,
			default: '',
		},
		to: {
			type: String,
			default: '',
		},
		title: {
			type: String,
			default: 'Login',
		},
	},
	data() {
		return {
			form: {
				email: '',
				password: '',
			},
			remember: true,
			wrongEmail: false,
			wrongPassword: false,
			unknownError: false,
		};
	},
	methods: {
		async onSubmit(event) {
			event.preventDefault();
			const data = JSON.stringify(this.form);

			try {
				const res = await this.$axios({
					method: 'post',
					url: this.url,
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
					},
					data,
					timeout: 5000,
				});

				this.$store.commit('setToken', res.headers.Authorization);
				this.$router.push(this.to);
			} catch (error) {
				this.wrongPassword = error.response.status === 403;
				this.wrongEmail = error.response.status === 401;
				this.unknownError = error.response.status !== 403 && error.response.status !== 401;
			}
		},
	},
};
</script>

<style scoped src="@/assets/styles/form.css">
</style>
