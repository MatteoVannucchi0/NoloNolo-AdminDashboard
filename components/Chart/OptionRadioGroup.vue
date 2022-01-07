<template>
	<div>
		<b-form-group v-slot="{ ariaDescribedby }" label="Selezione del range temporale del grafico" label-sr-only>
			<b-form-radio-group
				id="graphTypeSelect"
				v-model="currentSelected"
				:options="options"
				:aria-describedby="ariaDescribedby"
				button-variant="outline-primary"
				name="radio-btn-outline"
				buttons
				@change="onChange"
			/>
		</b-form-group>
	</div>
</template>

<script>
export default {
	props: {
		options: {
			type: Array,
			default: () => [],
		},
		selected: {
			type: [String, Object],
			required: true,
		},
	},
	data() {
		return {
			currentSelected: undefined,
		};
	},
	mounted() {
		this.currentSelected = this.selected;
	},
	methods: {
		onChange() {
			this.$emit('onChange', this.currentSelected);
		},
	},
};
</script>
