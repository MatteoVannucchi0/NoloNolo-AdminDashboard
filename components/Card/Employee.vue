<template>
	<div class="card card-container">
		<h4>
			<b-badge :variant="badgeColor">
				{{ employee.authorization }}
			</b-badge>
		</h4>
		<div class="card-title">
			{{ employee.lastname }} {{ employee.firstname }}
		</div>
		<div class="card-image">
			<NuxtLink v-if="link" :to="employeeSingleUrl">
				<img :src="profilePictureUrl">
			</NuxtLink>
			<span v-else><img :src="profilePictureUrl"></span>
		</div>
		<div v-if="false" id="email">
			{{ employee.loginInfo.email }}
		</div>
	</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import api from '../../assets/helper/api';

export default {
	props: {
		employee: {
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
			return api.toServerImageUrl(this.employee.profilePicture);
		},
		employeeSingleUrl() {
			return `employees/${this.employee._id}`;
		},
		badgeColor() {
			return this.employee.authorization === 'admin' ? 'danger' : 'warning';
		},
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
