<template>
	<b-card :title="customer.lastname + ' ' + customer.firstname" text-variant="white">
		<b-card-body>
			<NuxtLink v-if="link" :to="customerSingleUrl">
				<b-img :src="profilePictureUrl" fluid center />
			</NuxtLink>
			<span v-else><img :src="profilePictureUrl"></span>
			<b-card-text>
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
	.align-center-content {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container-flex{
		align-items: center;
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
