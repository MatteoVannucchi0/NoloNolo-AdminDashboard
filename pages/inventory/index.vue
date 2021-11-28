<template>
	<div>
		<b-container fluid>
			<div id="employeeContainer" class="container-grid">
				<CardProduct v-for="product in products" :key="product._id" :v-if="loaded" :product="product" />
			</div>
		</b-container>
		<Pagination :paginator="paginator" @next="paginatorNext" @prev="paginatorPrev" @at="paginatorAt" />
	</div>
</template>

<script>

import api from '../../assets/helper/api';

export default {
	data() {
		return {
			paginator: {
				type: Object,
				default: () => {},
			},
		};
	},
	computed: {
		products() {
			return this.paginator ? this.paginator.docs : undefined;
		},
		loaded() {
			return !!this.paginator;
		},
	},
	async mounted() {
		this.paginator = (await api.products.get()).data;
	},
	methods: {
		async paginatorPrev() {
			this.paginator = (await api.products.paginatorPrev(this.paginator)).data;
		},
		async paginatorNext() {
			this.paginator = (await api.products.paginatorNext(this.paginator)).data;
		},
		async paginatorAt(paginator, page) {
			this.paginator = (await api.products.paginatorAt(paginator, page)).data;
		},
	},
};

</script>

<style scoped>
	.container-grid {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: auto;
		justify-content: stretch;
		column-gap: 15px;
		row-gap: 5px;
	}
</style>
