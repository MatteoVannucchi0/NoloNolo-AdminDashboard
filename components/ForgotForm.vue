<template>
	<div class="container">
		<h3 class="title">
			{{ title }}
		</h3>
		<small>
			Please enter your email address. <br>We will send you an email with a link to reset your password.
		</small>
		<b-form @submit="onSubmit">
			<b-form-group id="input-group-1" label="" label-for="input-1">
				<b-form-input id="input-1" v-model="form.email" type="email" placeholder="Email" required />
			</b-form-group>

			<b-button type="submit" variant="primary" block>
				Send
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
			default: 'Forgot your password?',
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

<style scoped src="@/assets/styles/form.css">

</style>
