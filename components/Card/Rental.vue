<template>
	<b-card text-variant="white" style="height: 100%;">
		<b-card-title class="card-title">
			{{ rental._id }}
		</b-card-title>
		<b-badge :variant="badgeColor" pill>
			{{ state }}
		</b-badge>
		<b-card-body align="">
			<b-card-text class="">
				<div>
					{{ new Date(rental.startDate).toLocaleDateString() }} - {{ new Date(rental.state == "close" ? rental.actualEndDate : rental.expectedEndDate).toLocaleDateString() }}
				</div>
				<div>
					<NuxtLink v-if="linkCustomer" :to="customerLink">
						Cliente: {{ rental.customer }}
					</NuxtLink>
					<span v-else>
						Cliente: {{ rental.customer }}
					</span>
				</div>
				<div v-if="rental.employee">
					<NuxtLink v-if="linkEmployee" :to="employeeLink">
						Impiegato: {{ rental.employee }}
					</NuxtLink>
					<span v-else>
						Impiegato: {{ rental.employee }}
					</span>
				</div>
				<div>
					<NuxtLink :to="productLink">
						Unità: {{ rental.unit }}
					</NuxtLink>
				</div>
				<div>
					Prezzo: {{ roundToTwo(rentalPrice) + '€' }}
				</div>
			</b-card-text>
		</b-card-body>
	</b-card>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import api from '../../assets/helper/api';
import Helper from '../../assets/helper/helper';

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
			bill: undefined,
			loaded: false,
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
		rentalPrice() {
			if (!this.loaded) return 0;
			if (this.rental.state === 'close') return this.bill.priceRecap.finalPrice || 0;
			return this.rental.priceEstimation.finalPrice || 0;
		},
		state() {
			return Helper.rentalStateTranslation(this.rental.state);
		},
	},
	async mounted() {
		if (this.rental.state === 'close') { this.bill = (await api.bills.getSingle(this.rental.bill)).data; }
		const unit = (await api.units.getSingle(this.rental.unit)).data;
		this.productLink = `/inventory/${unit.product}`;

		this.loaded = true;
	},
	methods: {
		roundToTwo(num) {
			return +(`${Math.round(`${num}e+2`)}e-2`);
		},
	},
};
</script>
