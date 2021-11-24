<template>
	<div class="card card-container">
		<div class="card-title">
			{{ employee.lastname }} {{ employee.firstname }}
		</div>
		<div class="card-image">
			<a :href="employeeSingleUrl">
				<img :src="profilePictureUrl">
			</a>
		</div>
		<div v-if="false" id="email">
			{{ employee.loginInfo.email }}
		</div>
		<div>
			{{ employee.authorization }}
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
	},
	computed: {
		profilePictureUrl() {
			return api.toServerImageUrl(this.employee.profilePicture);
		},
		employeeSingleUrl() {
			return `employees/${this.employee._id}`;
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
