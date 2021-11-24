<template>
	<div>
		<b-container fluid>
			<div id="customerContainer" class="container-grid">
				<CardCustomer v-for="customer in customers" :key="customer._id" :v-if="loaded" :customer="customer" />
			</div>
		</b-container>
		<b-button v-if="paginator.hasPrevPage" @click="paginatorPrev">
			Prev
		</b-button>
		<b-button v-if="paginator.hasNextPage" @click="paginatorNext">
			Next
		</b-button>
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
		duplicateData() {
			return undefined;
		},

		customers() {
			return this.paginator ? this.paginator.docs : undefined;
		},
		loaded() {
			return !!this.paginator;
		},
	},
	async mounted() {
		this.paginator = (await api.customers.get()).data;
	},
	methods: {
		async paginatorPrev() {
			this.paginator = (await api.customers.paginatorPrev(this.paginator)).data;
		},
		async paginatorNext() {
			this.paginator = (await api.customers.paginatorNext(this.paginator)).data;
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
