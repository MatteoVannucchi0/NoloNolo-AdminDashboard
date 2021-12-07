<template>
	<div v-if="visible">
		<b-button v-if="paginator.hasPrevPage" @click="paginatorPrev">
			Prev
		</b-button>
		<b-button v-for="number in getPrev" :key="number" style="color:white;" @click="paginatorAt(number)">
			{{ number }}
		</b-button>
		<b-button variant="danger">
			{{ getCurrent }}
		</b-button>
		<b-button v-for="number in getNext" :key="number" style="color:white;" @click="paginatorAt(number)">
			{{ number }}
		</b-button>
		<b-button v-if="paginator.hasNextPage" @click="paginatorNext">
			Next
		</b-button>
	</div>
</template>

<script>
export default {
	props: {
		paginator: {
			type: Object,
			default: () => {},
		},
		numberShown: {
			type: Number,
			default: 2,
		},
		lastShown: {
			type: Boolean,
			default: true,
		},
		firstShown: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		visible() {
			return this.paginator.hasPrevPage || this.paginator.hasNextPage;
		},
		showLast() {
			return this.lastShown && this.paginator.hasPrevPage;
		},
		showFirst() {
			return this.firstShown && this.paginator.hasNextPage;
		},
		getCurrent() {
			return this.paginator.page;
		},
		getNext() {
			const startIndex = this.getCurrent + 1;

			if (this.getCurrent + this.numberShown >= this.getTotal) return [...Array(this.getTotal - this.getCurrent).keys()].map((i) => i + startIndex);
			return [...Array(this.numberShown).keys()].map((i) => i + startIndex);
		},
		getPrev() {
			if (this.getCurrent <= this.numberShown) return [...Array(this.getCurrent - 1).keys()].map((i) => i + 1);

			const startIndex = this.getCurrent - this.numberShown;
			return [...Array(this.numberShown).keys()].map((i) => i + startIndex);
		},
		getTotal() {
			return this.paginator.totalPages;
		},
	},
	watch: {
		paginator() {
			this.update();
		},
	},
	mounted() {
		this.update();
	},
	methods: {
		update() {
		},
		async paginatorPrev() {
			this.$emit('prev', this.paginator);
		},
		async paginatorNext() {
			this.$emit('next', this.paginator);
		},
		async paginatorAt(page) {
			this.$emit('at', this.paginator, page);
		},
	},
};
</script>

<style scoped>
</style>
