<template>
	<b-card :title="rental._id" text-variant="white">
		<b-badge :variant="badgeColor" pill>
			{{ rental.state }}
		</b-badge>
		<b-card-body align="">
			<b-card-text class="">
				<div>
					{{ rental.startDate }} - {{ rental.state == "close" ? rental.actualEndDate : rental.expectedEndDate }}
				</div>
				<div>
					Customer: {{ rental.customer }}
				</div>
				<div v-if="rental.employee">
					<NuxtLink :to="employeeLink">
						Employee: {{ rental.employee }}
					</NuxtLink>
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
		link: {
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
		badgeColor() {
			if (this.rental.state === 'close') return 'success';
			if (this.rental.state === 'open') return 'info';
			return 'danger';
		},
	},
	async mounted() {
		this.productLink = `/inventory/${(await api.products.get({ unit: this.rental.unit })).data.docs[0]._id}`;
	},
};
</script>
