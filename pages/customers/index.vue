<template>
	<div>
		<b-container fluid>
			<div id="filter-container">
				<b-form-input v-model="filterText" placeholder="Enter the customer's name" />
			</div>
			<div v-if="!isEmpty">
				<div id="customerContainer" class="container-grid">
					<CardCustomer v-for="customer in customers" :key="customer._id" :v-if="loaded" :customer="customer" />
				</div>
				<Pagination :paginator="paginator" @next="paginatorNext" @prev="paginatorPrev" @at="paginatorAt" />
			</div>
			<div v-else>
				<h2 style="color: white;">
					No customer found.
				</h2>
			</div>
		</b-container>
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
			filterText: '',
		};
	},
	computed: {
		duplicateData() {
			return undefined;
		},
		customers() {
			return this.paginator ? this.paginator.docs : undefined;
		},
		loaded() {
			return !!this.paginator;
		},
		isEmpty() {
			return this.paginator.totalDocs === 0;
		},
	},
	watch: {
		async filterText() {
			if (this.filterText.length > 0) {
				this.paginator = (await api.customers.get({ nameStartWith: this.filterText })).data;
			} else {
				this.paginator = (await api.customers.get()).data;
			}
		},
	},
	async mounted() {
		this.paginator = (await api.customers.get()).data;
	},
	methods: {
		async paginatorPrev(paginator) {
			this.paginator = (await api.customers.paginatorPrev(paginator)).data;
		},
		async paginatorNext(paginator) {
			this.paginator = (await api.customers.paginatorNext(paginator)).data;
		},
		async paginatorAt(paginator, page) {
			this.paginator = (await api.customers.paginatorAt(paginator, page)).data;
		},
	},
};

</script>

<style scoped>
	#filter-container {
		height: 200px;
	}
	.container-grid {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: auto;
		justify-content: stretch;
		column-gap: 15px;
		row-gap: 5px;
	}
</style>
