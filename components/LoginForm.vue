<!-- Please remove this file from your project -->
<template>
	<div class="container">
		<h3 class="form-title">
			{{ title }}
		</h3>
		<b-form @submit="onSubmit" @reset="onReset">
			<b-form-group id="input-group-1" label="" label-for="input-1">
				<b-input-group prepend="$">
					<b-icon icon="person-fill" />
					<b-form-input id="input-1" v-model="form.email" type="email" placeholder="Email" required />
				</b-input-group>
			</b-form-group>

			<b-form-group id="input-group-2" label="" label-for="input-2">
				<b-form-input id="input-2" v-model="form.password" type="password" placeholder="Password" required />
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
				remember: true,
			},
		};
	},
	methods: {
		async onSubmit(event) {
			event.preventDefault();
			const data = JSON.stringify(this.form);
			const res = await fetch(this.$url, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: data,
			});

			console.log(res);
			this.$router.push(this.$to);
		},
	},
};
</script>

<style scoped>
.container {
  margin: 5px;
  width: auto;
}
.form-title {
  text-align: center;
  margin-bottom: 2vh;
}

.inline {
  display: flex;
  flex-direction: row;
  margin-bottom: 4vh;
  margin-top: 0;
}

.inline > * {
  font-size: small;
}

.forgot-password {
  margin-left: 1vw;
}

.remember-me-checkbox {
  margin-right: 1vw;
}
</style>
