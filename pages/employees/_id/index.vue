<template>
	<div>
		<div v-if="loaded" id="employeeContainer" class="container-grid">
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
	head() {
		return {
			title: `Impiegato ${this.$route.params.id}`,
		};
	},
	async mounted() {
		this.employee = (await api.employees.getSingle(this.$route.params.id)).data;
		this.loaded = true;
	},
};
</script>
