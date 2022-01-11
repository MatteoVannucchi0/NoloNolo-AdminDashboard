<template>
	<b-card text-variant="white" style="height: 100%;">
		<b-card-title class="card-title">
			{{ rental._id }}
		</b-card-title>
		<b-badge :variant="badgeColor" pill>
			{{ rental.state }}
		</b-badge>
		<b-card-body align="">
			<b-card-text class="">
				<div>
					{{ new Date(rental.startDate).toLocaleDateString() }} - {{ new Date(rental.state == "close" ? rental.actualEndDate : rental.expectedEndDate).toLocaleDateString() }}
				</div>
				<div>
					<NuxtLink v-if="linkCustomer" :to="customerLink">
						Customer: {{ rental.customer }}
					</NuxtLink>
					<span v-else>
						Customer: {{ rental.customer }}
					</span>
				</div>
				<div v-if="rental.employee">
					<NuxtLink v-if="linkEmployee" :to="employeeLink">
						Employee: {{ rental.employee }}
					</NuxtLink>
					<span v-else>
						Employee: {{ rental.employee }}
					</span>
				</div>
				<div>
					<NuxtLink :to="productLink">
						Unit: {{ rental.unit }}
					</NuxtLink>
				</div>

				<div>
					Price Estimation: {{ rental.priceEstimantion }}
				</div>
				<div>
					Final Bill: {{ rental.bill }}
				</div>

				<div>
					State: {{ rental.state }}
				</div>
			</b-card-text>
		</b-card-body>
	</b-card>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import api from '../../assets/helper/api';

export default {
	props: {
		rental: {
			type: Object,
			default: () => {},
		},
		linkCustomer: {
			type: Boolean,
			default: true,
		},
		linkEmployee: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			productLink: '/inventory/',
		};
	},
	computed: {
		employeeLink() {
			return `/employees/${this.rental.employee}`;
		},
		customerLink() {
			return `/customers/${this.rental.customer}`;
		},
		badgeColor() {
			if (this.rental.state === 'close') return 'success';
			if (this.rental.state === 'open') return 'info';
			return 'danger';
		},
	},
	async mounted() {
		const unit = (await api.units.getSingle(this.rental.unit)).data;
		this.productLink = `/inventory/${unit.product}`;
	},
};
</script>
