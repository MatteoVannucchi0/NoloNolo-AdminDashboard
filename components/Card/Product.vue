<template>
	<div class="card card-container">
		<div class="card-title">
			{{ product.name }}
		</div>
		<div class="card-image">
			<NuxtLink v-if="link" :to="productSingleUrl">
				<img :src="productImageUrl">
			</NuxtLink>
			<span v-else><img :src="productImageUrl"></span>
		</div>
		<div id="category">
			Category: {{ product.category }} - Subcategory: {{ product.subcategory }}
		</div>
		<div class="card-description">
			{{ product.description }}
		</div>
		<div class="tag-container">
			<span v-for="tag in product.tags" :key="tag.key+tag.value">Key: {{ tag.key }} - Value: {{ tag.value }}</span>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import api from '../../assets/helper/api';

export default {
	props: {
		product: {
			type: Object,
			default: () => {},
		},
		link: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		productImageUrl() {
			return api.toServerImageUrl(this.product.image);
		},
		productSingleUrl() {
			return `inventory/${this.product._id}`;
		},
	},
	mounted() {
		console.log('Dentro: ', this.product);
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
