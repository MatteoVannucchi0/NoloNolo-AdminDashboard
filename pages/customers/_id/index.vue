<template>
	<div>
		<div v-if="loaded" id="customerContainer" class="container-grid">
			<InfoCustomer :customer="customer" />
		</div>
	</div>
</template>

<script>
import api from '../../../assets/helper/api';

export default {
	data() {
		return {
			customer: {
				type: Object,
				default: () => {},
			},
			loaded: false,
		};
	},
	async mounted() {
		this.customer = (await api.customers.getSingle(this.$route.params.id)).data;
		this.loaded = true;
	},
};
</script>
