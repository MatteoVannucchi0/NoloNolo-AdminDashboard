<template>
	<div>
		<div class="chart-title">
			Prodotti più venduti
		</div>
		<ChartBase
			chart-name="MostSoldProducts"
			chart-type="bar"
			:data="data"
			:data-options="dataOptions"
			:data-labels="dataLabels"
			aria-label="Grafico dei prodotti più venduti"
			@onClick="onClick"
			@preDraw="$emit('preDraw')"
		/>
	</div>
</template>
<script>
/* eslint-disable no-underscore-dangle */
import appearanceConfig from '../../../assets/helper/appearanceConfig';

export default {
	props: {
		rentals: {
			type: Array,
			required: true,
		},
		units: {
			type: Array,
			required: true,
		},
		products: {
			type: Array,
			required: true,
		},
		dataOptions: {
			type: Object,
			default: () => ({ backgroundColor: appearanceConfig.backgroundColor }),
		},
	},
	data() {
		return {
			data: [],
			dataLabels: [],
			chartLabel: [],
		};
	},
	async mounted() {
		await this.updateGraph();
		this.$emit('loaded');
	},
	methods: {
		async updateGraph() {
			const unitsFrequency = new Map();

			for (const rent of this.rentals) {
				const rentUnit = rent.unit._id;
				const newValue = unitsFrequency.get(rentUnit) + 1 || 1;
				unitsFrequency.set(rentUnit, newValue);
			}

			const productsFrequency = new Map();

			for (const unit of this.units) {
				const unitFreq = unitsFrequency.get(unit._id) || 0;
				const unitProduct = `${unit.product.name};${unit.product._id}`;
				const newValue = productsFrequency.get(unitProduct) + unitFreq || unitFreq;
				productsFrequency.set(unitProduct, newValue);
			}

			const sortedMap = new Map([...productsFrequency].sort((a, b) => b[1] - a[1]).slice(0, 10));

			const data = [];
			const dataLabels = [];
			sortedMap.forEach((value, key) => {
				data.push(value);
				dataLabels.push(key.split(';')[0]);
			});

			this.data = data;
			this.dataLabels = dataLabels;
		},
		onClick(contex) {
			const { label } = contex;
			let product = {};

			for (const prod of this.products) {
				if (prod.name === label) {
					product = prod;
					break;
				}
			}

			this.$router.push(`/inventory/${product._id}`);
		},
	},
};
</script>
