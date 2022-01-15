<template>
	<div class="card card-container">
		<div class="card-image">
			<NuxtLink v-if="link" :to="productSingleUrl">
				<img :src="productImageUrl" :alt="`Immagine del prodotto ${product.name}`">
			</NuxtLink>
			<span v-else><img :src="productImageUrl" :alt="`Immagine del prodotto ${product.name}`"></span>
		</div>
		<div class="card-title">
			{{ product.name }}
		</div>
		<h5>
			<b-badge variant="danger">
				{{ product.category + " - " + product.subcategory }}
			</b-badge>
		</h5>
		<div v-if="description" class="card-description">
			{{ shortenDescription }}
			<b-button v-if="shortenDescription != product.description || !shortDescription" @click="changeDescription">
				{{ expandButtonDescription }}
			</b-button>
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
		description: {
			type: Boolean,
			default: true,
		},

	},
	data() {
		return {
			shortDescription: true,
		};
	},
	computed: {
		productImageUrl() {
			return api.toServerImageUrl(this.product.image);
		},
		productSingleUrl() {
			return `inventory/${this.product._id}`;
		},
		shortenDescription() {
			if (!this.shortDescription) {
				return this.product.description;
			}

			const maxDescriptionLength = 200;
			if (this.product.description.length > maxDescriptionLength) {
				return `${this.product.description.substring(0, maxDescriptionLength)}...`;
			}
			return this.product.description;
		},
		expandButtonDescription() {
			return this.shortDescription ? 'espandi' : 'comprimi';
		},
	},
	methods: {
		changeDescription() {
			this.shortDescription = !this.shortDescription;
		},
	},
};
</script>
