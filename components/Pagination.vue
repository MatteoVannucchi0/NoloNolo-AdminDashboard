<template>
	<b-pagination v-model="currentPage" :total-rows="paginator.totalDocs" :per-page="paginator.limit" aria-controls="my-table" align="center" />
</template>

<script>
export default {
	props: {
		paginator: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			currentPage: 1,
		};
	},
	watch: {
		paginator() {
			this.update();
		},
		async currentPage(newCurrent) {
			await this.paginatorAt(newCurrent);
		},
	},
	mounted() {
		this.update();
	},
	methods: {
		update() {
		},
		async paginatorAt(page) {
			this.$emit('at', this.paginator, page);
		},
	},
};
</script>

<style scoped>
</style>
