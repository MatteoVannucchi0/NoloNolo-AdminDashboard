<template>
	<div class="card card-container">
		<div class="card-image">
			<NuxtLink v-if="link" :to="customerSingleUrl">
				<img :src="profilePictureUrl" :alt="`Immagine di profilo di ${customer.lastname} ${customer.firstname}`">
			</NuxtLink>
			<span v-else>
				<img
					:src="profilePictureUrl"
					:alt="`Immagine di profilo di ${customer.lastname} ${customer.firstname}`"
				>
			</span>
		</div>
		<div class="card-title">
			{{ customer.lastname }} {{ customer.firstname }}
		</div>

		<div v-if="showExtraInfo">
			<span class="card-email"> {{ customer.loginInfo.email }} </span>
			<div class="Address">
				<ul class="card-list">
					<li><span>Nazione: {{ customer.address.country }}</span></li>
					<li><span>Città: {{ customer.address.city }}</span></li>
					<li><span>Codice postale: {{ customer.address.zipcode }}</span></li>
					<li><span>Via: {{ customer.address.streetAddress }}</span></li>
				</ul>
			</div>
			<div>
				Data di nascita: {{ new Date(customer.dateOfBirth).toLocaleDateString() }}
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import api from '../../assets/helper/api';

export default {
	props: {
		customer: {
			type: Object,
			default: () => {},
		},
		link: {
			type: Boolean,
			default: true,
		},
		showExtraInfo: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		profilePictureUrl() {
			return api.toServerImageUrl(this.customer.profilePicture);
		},
		customerSingleUrl() {
			return `customers/${this.customer._id}`;
		},
	},
	mounted() {
	},
};
</script>
