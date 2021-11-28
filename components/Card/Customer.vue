<template>
	<div class="card card-container">
		<div class="card-title">
			{{ customer.lastname }} {{ customer.firstname }}
		</div>
		<div class="card-image">
			<NuxtLink v-if="link" :to="customerSingleUrl">
				<img :src="profilePictureUrl">
			</NuxtLink>
			<span v-else><img :src="profilePictureUrl"></span>
		</div>
		<div id="email">
			{{ customer.loginInfo.email }}
		</div>
		<div class="Address">
			<ul>
				<li><span>Country: {{ customer.address.country }}</span></li>
				<li><span>City: {{ customer.address.city }}</span></li>
				<li><span>Zipcode: {{ customer.address.zipcode }}</span></li>
				<li><span>Street Address: {{ customer.address.streetAddress }}</span></li>
			</ul>
		</div>
		<div>
			{{ customer.dateOfBirth }}
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

<style scoped>
	.card-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container-flex{
		align-items: center;
	}

	.card {
		padding: 25px;
	}

	#email {
		font-size: 1.2em !important;
	}

    .card-image {
        width: 200px;
        height: 200px;
    }

    .card-image img {
        width: 100%;
        height: 100%;
    }
</style>
