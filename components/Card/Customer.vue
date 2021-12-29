<template>
	<b-card :title="customer.lastname + ' ' + customer.firstname" text-variant="white">
		<b-card-body align="center">
			<div class="card-image">
				<NuxtLink v-if="link" :to="customerSingleUrl">
					<img :src="profilePictureUrl">
				</NuxtLink>
				<span v-else><img :src="profilePictureUrl"></span>
			</div>
			<b-card-text v-if="showExtraInfo" class="text-center">
				<span id="email"> {{ customer.loginInfo.email }} </span>
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
			</b-card-text>
		</b-card-body>
	</b-card>
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

<style scoped>
	.card-container {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.container-flex{
		align-items: center;
	}

	#email {
		font-size: 1em !important;
	}

    .card-image {
        width: 175px;
        height: 175px;
    }
    .card-image img {
        width: 100%;
        height: 100%;
    }

	.card .card-body {
		padding: 4px;
	}
</style>
