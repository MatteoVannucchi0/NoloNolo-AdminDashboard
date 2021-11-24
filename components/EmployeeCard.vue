<template>
	<div class="card card-container">
		<div class="card-title">
			{{ employee.lastname }} {{ employee.firstname }}
		</div>
		<div class="card-image">
			<img :src="profilePictureUrl">
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
import api from '../assets/helper/api';

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
</style>
