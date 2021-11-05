<template>
	<div class="card">
		<h3 class="card-title">
			{{ title }}
		</h3>
		<small>
			Please enter your email address. <br>We will send you an email with a link to reset your password.
		</small>
		<b-form @submit="onSubmit">
			<b-form-group id="input-group-1" label="" label-for="input-1">
				<b-form-input id="input-1" v-model="form.email" type="email" placeholder="Email" required />
			</b-form-group>

			<b-button type="submit" block class="card-button">
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

<style scoped>
@import url("../assets/styles/main.css");
.card {
    padding: 4vh 0px 10vh 0px;
}

.card-title {
    margin-bottom: 5vh;
}

.card-error {
    margin: 0 0 5vh 0;
    padding: 2px;
}

.card-inline-item {
    gap: 3vw;
    margin-bottom: 4vh;
    margin-top: 0;
}

</style>
