<!-- Please remove this file from your project -->
<template>
	<div class="container">
		<b-form @submit="onSubmit" @reset="onReset">
			<b-form-group
				id="input-group-1"
				label="Email address:"
				label-for="input-1"
			>
				<b-form-input
					id="input-1"
					v-model="form.email"
					type="email"
					placeholder="Enter email"
					required
				/>
			</b-form-group>

			<b-form-group
				id="input-group-2"
				label="Password:"
				label-for="input-2"
			>
				<b-form-input
					id="input-2"
					v-model="form.password"
					type="password"
					placeholder="Enter password"
					required
				/>
			</b-form-group>

			<b-button type="submit" variant="primary">
				Submit
			</b-button>
			<b-button type="reset" variant="danger">
				Reset
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
	},
	data() {
		return {
			form: {
				email: '',
				password: '',
			},
		};
	},
	methods: {
		onSubmit(event) {
			event.preventDefault();
			console.log(this.form);
		},
		onReset(event) {
			event.preventDefault();
		},
	},
};
</script>

<style scoped>
	.container {
		margin: 5px;
	}
</style>
