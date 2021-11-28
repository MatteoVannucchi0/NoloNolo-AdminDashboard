<template>
	<div>
		<CardEmployee :employee="employee" :link="false" />
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
	computed: {
	},
};
</script>

<style scoped>
</style>
