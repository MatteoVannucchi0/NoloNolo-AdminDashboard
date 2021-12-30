<template>
	<div>
		<div v-if="loaded" id="productContainer" class="container-grid">
			<InfoProduct :product="product" />
		</div>
	</div>
</template>

<script>
import api from '../../../assets/helper/api';

export default {
	data() {
		return {
			product: {
				type: Object,
				default: () => {},
			},
			loaded: false,
		};
	},
	head() {
		return {
			title: `Prodotto ${this.$route.params.id}`,
		};
	},
	async mounted() {
		this.product = (await api.products.getSingle(this.$route.params.id)).data;
		this.loaded = true;
	},
};
</script>
