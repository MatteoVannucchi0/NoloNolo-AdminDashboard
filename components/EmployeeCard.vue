<template>
	<div class="card card-container">
		<div class="card-title">
			{{ employee.lastname }} {{ employee.firstname }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		employee: {
			type: Object,
			default: () => {},
		},
	},
};
</script>

<style scoped>
	.card-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
