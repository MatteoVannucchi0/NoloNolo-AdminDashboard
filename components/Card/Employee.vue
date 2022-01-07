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
				<img :src="profilePictureUrl" :alt="`Immagine di profilo di ${employee.lastname} ${employee.firstname}`">
			</NuxtLink>
			<span v-else><img :src="profilePictureUrl" :alt="`Immagine di profilo di ${employee.lastname} ${employee.firstname}`"></span>
		</div>
		<div v-if="false" class="card-email">
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
