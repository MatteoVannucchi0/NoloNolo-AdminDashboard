<template>
	<b-pagination v-model="currentPage" :total-rows="paginator.totalDocs" :per-page="paginator.limit" aria-controls="my-table" align="center" />
</template>

<script>

export default {
	props: ['value', 'paginator'],
	data() {
		return {
			noVModelCurretPage: 1,
		};
	},
	computed: {
		currentPage: {
			get() {
				return this.value || this.noVModelCurretPage;
			},
			set(newValue) {
				if (this.value) { this.$emit('input', newValue); } else { this.noVModelCurretPage = newValue; }
			},
		},
	},
	watch: {
		async currentPage(newCurrent) {
			await this.paginatorAt(newCurrent);
		},
	},
	methods: {
		async paginatorAt(page) {
			this.$emit('at', this.paginator, page);
		},
	},
};
</script>

<style scoped>
</style>
