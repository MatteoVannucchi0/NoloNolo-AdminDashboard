<template>
	<div>
		<CardEmployee :employee="employee" :link="false" />
		<div id="spending-overtime">
			<ChartEmployeeEarningOverTime :employee="employee" />
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
	computed: {
	},
};
</script>

<style scoped>
</style>
