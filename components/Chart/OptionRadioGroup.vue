<template>
	<div>
		<b-form-radio-group
			id="graphTypeSelect"
			v-model="currentSelected"
			:options="options"
			:aria-describedby="ariaDescribedBy"
			button-variant="outline-primary"
			name="radio-btn-outline"
			buttons
			@change="onChange"
		/>
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
		ariaDescribedBy: {
			type: String,
			default: 'Graph data range radio',
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
