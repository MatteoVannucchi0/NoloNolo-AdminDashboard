<template>
	<div>
		<div v-if="loaded" id="customerContainer" class="container-grid">
			<InfoEmployee :employee="employee" />
		</div>
	</div>
</template>

<script>
import api from '../../../assets/helper/api';

export default {
	data() {
		return {
			employee: {
				type: Object,
				default: () => {},
			},
			loaded: false,
		};
	},
	async mounted() {
		this.employee = (await api.employees.getSingle(this.$route.params.id)).data;
		this.loaded = true;
	},
};
</script>
